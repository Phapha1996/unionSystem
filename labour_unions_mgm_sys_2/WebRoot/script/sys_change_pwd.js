//多字段验证用VType
Ext.apply(Ext.form.VTypes,{
	password:function(val,field){
		if(field.initialPassField){
			var pwd = Ext.getCmp(field.initialPassField);
			return (val == pwd.getValue());
		}
		return true;
	},
	passwordText:'两次密码不一致'
});
Ext.onReady(function(){
	Ext.QuickTips.init();
	var changePasswordFrom = new Ext.form.FormPanel({
		title:'修改密码',
		renderTo:'change_pwd_form',
		frame:true,
		width:400,
		buttonAlign:'center',
		labelAlign:'right',
		labeWidth:80,
		defaultType:'textfield',
		html : '<center><font color="red"><div id="msg" class="msg"></div></font></center>',
		defaults:{
			 width:150,
			 allowBlank:false,
			 msgTarget:'under',
			 maxLength:20,
			 maxLengthText:'密码不能超过20位'
			 },
		items:[ 
			{
			 fieldLabel:'旧密码',
			 name:'oldpassword',
			 inputType:'password',
			 blankText:'密码不能为空',
			 id:'oldpassword'
			},{
			 fieldLabel:'新密码',
			 name:'password',
			 inputType:'password',
			 blankText:'密码不能为空',
			 id:'password'
			},{
			 fieldLabel:'确认新密码',
			 name:'secondPassword',
			 inputType:'password',
			 blankText:'密码不能为空',
			 vtype:'password',
			 initialPassField:'password'
			}	
		],
		buttons:[{
			text:'修改密码',
			handler:function(){
				if(!changePasswordFrom.getForm().isValid()){
	  		 	  return;
	  		   	}
				changePasswordFrom.getForm().submit({
					url:'../baseAction_changPwd',
					success:function(f,action){
						if(action.result.success){
							Ext.get("msg").dom.innerHTML = "修改成功";
						}
					},
					failure:function(f,action){ 
						changePasswordFrom.getForm().reset();
 						Ext.get("msg").dom.innerHTML = "修改失败";
 					} 
				});
			}
		},{
		text:'重置',
		handler:function(){
			changePasswordFrom.getForm().reset();
		}
		}]
	});
});