<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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

<script type="text/javascript"
	src="<%=basePath%>Ext/src/locale/ext-lang-zh_CN.js" charset="utf-8"></script>
<style type="text/css">
.x-form-unit {
	height: 22px;
	line-height: 22px;
	padding-left: 2px;
	display: inline-block;
	display: inline;
}

.x-grid3-hd-blue1,.x-grid3-hd-blue2,.x-grid3-hd-blue3,.x-grid3-hd-blue4,.x-grid3-hd-blue5,.x-grid3-hd-blue6,.x-grid3-hd-blue7,.x-grid3-hd-blue8,.x-grid3-hd-blue9,.x-grid3-hd-blue10,.x-grid3-hd-blue11
	{
	color: blue;
}
</style>

<script type="text/javascript"
	src="<%=basePath%>script/sys_act_mdf_act.js"></script>
</head>
<body>
	<div class="container">
		<div id="mainform" class="mainform"></div>
</body>
</html>
