var roleMap = {
	key1 : '工会管理员',
	key2 : '工会会员',
	key3 : '提案代表',
	key4 : '分会管理员',
	key5 : '提案委员',
	key6 : '提案委员会主席',
	key7 : '提案办理部门',
	key8 : '分管校领导'
};
Ext
		.onReady(function() {
			Ext.QuickTips.init();// 浮动信息提示
			Ext.BLANK_IMAGE_URL = '../Ext/resources/images/default/s.gif';// 替换图片文件地址为本地

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
			var createWin = function(rowIndex, columnIndex, rowData) {
				// var rowData = grid.getStore().getAt(0);
				var account = rowData.get('number');
				var name_roles = rowData.get('name');
				Ext.Ajax
						.request({
							url : '../sys_mb/adminAction_mb_findRolesByAccount',
							method : 'POST',
							params : {
								account : account
							},
							success : function(response, options) {
								// for (var prop in roleMap) {
								// if (roleMap.hasOwnProperty(prop)) {
								// alert(prop + "," + roleMap[prop]);
								// }
								// }
								var returnMsg = response.responseText;
								var roleArr = returnMsg.split(",");
								var roleNames = "";
								if (returnMsg.length > 2) {
									for (var i = 0; i < roleArr.length; i++) {
										roleNames += roleMap["key"
												+ parseInt(roleArr[i])]
												+ ",";
									}
								}
								var close_win = new Ext.Button({
									text : '关闭',
									handler : function() {
										win_1.close();
									}
								})
								// var sure1 = new Ext.Button(
								// {
								// text : '确定',
								// handler : function() {
								// var param = "";
								// for (var i = 0; i <
								// myCheckboxGroup.items.length; i++) {
								// if (myCheckboxGroup.items
								// .itemAt(i).checked) {
								// param += myCheckboxGroup.items
								// .itemAt(i).name
								// + ",";
								// }
								// }
								// form_1
								// .getForm()
								// .submit(
								// {
								// url :
								// "../sys_mb/adminAction_mb_rolesModification?account="
								// + account
								// + "&roles="
								// + param,
								// // waitTitle
								// // : '请稍后',
								// // waitMsg :
								// // '正在上传文档文件
								// // ...',
								// success : function(
								// form,
								// response) {
								//
								// // Ext.get("msg").dom.innerHTML
								// // =
								// // "成功";
								// Ext.Msg
								// .alert(
								// '提示',
								// '角色修改成功！');
								// // win_1.close();
								// // ds.reload();
								//
								// },
								// failure : function() {
								// Ext
								// .get("msg").dom.innerHTML = "失败，请与管理员联系";
								// }
								// });
								// }
								// });
								// var reset_1 = new Ext.Button({
								// text : '重置',
								// handler : function() {
								// form_1.getForm().reset();
								// }
								// });
								// var myCheckboxGroup = new
								// Ext.form.CheckboxGroup({
								// id : 'myGroup',
								// xtype : 'checkboxgroup',
								// fieldLabel : '请选择角色',
								// itemCls : 'x-check-group-alt',
								// columns : 4,
								// items : [{
								// boxLabel : '管理员',
								// name : '1'
								// }, {
								// boxLabel : '会员',
								// name : '2'
								// }, {
								// boxLabel : '提案代表',
								// name : '3'
								// }, {
								// boxLabel : '分会管理员',
								// name : '4'
								// }, {
								// boxLabel : '提案委员',
								// name : '5'
								// }, {
								// boxLabel : '提案负责人',
								// name : '6'
								// }, {
								// boxLabel : '提案组织',
								// name : '7'
								// }, {
								// boxLabel : '校长',
								// name : '8'
								// }]
								// });

								// --------------add by
								// xu------------------------//
								function add_roles(value, cellmeta, record,
										rowIndex, columnIndex, store) {
									var str = "<input type='button' value='添加权限'>";
									return str;
								}

								function delete_roles(value, cellmeta, record,
										rowIndex, columnIndex, store) {
									var str = "<input type='button' value='删除权限'>";
									return str;
								}

								var cm = new Ext.grid.ColumnModel([ {
									header : '权限名',
									width : 120,
									dataIndex : 'roles',
									renderer : marks
								}, {
									header : '添加权限',
									width : 70,
									dataIndex : 'add_roles',
									renderer : add_roles
								}, {
									header : '删除权限',
									width : 70,
									dataIndex : 'delete_roles',
									renderer : delete_roles
								} ]);

								// 按要求渲染权限标志的函数
								function marks(value) {
									if (roleNames.indexOf(value) > -1) {
										return value
												+ "<img src='../img/mb_roles_marks.jpg'>";
									} else {
										return value;
									}
								}

								var data = [ [ '工会管理员' ], [ '工会会员' ], [ '提案代表' ],
										[ '分会管理员' ], [ '提案委员' ], [ '提案委员会主席' ],
										[ '提案办理部门' ], [ '分管校领导' ] ];
								var ds_roles = new Ext.data.Store({
									proxy : new Ext.data.MemoryProxy(data),
									reader : new Ext.data.ArrayReader({}, [ {
										name : 'roles'
									}, {
										name : 'add_roles'
									}, {
										name : 'delete_roles'
									} ])
								});
								ds_roles.load();

								var form_1 = new Ext.grid.GridPanel(
										{
											// renderTo : Ext.getBody(),
											frame : true,
											width : '100%',
											autoHeight : true,// 自动设置高度，这个配置很重要
											id : 'apply_form',
											name : 'apply_form',
											store : ds_roles,
											cm : cm,
											// items : [myCheckboxGroup],
											buttons : [ close_win ],
											listeners : {
												cellClick : function(grid,
														rowIndex, columnIndex,
														e) {
													// alert(rowIndex + ","
													// + columnIndex);
													if (columnIndex == 1) {
														for (var i = 0; i < roleArr.length; i++) {
															if (rowIndex + 1 == roleArr[i]) {
																// alert(rowIndex
																// + "xxxxx");
																Ext.Msg
																		.alert(
																				'提示',
																				'已存在该权限');
																return;
															}
														}
														Ext.Ajax
																.request({
																	url : "../sys_mb/adminAction_mb_rolesModification",
																	method : 'POST',
																	params : {
																		account : account,
																		roles : rowIndex + 1,
																		way : 'add'
																	},
																	success : function(
																			response,
																			options) {
																		// Ext.Msg.alert('Tips',
																		// '添加成功');
																		win_1
																				.destroy();
																		createWin(
																				rowIndex,
																				columnIndex,
																				rowData);
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
													} else if (columnIndex == 2) {
														var i = 0;
														for (i = 0; i < roleArr.length; i++) {
															if (rowIndex + 1 == roleArr[i]) {
																// alert(rowIndex
																// + "xxxxx");
																break;
															}
														}
														if (i >= roleArr.length) {
															Ext.Msg
																	.alert(
																			'提示',
																			'无该权限,无法删除');
															return;
														}
														Ext.Ajax
																.request({
																	url : "../sys_mb/adminAction_mb_rolesModification",
																	method : 'POST',
																	params : {
																		account : account,
																		roles : rowIndex + 1,
																		way : 'delete'
																	},
																	success : function(
																			response,
																			options) {
																		// Ext.Msg.alert('Tips',
																		// '删除成功');
																		win_1
																				.destroy();
																		createWin(
																				rowIndex,
																				columnIndex,
																				rowData);
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
												}
											}
										});

								var win_1 = new Ext.Window({
									/*title : '修改 ' + name_roles + ' 的会员权限,'
											+ '原权限:' + roleNames,
											delete by yattie*/
									title: '修改 ' + name_roles + ' 的会员权限',
									width : '50%',
									y:2,
									resizable : true,
									modal : true,
									closable : true,
									buttonAlign : 'center',
									items : [ form_1 ]
								});
								win_1.show();
								// ---------add by xu------------//
								for (var i = 0; i < roleArr.length; i++) {
									for (var j = 0; j < cm.items.length; j++) {
										if (parseInt(roleArr[i]) == cm.items
												.itemAt(j)) {
											cm.column(3).setdisable(false);
										}
									}
								}
								// for (var i = 0; i < roleArr.length; i++) {
								// for (var j = 0; j <
								// myCheckboxGroup.items.length;
								// j++) {
								// if (parseInt(roleArr[i]) ==
								// myCheckboxGroup.items
								// .itemAt(j).name) {
								// myCheckboxGroup.items.itemAt(j)
								// .setValue(true);
								// }
								// }
								// }
							},
							failure : function(response, options) {
								Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：'
										+ response.status);
							}
						});
			}

			// 定义数据源为远程代理和JSON数据格式
			var ds = new Ext.data.Store({
				// proxy: new Ext.data.MemoryProxy(jsondata),
				proxy : new Ext.data.HttpProxy({
					url : '../sys_mb/adminAction_mb_sendData2Client'
				}),
				// jsonreader的字段名称要与glut.db.bean中的类属性名一致，不要去匹配数据库字段
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'root'
				}, [ {
					name : 'roles'
				}, {
					name : 'number'
				}, {
					name : 'name'
				}, {
					name : 'idCard'
				}, {
					name : 'employType'
				}, {
					name : 'joinCondition'
				}, {
					name : 'dpmBrief'
				}, {
					name : 'subUnion'
				},{
					name : 'dpmDetail'
				}, {
					name : 'duty'
				}, {
					name : 'takeOfferDate',
					type : "date",
					dateFormat : "Y-m-d",
					convert : Todate
				}, {
					name : 'level'
				}, {
					name : 'reachLevelDate',
					type : "date",
					dateFormat : "Y-m-d",
					convert : Todate
				}, {
					name : 'native_'
				}, {
					name : 'sex'
				}, {
					name : 'nationality'
				}, {
					name : 'birthday',
					type : 'date',
					dateformat : 'Y-m-d',
					convert : Todate
				}, {
					name : 'topEducation'
				}, {
					name : 'topDegree'
				}, {
					name : 'politics'
				}, {
					name : 'joinDate',
					type : "date",
					dateFormat : "Y-m-d",
					convert : Todate
				}, {
					name : 'workDate',
					type : "date",
					dateFormat : "Y-m-d",
					convert : Todate
				}, {
					name : 'title'
				}, {
					name : 'titleLevel'
				}, {
					name : 'firstEmpJob'
				}, {
					name : 'firstEmpJobType'
				}, {
					name : 'graduateSch'
				}, {
					name : 'topEduDate',
					type : "date",
					dateFormat : "Y-m-d",
					convert : Todate
				}, {
					name : 'topDegreeDate',
					type : "date",
					dateFormat : "Y-m-d",
					convert : Todate
				}, {
					name : 'major'
				}, {
					name : 'subject'
				}, {
					name : "joinSchDate",
					type : "date",
					dateFormat : "Y-m-d",
					convert : Todate
				} ])
			});
			// 加载首页数据，每页显示10条记录
			// 不查询，直接导出 by Yang
			/*
			 * ds.load({ params : { start : 0, limit : 10 } });
			 */

			// 定义复选框
			var sm = new Ext.grid.CheckboxSelectionModel();
			function renderDescn(value, cellmeta, record, rowIndex,
					columnIndex, store) {
				var str = "<input type='button' value='修改权限'>";
				return str;
			}
			// 定义列模型
			var cm = new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer(),// 添加自动行号
			sm,// 添加复选框
			{
				header : '权限角色',// 2
				width : 40,
				dataIndex : 'roles',
				renderer : renderDescn
			}, {
				header : '编号', // 3
				width : 40,
				dataIndex : 'number'
			}, {
				header : '姓名', // 4
				width : 40,
				dataIndex : 'name'
			}, {
				header : '新身份证号码', // 5
				width : 40,
				dataIndex : 'idCard'
			}, {
				header : '聘用形式', // 6
				width : 40,
				dataIndex : 'employType'
			}, {
				header : '入编情况', // 7
				width : 40,
				dataIndex : 'joinCondition'
			}, {
				header : '部门（简）',// 8
				width : 40,
				dataIndex : 'dpmBrief'
			}, {
				header : '分工会',// 8+1
				width : 40,
				dataIndex : 'subUnion'
			},{
				header : '部门（详）',// 9
				width : 40,
				dataIndex : 'dpmDetail'
			}, {
				header : '职务',// 10
				width : 40,
				dataIndex : 'duty'
			}, {
				header : '任职时间',// 11
				width : 40,
				dataIndex : 'takeOfferDate',
				type : 'date',
				renderer : Ext.util.Format.dateRenderer('Y-m-d')
			}, {
				header : '级别',// 12
				width : 40,
				dataIndex : 'level'
			}, {
				header : '定级时间',// 13
				width : 40,
				dataIndex : 'reachLevelDate',
				type : 'date',
				renderer : Ext.util.Format.dateRenderer('Y-m-d')
			}, {
				header : '籍贯',// 14
				width : 40,
				dataIndex : 'native_'
			}, {
				header : '性别',// 15
				width : 40,
				dataIndex : 'sex',
				renderer : changeSex
			}, {
				header : '民族',// 16
				width : 40,
				dataIndex : 'nationality'
			}, {
				header : '出生日期',// 17
				width : 40,
				dataIndex : 'birthday',
				type : 'date',
				renderer : Ext.util.Format.dateRenderer('Y-m-d')
			}, {
				header : '最高学历',// 18
				width : 40,
				dataIndex : 'topEducation'
			}, {
				header : '最高学位',// 19
				width : 40,
				dataIndex : 'topDegree'
			}, {
				header : '党派',// 20
				width : 40,
				dataIndex : 'politics'
			}, {
				header : '加入时间',// 21
				width : 40,
				dataIndex : 'joinDate',
				type : 'date',
				renderer : Ext.util.Format.dateRenderer('Y-m-d')
			}, {
				header : '工作时间',// 22
				width : 40,
				dataIndex : 'workDate',
				type : 'date',
				renderer : Ext.util.Format.dateRenderer('Y-m-d')
			}, {
				header : '职称',// 23
				width : 40,
				dataIndex : 'title'
			}, {
				header : '职称级别',// 24
				width : 40,
				dataIndex : 'titleLevel'
			}, {
				header : '首次聘用岗位',// 25
				width : 40,
				dataIndex : 'firstEmpJob'
			}, {
				header : '首次聘用岗位的类别',// 26
				width : 40,
				dataIndex : 'firstEmpJobType'
			}, {
				header : '毕业学校',// 27
				width : 40,
				dataIndex : 'graduateSch'
			}, {
				header : '最高学历时间',// 28
				width : 40,
				dataIndex : 'topEduDate',
				type : 'date',
				renderer : Ext.util.Format.dateRenderer('Y-m-d')
			}, {
				header : '最高学位时间',// 29
				width : 40,
				dataIndex : 'topDegreeDate',
				type : 'date',
				renderer : Ext.util.Format.dateRenderer('Y-m-d')
			}, {
				header : '所学专业',// 30
				width : 40,
				dataIndex : 'major'
			}, {
				header : '学科',// 31
				width : 40,
				dataIndex : 'subject'
			}, {
				header : '来校时间',// 32
				dataIndex : 'joinSchDate',
				type : 'date',
				renderer : Ext.util.Format.dateRenderer('Y-m-d')
			// 格式化日期
			} ]);
			// 设置默认隐藏列
			cm.setHidden(5, true);
			cm.setHidden(6, true);
			cm.setHidden(7, true);
			//增加一列：分工会
			var ind=1;
			cm.setHidden(9+ind, true);
			cm.setHidden(11+ind, true);
			cm.setHidden(12+ind, true);
			cm.setHidden(13+ind, true);
			cm.setHidden(16+ind, true);
			cm.setHidden(17+ind, true);
			cm.setHidden(18+ind, true);
			cm.setHidden(19+ind, true);
			cm.setHidden(20+ind, true);
			cm.setHidden(21+ind, true);
			cm.setHidden(22+ind, true);
			cm.setHidden(25+ind, true);
			cm.setHidden(26+ind, true);
			cm.setHidden(27+ind, true);
			cm.setHidden(28+ind, true);
			cm.setHidden(29+ind, true);
			cm.setHidden(30+ind, true);
			cm.setHidden(31+ind, true);
			cm.setHidden(32+ind, true);
			// 设置所有列字段默认排序
			cm.defaultSortable = true;
			// 按要求渲染性别的函数
			function changeSex(value) {
				if (value == '男') {
					return "<span style='color:red;font-weight:bold;'>男</span>";
				} else {
					return "<span style='color:green;font-weight:bold;'>女</span>";
				}
			}

			// 定义一个表格面板
			var grid = new Ext.grid.EditorGridPanel(
					{
						id : 'member-grid',// 设置标识ID，方便以后引用！
						title : '会员信息管理',// 标题
						renderTo : Ext.getBody(),// 显示表格的地方
						// 点击1次即可编辑
						clicksToEdit : 1,
						sm : sm,// 复选框
						cm : cm,// 列模型
						ds : ds,// 数据源
						stripeRows : true,// 加上行条纹
						loadMask : true,// 加载数据时遮蔽表格
						border : true,// 加上边框
						frame : true,// 显示天蓝色圆角框
						autoHeight : true,// 自动设置高度，这个配置很重要
						width : '100%',
						//x : 1,// 设置初始位置横坐标
						//y : 1,// 设置初始位置纵坐标
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
						tbar : new Ext.Toolbar(
								{
									items : [
											'-',
											{
												xtype : 'textfield',
												id : 'keyWord',
												name : 'keyWord',
												emptyText : '输入员工号或会员名包含的字',
												width : 180
											},
											{
												text : '查询',
												handler : function() {
													params = encodeURI(Ext
															.getCmp('keyWord')
															.getValue());
													if (params != '') {
														ds.proxy
																.setUrl('../sys_mb/adminAction_mb_findMemberInfoByKeyWord?keyWord='
																		+ encodeURI(params));
														ds.reload();
													} else {
														Ext.get("msg").dom.innerHTML = "请输入正确的关键字";
													}
												}
											} ]
								}),
						listeners : {
							cellClick : function(grid, rowIndex, columnIndex, e) {
								//修改权限按钮点击事件
								if (columnIndex == 2) {

									// alert(rowData.get('number'));
									createWin(rowIndex, columnIndex, grid
											.getStore().getAt(rowIndex));
								}

							}
						},
						// 表格底部分页工具栏（分页功能需要传start,limit参数到后台进行处理传回来才能实现）
						bbar : new Ext.PagingToolbar({
							pageSize : 10,
							store : ds,
							displayInfo : true,
							displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
							emptyMsg : "没有记录",
							onFirstLayout : function(){//增加这个配置
				                if(this.dsLoaded){
				                    this.onLoad.apply(this, this.dsLoaded);
				                }
				                if(this.rendered && this.refresh){
				                    this.refresh.hide();
				                }
				            }
						})
					});
		})