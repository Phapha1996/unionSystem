Ext
		.onReady(function() {
			Ext.QuickTips.init();// 浮动信息提示
			Ext.BLANK_IMAGE_URL = '../Ext/resources/images/default/s.gif';// 替换图片文件地址为本地
			var paramsCache = [ '', '', '' ];
			// 响应双击事件
			createWin_View = function(rowIndex, columnIndex) {
				var close = new Ext.Button({
					text : '关闭',
					handler : function() {
						win.close();
					}

				});
				var titles = new Ext.form.TextArea({
					width : '80%',
					height : 'auto',
					id : 'titles',
					name : 'titles',
					grow : true,
					readOnly : true,
					fieldLabel : '提案名称'
				});
				var reason = new Ext.form.TextArea({
					width : '80%',
					height : 'auto',
					id : 'reason',
					name : 'reason',
					grow : true,
					readOnly : true,
					fieldLabel : '案由'
				});
				var action = new Ext.form.TextArea({
					width : '80%',
					height : 'auto',
					id : 'action',
					name : 'action',
					grow : true,
					readOnly : true,
					fieldLabel : '建议或措施'
				});
				var form = new Ext.form.FormPanel({
					frame : true,
					html : '<div id="msg" class="tipmsg"></div>',
					items : [ titles, reason, action ],
					buttonAlign : 'center',
					buttons : [ close ]
				});
				var win = new Ext.Window({
					title : '查看',
					resizable : true,
					width : '80%',
					shadow : true,
					height : 'auto',
					modal : false,
					maximizable : true,
					closable : true,
					items : form
				});
				titles.setValue(ds.getAt(rowIndex).get('title'));
				reason.setValue(ds.getAt(rowIndex).get('reason'));
				action.setValue(ds.getAt(rowIndex).get('action'));
				win.show();
			}

			function Todate(v) {
				if (v == null) {
					return null;
				}
				var d = new Date();
				var str = v.toString();
				var str1 = str.replace("/Date(", "");
				var str2 = str1.replace(")/", "");
				var dd = parseInt(str2);
				d.setTime(dd);
				return d;
			}
			;

			// 定义数据源为远程代理和JSON数据格式
			var ds = new Ext.data.Store({
				autoLoad : true,
				// proxy: new Ext.data.MemoryProxy(jsondata),
				proxy : new Ext.data.HttpProxy({
					url : '../sys_pro_cmt/userAction_pro_findAllProposals'
				}),
				// jsonreader的字段名称要与glut.db.bean中的类属性名一致，不要去匹配数据库字段
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'root'
				}, [ {
					name : 'id'
				}, {
					name : 'submitDate',
					type : "date",
					dateFormat : "Y-m-d",
					convert : Todate
				}, {
					name : 'submitterDpm'
				}, {
					name : 'submitterName'
				}, {
					name : 'submitterPhone'
				}, {
					name : 'supporter1'
				}, {
					name : 'supporter2'
				}, {
					name : 'category'
				}, {
					name : 'title'
				}, {
					name : 'reason'
				}, {
					name : 'action'
				}, {
					name : 'committeeAdv'
				}, {
					name : 'mainUnit'
				}, {
					name : 'assistantUnit'
				}, {
					name : 'desc'
				} ])
			});
			// 加载首页数据，每页显示10条记录
			// 不查询，直接导出 by Yang
			/*
			 * ds.load({ params : { start : 0, limit : 10 } });
			 */

			// 定义复选框
			// var sm = new Ext.grid.CheckboxSelectionModel();
			// 定义列模型
			var cm = new Ext.grid.ColumnModel({
				defaults : {
					sortable : true
				},
				columns : [
						new Ext.grid.RowNumberer(),// 添加自动行号
						// sm,// 添加复选框
						{
							header : '编号',
							width : 40,
							dataIndex : 'id'
						},
						{
							header : '时间',
							width : 40,
							dataIndex : 'submitDate',
							type : 'date',
							renderer : Ext.util.Format.dateRenderer('Y-m-d')
						},
						{
							header : '单位',
							width : 40,
							dataIndex : 'submitterDpm'
						},
						{
							header : '姓名',
							width : 40,
							dataIndex : 'submitterName'
						},
						{
							header : '电话',
							width : 40,
							dataIndex : 'submitterPhone'
						},
						{
							header : '附议人姓名1',
							width : 45,
							dataIndex : 'supporter1'
						},
						{
							header : '附议人姓名2',
							width : 45,
							dataIndex : 'supporter2'
						},
						{
							header : '提案类别',
							width : 40,
							dataIndex : 'category'
						},
						{
							header : '题目',
							width : 35,
							dataIndex : 'title'
						},
						{
							header : '案由',
							width : 35,
							dataIndex : 'reason'
						},
						{
							header : '建议或措施',
							width : 45,
							dataIndex : 'action'
						},
						{
							header : '提案委员会意见',
							width : 60,
							sortable : true,
							dataIndex : 'committeeAdv',
							editor : new Ext.form.ComboBox(
									{
										triggerAction : 'all',
										lazyRender : true,
										editable : false,
										store : [
												[ '同意立案', '同意立案' ],
												[ '不同意立案', '不同意立案' ],
												[ '不同意立案，作为意见或建议处理',
														'不同意立案，作为意见或建议处理' ] ]
									})
						}, {
							header : '主办单位',
							width : 60,
							dataIndex : 'mainUnit',
							editor : new Ext.form.ComboBox({
								triggerAction : 'all',
								lazyRender : true,
								editable : false,
								store : glut_constant_unitstore
							// store : [['地球科学学院', '地球科学学院'],
							// ['环境科学与工程学院', '环境科学与工程学院'],
							// ['化学生物工程学院', '化学生物工程学院'],
							// ['材料科学与工程学院', '材料科学与工程学院'],
							// ['土木与建筑工程学院', '土木与建筑工程学院'],
							// ['测绘地理信息学院', '测绘地理信息学院'],
							// ['机械与控制工程学院', '机械与控制工程学院'],
							// ['信息科学与工程学院', '信息科学与工程学院'],
							// ['马克思主义学院', '马克思主义学院'],
							// ['人文社会科学学院', '人文社会科学学院'], ['管理学院',
							// '管理学院'],
							// ['旅游学院', '旅游学院'], ['艺术学院', '艺术学院'],
							// ['外国语学院', '外国语学院'], ['理学院', '理学院']]
							})
						}, {
							header : '协办单位',
							width : 60,
							dataIndex : 'assistantUnit',
							editor : new Ext.form.ComboBox({
								triggerAction : 'all',
								lazyRender : true,
								editable : false,
								store : glut_constant_unitstore
							// store : [['地球科学学院', '地球科学学院'],
							// ['环境科学与工程学院', '环境科学与工程学院'],
							// ['化学生物工程学院', '化学生物工程学院'],
							// ['材料科学与工程学院', '材料科学与工程学院'],
							// ['土木与建筑工程学院', '土木与建筑工程学院'],
							// ['测绘地理信息学院', '测绘地理信息学院'],
							// ['机械与控制工程学院', '机械与控制工程学院'],
							// ['信息科学与工程学院', '信息科学与工程学院'],
							// ['马克思主义学院', '马克思主义学院'],
							// ['人文社会科学学院', '人文社会科学学院'], ['管理学院',
							// '管理学院'],
							// ['旅游学院', '旅游学院'], ['艺术学院', '艺术学院'],
							// ['外国语学院', '外国语学院'], ['理学院', '理学院']]
							})
						} ]
			});
			// 设置所有列字段默认排序
			cm.defaultSortable = true;
			// 定义部门数据源
			var dpt_store = new Ext.data.ArrayStore({
				fields : [ 'dpt_value', 'text' ],
				data : glut_constant_unitstore
			// data : [[1, '地球科学学院'], [2, '环境科学与工程学院'], [3, '化学生物工程学院'],
			// [4, '材料科学与工程学院'], [5, '土木与建筑工程学院'], [6, '测绘地理信息学院'],
			// [7, '机械与控制工程学院'], [8, '信息科学与工程学院'], [9, '马克思主义学院'],
			// [10, '人文社会科学学院'], [11, '管理学院'], [12, '旅游学院'],
			// [13, '艺术学院'], [14, '外国语学院'], [15, '理学院']]
			});

			// 定义类别数据源
			var type_store = new Ext.data.ArrayStore({
				fields : [ 'type_value', 'text' ],
				data : glut_constant_categorystore
			// data : [['人才培养', '人才培养'], ['教学管理', '教学管理'], ['科研管理', '科研管理'],
			// ['职工福利', '职工福利'], ['师资队伍', '师资队伍'], ['校园建设', '校园建设'],
			// ['文化体育', '文化体育'], ['交通运输', '交通运输'], ['安全稳定', '安全稳定'],
			// ['其他', '其他']]
			});

			// 定义一个表格面板
			var grid = new Ext.grid.EditorGridPanel(
					{
						id : 'act-grid',// 设置标识ID，方便以后引用！
						title : '提案统计输出',// 标题
						renderTo : Ext.getBody(),// 显示表格的地方
						// sm : sm,// 复选框
						cm : cm,// 列模型
						ds : ds,// 数据源
						stripeRows : true,// 加上行条纹
						loadMask : true,// 加载数据时遮蔽表格
						border : true,// 加上边框
						frame : true,// 显示天蓝色圆角框
						autoHeight : true,// 自动设置高度，这个配置很重要
						width : '100%',
						x : 1,// 设置初始位置横坐标
						y : 1,// 设置初始位置纵坐标
						// floating : true,// 设置浮动，能否拖动成功就靠它了,注意设置浮动后它就置顶了
						// 实现拖曳效果，参考官方文档
						draggable : {
							insertProxy : false,
							onDrag : function(e) {
								var pel = this.proxy.getEl();
								this.x = pel.getLeft(true);
								this.y = pel.getTop(true);
								var s = this.panel.getEl().shadow;// 拖曳中消除原位置的阴影
								if (s) {
									s.realign(this.x, this.y, pel.getWidth(),
											pel.getHeight());
								}
							},
							endDrag : function(e) {// 拖曳结束后保存位置效果
								this.panel.setPosition(this.x, this.y);
							}
						},
						// 响应导出案表按钮的事件
						listeners : {
							cellClick : function(grid, rowIndex, columnIndex, e) {
								// 按钮的位置位于第17列，如果列数有调整需要把这个数值也调整，或者把按钮长期永远放在最后，用length-1来替代12.
								var colCount = grid.colModel.config.length;
								if (columnIndex == colCount - 14) {
									var ppsId = grid.getStore().getAt(rowIndex)
											.get('id');
									// alert(ppsId);
									Ext.Ajax
											.request({
												url : '../sys_pro_cmt/userAction_pro_exportProposal',
												method : 'POST',
												params : {
													proId : ppsId
												},
												success : function(response,
														options) {
													// Ext.MessageBox.alert('成功',
													// '从服务端获取结果: '
													// + response.responseText);
													// alert(response.responseText);
													window
															.open(response.responseText);
												},
												failure : function(response,
														options) {
													Ext.MessageBox
															.alert(
																	'失败',
																	'请求超时或网络故障,错误编号：'
																			+ response.status);
												}
											});
								}
							},
							// 双击事件，弹窗
							cellDblClick : function(grid, rowIndex,
									columnIndex, e) {
								var colCount = grid.colModel.config.length;
								if (columnIndex == colCount - 6
										|| columnIndex == colCount - 5
										|| columnIndex == colCount - 4) {
									createWin_View(rowIndex, columnIndex);
								}
							}
						},
						// UI视图配置
						viewConfig : {
							forceFit : true
						// 强制适应分布宽度
						},
						// 表格顶部动作或按钮工具栏
						tbar : new Ext.Toolbar(
								{
									items : [
											'-',											
											{
												xtype : 'combo',
												id : 'findByDpt',
												name : 'findByDpt',
												mode : 'local',
												// readOnly : true,
												triggerAction : 'all',
												editable : true,
												emptyText : '按部门查询',
												store : glut_constant_unitstore,
												// store : [['地球科学学院',
												// '地球科学学院'],
												// ['环境科学与工程学院', '环境科学与工程学院'],
												// ['化学生物工程学院', '化学生物工程学院'],
												// ['材料科学与工程学院', '材料科学与工程学院'],
												// ['土木与建筑工程学院', '土木与建筑工程学院'],
												// ['测绘地理信息学院', '测绘地理信息学院'],
												// ['机械与控制工程学院', '机械与控制工程学院'],
												// ['信息科学与工程学院', '信息科学与工程学院'],
												// ['马克思主义学院', '马克思主义学院'],
												// ['人文社会科学学院', '人文社会科学学院'],
												// ['管理学院', '管理学院'],
												// ['旅游学院', '旅游学院'], ['艺术学院',
												// '艺术学院'],
												// ['外国语学院', '外国语学院'], ['理学院',
												// '理学院']],
												hiddenName : 'dpt',
												valueField : 'dpt_value',
												displayField : 'text'
											},
											'-',
											{
												xtype : 'combo',
												id : 'findByType',
												name : 'findByType',
												editable : true,
												mode : 'local',
												// readOnly : true,
												triggerAction : 'all',
												emptyText : '按类别查询',
												// store : type_store,
												store : glut_constant_categorystore,
												hiddenName : 'type',
												valueField : 'type_value',
												displayField : 'text'
											},
											'-',
											{
												xtype : 'textfield',
												id : 'findByYear',
												name : 'findByYear',
												editable : true,
												mode : 'local',
												// readOnly : true,
												triggerAction : 'all',
												emptyText : '年份(例:2016)',
												// store : type_store,
												store : glut_constant_categorystore,
												hiddenName : 'type',
												valueField : 'year_value',
												displayField : 'text'
											},
											'-',
											{
												text : '查询',
												handler : function() {
													params1 = Ext.getCmp(
															'findByDpt')
															.getValue();
													params2 = Ext.getCmp(
															'findByType')
															.getValue();
													params3 = Ext.getCmp(
															'findByYear')
															.getValue();
													// alert(Ext.getCmp('findByDpt').getValue()
													// + ","
													// +
													// Ext.getCmp('findByType').getValue());
													// return;
													// alert(params1 + "," +
													// params2);
													// return;
													if (params1 == ''
															&& params2 == ''
															&& params3 == '') {
														Ext.Msg.alert('tips',
																'请选择查询关键字');
														return;
													}
													var url = '../sys_pro_cmt/userAction_pro_findSpecifiedProposals?';
													if (params1 != '') {
														url += 'keyWord_dpm='
																+ encodeURI(encodeURI(params1))
																+ '&';
													}
													if (params2 != '') {
														url += 'keyWord_category='
																+ encodeURI(encodeURI(params2))
																+ '&';
													}
													if (params3 != '') {
														url += 'keyWord_year='
																+ encodeURI(encodeURI(params3))
																+ '&';
													}
													// else if (params1 == ''
													// && params2 != '') {
													// // alert(params2);
													// ds.proxy
													// .setUrl('../sys_pro_cmt/userAction_pro_findSpecifiedProposals?keyWord_category='
													// +
													// encodeURI(encodeURI(params2)));
													// } else if (params1 != ''
													// && params2 == '') {
													// ds.proxy
													// .setUrl('../sys_pro_cmt/userAction_pro_findSpecifiedProposals?keyWord_dpm='
													// +
													// encodeURI(encodeURI(params1)));
													// } else {
													// ds.proxy
													// .setUrl('../sys_pro_cmt/userAction_pro_findSpecifiedProposals?keyWord_dpm='
													// +
													// encodeURI(encodeURI(params1))
													// + '&keyWord_category='
													// +
													// encodeURI(encodeURI(params2)));
													// }
													url = url.substring(0,
															url.length - 1);
													console.log(url);
													paramsCache[0] = params1;
													paramsCache[1] = params2;
													paramsCache[2] = params3;
													ds.proxy.setUrl(url);
													ds.reload();
												}
											},
											'-',
											{
												text : '导出',
												iconCls : 'icon-excel',
												handler : function() {
													params1 = paramsCache[0];
													params2 = paramsCache[1];
													params3 = paramsCache[2];

													var url = '../sys_pro_cmt/userAction_pro_exportSpecifiedProposals?';
													if (params1 != '') {
														url += 'keyWord_dpm='
																+ encodeURI(encodeURI(params1))
																+ '&';
													}
													if (params2 != '') {
														url += 'keyWord_category='
																+ encodeURI(encodeURI(params2))
																+ '&';
													}
													if (params3 != '') {
														url += 'keyWord_year='
																+ encodeURI(encodeURI(params3))
																+ '&';
													}
													url = url.substring(0,
															url.length - 1);
													console.log(url);
													Ext.Ajax
															.request({
																url : url,
																method : 'get',
																success : function(
																		response,
																		options) {
																	if (response.responseText
																			.indexOf("success:false") != -1) {
																		Ext.MessageBox
																				.alert(
																						'Tips',
																						'无数据');
																	} else {
																		window
																				.open(response.responseText);
																	}
																},
																failure : function(
																		response,
																		options) {
																	Ext.MessageBox
																			.alert(
																					'失败',
																					'请求超时或网络故障,错误编号：'
																							+ response.status);
																}
															});
												}
											},
											'-',
											new Ext.PagingToolbar(
													{
														pageSize : 10,
														store : ds,
														style : 'padding: 0 0 0 130',
														displayInfo : true,
														displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
														emptyMsg : "没有记录"
													}) ]
								}),
						// 表格底部分页工具栏（分页功能需要传start,limit参数到后台进行处理传回来才能实现）
						bbar : new Ext.PagingToolbar({
							pageSize : 10,
							store : ds,
							displayInfo : true,
							displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
							emptyMsg : "没有记录"
						})
					});
		});