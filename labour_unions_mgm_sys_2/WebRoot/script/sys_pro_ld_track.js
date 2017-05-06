Ext
		.onReady(function() {
			Ext.QuickTips.init();// 浮动信息提示
			Ext.BLANK_IMAGE_URL = '../Ext/resources/images/default/s.gif';// 替换图片文件地址为本地

			
			//响应双击事件
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
							items : [titles,reason,action],
							buttonAlign : 'center',
							buttons : [close]
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
			};
			
			
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
				//
				proxy : new Ext.data.HttpProxy({
					url : '../sys_pro_leader/userAction_pro_findAllProposals'
				}),
				// jsonreader的字段名称要与glut.db.bean中的类属性名一致，不要去匹配数据库字段
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'root'
				}, [ {
					name : 'id'
				}, {
					name : 'replyContent'
				}, {
					name : 'submitterName'
				}, {
					name : 'submitterDpm'
				}, {
					name : 'submitDate',
					type : "date",
					dateFormat : "Y-m-d",
					convert : Todate
				}, {
					name : 'submitterPhone'
				}, {
					name : 'supporter1'
				}, {
					name : 'supporter2'
				}, {
					name : 'category'
				}, {
					name : 'sponsor'
				}, {
					name : 'title'
				}, {
					name : 'reason'
				}, {
					name : 'action'
				}, {
					name : 'committeeAdv'
				}, {
					name : 'progress'
				}, {
					name : 'memo'
				}, {
					name : 'dpmReply'
				}, {
					name : 'nextUnit'
				}, {
					name : 'comment'
				}, {
					name : 'feedback'
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
			var sm = new Ext.grid.CheckboxSelectionModel();
			// 定义列模型
			var cm = new Ext.grid.ColumnModel({
				defaults : {
					sortable : true
				},
					columns : [
							new Ext.grid.RowNumberer(),// 添加自动行号
							sm,
							{
								header : '编号',
								width : 80,
								dataIndex : 'id'
							},
							{
								header : "操作",
								dataIndex : "button",
								width : 120,
								renderer : function showbutton(value, cellmeta) {
									var returnStr = "<INPUT type='button' value='导出案表' onClick='myClick()'>";
									return returnStr;
								}
							},
							{
								header : '提案人姓名',
								width : 80,
								dataIndex : 'submitterName'
							},
							{
								header : '提案单位',
								width : 100,
								dataIndex : 'submitterDpm'
							},
							{
								header : '提交日期',
								width : 80,
								dataIndex : 'submitDate',
								type : 'date',
								renderer : Ext.util.Format
										.dateRenderer('Y-m-d')
							}, {
								header : '提案人电话',
								width : 80,
								hidden : true,
								dataIndex : 'submitterPhone'
							}, {
								header : '附议人姓名',
								width : 80,
								hidden : true,
								dataIndex : 'supporter1'
							}, {
								header : '附议人姓名',
								width : 80,
								hidden : true,
								dataIndex : 'supporter2'
							}, {
								header : '提案类别',
								width : 100,
								dataIndex : 'category'
							}, {
								header : '提案标题',
								width : 80,
								dataIndex : 'title'
							}, {
								header : '提案缘由',
								width : 80,
								dataIndex : 'reason'
							}, {
								header : '提案措施和建议',
								width : 80,
								dataIndex : 'action'
							}, {
								header : '提案委员会审批意见',
								width : 80,
								dataIndex : 'committeeAdv'
							}, {
								header : '进展情况',
								width : 90,
								dataIndex : 'progress',
							}, {
								header : '备注',
								width : 90,
								hidden : true,
								dataIndex : 'memo'
							}, {
								header : '评价',
								width : 90,
								hidden : true,
								dataIndex : 'comment'
							}, {
								header : '反馈',
								width : 90,
								hidden : true,
								dataIndex : 'feedback'
							}, {
								header : '主办单位',
								width : 90,
								dataIndex : 'mainUnit'
							}, {
								header : '协办单位',
								width : 90,
								hidden : true,
								dataIndex : 'assistantUnit'
							}
					]
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
						id : 'pro-grid',// 设置标识ID，方便以后引用！
						title : '提案查询与导出',// 标题
						renderTo : Ext.get('pro_trock_grid'),// 显示表格的地方
						sm : sm,// 复选框
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
						// 导出按钮监听
						listeners : {
							cellClick : function(grid, rowIndex, columnIndex, e) {
								var colCount = grid.colModel.config.length;
								if (columnIndex == colCount - 18) {
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
							//双击事件，弹窗
							cellDblClick : function(grid, rowIndex, columnIndex, e) {
								var colCount = grid.colModel.config.length;
								if (columnIndex == colCount - 10 || columnIndex == colCount - 9 || columnIndex == colCount - 8) {
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
/*												xtype : 'textfield',
												id : 'ppsTitle',
												name : 'ppsTitle',
												editable : true,
												emptyText : '按标题查询'*/
												xtype : 'textfield',
												id : 'ppsTitle',
												name : 'ppsTitle',
												mode : 'local',
												// readOnly : true,
												triggerAction : 'all',
												editable : true,
												emptyText : '按题目查询',
												hiddenName : 'title',
												valueField : 'title_value',
												displayField : 'text'
											},
											'-',
											{
												text : '查询',
												handler : function() {
													var keyword = Ext.getCmp(
															'ppsTitle')
															.getValue();
													if (keyword == '') {
														Ext.Msg.alert('tips',
																'请选择查询关键字');
														return;
													} else {
														ds.proxy
																.setUrl('../sys_pro_leader/userAction_pro_findProposal4Leader?keyWord_dpm='
																		+ encodeURI(encodeURI(keyword)));
													}
													ds.reload();
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