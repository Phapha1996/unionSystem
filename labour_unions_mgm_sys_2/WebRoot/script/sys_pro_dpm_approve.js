Ext.onReady(function() {
	
	//响应“查看提案”按钮事件
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
	   var submitDate = new top.Ext.form.TimeField({
		   width : 120,
		   autoHeight : true,
		   id : 'submitDate',
		   name : 'submitDate',
		   readOnly : true,
		   hideTrigger : true,
		   format : 'Y-m-d',
		   fieldLabel : '提交日期'
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
		var memo = new top.Ext.form.TextArea({
			width : '80%',
			autoHeight : true,
			id : 'memo',
			name : 'memo',
			readOnly : true,
			fieldLabel : '备注'
		});
		var comment = new top.Ext.form.TextArea({
			width : '80%',
			autoHeight : true,
			id : 'comment',
			name : 'comment',
			readOnly : true,
			fieldLabel : '评价'
		});
		var feedback = new top.Ext.form.TextArea({
			width : '80%',
			autoHeight : true,
			id : 'feedback',
			name : 'feedback',
			readOnly : true,
			fieldLabel : '反馈'
		});
		var mainUnit = new top.Ext.form.TextField({
			width : 120,
			autoHeight : true,
			id : 'mainUnit',
			name : 'mainUnit',
			readOnly : true,
			fieldLabel : '主办单位'
		});
		var assistantUnit = new top.Ext.form.TextField({
			autoWidth:true,
			autoHeight : true,
			id : 'assistantUnit',
			name : 'assistantUnit',
			readOnly : true,
			grow : true,
			fieldLabel : '协办单位'
		});
		var form = new top.Ext.form.FormPanel({
					frame : true,
					autoScroll:true,
					html : '<div id="msg" class="tipmsg"></div>',
					items : [
					         submitterDpm,
					         submitterName,
					         /*supporter1,
					         supporter2,*/
					         {
						            layout: 'column',
						            items: [{
						                layout: 'form',
						                width : 270,
						                items: [supporter1]
						            }, {
						            	layout: 'form',
						            	width : 270,
						                items: [supporter2]
						            }]
						        }, 
					         submitterPhone,
					         category,
					         /*mainUnit,
					         assistantUnit,*/
					         {
						            layout: 'column',
						            items: [{
						                layout: 'form',
						                width : 270,
						                items: [mainUnit]
						            }, {
						            	layout: 'form',
						            	autoWidth:true,
						                items: [assistantUnit]
						            }]
						        }, 
					         title,
					         submitDate,
					         action,
					         reason
					         ],
					buttonAlign : 'center',
					buttons : [close]
				});
		var win = new top.Ext.Window({
					title : '查看提案',
					resizable : true,
					layout:'fit',
					width : 800,
					height:500,
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
		submitterPhone.setValue(ds.getAt(rowIndex).get('submitterPhone'));
		reason.setValue(ds.getAt(rowIndex).get('reason'));
		action.setValue(ds.getAt(rowIndex).get('action'));
		submitDate.setValue(ds.getAt(rowIndex).get('submitDate'));
		memo.setValue(ds.getAt(rowIndex).get('memo'));
		comment.setValue(ds.getAt(rowIndex).get('comment'));
		feedback.setValue(ds.getAt(rowIndex).get('feedback'));
		mainUnit.setValue(ds.getAt(rowIndex).get('mainUnit'));
		assistantUnit.setValue(ds.getAt(rowIndex).get('assistantUnit'));
		win.show();
	}


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

	var createWin = function(rowIndex, columnIndex) {

		var sure = new top.Ext.Button({
			text : '确定',
			handler : function() {
				if (form.getForm().isValid()) {
					// var storeData = new Array();
					// storeData.push(ds.getAt(rowIndex).data);
					// alert(ds.getAt(rowIndex).get('id'));
					Ext.Ajax.request({
								url : '../sys_pro_dpm/userAction_pro_reply?dpmLV=3',
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
					width : '80%',
					height : 120,
					id : 'chartingRecord',
					name : 'chartingRecord',
					readOnly : true,
					fieldLabel : '回复记录'
				});
		
		var changeopinion = new top.Ext.form.TextArea({
			width : '80%',
			height : 120,
			id : 'changeopinion',
			name : 'changeopinion',
			readOnly : true,
			fieldLabel : '领导修改意见'
		});
		
		var replyArea = new top.Ext.form.TextArea({
					width : '80%',
					height : 160,
					id : 'replyArea',
					name : 'replyArea',
					allowBlank : false,
					fieldLabel : '<font color="#0000FF">回复内容(待审核)</font>'
				});
		var form = new top.Ext.form.FormPanel({
					//renderTo : Ext.getBody(),
					frame : true,
					autoScroll:true,
					url : '../sys_pro_dpm/userAction_pro_submitProposal',
					width : 800,
					html : '<div id="msg" class="tipmsg"></div>',
					height : '100%',
					items : [chartingRecord,changeopinion,replyArea],
					buttonAlign : 'center',
					buttons : [sure, close]
				});
		var win = new top.Ext.Window({
					title : '回复办理内容',
					resizable : true,
					layout:'fit',
					width : 800,
					height: 500,
					modal : false,
					maximizable : true,
					closable : true,
					items : form
				});
		// 未通过审核的回复会这样显示: (该回复未通过,请修改)+回复内容
		replyArea.setValue(ds.getAt(rowIndex).get('dpmReply'));
		changeopinion.setValue(ds.getAt(rowIndex).get('ldOpinion'));
		chartingRecord.setValue(ds.getAt(rowIndex).get('replyContent'));
		win.show();
	}
	// 数据源
	var ds = new Ext.data.Store({
		autoLoad : true,
		// proxy: new Ext.data.MemoryProxy(jsondata),
		proxy : new Ext.data.HttpProxy({
			// dpmLV:用于不同等级的部门追踪提案,如:教代会->提案委员会->相关部门->校长
			// 对应1->2->3->4
			url : '../sys_pro_dpm/userAction_pro_proposalTracing?dpmLV=3&trackWay=relevantDpm&keyWord_dpm='
					+ encodeURI(encodeURI(dpm_consult))
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
							name : 'ldOpinion'
						}, {
							name : 'ldOpinionFlag'
						}, {
							name : 'dlgReplyFlag'
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
						}])
	}); // 复选框列
	var sm = new Ext.grid.CheckboxSelectionModel();

	// 定义列
	var cm = new Ext.grid.ColumnModel({
		defaults : {
			sortable : true
		},
		columns : [
				new Ext.grid.RowNumberer(),// 添加自动行号
				sm, {
					header : "查看",
					dataIndex : "view",
					width : 70,
					renderer : function showbutton(value, cellmeta) {
						var returnStr = "<INPUT type='button' value='查看提案' onClick='myClick()'>";
						return returnStr;
					}
				}, {
					header : '序号',
					width : 40,
					dataIndex : 'id'
				}, {
					header : '提案人姓名',
					width : 80,
					dataIndex : 'submitterName'
				}, {
					header : '提案单位',
					width : 100,
					dataIndex : 'submitterDpm'
				}, {
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
					hidden : true,
					dataIndex : 'reason'
				}, {
					header : '提案措施和建议',
					width : 80,
					hidden : true,
					dataIndex : 'action'
				}, {
					header : '提案委员会审批意见',
					width : 80,
					dataIndex : 'committeeAdv'
				}, {
					header : '进展情况',
					width : 90,
					dataIndex : 'progress',
					id : 'blue1',
					editor : new Ext.form.ComboBox({
								triggerAction : 'all',
								lazyRender : true,
								editable : false,
								store : [['正在办理', '正在办理'], ['完成办理', '完成办理']]
							})
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
				}, {
					header : '提交',
					width : 90,
					dataIndex : 'operation',
					renderer : function showbutton(value, cellmeta) {
						var returnStr = "<INPUT type='button' value='提交' onClick='myClick()'>";
						return returnStr;
					}
				}, {
					header : '回复办理内容',
					width : 90,
					dataIndex : 'replyContent',
					renderer : function showbutton(value, cellmeta, record, rowIdx, colIdx, store, view) {
						var returnStr = "<INPUT type='button' value='回复' style='color:blue' onClick='myClick()'>";
						if (store.getAt(rowIdx).get('ldOpinionFlag') == 'new_reply' 
							| store.getAt(rowIdx).get('dlgReplyFlag') == 'new_reply') {
							returnStr = "<INPUT type='button' value='回复'  style='color:blue;background:url(../img/newtip.png) no-repeat right top' onClick='myClick()'>";
							}
						return returnStr;
					}
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
		id : 'pro-grid',// 设置标识ID，方便以后引用！
		title : '提案信息',// 标题
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
//		floating : true,// 设置浮动，能否拖动成功就靠它了,注意设置浮动后它就置顶了
		// 实现拖曳效果，参考官方文档
		draggable : {
			insertProxy : false,
			onDrag : function(e) {
				var pel = this.proxy.getEl();
				this.x = pel.getLeft(true);
				this.y = pel.getTop(true);
				var s = this.panel.getEl().shadow;// 拖曳中消除原位置的阴影
				if (s) {
					s.realign(this.x, this.y, pel.getWidth(), pel.getHeight());
				}
			},
			endDrag : function(e) {// 拖曳结束后保存位置效果
				this.panel.setPosition(this.x, this.y);
			}
		},
		// 表格顶部动作或按钮工具栏
		// 表格底部分页工具栏（分页功能需要传start,limit参数到后台进行处理传回来才能实现）
		bbar : pager,
		listeners : {
			/*//点击某一行的任何位置的时候，该行的“进展情况”栏缺省显示下拉框
			rowclick : function(grid, rowIndex, columnIndex){
				this.startEditing(rowIndex, 15);
			  },*/
			cellClick : function(grid, rowIndex, columnIndex, e) {
				// alert(columnIndex);
				// return;
				var colCount = grid.colModel.config.length;
				if (columnIndex == colCount - 1) {
					// 弹出回复窗口
					createWin(rowIndex, columnIndex);
				} else if (columnIndex == colCount - 2) {
					var storeData = new Array();
					storeData.push(ds.getAt(rowIndex).data);
					Ext.Ajax.request({
						url : '../sys_pro_dpm/userAction_pro_updateProposal?dpmLV=3',
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
				}//查看提案按钮
				if(columnIndex == colCount - 21){
					createWin_viewPpl(rowIndex, columnIndex);
				}
			},
			/*//双击事件，弹窗
			cellDblClick : function(grid, rowIndex, columnIndex, e) {
				var colCount = grid.colModel.config.length;
				if (columnIndex == colCount - 10 || columnIndex == colCount - 9 || columnIndex == colCount - 8) {
						createWin_View(rowIndex, columnIndex);
				}
			}*/
		}

	});

});