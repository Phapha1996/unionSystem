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
    <title>系统概览</title>

    <!-- ** CSS ** -->
    <!-- base library -->
    <link rel="stylesheet" type="text/css" href="Ext/resources/css/ext-all.css" />

    <!-- overrides to base library -->
    <link rel="stylesheet" type="text/css" href="css/Portal.css" />

    <!-- page specific -->
    <link rel="stylesheet" type="text/css" href="css/sample.css" />
    <style type="text/css">

    </style>

    <!-- ** Javascript ** -->
    <!-- ExtJS library: base/adapter -->
    <script type="text/javascript" src="Ext/adapter/ext/ext-base.js"></script>

    <!-- ExtJS library: all widgets -->
    <script type="text/javascript" src="Ext/ext-all.js"></script>

    <!-- overrides to base library -->

    <!-- extensions -->
    <script type="text/javascript" src="script/ux/Portal.js"></script>
    <script type="text/javascript" src="script/ux/PortalColumn.js"></script>
    <script type="text/javascript" src="script/ux/Portlet.js"></script>

    <!-- page specific -->
	<script type="text/javascript" src="script/sample-grid.js"></script>
    <script type="text/javascript" src="script/shared/examples.js"></script>

	<script type="text/javascript" src="script/portal.js"></script>

</head>
<body></body>
</html>