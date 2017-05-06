<%@ page language="java" import="java.util.*" import="glut.util.*" import="java.text.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";

%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@page import="glut.db.auto.Users"%>
<%@page import="glut.util.SecurityUtil"%>
<HTML xmlns="http://www.w3.org/1999/xhtml">
<HEAD>
<TITLE></TITLE>
<META content="text/html; charset=utf-8" http-equiv=Content-Type>
<LINK rel=stylesheet type=text/css href="css/frame.css">
<script type="text/javascript" src="Ext/adapter/ext/ext-base.js"></script>

<script type="text/javascript" src="Ext/ext-all.js"></script>

<script type="text/javascript" src="Ext/src/locale/ext-lang-zh_CN.js"
	charset="utf-8"></script>
<script type="text/javascript" src="srcipt/sys_change_pwd.js"></script>
<script type="text/javascript" charset="UTF-8">
	//获取名字和工号
	<%
	Users user=SecurityUtil.getUserInfo(request);
	%>
	var mbName ="<%=user.getMember().getName()%>";
	var account="<%=user.getMember().getNumber()%>";
</script>
<script type="text/javascript">
	function change_pwd(){
		Ext.apply(top.Ext.form.VTypes,{
			password:function(val,field){
				if(field.initialPassField){
					var pwd = top.Ext.getCmp(field.initialPassField);
					return (val == pwd.getValue());
				}
				return true;
			},
			passwordText:'两次密码不一致'
		});
		Ext.onReady(function(){
			Ext.QuickTips.init();
			var changePasswordFrom = new top.Ext.form.FormPanel({
				width:360,
				autoHeight:120,
				bodyStyle:"background-color:#99bbe8",
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
					 fieldLabel:'用户名',
					 name:'account',
					 inputType:'textfield',
					 value:account,
					 readOnly:true,
					 id:'account'
					},
					{
					 fieldLabel:'旧密码',
					 name:'oldpassword',
					 inputType:'password',
					 blankText:'密码不能为空',
					 id:'oldpassword'
					},{
					 fieldLabel:'新密码',
					 name:'newPwd',
					 inputType:'password',
					 blankText:'密码不能为空',
					 id:'newPwd'
					},{
					 fieldLabel:'确认新密码',
					 name:'secondPassword',
					 inputType:'password',
					 blankText:'密码不能为空',
					 vtype:'password',
					 initialPassField:'newPwd'
					},
				]
			});
	
	    var win = new top.Ext.Window({
	        title: "修改密码",
	        width: 360,
	        height: 220,
	        plain: true,
	        bodyStyle:"background-color:#99bbe8",
// 	        autoScroll: true,
	        layout:'fit',
	        //可以随意改变大小
	        resizable: true,
	        //是否可以拖动
	        //draggable:false,
	        collapsible: false, //不允许缩放条
	        closeAction: 'close',
	        closable: true,
	        //弹出模态窗体
	        modal: true,
	        buttonAlign: "center",
	        bodyStyle: "padding:10 10 10 10",
	        border :false, 
	        x:500,
	        y:250,
	        constrain :true,
	        items: [changePasswordFrom],
	        
	        buttons : [{
                         text : "提交",
                         handler : function() {
                            if (changePasswordFrom.getForm().isValid()) {
                                changePasswordFrom.getForm().submit({
                                          url : './common/baseAction_changPwd',
                                          success: function(form, response) {
//        										  alert(response);//success函数，成功提交后，根据返回信息判断情况
												top.Ext.get("msg").dom.innerHTML = "修改成功";
//                                        			win.close(); //关闭窗口
                                          },
                                          failure: function(form, response) {
                                              top.Ext.get("msg").dom.innerHTML = "旧密码错误";
                                          }
                                       });
                            }
                         }
                     }, {
                         text:'重置',
						 handler:function(){
								changePasswordFrom.getForm().reset();
						 }
                     }]
                     
                     
	      });
          win.show();
        });
	}
</script>
</HEAD>
<BODY>
<DIV id=header>
<DIV class=header>
<DIV id=logo>
</DIV>
<DIV id=subMenu>
<UL>
  <LI><A href="<%=path%>/j_spring_security_logout" target=_top>退出 </A></LI>
  <LI><A href="javascript:change_pwd()" 
  target=mainFrame>修改密码</A> </LI>
  <LI style="BORDER-RIGHT-STYLE: none"></LI></UL></DIV>
<DIV id=greeting>您好！<SPAN><%=SecurityUtil.getUserName(request)%></SPAN>，欢迎登录 <%SimpleDateFormat s = new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss");
Date date = new Date();%>
<%=s.format(date)%> </DIV></DIV>
</DIV></DIV></BODY></HTML>
