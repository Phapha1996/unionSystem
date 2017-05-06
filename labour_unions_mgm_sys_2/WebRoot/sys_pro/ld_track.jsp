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
<script type="text/javascript" src="../script/glut_constant.js"></script>
<script type="text/javascript" charset="UTF-8">
	//获取名字和工号
	<%Users user = SecurityUtil.getUserInfo(request);%>
	
	var mbName_pro ='<%=user.getMember().getName()%>';
</script>
<script type="text/javascript" src="../script/sys_pro_ld_track.js"></script>

<style type="text/css">
</style>
</head>
<body>
	<div id="pro_trock_grid"></div>
</body>
</html>