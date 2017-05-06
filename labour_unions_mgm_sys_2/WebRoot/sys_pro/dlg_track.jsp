<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@page import="glut.db.auto.Users"%>
<%@page import="glut.util.SecurityUtil"%>
<html>
<head>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<title>Insert title here</title>
<link rel="stylesheet" type="text/css"
	href="../Ext/resources/css/ext-all.css">
<script type="text/javascript" src="../Ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="../Ext/ext-all.js"></script>
<script type="text/javascript" src="../Ext/src/locale/ext-lang-zh_CN.js"></script>
<script type="text/javascript" charset="UTF-8">
	//获取名字和工号
	<%Users user = SecurityUtil.getUserInfo(request);%>
	
	var mbName_pro =encodeURI('<%=user.getMember().getName()%>');
</script>
<script type="text/javascript" src="../script/sys_pro_dlg_track.js"></script>

<style type="text/css">
</style>
<style type="text/css">
.x-form-unit {
	height: 22px;
	line-height: 22px;
	padding-left: 2px;
	display: inline-block;
	display: inline;
}

.x-grid3-hd-blue1,.x-grid3-hd-blue2,.x-grid3-hd-blue3,.x-grid3-hd-blue4,.x-grid3-hd-blue5,.x-grid3-hd-blue6,.x-grid3-hd-blue7,.x-grid3-hd-blue8
	{
	color: blue;
}
</head>
<body>
	<div id="pro_trock_grid"></div>
</body>
</html>