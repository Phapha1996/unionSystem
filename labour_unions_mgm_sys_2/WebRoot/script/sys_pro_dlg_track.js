// JavaScript Document
var action_function = function() {

	// 创建数据源[数组数据源]
	var combostore = new Ext.data.ArrayStore({
				fields : ['id', 'name'],
				data : [[1, '非常满意'], [2, '满意'], [3, '不满意']]
			});
	var evaluation = new Ext.form.ComboBox({
				fieldLabel : '满意度评价',
				id : 'replyContent',
				name : 'replyContent',
				store : combostore,
				displayField : 'name',
				valueField : 'id',
				triggerAction : 'all',
				emptyText : '请选择...',
				editable : false,
				mode : 'local'
			});
	// 创建panel
	var form2 = new Ext.Panel({
				frame : true,
				width : 700,
				height : 300
				,

			});
	// 创建数据显示模板
	var template = new Ext.XTemplate('<table  id="template">',
			'<tr><td>编号:</td><td>{id}</td></tr>',
			'<tr><td>提案名称:</td><td>{title}</td></tr>',
			'<tr><td>答复:</td><td>{replyContent}</td></tr>',
			'<tr><td>反馈:</td><td>{feedback}</td></tr>', '</table>');
	// 获取数据
	Ext.Ajax.request({
				url : '.......',
				method : 'post',
				params : {
					id : 1
				},
				success : function(response, options) {
					for (i in options) {
						alert('options参数名称:' + i);
						alert('options参数[' + i + ']的值：' + options[i]);
					}
					var responseJson = Ext.util.JSON
							.decode(response.responseText);
					template.compile();
					template.overwrite(panel.body, responseJson);
				}
				,

			});
	var feedback = new Ext.form.TextArea({
				width : '80%',
				height : 65,
				id : 'feedback',
				name : 'feedback',
				fieldLabel : '反馈'
			});

	var sure = new Ext.Button({
				text : '确定',
				handler : function() {
					if (form.getForm().isValid()) {
						form.getForm().submit({
									// waitTitle : '请稍后',
									// waitMsg : '正在上传文档文件 ...',
									success : function(form, response) {
										Ext.get("msg").dom.innerHTML = "成功";
									},
									failure : function() {
										Ext.get("msg").dom.innerHTML = "失败，请与管理员联系";
									}
								});
					}
				}
			});
	var reset = new Ext.Button({
				text : '取消',
				handler : function() {
					// form.getForm().reset();
				}

			});
	var form = new Ext.form.FormPanel({
				frame : true,
				labelWidth : 70,
				width : 700,
				height : 500,
				buttonAlign : 'center',
				items : [form2, feedback, evaluation],
				buttons : [sure, reset]
			});
	// 创建窗体
	var win = new Ext.Window({
				title : '详细',
				id : 'particular',
				name : 'particular',
				width : 718,
				height : 535,
				resizable : true,
				modal : true,
				closable : true,
				maximizable : true,
				items : [form]
			});
	win.show();
}
Ext.onReady(function() {
	// 初始化标签中的Ext:Qtip属性。
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
	
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
		
		var form = new Ext.form.FormPanel({
					frame : true,
					html : '<div id="msg" class="tipmsg"></div>',
					items : [titles],
					buttonAlign : 'center',
					buttons : [close]
				});
		var win = new Ext.Window({
					title : '查看',
					resizable : false,
					width : '60%',
					shadow : true,
					height : 'auto',
					modal : false,
					maximizable : true,
					closable : true,
					items : form
				});
		titles.setValue(ds.getAt(rowIndex).get('title'));
		
		win.show();
	}
	
	
	var createWin = function(rowIndex, columnIndex) {
		var sure = new top.Ext.Button({
			text : '确定',
			handler : function() {
				if (form.getForm().isValid()) {
					// var storeData = new Array();
					// storeData.push(ds.getAt(rowIndex).data);
					// alert(ds.getAt(rowIndex).get('id'));
					Ext.Ajax.request({
								url : '../sys_pro_dlg/userAction_pro_reply?dpmLV=1',
								method : 'POST',
								params : {
									// 编码后作为参数发送到后台
									replyContent : replyArea.getValue(),
									proId : ds.getAt(rowIndex).get('id')
								},
								success : function(response, options) {
									Ext.MessageBox.alert('提示', '操作成功 ');
									win.destroy();
									ds.load();
									// createWin(rowIndex, columnIndex);
								},
								failure : function(response, options) {
									Ext.MessageBox
											.alert('失败', '请求超时或网络故障,错误编号：'
															+ response.status);
								}
							});
					// win.destroy();
				}
			}
		});
		var close = new top.Ext.Button({
					text : '关闭',
					handler : function() {
						win.close();
					}

				});
		var chartingRecord = new top.Ext.form.TextArea({
					width : '90%',
					height : 240,
					id : 'chartingRecord',
					name : 'chartingRecord',
					readOnly : true,
					fieldLabel : '回复记录'
				});
		var replyArea = new top.Ext.form.TextArea({
					width : '90%',
					height : 220,
					id : 'replyArea',
					name : 'replyArea',
					allowBlank : false,
					fieldLabel : '回复内容'
				});
		var form = new top.Ext.form.FormPanel({
					frame : true,
					scrollable: true,
					url : '../sys_pro_dlg/userAction_pro_submitProposal',
					html : '<div id="msg" class="tipmsg"></div>',
					items : [chartingRecord, replyArea],
					buttonAlign : 'center',
					buttons : [sure, close]
				});
		var win = new top.Ext.Window({
					title : '答复办理内容',
					resizable : false,
					width : '80%',
					shadow : true,
					height : 550,
					modal : false,
					maximizable : true,
					closable : true,
					items : form
				});
		chartingRecord.setValue(ds.getAt(rowIndex).get('replyContent'));
		win.show();
	}

	var createWin_comment = function(rowIndex, columnIndex) {
		var sure = new Ext.Button({
			text : '确定',
			handler : function() {
				if (form.getForm().isValid()) {
					ds.getAt(rowIndex).set('comment', cb.getValue());
					var storeData = new Array();
					storeData.push(ds.getAt(rowIndex).data);
					Ext.Ajax.request({
						url : '../sys_pro_dlg/userAction_pro_updateProposal?dpmLV=1',
						method : 'POST',
						params : {
							// 编码后作为参数发送到后台
							JSONProposals : Ext.encode(storeData)
						},
						success : function(response, options) {
							Ext.MessageBox.alert('提示', '操作成功 ');
							ds.reload();
						},
						failure : function(response, options) {
							Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：'
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
		var cb = new Ext.form.ComboBox({
					triggerAction : 'all',
					lazyRender : true,
					fieldLabel : '请选择满意度',
					editable : false,
					store : [['非常满意', '非常满意'], ['满意', '满意'], ['不满意', '不满意']]
				})
		var form = new Ext.form.FormPanel({
					frame : true,
					items : [cb],
					buttonAlign : 'center',
					buttons : [sure, cancel]
				});
		var win = new Ext.Window({
					title : '满意度评价',
					resizable : false,
					width : '30%',
					shadow : true,
					height : '30%',
					modal : false,
					maximizable : true,
					closable : true,
					items : form
				});
		win.show();
	}
	// 数据源
	var ds = new Ext.data.Store({
				autoLoad : true,
				// proxy: new Ext.data.MemoryProxy(jsondata),
				proxy : new Ext.data.HttpProxy({
							// dpmLV:用于不同等级的部门追踪提案,如:教代会->提案委员会->相关部门->校长
							// 对应1->2->3->4
							url : '../sys_pro_dlg/userAction_pro_proposalTracing?trackWay=delegate&name='
									+ encodeURI(mbName_pro)
						}),
				// jsonreader的字段名称要与glut.db.bean中的类属性名一致，不要去匹配数据库字段
				reader : new Ext.data.JsonReader({
							totalProperty : 'totalProperty',
							root : 'root'
						}, [{
									name : 'id'
								}, {
									name : 'replyContent'
								}, {
									name : 'dlgReplyFlag'
								}, {
									name : 'title'
								}, {
									name : 'submitterDpm'
								}, {
									name : 'category'
									,
								}, {
									name : 'submitterName'
									,
								}, {
									name : 'supporter1'
								}, {
									name : 'supporter2'
								}, {
									name : 'committeeAdv'
								}, {
									name : 'mainUnit'
								}, {
									name : 'assistantUnit'
								}, {
									name : 'progress'
								}, {
									name : 'memo'
								}, {
									name : 'comment'
								}, {
									name : 'desc'
								}])
			}); // 复选框列
	var sm = new Ext.grid.CheckboxSelectionModel();
	function detail(value, cellmeta, record, rowIndex, columnIndex, store) {
		return '<a href="yourURL" onclick="action_function()" >详细</a>';
	}
	// 定义列
	var cm = new Ext.grid.ColumnModel({
		defaults : {
			sortable : true
		},
		columns : [sm, {
					header : '序号',
					width : 40,
					dataIndex : 'id'
				}, {
					header : '答复办理内容',
					width : 90,
					dataIndex : 'replyContent',
					renderer : function showbutton(value, cellmeta, record, rowIdx, colIdx, store, view) {
						var returnStr = "<INPUT type='button' value='提案答复' style='color:blue' onClick='myClick()'>";
						if (store.getAt(rowIdx).get('dlgReplyFlag') == 'new_passed_reply') {
							returnStr = "<INPUT type='button' value='提案答复' style='color:blue;background:url(../img/newtip.png) no-repeat right top' onClick='myClick()'>";
							}
						return returnStr;
					}
				}, {
					header : '提案名称',
					width : 100,
					//id : 'blue1',
					dataIndex : 'title'
				}, {
					header : '单位',
					width : 80,
					dataIndex : 'submitterDpm'
				}, {
					header : '提案类别',
					width : 80,
					dataIndex : 'category'
				}, {
					header : '提案人姓名',
					width : 80,
					hidden : true,
					dataIndex : 'submitterName'
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
					header : '提案委员会意见',
					width : 80,
					dataIndex : 'committeeAdv'
				}, {
					header : '主办单位',
					width : 60,
					dataIndex : 'mainUnit',
				}, {
					header : '协办单位',
					width : 60,
					dataIndex : 'assistantUnit',
				}, {
					header : '进展情况',
					width : 90,
					dataIndex : 'progress'
				}, {
					header : '评价',
					width : 90,
					dataIndex : 'comment',
					id : 'blue1'
					// editor : new Ext.form.ComboBox({
				// triggerAction : 'all',
				// lazyRender : true,
				// editable : false,
				// store : [['非常满意', '非常满意'], ['满意', '满意'], ['不满意', '不满意']]
				// })
			}	, {
					header : '备注',
					width : 90,
					dataIndex : 'memo'
				}]
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
	var grid = new Ext.grid.EditorGridPanel({
				id : 'pro-track-grid',// 设置标识ID，方便以后引用！
				title : '提案跟踪',// 标题
				renderTo : Ext.getBody(),// 显示表格的地方
				sm : sm,// 复选框
				cm : cm,// 列模型
				ds : ds,// 数据源
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
//				floating : true,// 设置浮动，能否拖动成功就靠它了,注意设置浮动后它就置顶了
				// 实现拖曳效果，参考官方文档
				draggable : {
					insertProxy : false,
					onDrag : function(e) {
						var pel = this.proxy.getEl();
						this.x = pel.getLeft(true);
						this.y = pel.getTop(true);
						var s = this.panel.getEl().shadow;// 拖曳中消除原位置的阴影
						if (s) {
							s.realign(this.x, this.y, pel.getWidth(), pel
											.getHeight());
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
					cellClick : function(grid, rowIndex, columnIndex, e) {
						var colCount = grid.colModel.config.length;
						if (columnIndex == colCount - 13) {
							if (ds.getAt(rowIndex).get('replyContent') != '') {
								createWin(rowIndex, columnIndex);
							} else {
								parent.Ext.Msg.alert("tips", "无回复内容");
							}
						} else if (columnIndex == colCount - 2) {
							if (ds.getAt(rowIndex).get('committeeAdv') == '同意立案') {
								createWin_comment(rowIndex, columnIndex);
							} else {
								parent.Ext.Msg.alert("tips", "无回复内容");
							}
						}
					},
					//双击事件，弹窗
					cellDblClick : function(grid, rowIndex, columnIndex, e) {
						var colCount = grid.colModel.config.length;
						if (columnIndex == colCount - 12) {
								createWin_View(rowIndex, columnIndex);
						}
					}
				}

			});
});
