Ext.onReady(function() {
	Ext.QuickTips.init();// 浮动信息提示
	Ext.BLANK_IMAGE_URL = '../Ext/resources/images/default/s.gif';// 替换图片文件地址为本地

	
	//响应双击事件
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
					items : [notice],
					buttonAlign : 'center',
					buttons : [close]
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
		
	function renderwu(value) {
		if (value == null || value=="null") {
		return "无";
		} else {
		return  value;
		}
		};	

	// 定义数据源为远程代理和JSON数据格式
	var ds = new Ext.data.Store({
				autoLoad : true,
				// proxy: new Ext.data.MemoryProxy(jsondata),
				proxy : new Ext.data.HttpProxy({
							url : '../sys_act/adminAction_act_findAllFinishedActivity'
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
									name : 'populationLimit'
								}, {
									name : 'activityType'
								}, {
									name : 'populationCurrent'
								}, {
									name : 'desc'
								}])
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
			sm,// 添加复选框
			{
				header : '活动序号',
				width : 40,
				dataIndex : 'id'
			}, {
				header : "操作",
				dataIndex : "button",
				width : 40,
				renderer : function showbutton(value, cellmeta) {
					var returnStr = "<INPUT type='button' value='导出该活动' onClick='myClick()'>";
					return returnStr;
				}
			}, {
				header : '活动名称',
				width : 40,
				dataIndex : 'name'
			}, {
				header : '对象',
				width : 40,
				dataIndex : 'object'
			}, {
				header : '报名截止时间',
				width : 40,
				dataIndex : 'deadLine',
				type : 'date',
				renderer : Ext.util.Format.dateRenderer('Y-m-d')
			}, {
				header : '活动日期',
				width : 40,
				dataIndex : 'activityTime',
				type : 'date',
				renderer : Ext.util.Format.dateRenderer('Y-m-d')
			}, {
				header : '活动时间',
				width : 40,
				dataIndex : 'actTime',
				renderer : Ext.util.Format.dateRenderer('H:i:s')
			}, {
				header : '自定义活动时间',
				width : 100,
				dataIndex : 'actCustomtime',
				renderer :  rendernull
			}, {
				header : '活动地点',
				width : 40,
				dataIndex : 'actLocation',
				sortable : true,
				renderer :  rendernull
			}, {
				header : '注意事项',
				width : 40,
				dataIndex : 'notes'
			}, {
				header : '状态',
				width : 40,
				dataIndex : 'status'
			}, {
				header : '人数上限',
				width : 40,
				dataIndex : 'populationLimit'
			}, {
				header : '活动类型',
				width : 40,
				dataIndex : 'activityType'
			}, {
				header : '当前参与人数',
				width : 40,
				dataIndex : 'populationCurrent'
			}]
		});
	// 设置所有列字段默认排序
	cm.defaultSortable = true;

	// 定义一个表格面板
	var grid = new Ext.grid.GridPanel({
		id : 'act-export-grid',// 设置标识ID，方便以后引用！
		title : '活动报名表',// 标题
		renderTo : Ext.getBody(),// 显示表格的地方
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
		// 响应导出活动按钮的事件
		listeners : {
			cellClick : function(grid, rowIndex, columnIndex, e) {
				// 按钮的位置位于第12列，如果列数有调整需要把这个数值也调整，或者把按钮长期永远放在最后，用length-1来替代12.
				var colCount = grid.colModel.config.length;
				if (columnIndex == colCount - 13) {
					var activityId = grid.getStore().getAt(rowIndex).get('id');
					//alert(activityId);
					Ext.Ajax.request({
						url : '../sys_act/adminAction_act_exportSpecifiedActivityInfo',
						method : 'POST',
						params : {
							activityID : activityId
						},
						success : function(response, options) {
							// Ext.MessageBox.alert('成功',
							// '从服务端获取结果: '
							// + response.responseText);
							// alert(response.responseText);
							window.open('/gh/upload/sys_act/'+response.responseText);
						},
						failure : function(response, options) {
							Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：'
											+ response.status);
						}
					});
				}
			},
			//双击事件，弹窗
			cellDblClick : function(grid, rowIndex, columnIndex, e) {
				var colCount = grid.colModel.config.length;
				if (columnIndex == colCount - 5) {
						createWin(rowIndex, columnIndex);
				}
			}
		},
		// UI视图配置
		viewConfig : {
			forceFit : true
			// 强制适应分布宽度
		},
		// 表格顶部动作或按钮工具栏
		tbar : new Ext.Toolbar({
					items : ['-'
//					         {
//								text : '导出活动汇总excel',
//								iconCls : 'icon-excel',
//								handler : function() {
//									//alert('暂无此功能！');
//									//							
//									 Ext.Ajax.request({
//									 url :
//									 '../sys_mb/adminAction_act_exportAllData',
//									 method : 'POST',
//									 success : function(response, options) {
//									 // Ext.MessageBox.alert('成功',
//									 // '从服务端获取结果: '
//									 // + response.responseText);
//									 //	 alert(response.responseText);
//									 window.open(response.responseText);
//									 },
//									 failure : function(response, options) {
//									 Ext.MessageBox.alert('失败',
//									 '请求超时或网络故障,错误编号：'
//									 + response.status);
//									 }
//									 });
//								}
//							}
		, '-', new Ext.PagingToolbar({
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
});