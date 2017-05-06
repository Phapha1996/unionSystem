<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<base href="<%=basePath%>">


<link rel="stylesheet" type="text/css"
	href="Ext/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/frame.css" />

<script type="text/javascript" src="Ext/adapter/ext/ext-base.js"></script>

<script type="text/javascript" src="Ext/ext-all.js"></script>

<script type="text/javascript" src="Ext/src/locale/ext-lang-zh_CN.js"
	charset="utf-8"></script>

<script type="text/javascript" src="script/main.js"></script>
</head>

<body>
	<div id="main.container">
		<div id="main.header"></div>
		<div id="main.mainContent">
			<div id="main.sidebar"></div>
			<div id="main.content"></div>
		</div>
	</div>
</body>
</html>
