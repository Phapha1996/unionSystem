// JavaScript Document
Ext
		.onReady(function() {

			Ext.QuickTips.init();// 浮动信息提
			Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";

			// 响应双击事件
			createWin = function(rowIndex, columnIndex) {
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
					readOnly : true,
					fieldLabel : '注意事项'
				});
				var form = new Ext.form.FormPanel({
					frame : true,
					html : '<div id="msg" class="tipmsg"></div>',
					items : [ notice ],
					buttonAlign : 'center',
					buttons : [ close ]
				});
				var win = new Ext.Window({
					title : '注意事项',
					resizable : false,
					width : '60%',
					shadow : true,
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
				}
				var d = new Date();
				var str = v.toString();
				var str1 = str.replace("/Date(", "");
				var str2 = str1.replace(")/", "");
				var dd = parseInt(str2);
				d.setTime(dd);
				return d;
			};
			
			function rendernull(value) {
				if (value == null || value=="null") {
				return "";
				} else {
				return  value;
				}
				};
				
			var ds = new Ext.data.Store({
				autoLoad : true,
				// proxy: new Ext.data.MemoryProxy(jsondata),
				proxy : new Ext.data.HttpProxy({
					url : "../sys_act/userAction_act_getResults?account="
							+ account
				}),
				// jsonreader的字段名称要与glut.db.bean中的类属性名一致，不要去匹配数据库字段
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'root'
				}, [ {
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
					convert : Todate
				}, {
					name : 'actTime',	
					type : "date",
					dateFormat : "H:i:s",
					convert : Todate
				}, {
					name : 'actCustomtime',
					convert : rendernull
				}, {
					name : 'actLocation'
				}, {
					name : 'notes'
				}, {
					name : 'status'
				}, {
					name : 'populationCurrent'
				}, {
					name : 'populationLimit'
				}, {
					name : 'activityType'
				}, {
					name : 'result'
				}, {
					name : 'desc'
				} ])
			})

			// 定义复选框
			var sm = new Ext.grid.CheckboxSelectionModel();

			var pager = new Ext.PagingToolbar({
				pageSize : 10,
				store : ds,
				style : 'padding: 0 0 0 535 ',
				displayInfo : true,
				displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
				emptyMsg : "没有记录"
			});
			var cm = new Ext.grid.ColumnModel({
				defaults : {
					sortable : true
				},
				columns : [ sm, {
					header : '序号',
					width : 60,
					dataIndex : 'id',
					sortable : true
				}, {
					header : '活动名称',
					width : 90,
					dataIndex : 'name'
				}, {
					header : '对象',
					width : 80,
					dataIndex : 'object'
				}, {
					header : '报名截止时间',
					width : 100,
					dataIndex : 'deadLine',
					renderer : Ext.util.Format.dateRenderer('Y-m-d')
				}, {
					header : '活动日期',
					width : 100,
					dataIndex : 'activityTime',
					renderer : Ext.util.Format.dateRenderer('Y-m-d')
				}, {
					header : '活动时间',
					width : 100,
					dataIndex : 'actTime',
					renderer : Ext.util.Format.dateRenderer('H:i:s')
				}, {
					header : '自定义活动时间',
					width : 100,
					dataIndex : 'actCustomtime',
					renderer :  rendernull
				}, {
					header : '活动地点',
					width : 100,
					dataIndex : 'actLocation',
					sortable : true,
					renderer :  rendernull
				}, {
					header : '注意事项',
					width : 180,
					dataIndex : 'notes',
					sortable : true
				}, {
					header : '状态',
					width : 60,
					dataIndex : 'status',
					sortable : true
				}, {
					header : '报名人数',
					width : 70,
					dataIndex : 'populationCurrent',
					sortable : true
				}, {
					header : '最大人数',
					width : 70,
					dataIndex : 'populationLimit',
					sortable : true
				}, {
					header : '活动类型',
					width : 100,
					dataIndex : 'activityType',
					sortable : true
				}, {
					header : '结果',
					width : 150,
					dataIndex : 'result'
				} ]
			});
			// 定义一个表格面板
			var grid = new Ext.grid.GridPanel(
					{
						id : 'apply_act',
						title : '活动报名结果',// 标题
						renderTo : 'apply_activity_grid',// 显示表格的地方
						ds : ds,
						sm : sm,
						cm : cm,
						autoHeight : true,// 自动设置高度，这个配置很重要
						width : '100%',
						x : 1,// 设置初始位置横坐标
						y : 1,// 设置初始位置纵坐标
						// UI视图配置
						viewConfig : {
							forceFit : true
						// 强制适应分布宽度
						},
						listeners : {
							// 双击事件，弹窗
							cellDblClick : function(grid, rowIndex,
									columnIndex, e) {
								var colCount = grid.colModel.config.length;
								if (columnIndex == colCount - 6) {
									createWin(rowIndex, columnIndex);
								}
							}
						},

						tbar : new Ext.Toolbar(
								{
									items : [
											'-',
											{
												xtype : 'combo',
												id : 'findByStatus',
												name : 'findByStatus',
												mode : 'local',
												readOnly : true,
												triggerAction : 'all',
												editable : true,
												emptyText : '是否包含无效活动',
												store : [ [ '0', '包含无效活动' ],
														[ '1', '不包含无效活动' ] ],// 0显示无效活动，1不显示无效活动
												hiddenName : 'status',
												valueField : 'status_value',
												displayField : 'text'
											},
											'-',
											{
												xtype : 'textfield',
												id : 'findByName',
												name : 'findByName',
												emptyText : '输入活动名包含的字',
												width : 150
											},
											{
												text : '查询',
												handler : function() {
													status = encodeURI(Ext.getCmp('findByStatus').getValue());
													name = encodeURI(Ext.getCmp('findByName').getValue());

													if (status == ''&& name == '') {
														Ext.Msg.alert('tips','请选择查询关键字');
														return;
													} else if (status == ''&& name != '') {
														ds.proxy.setUrl('../sys_act/userAction_act_getSpecifiedResults?'
																		+ 'account='+account
																		+'&keyWord_name=' + encodeURI(name));
														ds.reload();
													} else if (status != ''&& name == '') {
														ds.proxy.setUrl('../sys_act/userAction_act_getSpecifiedResults?'
																		+ 'account='+account
																		+'&keyWord_status='+ status);
														ds.reload();
													} else {
														ds.proxy.setUrl('../sys_act/userAction_act_getSpecifiedResults?'
																		+ 'account='+account
																		+ '&keyWord_status='+ status
																		+ '&keyWord_name='+ encodeURI(name));
														ds.reload();
													}
												}
											} ]
								}),

						bbar : pager
					});
		});
