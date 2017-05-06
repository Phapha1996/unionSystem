<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="glut.db.auto.Users"%>
<%@page import="glut.util.SecurityUtil"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<title></title>
<link rel="stylesheet" type="text/css"
	href="<%=basePath%>Ext/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/frame.css" />

<script type="text/javascript"
	src="<%=basePath%>Ext/adapter/ext/ext-base.js"></script>

<script type="text/javascript" src="<%=basePath%>Ext/ext-all.js"></script>
<script type="text/javascript" charset="UTF-8">
	//获取名字和工号
	<%Users user = SecurityUtil.getUserInfo(request);%>
	
	var mbName ='<%=user.getMember().getName()%>';

	var dpm='<%=user.getMember().getDpmBrief()%>';
</script>
<script type="text/javascript"
	src="<%=basePath%>Ext/src/locale/ext-lang-zh_CN.js" charset="utf-8"></script>
<style type="text/css">
</style>

<script type="text/javascript"
	src="<%=basePath%>script/sys_pro_dlg_submit.js"></script>
<script type="text/javascript"
	src="<%=basePath%>script/glut_constant.js"></script>
</head>
<body>
	<div class="container">
		<div id="mainform" class="mainform"></div>
	</div>
</body>
</html>