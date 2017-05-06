// JavaScript Document
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
					         title,
					         reason,
					         action
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
		win.show();
	}
	
	//主办单位下拉框
	var combo = new Ext.form.ComboBox({
		triggerAction : 'all',
		//lazyRender : true,
		editable : false,
		listWidth:200,
		typeAhead:true,
		store : glut_constant_unitstore
	});
	
	//加载协办单位下拉框的数据源
	var data = glut_constant_datas;
    var proxy = new Ext.data.MemoryProxy(data);
    var columnName = new Ext.data.Record.create([
	    { name: "id", type: "int" },
	    { name: "name", type: "string" }
	]);
    var reader = new Ext.data.ArrayReader({}, columnName);
    var store = new Ext.data.Store({
        proxy: proxy,
        reader: reader,
        autoLoad: true
    });
    store.load();

	//协办单位下拉框
	var com =  new Ext.form.MultiSelect({ 
		 store: store,
         valueField: 'name',
         displayField: "name",
         mode: 'local',
         triggerAction: 'all',
         allowBlank: false,
         editable:false,
         listWidth:200,
         maxHeight: 200 //下拉框的最大高度
	});
	
	// 数据源
	var ds = new Ext.data.Store({
		autoLoad : true,
		// proxy: new Ext.data.MemoryProxy(jsondata),
		proxy : new Ext.data.HttpProxy({
			// dpmLV:用于不同等级的部门追踪提案,如:教代会->提案委员会->相关部门->校长
			// 对应1->2->3->4
			url : '../sys_pro_cmt/userAction_pro_proposalTracing?dpmLV=2&trackWay=committeeMb&account='
					+ mbID_pro
		}),
		// jsonreader的字段名称要与glut.db.bean中的类属性名一致，不要去匹配数据库字段
		reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'root'
				}, [{
							name : 'id'
						}, {
							name : 'title'
						}, {
							name : 'submitterDpm'
						}, {
							name : 'category'
						}, {
							name : 'submitterName'
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
							name : 'desc'
						}])
	}); 
	// 复选框列
	var sm = new Ext.grid.CheckboxSelectionModel();
	// 定义列
	var cm = new Ext.grid.ColumnModel({
			defaults : {
				sortable : true
			},
		columns : [sm, {
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
				},{
					header : '提案名称',
					width : 100,
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
					dataIndex : 'submitterName'
				}, {
					header : '附议人姓名1',
					width : 80,
					hidden : true,
					dataIndex : 'supporter1'
				}, {
					header : '附议人姓名2',
					width : 80,
					hidden : true,
					dataIndex : 'supporter2'
				}, {
					header : '电话',
					width : 90,
					hidden : true,
					dataIndex : 'submitterPhone'
				}, {
					header : '案由',
					width : 90,
					hidden : true,
					dataIndex : 'reason'
				}, {
					header : '措施',
					width : 90,
					hidden : true,
					dataIndex : 'action'
				}, {
					header : '主办单位',
					width : 60,
					dataIndex : 'mainUnit',
					id : 'blue1',	//可编辑的列标题栏变蓝色
				/*	editor : new Ext.grid.GridEditor(
						new Ext.form.field.ComboBox({
							mode:'local',
							editable:false,
							triggerAction:'all',
							store:glut_constant_unitstore
						})
					)*/
					editor: combo
					/*renderer : function showbutton(value, cellmeta) {
						var returnStr = "<INPUT type='box' onClick='myClick()'>";
						return returnStr;
					}*/
				}, {
					header : '协办单位',
					width : 60,
					dataIndex : 'assistantUnit',
					id : 'blue2',	//可编辑的列标题栏变蓝色
					editor : com
				}, {
					header : '审批结果',
					width : 90,
					dataIndex : 'committeeAdv',
					id : 'blue3',	//可编辑的列标题栏变蓝色
					editor : new Ext.form.ComboBox({
								triggerAction : 'all',
								lazyRender : true,
								store : [['同意立案', '同意立案'], ['不同意立案', '不同意立案'],
										['不同意立案，作为意见和建议处理', '不同意立案，作为意见和建议处理']],
								editable : false
							})
				}, {
					header : "操作",
					dataIndex : "button",
					width : 70,
					renderer : function showbutton(value, cellmeta) {
						var returnStr = "<INPUT type='button' value='提交' onClick='myClick()'>";
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
		// id : 'pro-track-grid',// 设置标识ID，方便以后引用！
		title : '阅办提案',// 标题
		renderTo : 'pro_approval_grid',// 显示表格的地方
		sm : sm,// 复选框
		cm : cm,// 列模型
		ds : ds,// 数据源 
		clicksToEdit : 1,//点击1次即可编辑
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
		// UI视图配置
		viewConfig : {
			forceFit : true
			// 强制适应分布宽度
		},
		// 表格底部分页工具栏（分页功能需要传start,limit参数到后台进行处理传回来才能实现）
		bbar : pager,
		listeners : {
			//点击某一行的任何位置的时候，该行的主办单位栏缺省显示下拉框
//			rowclick : function(grid, rowIndex, columnIndex){
//				this.startEditing(rowIndex, 12);
//			  },
			cellClick : function(grid, rowIndex, columnIndex, e) {
				// 获取列的数量
				var colCount = grid.colModel.config.length;
				
				//提交按钮功能
				if (columnIndex == colCount - 1) {
					/* alert(ds.getAt(rowIndex).get('id'));
					 alert(mbID_pro);
					 return;*/
					var data = ds.getAt(rowIndex);
					/* if (data.get('committeeAdv') != '') {
					 Ext.Msg.alert("tips", "请不要重复审批");
					 return;
					 }*/
					if (data.get('committeeAdv') == '') {
						Ext.Msg.alert("tips", "未选择审批结果!");
						return;
					}
					if (data.get('committeeAdv') == '同意立案') {
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
					}
					var storeData = new Array();
					storeData.push(ds.getAt(rowIndex).data);

					// alert(ds.getAt(rowIndex).get('id'));
					Ext.Ajax.request({
						url : '../sys_pro_cmt/userAction_pro_approveProposalCommon',
						method : 'POST',
						params : {
							// 编码后作为参数发送到后台
							// JSONProposals : Ext.encode(storeData)
							proId : data.get('id'),
							account : mbID_pro,
							advice : data.get('committeeAdv'),
							mainUnit : data.get('mainUnit'),
							assistantUnit : data.get('assistantUnit')
						},
						success : function(response, options) {
							Ext.Msg.alert('提示', '操作成功 ');
							ds.reload();
						},
						failure : function(response, options) {
							Ext.Msg.alert('失败', '请求超时或网络故障,错误编号：'
											+ response.status);
						}
					});
				}
				
				//查看提案按钮
				if(columnIndex == colCount - 15){
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
			
			//渲染之后
			activate : function(){
//				this.startEditing(0, 13);
				/*combo.on('load',function(){
					grid.startEditting(0,13);
				})*/
				
			}
		}
	});
});
