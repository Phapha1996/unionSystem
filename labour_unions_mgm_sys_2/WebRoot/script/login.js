Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';

	var func_submit = function() {
		if (form.getForm().isValid()) {
			form.getForm().submit({
						url : '/gh/j_spring_security_check',
						method : 'post',
						success : function(form, action) {
							// 可以通过action.result.roles取到用户的角色
							// Ext.Msg.alert('成功：', action.result.roles);
							// alert('success');
							var roles = action.result.roles;
							// alert(action.result.roles);
							location.href = "main.jsp?roles=" + roles;
						},
						failure : function(form, action) {
							Ext.get("msg_fail").dom.innerHTML = "用户名或密码错误";
						}
					})
		}
	}
	var func_reset = function() {
		form.getForm().reset();
	}
	var btn_submit = new Ext.Button({
				text : '登录',
				handler : func_submit
			});
	var btn_reset = new Ext.Button({
				text : '重置',
				handler : func_reset
			});
	var admin_name = new Ext.form.TextField({
				value : '2001030',
				width : 160,
				allowBlank : false,
				maxLength : 20,
				name : 'username',
				fieldLabel : '用户名',
				blankText : 'Please Input a admin name here.',
				maxLengthText : 'The upper limit of length : 20B '
			});
	var admin_pwd = new Ext.form.TextField({
				value : '',
				width : 160,
				allowBlank : false,
				maxLength : 20,
				inputType : 'password',
				name : 'password',
				fieldLabel : '密码',
				blankText : 'Please Input a password here.',
				maxLengthText : 'The upper limit of length : 20B ',
				enableKeyEvents : true,
				listeners : {
					keypress : function(field, event) {
						if (event.getKey() == 13) {
							func_submit();
						}
					}
				}
			});
	var form = new Ext.form.FormPanel({
				renderTo : 'mainform',
				labelAlign : 'right',
				labelWidth : 100,
				width : 360,
				height : 136,
				frame : false,
				buttonAlign : 'center',
				bodyStyle : 'padding:30px 0px 0px 10px',
				style : 'margin:0',
				border: false,
				baseCls  :  'formcls',
				items : [admin_name, admin_pwd],
				buttons : [btn_submit, btn_reset],
				html : '<div id="msg_fail" class="tipmsg_fail"></div>'
			});

});
