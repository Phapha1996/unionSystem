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
	});
Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'under';
	
	//定义一个全局变量检查附议人姓名是否存在
	var sp1IsCheck={};
	var sp2IsCheck={};
	
	// 创建Combobox
	var unit = new Ext.form.ComboBox({
				fieldLabel : '单位',
				width : 135,
				id : 'proposal.submitterDpm',
				name : 'proposal.submitterDpm',
				store : glut_constant_unitstore,
				displayField : 'name',
				valueField : 'id',
				triggerAction : 'all',
				emptyText : '请选择...',
				allowBlank : false,
				blankText : '请选择单位',
				editable : false,
				mode : 'local', // 设置为'remote'表示数据源来自于服务器，
				listeners : {
					focus : function() {
						// 获取焦点
						Ext.get("msg").dom.innerHTML = "";
					}
				}

			});
	// Combobox获取值
	var name = new Ext.form.TextField({
				width : 120,
				id : 'proposal.submitterName',
				name : 'proposal.submitterName',
				allowBlank : false,
				fieldLabel : '姓名',
				emptyText : '请输入姓名',
				blankText : '请输入姓名'
			});
	var name1 = new Ext.form.TextField({
		width : 120,
		id : 'proposal.supporter1',
		name : 'proposal.supporter1',
		fieldLabel : '附议人姓名',
		allowBlank : false,
		emptyText : '请输入附议人姓名',
		blankText : '请输入附议人姓名',
		listeners : {
			blur : function() {
				// 失去焦点事件
				// alert('blur1');
				Ext.Ajax.request({
							url : '../sys_pro_dlg/userAction_pro_SupporterJudgement',
							method : 'POST',
							params : {
								name : name1.getValue()
							},
							success : function(response, options) {
								var msg = response.responseText;
//								alert(msg);
								if (msg.length > 16) {
									//在proposal.supporter1下提示信息
									Ext.getCmp('proposal.supporter1').markInvalid('用户名不存在');
									sp1IsCheck = false;
								}else{
									sp1IsCheck = true;
								}
							},
							failure : function(response, options) {
								Ext.get("msg").dom.innerHTML = "请求超时或网络故障";
								sp1IsCheck = false;
							}
						});
			},
			focus : function() {
				// 获取焦点
				// alert('focus1');
			}
		}
	});
	var name2 = new Ext.form.TextField({
		width : 120,
		id : 'proposal.supporter2',
		name : 'proposal.supporter2',
		fieldLabel : '附议人姓名',
		allowBlank : false,
		emptyText : '请输入附议人姓名',
		blankText : '请输入附议人姓名',
		listeners : {
			'blur' : function() {
				// 失去焦点事件
				// alert('blur2');
				Ext.Ajax.request({
							url : '../sys_pro_dlg/userAction_pro_SupporterJudgement',
							method : 'POST',
							params : {
								name : name2.getValue()
							},
							success : function(response, options) {
								var msg = response.responseText;
								if (msg.length > 16) {
									Ext.getCmp('proposal.supporter2').markInvalid('用户名不存在');
									sp2IsCheck = false;
//									Ext.MessageBox.confirm('提示', "用户"
//													+ name2.getValue() + "不存在,请重新输入",
//											function(btn) {
//												name2.focus(true, 100);
//											});
								}else{
									sp2IsCheck = true;
								}
							},
							failure : function(response, options) {
								Ext.get("msg").dom.innerHTML = "请求超时或网络故障";
								sp2IsCheck = false;
							}
						});
			},
			'focus' : function() {
				// 获取焦点
				// alert('focus2');
			}
		}
	});
	var phone = new Ext.form.NumberField({
				width : 120,
				id : 'proposal.submitterPhone',
				name : 'proposal.submitterPhone',
				allowBlank : false,
				fieldLabel : '电话',
				vtype : 'limit',
				vtypeText : '请输入正确的电话号码',
				emptyText : '  请输入电话',
				blankText : '请输入电话'
			});
	// 创建Combobox
	var category = new Ext.form.ComboBox({
				fieldLabel : '提案类别',
				id : 'proposal.category',
				name : 'proposal.category',
				width : 120,
				store : glut_constant_categorystore,
				displayField : 'name',
				valueField : 'id',
				triggerAction : 'all',
				emptyText : '请选择...',
				allowBlank : false,
				blankText : '请选择提案类别',
				editable : false,
				mode : 'local' // 设置为'remote'表示数据源来自于服务器，
			});
	// Combobox获取值
	var topic = new Ext.form.TextField({
				width : '90%',
				id : 'proposal.title',
				name : 'proposal.title',
				allowBlank : false,
				blankText : '请填写题目',
				fieldLabel : '题目'
			});
	var cause_of_action = new Ext.form.TextArea({
				width : '90%',
				height : 60,
				id : 'proposal.reason',
				name : 'proposal.reason',
				allowBlank : false,
				blankText : '请填写案由',
				fieldLabel : '案由'
			});
	var suggestions = new Ext.form.TextArea({
				width : '90%',
				height : 120,
				id : 'proposal.action',
				name : 'proposal.action',
				allowBlank : false,
				blankText : '请填写建议或措施',
				fieldLabel : '建议或措施'
			});

	var sure = new Ext.Button({
				text : '确定',
				handler : function() {
					if (form.getForm().isValid() && sp1IsCheck && sp2IsCheck) {
						form.getForm().submit({
									success : function(form, response) {
//										win.destroy();
//										 Ext.Msg.alert('tips', 'success');
										//单位和姓名不重置
										 Ext.getCmp('form').findById('proposal.supporter1').reset();
										 Ext.getCmp('form').findById('proposal.supporter2').reset();
										 Ext.getCmp('form').findById('proposal.submitterPhone').reset();
										 Ext.getCmp('form').findById('proposal.category').reset();
										 Ext.getCmp('form').findById('proposal.title').reset();
										 Ext.getCmp('form').findById('proposal.reason').reset();
										 Ext.getCmp('form').findById('proposal.action').reset();
										// 添加提案成功后，清除已填入的数据，防止多次提交
										 Ext.get("msg").dom.innerHTML = "成功";

									},
									failure : function(form, response) {
										Ext.get("msg").dom.innerHTML = "失败，请与管理员联系";
									}
								});
					}else if(form.getForm().isValid() && sp1IsCheck){
						Ext.getCmp('proposal.supporter2').markInvalid('用户名不存在');
					}else if(form.getForm().isValid() && sp2IsCheck){
						Ext.getCmp('proposal.supporter1').markInvalid('用户名不存在');
					}else if(form.getForm().isValid()){
						Ext.getCmp('proposal.supporter1').markInvalid('用户名不存在');
						Ext.getCmp('proposal.supporter2').markInvalid('用户名不存在');
					}
				}
			});
	var reset = new Ext.Button({
				text : '重置',
				handler : function() {
					form.getForm().reset();
				}

			});
	var column1 = {
		layout : 'form',
		items : [unit, name]
	};
	var column2 = {
		layout : 'form',
		items : [name1, name2]
	}
	var form = new Ext.form.FormPanel({
		        renderTo : Ext.get("mainform"),
				frame : true,
				id : 'form',
				name : 'form',
				url : '../sys_pro_dlg/userAction_pro_submitProposal',
				width :'100%',
				html : '<div id="msg" class="tipmsg"></div>',
				height : '100%',
			    //内容溢出自动滚动 
			    autoScroll:true,
			    buttonAlign:'center',
				items : [column1, column2, phone, category, topic,
						cause_of_action, suggestions],
				buttons : [sure, reset]
			});
	var win = new Ext.Window({
				title : '添加提案',
				resizable : true,
				width: '80%',
				y: 2, //窗口的初始化Y坐标强制为2，以防窗口太大被标题遮盖
				shadow : true,
				modal : false,
				closable : true,
				items : form
			});
	Ext.getCmp('proposal.submitterDpm').setValue(dpm);
	Ext.getCmp('proposal.submitterName').setValue(mbName);
	win.show();
});
