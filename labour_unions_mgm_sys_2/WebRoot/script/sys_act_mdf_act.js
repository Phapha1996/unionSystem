var ds;
Ext.onReady(function() {

	Ext.QuickTips.init();// 浮动信息提示
	Ext.BLANK_IMAGE_URL = '../Ext/resources/images/default/s.gif';// 替换图片文件地址为本地

	
	createWin = function(rowIndex, columnIndex) {
		var sure = new Ext.Button({
			text : '确定',
			handler : function() {
					var notices = notice.getValue();
					ds.getAt(rowIndex).set('notes',notice.getValue());
					win.close();
			}
		});
		var close = new Ext.Button({
					text : '关闭',
					handler : function() {
						win.close();
					}

				});
		var notice = new Ext.form.TextArea({
					width : '80%',
					height : 'auto',
					id : 'notice',
					name : 'notice',
					grow : true,
					readOnly : false,
					fieldLabel : '注意事项'
				});
		var form = new Ext.form.FormPanel({
					frame : true,
//					url : '../sys_pro_dlg/userAction_pro_submitProposal',
					html : '<div id="msg" class="tipmsg"></div>',
					items : [notice],
					buttonAlign : 'center',
					buttons : [sure, close]
				});
		var win = new Ext.Window({
					title : '注意事项',
					resizable : false,
					width : '60%',
					shadow : false,
					height : 'auto',
					modal : false,
					maximizable : true,
					closable : true,
					items : form
				});
		notice.setValue(ds.getAt(rowIndex).get('notes'));
		win.show();
	}
	
	
	function Todate(v) {
		if (v == null || v == "null" || v=="") {
			return null;
		}else{
		var d = new Date();
		var str = v.toString();
		var str1 = str.replace("/Date(", "");
		var str2 = str1.replace(")/", "");
		var dd = parseInt(str2);
		d.setTime(dd);
		return d;
		}
	};
	
	function rendernull(value) {
		if (value == null || value=="null") {
		return null;
		} else {
		return  value;
		}
		};
		
		function renderwu(value) {
			if (value == null || value=="null") {
			return "无";
			} else {
			return  value;
			}
			};
	// 数据源
	ds = new Ext.data.Store({
				autoLoad : true,
				// proxy: new Ext.data.MemoryProxy(jsondata),
				proxy : new Ext.data.HttpProxy({
							url : '../sys_act/adminAction_act_findAllActivity',
							actionMethods : {
								read : 'POST'
							}
						}),
				// jsonreader的字段名称要与glut.db.bean中的类属性名一致，不要去匹配数据库字段
				reader : new Ext.data.JsonReader({
							totalProperty : 'totalProperty',
							root : 'root'
						}, [{
									name : 'id'
								}, {
									name : 'name'
								}, {
									name : 'object'
								}, {
									name : 'deadLine',
									type : "date",
									dateFormat : "Y-m-d",
									convert : Todate
								}, {
									name : 'activityTime',
									type : "date",
									dateFormat : "Y-m-d",
									convert : Todate,
								}, {
									name : 'actTime',	
									type : "date",
									dateFormat : "H:i:s",
									convert : Todate,
									
								}, {
									name : 'actCustomtime',
									convert : rendernull,
								}, {
									name : 'actLocation'
								}, {
									name : 'notes'
								}, {
									name : 'status'
								}, {
									name : 'populationLimit'
								}, {
									name : 'activityType'
								}, {
									name : 'populationCurrent'
								}, {
									name : 'activitySignUps'
								}, {
									name : 'template'
								}])
			});
	// 复选框列
	var sm = new Ext.grid.CheckboxSelectionModel();
	// 定义列
	var cm = new Ext.grid.ColumnModel({
			defaults : {
				sortable : true
			},
			columns : [
			new Ext.grid.RowNumberer(),// 添加自动行号
			sm,// 添加复选框
			{
				header : '序号',
				width : 40,
				dataIndex : 'id'
			}, {
				header : '活动名称',
				width : 40,
				dataIndex : 'name',
				id : 'blue1',	//可编辑的列标题栏变蓝色
				editor : new Ext.form.TextField({
							allowBlank : false
						})
			}, {
				header : '对象',
				width : 40,
				dataIndex : 'object',
				id : 'blue2',	//可编辑的列标题栏变蓝色
				editor : new Ext.form.TextField({
							allowBlank : false
						})
			}, {
				header : '报名截止时间',
				width : 40,
				dataIndex : 'deadLine',
				type : 'date',
				id : 'blue3',	//可编辑的列标题栏变蓝色
				renderer : Ext.util.Format.dateRenderer('Y-m-d'),
				editor : new Ext.form.DateField({
					format : 'Y-m-d',
					disabledDays : [0, 6],
					disabledDaysText : 'Plants are not available on the weekends'
				})
			}, {
				header : '活动日期',
				width : 40,
				dataIndex : 'activityTime',
				id : 'blue4',	//可编辑的列标题栏变蓝色
				renderer : Ext.util.Format.dateRenderer('Y-m-d'),
				//convert : datenull,
				editor : new Ext.form.DateField({
							format : 'Y-m-d'
						}),
			}, {
				header : '活动时间',
				width : 40,
				dataIndex : 'actTime',
				id : 'blue9',	//可编辑的列标题栏变蓝色
				renderer : Ext.util.Format.dateRenderer('H:i:s'),
				editor : new Ext.form.DateField({
							format : 'H:i:s'
						})
			}, {
				header : '自定义活动时间',
				width : 40,
				dataIndex : 'actCustomtime',
				id : 'blue10',	//可编辑的列标题栏变蓝色
				editor : new Ext.form.TextField({
				})
			},{
				header : '活动地点',
				width : 40,
				dataIndex : 'actLocation',
				sortable : true,
				id : 'blue11',	//可编辑的列标题栏变蓝色
				editor : new Ext.form.TextField({
					allowBlank : false
				}),
				renderer :  rendernull
			}, {
				header : '注意事项',
				width : 40,
				id : 'blue5',	//可编辑的列标题栏变蓝色
				dataIndex : 'notes'
			}, {
				header : '状态',
				width : 40,
				dataIndex : 'status',
				id : 'blue6',	//可编辑的列标题栏变蓝色
				editor : new Ext.form.ComboBox({
							triggerAction : 'all',
							lazyRender : true,
							editable : false,
							store : [['报名中', '报名中'], ['报名已结束', '报名已结束'],
									['无效', '无效']]
						})
			}, {
				header : '人数限制',
				width : 40,
				id : 'blue7',	//可编辑的列标题栏变蓝色
				dataIndex : 'populationLimit',
				editor : new Ext.form.NumberField({
							allowBlank : false,
							allowNegative : false,
							maxValue : 100000
						})
			}, {
				header : '活动类型',
				width : 40,
				id : 'blue8',	//可编辑的列标题栏变蓝色
				dataIndex : 'activityType',
				editor : new Ext.form.ComboBox({
							triggerAction : 'all',
							lazyRender : true,
							store : [['个人', '个人'], ['集体', '集体']],
							editable : false
						})
			}, {
				header : '当前参与人数',
				width : 40,
				dataIndex : 'populationCurrent'
			}, {
				header : '报名附件',
				width : 40,
				dataIndex : 'template',
				renderer :  renderwu
			}
			]
			});
	// 定义一个表格面板
	var grid = new Ext.grid.EditorGridPanel({
		id : 'mdf-act-grid',// 设置标识ID，方便以后引用！
		title : '查询和修改活动',// 标题
		renderTo : Ext.getBody(),// 显示表格的地方
		//点击2次即可编辑
		clicksToEdit : 2,
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
		
		listeners : {
			cellDblClick : function(grid, rowIndex, columnIndex, e) {
				var colCount = grid.colModel.config.length;
				if (columnIndex == colCount - 6) {
						createWin(rowIndex, columnIndex);
				}
			}
		},
		// 表格顶部动作或按钮工具栏
		
		tbar : new Ext.Toolbar({
			items : ['-', {
						xtype : 'textfield',
						id : 'keyWord',
						name : 'keyWord',
						emptyText : '输入活动名包含的字',
						width : 150
					}, {
						text : '查询活动',
						iconCls : 'icon-excel',
						handler : function() {

							params = encodeURI(Ext.getCmp('keyWord').getValue());
							if (params != '') {
								ds.proxy
										.setUrl('../sys_act/adminAction_act_findActivity?activityName='
												+ encodeURI(params));
								ds.reload();
							} else {
								Ext.Msg.alert('提示', '请输入关键字！');
							}
						}
					}, '-', {
						text : '删除勾选的活动',
						iconCls : 'icon-excel',
						handler : function() {
							var row = grid.getSelectionModel();
							for (var i = 0; i < grid.getView().getRows().length; i++) {
								if (row.isSelected(i))
									ds.getAt(i).set('status', '无效');
							}
							var storeData = new Array();
							ds.each(function(record) {
										storeData.push(record.data);
									})
							Ext.Ajax.request({
								url : '../sys_act/adminAction_act_updateActivity',
								method : 'POST',
								params : {
									// 编码后作为参数发送到后台
									activities : Ext.encode(storeData)
								},
								success : function(response, options) {
//									Ext.MessageBox.alert('提示', '操作成功 ');
									ds.reload();
								},
								failure : function(response, options) {
									Ext.MessageBox
											.alert('失败', '请求超时或网络故障,错误编号：'
															+ response.status);
								}
							});
						}
					}, '-', {
						text : '结束勾选的活动',
						iconCls : 'icon-excel',
						handler : function() {
							var row = grid.getSelectionModel();
							for (var i = 0; i < grid.getView().getRows().length; i++) {
								if (row.isSelected(i))
									ds.getAt(i).set('status', '报名已结束');
							}
							var storeData = new Array();
							ds.each(function(record) {
										storeData.push(record.data);
									})
							Ext.Ajax.request({
								url : '../sys_act/adminAction_act_updateActivity',
								method : 'POST',
								params : {
									// 编码后作为参数发送到后台
									activities : Ext.encode(storeData)
								},
								success : function(response, options) {
//									Ext.MessageBox.alert('提示', '操作成功 ');
									ds.reload();
								},
								failure : function(response, options) {
									Ext.MessageBox
											.alert('失败', '请求超时或网络故障,错误编号：'
															+ response.status);
								}
							});
						}
					}, '-', {
						text : '提交修改',
						iconCls : 'icon-excel',
						handler : function() {
							// 获取修改后的store值，存在storeData中
							var storeData = new Array();
							ds.each(function(record) {
										storeData.push(record.data);
									})
							Ext.Ajax.request({
								url : '../sys_act/adminAction_act_updateActivity',
								method : 'POST',
								params : {
									// 编码后作为参数发送到后台
									activities : Ext.encode(storeData)
								},
								success : function(response, options) {
//									Ext.MessageBox.alert('提示', '操作成功 ');
									ds.reload();
								},
								failure : function(response, options) {
									Ext.MessageBox
											.alert('失败', '请求超时或网络故障,错误编号：'
															+ response.status);
								}
							});
						}
					}, '-', new Ext.PagingToolbar({
								pageSize : 10,
								store : ds,
								style : 'padding: 0 0 0 535 ',
								displayInfo : true,
								displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
								emptyMsg : "没有记录"
							})]
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
})