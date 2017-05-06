Ext.onReady(function() {
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
	// 定义列模型
	var cm = new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer(),// 添加自动行号
	sm,// 添加复选框
	{
		header : '编号',
		width : 40,
		dataIndex : 'number'
	}, {
		header : '姓名',
		width : 40,
		dataIndex : 'name'
	}, {
		header : '新身份证号码',
		width : 40,
		dataIndex : 'idCard'
	}, {
		header : '聘用形式',
		width : 40,
		dataIndex : 'employType'
	}, {
		header : '入编情况',
		width : 40,
		dataIndex : 'joinCondition'
	}, {
		header : '部门（简）',
		width : 40,
		dataIndex : 'dpmBrief'
	}, {
		header : '分工会',
		width : 40,
		dataIndex : 'subUnion'
	},{
		header : '部门（详）',
		width : 40,
		dataIndex : 'dpmDetail'
	}, {
		header : '职务',
		width : 40,
		dataIndex : 'duty'
	}, {
		header : '任职时间',
		width : 40,
		dataIndex : 'takeOfferDate',
		type : 'date',
		renderer : Ext.util.Format.dateRenderer('Y-m-d')
	}, {
		header : '级别',
		width : 40,
		dataIndex : 'level'
	}, {
		header : '定级时间',
		width : 40,
		dataIndex : 'reachLevelDate',
		type : 'date',
		renderer : Ext.util.Format.dateRenderer('Y-m-d')
	}, {
		header : '籍贯',
		width : 40,
		dataIndex : 'native_'
	}, {
		header : '性别',
		width : 40,
		dataIndex : 'sex',
		renderer : changeSex
	}, {
		header : '民族',
		width : 40,
		dataIndex : 'nationality'
	}, {
		header : '出生日期',
		width : 40,
		dataIndex : 'birthday',
		type : 'date',
		renderer : Ext.util.Format.dateRenderer('Y-m-d')
	}, {
		header : '最高学历',
		width : 40,
		dataIndex : 'topEducation'
	}, {
		header : '最高学位',
		width : 40,
		dataIndex : 'topDegree'
	}, {
		header : '党派',
		width : 40,
		dataIndex : 'politics'
	}, {
		header : '加入时间',
		width : 40,
		dataIndex : 'joinDate',
		type : 'date',
		renderer : Ext.util.Format.dateRenderer('Y-m-d')
	}, {
		header : '工作时间',
		width : 40,
		dataIndex : 'workDate',
		type : 'date',
		renderer : Ext.util.Format.dateRenderer('Y-m-d')
	}, {
		header : '职称',
		width : 40,
		dataIndex : 'title'
	}, {
		header : '职称级别',
		width : 40,
		dataIndex : 'titleLevel'
	}, {
		header : '首次聘用岗位',
		width : 40,
		dataIndex : 'firstEmpJob'
	}, {
		header : '首次聘用岗位的类别',
		width : 40,
		dataIndex : 'firstEmpJobType'
	}, {
		header : '毕业学校',
		width : 40,
		dataIndex : 'graduateSch'
	}, {
		header : '最高学历时间',
		width : 40,
		dataIndex : 'topEduDate',
		type : 'date',
		renderer : Ext.util.Format.dateRenderer('Y-m-d')
	}, {
		header : '最高学位时间',
		width : 40,
		dataIndex : 'topDegreeDate',
		type : 'date',
		renderer : Ext.util.Format.dateRenderer('Y-m-d')
	}, {
		header : '所学专业',
		width : 40,
		dataIndex : 'major'
	}, {
		header : '学科',
		width : 40,
		dataIndex : 'subject'
	}, {
		header : '来校时间',
		dataIndex : 'joinSchDate',
		type : 'date',
		renderer : Ext.util.Format.dateRenderer('Y-m-d')
	// 格式化日期
	} ]);
	// 设置默认隐藏列
	cm.setHidden(3, true);
	cm.setHidden(4, true);
	cm.setHidden(5, true);
	cm.setHidden(6, true);
	cm.setHidden(8, true);
	cm.setHidden(10, true);
	cm.setHidden(12, true);
	cm.setHidden(17, true);
	cm.setHidden(18, true);
	cm.setHidden(20, true);
	cm.setHidden(21, true);
	cm.setHidden(23, true);
	cm.setHidden(24, true);
	cm.setHidden(25, true);
	cm.setHidden(26, true);
	cm.setHidden(27, true);
	cm.setHidden(28, true);
	cm.setHidden(29, true);
	cm.setHidden(30, true);
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
	var grid = new Ext.grid.GridPanel({
		id : 'member-grid',// 设置标识ID，方便以后引用！
		title : '会员信息管理',// 标题
		renderTo : 'export_member_grid',// 显示表格的地方
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
		floating : true,// 设置浮动，能否拖动成功就靠它了,注意设置浮动后它就置顶了
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
		// 表格顶部动作或按钮工具栏
		tbar : new Ext.Toolbar({
			items : [
					'-',
					{
						text : '导出excel(已勾选的列)',
						iconCls : 'icon-excel',
						handler : function() {
							// 获得选中的列
							var selectedColDataIndex = "";
							var selectedColHeader = "";
							for (var i = 2; i < cm.getColumnCount(); i++) {
								if (!cm.isHidden(i)) {
									selectedColDataIndex += cm.getDataIndex(i)
											+ ",";
									selectedColHeader += cm.getColumnHeader(i)
											+ ",";
								}
							}
							Ext.Ajax.request({
								url : '../sys_mb/adminAction_mb_exportAllData',
								method : 'POST',
								params : {
									dataIndex : selectedColDataIndex,
									header : selectedColHeader
								},
								success : function(response, options) {
									window.open(response.responseText);
								},
								failure : function(response, options) {
									Ext.MessageBox
											.alert('失败', '请求超时或网络故障,错误编号：'
													+ response.status);
								}
							});
						}
					},
					'-',
					{
						text : '导出excel(所有列)',
						iconCls : 'icon-excel',
						handler : function() {

							Ext.Ajax.request({
								url : '../sys_mb/adminAction_mb_exportAllData',
								method : 'POST',
								success : function(response, options) {
									window.open(response.responseText);
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
					}) ]
		}),
		// 表格底部分页工具栏（分页功能需要传start,limit参数到后台进行处理传回来才能实现）
		//bbar : new Ext.PagingToolbar({
		//	pageSize : 10,
		//	store : ds,
		//	displayInfo : true,
		//	displayMsg : '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
		//	emptyMsg : "没有记录"
		//})
	});
});