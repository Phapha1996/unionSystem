// JavaScript Document
Ext.onReady(function() {
	
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
	
	
	// 数据源
	var ds = new Ext.data.Store({
		autoLoad : true,
		// proxy: new Ext.data.MemoryProxy(jsondata),
		proxy : new Ext.data.HttpProxy({
			url : '../sys_pro_cmt/userAction_pro_proposalTracing?dpmLV=2&trackWay=committee'
		}),
		// jsonreader的字段名称要与glut.db.bean中的类属性名一致，不要去匹配数据库字段
		reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'root'
				}, [{
							name : 'id'
						}, {
							name : 'category'
						}, {
							name : 'title'
						}, {
							name : 'submitterDpm'
						}, {
							name : 'submitterName'
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
							name : 'replyContent'
						}, {
							name : 'comment'
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
							header : '序号',
							width : 40,
							dataIndex : 'id'
						}, {
							header : '提案类别',
							width : 80,
							dataIndex : 'category'
						}, {
							header : '提案名称',
							width : 100,
							dataIndex : 'title'
						}, {
							header : '提案单位',
							width : 80,
							dataIndex : 'submitterDpm'
						}, {
							header : '提案人姓名',
							width : 80,
							dataIndex : 'submitterName'
						}, {
							header : '附议人姓名',
							width : 80,
							dataIndex : 'supporter1'
						}, {
							header : '附议人姓名',
							width : 80,
							dataIndex : 'supporter2'
						}, {
							header : '提案委员会意见',
							width : 100,
							dataIndex : 'committeeAdv'
						}, {
							header : '主办单位',
							width : 80,
							dataIndex : 'mainUnit'
						}, {
							header : '协办单位',
							width : 80,
							dataIndex : 'assistantUnit'
						}, {
							header : '进展情况',
							width : 90,
							dataIndex : 'progress'
						}, {
							header : '回复办理内容',
							width : 90,
							dataIndex : 'replyContent'
						}, {
							header : '满意度评价',
							width : 90,
							dataIndex : 'comment'
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
	var grid = new Ext.grid.GridPanel({
				id : 'pro-track-grid',// 设置标识ID，方便以后引用！
				title : '提案跟踪',// 标题
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
				listeners : {
					//双击事件，弹窗
					cellDblClick : function(grid, rowIndex, columnIndex, e) {
						var colCount = grid.colModel.config.length;
						if (columnIndex == colCount - 11) {
								createWin_View(rowIndex, columnIndex);
						}
					}
				},
				// 表格顶部动作或按钮工具栏
				// 表格底部分页工具栏（分页功能需要传start,limit参数到后台进行处理传回来才能实现）
				bbar : pager
			});
});
