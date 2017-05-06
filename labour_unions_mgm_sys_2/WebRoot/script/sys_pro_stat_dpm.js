Ext
		.onReady(function() {

			Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
			
			var dpm = 'submitter_dpm';

			var tools = [ {
				id : 'close',
				handler : function(e, target, panel) {
					panel.ownerCt.remove(panel, true);
				}
			} ];
			
			var viewport = new Ext.Viewport({
				
				listeners:{
					beforerender : function(){
						Ext.Ajax.request({
							url : '../sys_pro_stat/userAction_pro_stat_createBarChart',
							method : 'POST',
							params : {fields : dpm},
							success : function(response, options) {
							},
							failure : function(response, options) {
								Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：'
										+ response.status);
							}
						});
					}
					
				},
						layout : 'fit',
						items : [ {
							xtype : 'portal',
							region : 'center',
							margins : '35 5 5 0',
							items : [ {
								columnWidth : .9,
								style : 'padding:10px 0 10px 10px',
								items : [ {
									title : '提案统计',
									tools : tools,
									html : '<p align="center"><img alt="提案统计" src="../sys_pro/stat/chart_dpm.jpeg"></p>'
								} ]
							} ]
						} ]
					});

		});