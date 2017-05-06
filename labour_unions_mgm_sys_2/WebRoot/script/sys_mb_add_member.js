Ext.onReady(function() {
	
	var form = new Ext.form.FormPanel({

		renderTo : Ext.get("mainform"),
		labelAlign : 'left',
		bodyStyle : 'text-align:left',
		title : '文件上传',
		labelWidth : 60,
		frame : true,
		url : '../sys_mb/adminAction_mb_readExcel',// fileUploadServlet
		width : '100%',
		height : '100%',
		fileUpload : true,
		html : '<div id="msg" class="tipmsg"></div><div id="msg_fail" class="tipmsg_fail"></div>',

		items : [{
			xtype : 'textfield',
			fieldLabel : '文件名',
			name : 'excel',
			allowBlank : false,
			msgTarget : 'under',
			validator : function(value) {
				if (value != "") {
					var arr = value.split('.');
					// xls,xlsx两种格式均可 by Yang
					if (arr[arr.length - 1] != 'xls'
							&& arr[arr.length - 1] != 'xlsx') {
						return '文件不合法，请上传excel文件';
					} else {
						return true;
					}
				}
			},
			inputType : 'file'// 文件类型
		}],
		buttonAlign : "center",
		buttons : [{
					text : '上传',
					handler : function() {
						form.getForm().submit({
									// waitTitle : '请稍后',
									// waitMsg : '正在上传文档文件 ...',
									success : function(form,action) {
										Ext.get("msg_fail").dom.innerHTML = "";
										Ext.get("msg").dom.innerHTML = "上传成功";
										var info = action.result.msg;
										if(info!=null || !info.equals("")){
											Ext.get("msg_fail").dom.innerHTML = "弹窗部分的数据插入失败";
											Ext.get("msg").dom.innerHTML = "";
//											Ext.Msg.alert('提示',info);
											window.open(info);
											/**以下方法只能用在IE浏览器才能弹窗下载，其他均不兼容*/
											/*var test = window.open(info);
											test.document.execCommand("SaveAs");
											test.close();*/
										}
									},
									failure : function() {
										Ext.Msg.alert('failure');
										Ext.get("msg").dom.innerHTML = "";
										Ext.get("msg_fail").dom.innerHTML = "文件上传失败";
									}
								});
					}
				}]
	});
	var win = new Ext.Window({
				title : '会员信息导入',
				resizable : true,
				width: '60%',
				shadow : true,
				modal : false,
				closable : true,
				items : form
			});
	win.show();

});
