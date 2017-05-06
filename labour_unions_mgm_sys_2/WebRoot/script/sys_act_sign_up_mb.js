// JavaScript Document
Ext.apply(Ext.form.VTypes, {
	'limit' : function(_v) {
		if (/^\d+$/.test(_v)) {// 判断必须是数字
			return true;
		}
		return false;
	},
	limitText : '必须输入数字', // 出错信息后的默认提示信息
	limitMask : /[0-9]/i
		// 键盘输入时的校验
	})

Ext.onReady(function() {

	Ext.QuickTips.init();// 浮动信息提
	
	
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
	
	function todate(v) {
		if (v == null) {
			return null;
		}
		var d = new Date();
		d = v;
		var str1 = d.getFullYear();
		var str2 = d.getMonth();
		var str3 = d.getDate();
		str2 = str2+1;
		if(str2<10){
			str2 = "0"+str2;
		}	
		if(str3<10){
			str3 = "0"+str3;
		}
		var str = str1+"-"+str2+"-"+str3;
		return str;
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
		
	var ds = new Ext.data.Store({
		autoLoad : true,
		// proxy: new Ext.data.MemoryProxy(jsondata),
		proxy : new Ext.data.HttpProxy({
			url : "../sys_act/userAction_act_getActivities?role=member&account="
					+ account
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
						},{
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
							name : 'template'
						},{
							name : 'desc'
						}
						])
	})
	function renderDescn(value, cellmeta, record, rowIndex, columnIndex, store) {
		var str = "<input type='button' value='报名'>";
		return str;
	}

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
				columns : [sm, {
							header : '序号',
							width : 80,
							dataIndex : 'id',
							sortable : true
						}, {
							header : '报名',
							width : 60,
							dataIndex : 'apply',
							renderer : renderDescn
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
							//hidden:true
						},{
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
							header : '报名附件',
							width : 100,
							dataIndex : 'template',
							renderer : renderwu
						}]
			});
	// 定义一个表格面板
	var grid = new Ext.grid.GridPanel({
		id : 'apply_act',
		title : '个人活动',// 标题
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
		bbar : pager,
		tbar : new Ext.Toolbar({
					items : [{
								text : '查询活动',
								iconCls : 'icon-excel',
								handler : function() {
									var roles = request('roles');
									alert(roles);
								}
							}]
				}),
		listeners : {
			cellClick : function(grid, rowIndex, columnIndex, e) {
				// 按钮的位置位于第12列，如果列数有调整需要把这个数值也调整，或者把按钮长期永远放在最后，用length-1来替代12.
				var colCount = grid.colModel.config.length;
				if (columnIndex == colCount - 14) {
					var rowData = grid.getStore().getAt(rowIndex);
					var actId = rowData.get('id');
					var actName = rowData.get('name');
					var actdate = rowData.get('activityTime');
					var actTime = rowData.get('actTime');
					var actlocation = rowData.get('actLocation');
					var notes = rowData.get('notes');
					var fileName = rowData.get('template');
					var Customtime = rowData.get('actCustomtime');

					var sure1 = new Ext.Button({
						text : '确定',
						handler : function() {

							form_1.getForm().submit({
								url : "../sys_act/userAction_act_joinActivity?role=member",
								// waitTitle : '请稍后',
								// waitMsg : '正在上传文档文件 ...',
								success : function(form, response) {

									// Ext.get("msg1").dom.innerHTML = "成功";
									Ext.Msg.alert('提示', '报名成功！');
									win_1.close();
									ds.reload();

								},
								failure : function(form,action) {
									var info = action.result.msg;
									Ext.Msg.alert('提示',info);
									//Ext.get("msg1").dom.innerHTML = "失败，请与管理员联系";
								}
							});
						}
					});
					
					var reset_1 = new Ext.Button({
								text : '重置',
								handler : function() {
									form_1.getForm().reset();
								}
							});
					
					var act_num = new Ext.form.TextField({
								width : 140,
								allowBlank : false,
								id : 'actId',
								name : 'actId',
								fieldLabel : '活动序号'
								,
							});
					var act_name = new Ext.form.TextField({
								width : 140,
								allowBlank : false,
								id : 'activityName',
								name : 'activityName',
								fieldLabel : '活动名称',
							});
					var men_name = new Ext.form.TextField({
								width : 140,
								allowBlank : false,
								id : 'playerName',
								name : 'playerName',
								fieldLabel : '参加者姓名',
							});
					var unit = new Ext.form.TextField({
								width : 140,
								allowBlank : false,
								id : 'unit',
								name : 'unit',
								fieldLabel : '单位'
							});
					var act_date = new Ext.form.TextField({
						fieldLabel : '活动日期',
						width : 140,
					});
					var actTime_hide = new Ext.form.TimeField({
								fieldLabel : '活动时间',
								autoShow: true,
								format: 'H:i',                                 //显示格式，H代表小时；i代表分钟；m代表秒
								width : 80,
							});
					var actTime = new Ext.form.TextField({
						fieldLabel : '活动时间',
						autoShow: true,
						width : 70,
					});
					
					var customtime = new Ext.form.TextField({
						fieldLabel : '自定义活动时间',
						//autoShow: true,
						width : 350,
					});
			 
					var actLocation = new Ext.form.TextField({
								width : 350,
								fieldLabel : '活动地点',
							});
					var note = new Ext.form.TextArea({
								width : 350,
								height : 65,
								allowBlank : false,
								fieldLabel : '注意事项',
//								blankText : '请输入注意事项'
							});
					var phone_mun = new Ext.form.TextField({
								width : 140,
								allowBlank : false,
								id : 'phone',
								name : 'phone',
								vtype : 'limit',
								vtypeText : '请输入正确的电话号码',
								fieldLabel : '电话号码',
							});
					var remarks = new Ext.form.TextArea({
								width : 350,
								height : 20,
								id : 'notes',
								name : 'notes',
								maxLength : 200,
								fieldLabel : '备注',
								maxLengthText : '备注不能超过200个字符'
							});
					
					var allowBlanks = false;
					if(fileName.indexOf("null")>-1){	//没有附件的时候，附件上传可以为空
						allowBlanks = true;
					}
					
					var file = new Ext.form.TextField({
						fieldLabel : '附件',
						name : 'file',
						allowBlank :allowBlanks,//如果有附件，不允许为空；没有附件，允许为空。allowBlanks值为true,false
						msgTarget : 'under',
						validator : function(value) {
							if (value != "") {
								var arr = value.split('.');
								// doc,excel两种格式均可 by xupk
								if (arr[arr.length - 1] != 'doc'
										&& arr[arr.length - 1] != 'docx'
											&& arr[arr.length - 1] != 'xls'
											&& arr[arr.length - 1] != 'xlsx') {
									return '文件不合法，请上传word文件或Excel文件';
								} else {
									return true;
								}
							}else{
								return true;
							}
						},
						inputType : 'file'// 文件类型
					});
					
					var template = new Ext.Button({
						text:"下载附件模板",
						handler:function(){
								if(fileName.indexOf("null")>-1){	//没有附件可以下载的时候，提示“没有相关模板”
									Ext.Msg.alert('提示','没有附件模板，不需要下载和上传附件');
									return;
								}else{
									Ext.Ajax.request({
										url : '../sys_act/userAction_act_downloadTemp',
										method : 'POST',
										params : {
											tempName : fileName
										},
										success : function(response,options) {
											window.open(response.responseText);
										},
										failure : function(response,options) {
											Ext.MessageBox.alert('失败','请求超时或网络故障,错误编号：'+ response.status);
										}
									});
								}
							}
							
					});


					var account_hidden = new Ext.form.Hidden({
								id : 'account',
								name : 'account'
							})
					
					var form_1 = new Ext.form.FormPanel({
								frame : true,
								id : 'apply_form1',
								name : 'apply_form1',
								buttonAlign : 'center',
								fileUpload : true,
								width : '100%',
								height : '100%',
								html : '<center><font color="red"><div id="msg1" class="tipmsg1"></div></font></center>',
								items : [act_num, act_name, men_name, unit,
								         {
						            layout: 'column',
						            items: [{
						                layout: 'form',
						                width : 270,	
						                items: [act_date]
						            }, {
						            	layout: 'form',
						            	labelWidth : 60,
						                items: [actTime]
						            }]
						        }, customtime,
					            actLocation , note,
										phone_mun, remarks,
										{//增加下载附件模板的按钮
											layout:'column',
											items:[{
												columnWidth : .6,
												layout:'form',
												labelWidth:80,
												items:[file]
											},{
												columnWidth:.4,
												items:[template]
											}]
										}, 
										account_hidden],
								buttons : [sure1, reset_1]
							});
				
					
					var win_1 = new Ext.Window({
								title : '报名表',
								width : 600,
								height : 450,
								resizable : true,
								modal : true,
								closable : true,
								buttonAlign : 'center',
								items : [form_1]
							});
					//报名表 赋值
					act_num.setValue(actId);
					act_name.setValue(actName);
					men_name.setValue(mbName);
					var date = todate(actdate);
					act_date.setValue(date);
					actTime_hide.setValue(actTime);
					actTime.setValue(actTime_hide.getValue());
					actLocation.setValue(actlocation);
					note.setValue(notes);
					unit.setValue(dpm);
					customtime.setValue(Customtime);
					account_hidden.setValue(account);
					
					
					if(fileName.indexOf("null") == -1){
						win_1.show();
					}else if(fileName.indexOf("null")>-1){	//没有附件可以下载的时候，报名的时候不需要显示附件栏
						
						file.setVisible(false);
						file.hideLabel=true;
						template.hide();
						win_1.show();
					}
					//报名表的除电话，备注，其他设置为只读 
					act_num.el.dom.readOnly = true;
					act_name.el.dom.readOnly = true;
					men_name.el.dom.readOnly = true;
					act_date.el.dom.readOnly = true;
					actTime.el.dom.readOnly = true;
					actTime.el.dom.readOnly = true;
					actLocation.el.dom.readOnly = true;
					customtime.el.dom.readOnly = true;
					unit.el.dom.readOnly = true;
				}

			},
			//双击事件，弹窗 ,列数有调整时需要重新调整
			cellDblClick : function(grid, rowIndex, columnIndex, e) {
				var colCount = grid.colModel.config.length;
				if (columnIndex == colCount - 6) {
						createWin(rowIndex, columnIndex);
				}
			}
		}
	});
});
