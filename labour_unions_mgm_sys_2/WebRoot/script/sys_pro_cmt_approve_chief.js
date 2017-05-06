// JavaScript Document
Ext
		.onReady(function() {

			// 响应“查看提案”按钮事件
			createWin_viewPpl = function(rowIndex, columnIndex) {
				var close = new Ext.Button({
					text : '关闭',
					handler : function() {
						win.close();
					}

				});
				var title = new top.Ext.form.TextField({
					width : 120,
					autoHeight : true,
					id : 'title',
					name : 'title',
					readOnly : true,
					fieldLabel : '提案名称'
				});
				var submitterDpm = new top.Ext.form.TextField({
					width : 120,
					autoHeight : true,
					id : 'submitterDpm',
					name : 'submitterDpm',
					readOnly : true,
					fieldLabel : '单位'
				});
				var category = new top.Ext.form.TextField({
					width : 120,
					autoHeight : true,
					id : 'category',
					name : 'category',
					readOnly : true,
					fieldLabel : '提案类别'
				});
				var submitterName = new top.Ext.form.TextField({
					width : 120,
					autoHeight : true,
					id : 'submitterName',
					name : 'submitterName',
					readOnly : true,
					fieldLabel : '提案人姓名'
				});
				var supporter1 = new top.Ext.form.TextField({
					width : 120,
					autoHeight : true,
					id : 'supporter1',
					name : 'supporter1',
					readOnly : true,
					fieldLabel : '附议人姓名1'
				});
				var supporter2 = new top.Ext.form.TextField({
					width : 120,
					autoHeight : true,
					id : 'supporter2',
					name : 'supporter2',
					readOnly : true,
					fieldLabel : '附议人姓名2'
				});
				var submitterPhone = new top.Ext.form.TextField({
					width : 120,
					autoHeight : true,
					id : 'submitterPhone',
					name : 'submitterPhone',
					readOnly : true,
					fieldLabel : '电话'
				});
				var reason = new top.Ext.form.TextArea({
					width : '90%',
					height : 120,
					id : 'reason',
					name : 'reason',
					readOnly : true,
					fieldLabel : '案由'
				});
				var action = new top.Ext.form.TextArea({
					width : '90%',
					height : 120,
					id : 'action',
					name : 'action',
					readOnly : true,
					fieldLabel : '措施'
				});
				var form = new top.Ext.form.FormPanel({
					frame : true,
					autoScroll : true,
					html : '<div id="msg" class="tipmsg"></div>',
					items : [ submitterDpm, submitterName,
					/*
					 * supporter1, supporter2,
					 */
					{
						layout : 'column',
						items : [ {
							layout : 'form',
							width : 270,
							items : [ supporter1 ]
						}, {
							layout : 'form',
							width : 270,
							items : [ supporter2 ]
						} ]
					}, submitterPhone, category, title, reason, action ],
					buttonAlign : 'center',
					buttons : [ close ]
				});
				var win = new top.Ext.Window({
					title : '查看提案',
					resizable : true,
					layout : 'fit',
					width : 800,
					height : 500,
					modal : false,
					maximizable : true,
					closable : true,
					items : form
				});
				title.setValue(ds.getAt(rowIndex).get('title'));
				submitterDpm.setValue(ds.getAt(rowIndex).get('submitterDpm'));
				category.setValue(ds.getAt(rowIndex).get('category'));
				submitterName.setValue(ds.getAt(rowIndex).get('submitterName'));
				supporter1.setValue(ds.getAt(rowIndex).get('supporter1'));
				supporter2.setValue(ds.getAt(rowIndex).get('supporter2'));
				submitterPhone.setValue(ds.getAt(rowIndex)
						.get('submitterPhone'));
				reason.setValue(ds.getAt(rowIndex).get('reason'));
				action.setValue(ds.getAt(rowIndex).get('action'));
				win.show();
			}

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

			var createWin = function(rowIndex, columnIndex) {

				var sure = new Ext.Button(
						{
							text : '确定',
							handler : function() {
								if (form.getForm().isValid()) {
									ds.getAt(rowIndex).set('memo',
											memoArea.getValue());
									var storeData = new Array();
									storeData.push(ds.getAt(rowIndex).data);
									Ext.Ajax
											.request({
												url : '../sys_pro_cmt/userAction_pro_updateProposal?dpmLV=2',
												method : 'POST',
												params : {
													// 编码后作为参数发送到后台
													JSONProposals : Ext
															.encode(storeData)
												},
												success : function(response,
														options) {
													Ext.MessageBox.alert('提示',
															'操作成功 ');
													ds.reload();
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
									win.destroy();
								}
							}
						});
				var cancel = new Ext.Button({
					text : '取消',
					handler : function() {

					}

				});
				var memoArea = new Ext.form.TextArea({
					width : '80%',
					height : 160,
					id : 'memoArea',
					name : 'memoArea',
					allowBlank : false,
					fieldLabel : '建议或措施'
				});
				var form = new Ext.form.FormPanel({
					renderTo : Ext.getBody(),
					frame : true,
					url : '../sys_pro_cmt/userAction_pro_submitProposal',
					width : 800,
					html : '<div id="msg" class="tipmsg"></div>',
					height : '100%',
					items : [ memoArea ],
					buttons : [ sure, cancel ]
				});
				var win = new Ext.Window({
					title : '添加提案',
					resizable : false,
					shadow : true,
					modal : false,
					maximizable : true,
					closable : true,
					items : form
				});

				win.show();
			}

			// 主办单位下拉框
			var combo = new Ext.form.ComboBox({
				triggerAction : 'all',
				lazyRender : true,
				editable : false,
				listWidth : 200,
				store : glut_constant_unitstore
			});

			// 加载协办单位下拉框的数据源
			var data = glut_constant_datas;
			var proxy = new Ext.data.MemoryProxy(data);
			var columnName = new Ext.data.Record.create([ {
				name : "id",
				type : "int"
			}, {
				name : "name",
				type : "string"
			} ]);
			var reader = new Ext.data.ArrayReader({}, columnName);
			var store = new Ext.data.Store({
				proxy : proxy,
				reader : reader,
				autoLoad : true
			});
			store.load();

			// 协办单位下拉框
			var com = new Ext.form.MultiSelect({
				store : store,
				valueField : 'name',
				displayField : "name",
				mode : 'local',
				triggerAction : 'all',
				allowBlank : false,
				editable : false,
				listWidth : 200,
				maxHeight : 200
			// 下拉框的最大高度
			});

			// 数据源
			var ds = new Ext.data.Store(
					{
						autoLoad : true,
						// proxy: new Ext.data.MemoryProxy(jsondata),
						proxy : new Ext.data.HttpProxy(
								{
									// dpmLV:用于不同等级的部门追踪提案,如:教代会->提案委员会->相关部门->校长
									// 对应1->2->3->4
									url : '../sys_pro_cmt/userAction_pro_proposalTracing?dpmLV=2&trackWay=committeeChief'
								}),
						// jsonreader的字段名称要与glut.db.bean中的类属性名一致，不要去匹配数据库字段
						reader : new Ext.data.JsonReader({
							totalProperty : 'totalProperty',
							root : 'root'
						}, [ {
							name : 'id'
						}, {
							name : 'title'
						}, {
							name : 'submitterDpm'
						}, {
							name : 'category',
						}, {
							name : 'submitterName',
						}, {
							name : 'supporter1'
						}, {
							name : 'supporter2'
						}, {
							name : 'submitterPhone'
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
							name : 'memo'
						}, {
							name : 'responseLeader'
						}, {
							name : 'desc'
						} ])
					}); // 复选框列
			var sm = new Ext.grid.CheckboxSelectionModel();
			// 定义列
			var cm = new Ext.grid.ColumnModel(
					{
						defaults : {
							sortable : true
						},
						columns : [
								sm,
								{
									header : "操作",
									dataIndex : "operation",
									width : 80,
									renderer : function showbutton(value,
											cellmeta) {
										var returnStr = "<INPUT type='button' value='查看提案' onClick='myClick()'>";
										return returnStr;
									}
								},
								{
									header : "查看委员意见",
									dataIndex : "cmt_mb_adv",
									width : 110,
									renderer : function showbutton(value,
											cellmeta) {
										var returnStr = "<INPUT type='button' value='查看委员意见' onClick='myClick()'>";
										return returnStr;
									}
								},
								{
									header : '序号',
									width : 60,
									dataIndex : 'id'
								},
								{
									header : '提案名称',
									width : 100,
									dataIndex : 'title'
								},
								{
									header : '单位',
									width : 80,
									dataIndex : 'submitterDpm'
								},
								{
									header : '提案类别',
									width : 80,
									dataIndex : 'category'
								},
								{
									header : '提案人姓名',
									width : 80,
									dataIndex : 'submitterName'
								},
								{
									header : '附议人姓名1',
									width : 80,
									hidden : true,
									dataIndex : 'supporter1'
								},
								{
									header : '附议人姓名2',
									width : 80,
									hidden : true,
									dataIndex : 'supporter2'
								},
								{
									header : '电话',
									width : 90,
									hidden : true,
									dataIndex : 'submitterPhone'
								},
								{
									header : '案由',
									width : 90,
									hidden : true,
									dataIndex : 'reason'
								},
								{
									header : '措施',
									width : 90,
									hidden : true,
									dataIndex : 'action'
								},
								{
									header : '主办单位',
									width : 80,
									dataIndex : 'mainUnit',
									id : 'blue1', // 可编辑的列标题栏变蓝色
									editor : combo
								},
								{
									header : '协办单位',
									width : 80,
									dataIndex : 'assistantUnit',
									id : 'blue2', // 可编辑的列标题栏变蓝色
									editor : com
								},
								{
									header : '审批结果',
									width : 90,
									dataIndex : 'committeeAdv',
									id : 'blue3', // 可编辑的列标题栏变蓝色
									editor : new Ext.form.ComboBox({
										triggerAction : 'all',
										lazyRender : true,
										store : [
												[ '同意立案', '同意立案' ],
												[ '不同意立案', '不同意立案' ],
												[ '不同意立案，作为意见和建议处理',
														'不同意立案，作为意见和建议处理' ] ],
										editable : false
									})
								},
								{
									header : '分管校领导',
									width : 90,
									dataIndex : 'responseLeader',
									id : 'blue4', // 可编辑的列标题栏变蓝色
									editor : new Ext.form.ComboBox({
										triggerAction : 'all',
										lazyRender : true,
										editable : false,
										listWidth : 200,
										store : glut_constant_leaders
									})
								},
								{
									header : "操作",
									dataIndex : "operation",
									width : 80,
									renderer : function showbutton(value,
											cellmeta) {
										var returnStr = "<INPUT type='button' value='提交' onClick='myClick()'>";
										return returnStr;
									}
								} ]
					});
			// 分页控件
			var pager = new Ext.PagingToolbar({
				pageSize : 10,
				store : ds,
				displayInfo : true,
				displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
				emptyMsg : "没有记录"
			});
			// 设置所有列字段默认排序
			cm.defaultSortable = true;
			// 定义一个表格面板
			var grid = new Ext.grid.EditorGridPanel(
					{
						id : 'pro-track-grid',// 设置标识ID，方便以后引用！
						title : '审核提案',// 标题
						renderTo : Ext.getBody(),// 显示表格的地方
						sm : sm,// 复选框
						cm : cm,// 列模型
						ds : ds,// 数据源 //点击1次即可编辑
						clicksToEdit : 1,
						stripeRows : true,// 加上行条纹
						loadMask : true,// 加载数据时遮蔽表格
						border : true,// 加上边框
						frame : true,// 显示天蓝色圆角框
						autoHeight : true,// 自动设置高度，这个配置很重要
						width : '100%',
						x : 1,// 设置初始位置横坐标
						y : 1,// 设置初始位置纵坐标
						// enableDragDrop : true,//容许行的拖曳
						collapsible : true, // 面板可以折叠
						// titleCollapse : true,// 单击表头任何地方都可以折叠
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
						// UI视图配置
						viewConfig : {
							forceFit : true
						// 强制适应分布宽度
						},
						// 表格顶部动作或按钮工具栏
						// 表格底部分页工具栏（分页功能需要传start,limit参数到后台进行处理传回来才能实现）
						bbar : pager,
						listeners : {
							/*
							 * //点击某一行的任何位置的时候，该行的主办单位栏缺省显示下拉框 rowclick :
							 * function(grid, rowIndex, columnIndex){
							 * this.startEditing(rowIndex, 13); },
							 */
							cellClick : function(grid, rowIndex, columnIndex, e) {
								// 按钮的位置位于第17列，如果列数有调整需要把这个数值也调整，或者把按钮长期永远放在最后，用length-1来替代12.
								var colCount = grid.colModel.config.length;
								if (columnIndex == colCount - 16) {
									// alert(ds.getAt(rowIndex).get('id'));
									var ds_mb_adv = new Ext.data.Store(
											{
												// autoLoad : false,
												// proxy: new
												// Ext.data.MemoryProxy(jsondata),
												proxy : new Ext.data.HttpProxy(
														{
															url : '../sys_pro_cmt/userAction_pro_findCmtMbAdv?proId='
																	+ ds
																			.getAt(
																					rowIndex)
																			.get(
																					'id'),
															actionMethods : {
																read : 'POST'
															}
														}),
												// jsonreader的字段名称要与glut.db.bean中的类属性名一致，不要去匹配数据库字段
												reader : new Ext.data.JsonReader(
														{
															totalProperty : 'totalProperty',
															root : 'root'
														},
														[
																{
																	name : 'id'
																},
																{
																	name : 'cmt_mb_name'
																},
																{
																	name : 'cmt_mb_adv'
																},
																{
																	name : 'cmt_mb_adv_dpm_1st'
																},
																{
																	name : 'cmt_mb_adv_dpm_2nd'
																} ])
											});
									// 复选框列
									var sm_mb_adv = new Ext.grid.CheckboxSelectionModel();
									// 定义列
									var cm_mb_adv = new Ext.grid.ColumnModel(
											[
													new Ext.grid.RowNumberer(),// 添加自动行号
													sm,// 添加复选框
													{
														header : '序号',
														width : 140,
														dataIndex : 'id'
													},
													{
														header : '委员姓名',
														width : 140,
														dataIndex : 'cmt_mb_name'
													},
													{
														header : '委员意见',
														width : 140,
														dataIndex : 'cmt_mb_adv'
													},
													{
														header : '主办单位',
														width : 140,
														dataIndex : 'cmt_mb_adv_dpm_1st'
													},
													{
														header : '协办单位',
														width : 140,
														dataIndex : 'cmt_mb_adv_dpm_2nd'
													} ]);
									// 定义一个表格面板
									var grid_mb_adv = new Ext.grid.GridPanel({
										id : 'mdf-act-grid',// 设置标识ID，方便以后引用！
										title : '',// 标题
										// 点击1次即可编辑
										// renderTo : Ext.getBody(),
										sm : sm_mb_adv,// 复选框
										cm : cm_mb_adv,// 列模型
										ds : ds_mb_adv,
										width : 800,
										height : 300
									});
									var tempForm = new Ext.form.FormPanel({
										title : '',
										items : [ grid_mb_adv ]
									})
									var win_1 = new Ext.Window({
										title : '委员意见',
										width : 800,
										height : 300,
										resizable : true,
										modal : true,
										closable : true,
										buttonAlign : 'center',
										items : [ tempForm ]
									});
									ds_mb_adv.load();
									win_1.show();
								} else if (columnIndex == colCount - 1) {
									var adv = ds.getAt(rowIndex).get(
											'committeeAdv');
									if (adv == '') {
										Ext.Msg.alert("tips", "未选择审批结果!");
										return;
									} else if (adv == '同意立案') {
										if (ds.getAt(rowIndex).get('mainUnit') == ''
												| ds.getAt(rowIndex).get(
														'assistantUnit') == ''
												) {
											Ext.Msg.alert('tips',
													'请选择提案处理单位');
											return;
										}
										if (ds.getAt(rowIndex).get(
												'responseLeader') == '') {
											Ext.Msg.alert('tips',
													'请选择分管校领导');
											return;
										}
										var storeData = new Array();
										storeData.push(ds.getAt(rowIndex).data);
										Ext.Ajax
												.request({
													url : '../sys_pro_cmt/userAction_pro_updateProposal?dpmLV=2',
													method : 'POST',
													params : {
														// 编码后作为参数发送到后台
														JSONProposals : Ext
																.encode(storeData)
													},
													success : function(
															response, options) {
														Ext.MessageBox.alert(
																'提示', '操作成功 ');
														ds.reload();
													},
													failure : function(
															response, options) {
														Ext.MessageBox
																.alert(
																		'失败',
																		'请求超时或网络故障,错误编号：'
																				+ response.status);
													}
												});
									} else if (adv != '同意立案') {
										// alert(adv);
										// return;
										if (adv == '不同意立案，作为意见和建议处理') {
											createWin(rowIndex, columnIndex);
											return;
										}
										var storeData = new Array();
										storeData.push(ds.getAt(rowIndex).data);
										Ext.Ajax
												.request({
													url : '../sys_pro_cmt/userAction_pro_updateProposal?dpmLV=2',
													method : 'POST',
													params : {
														// 编码后作为参数发送到后台
														JSONProposals : Ext
																.encode(storeData)
													},
													success : function(
															response, options) {
														Ext.MessageBox.alert(
																'提示', '操作成功 ');
														ds.reload();
													},
													failure : function(
															response, options) {
														Ext.MessageBox
																.alert(
																		'失败',
																		'请求超时或网络故障,错误编号：'
																				+ response.status);
													}
												});
									}
									//查看提案
								} else if (columnIndex == colCount - 17) {
									createWin_viewPpl(rowIndex, columnIndex);
								}
							},
						/*//双击事件，弹窗
						cellDblClick : function(grid, rowIndex, columnIndex, e) {
							var colCount = grid.colModel.config.length;
							if (columnIndex == colCount - 12 || columnIndex == colCount - 5 || columnIndex == colCount - 4) {
									createWin_View(rowIndex, columnIndex);
							}
						}*/
						}
					});
		});
