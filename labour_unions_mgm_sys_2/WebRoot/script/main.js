Ext
		.onReady(function() {
			// 用于获取request发来的权限参数信息
			function request(strParame) {
				var args = new Object();
				var query = location.search.substring(1);

				var pairs = query.split("&"); // Break at ampersand
				for (var i = 0; i < pairs.length; i++) {
					var pos = pairs[i].indexOf('=');
					if (pos == -1)
						continue;
					var argname = pairs[i].substring(0, pos);
					var value = pairs[i].substring(pos + 1);
					value = decodeURIComponent(value);
					args[argname] = value;
				}
				return args[strParame];
			}

			var accordion = new Ext.Panel(
					{
						region : 'west',
						renderTo : Ext.get('main.sidebar'),
						title : '菜单栏',
						width : 250,
						collapsible : true,
						layoutConfig : {
							animate : true
						},
						defaults : {
							// 这个的功能是默认让所有的选项都是折叠的,不打开的,打开后才能显示功能.如需展开指定功能,通过17行的方法来动态展开即可.
							collapsed : true,
							hidden : true
						},
						defaultType : 'panel',
						layout : 'accordion',
						listeners : {
							// 这里是渲染画面之前出发的动作,在此处发送ajax请求获取权限信息来显示对应的功能
							beforerender : function() {
								var params = request('roles');
								// alert(params);
								var roles = new Array();
								roles = params.split(",");
								// 根据用户角色动态显示页面，用Case无法实现分会管理员查看集体活动页面的功能，改成if判断
								// modify by xupk

								// 管理员角色
								if (roles.indexOf("ROLE_ADMIN") > -1) {
									// 显示会员子系统
									Ext.getCmp('sys_mb').setVisible(true);
									// 显示活动子系统
									Ext.getCmp('sys_act_admin')
											.setVisible(true);
									// 显示添加活动页面
									Ext.getCmp('act_add').setVisible(true);
									// 显示修改活动页面
									Ext.getCmp('act_query&update').setVisible(
											true);
									// 显示导出活动页面
									Ext.getCmp('sys_act_admin_report')
											.setVisible(true);
								}

								// 会员角色
								if (roles.indexOf("ROLE_MEMBER") > -1
										&& roles.indexOf("ROLE_ORG_ADMIN") == -1) {
									// 显示活动子系统
									Ext.getCmp('sys_act_mb').setVisible(true);
									// 显示会员报名活动页面
									Ext.getCmp('act_sign_up_mb').setVisible(
											true);
									// 显示会员查看报名结果页面
									Ext.getCmp('act_sign_up_result')
											.setVisible(true);
									// 活动子系统包括集体活动报名页面，分会管理员才能显示集体报名页面，所以设置为不可见
									Ext.getCmp('act_sign_up_team').setVisible(
											false);
								}

								// 分会负责人/分会管理员角色
								if (roles.indexOf("ROLE_ORG_ADMIN") > -1) {
									// 显示活动子系统
									Ext.getCmp('sys_act_mb').setVisible(true);
									// 显示会员报名活动页面
									Ext.getCmp('act_sign_up_mb').setVisible(
											true);
									// 因为分会管理员也是会员，所以只用显示集体报名页面
									Ext.getCmp('act_sign_up_team').setVisible(
											true);
									// 显示会员查看报名结果页面
									Ext.getCmp('act_sign_up_result')
											.setVisible(true);
								}

								// 提案委员会委员
								if (roles.indexOf("ROLE_PROPOSAL_COMMETTIE") > -1
										&& roles.indexOf("ROLE_PROPOSAL_CHIEF") == -1) {
									// 显示提案子系统之提案委员会审核
									Ext.getCmp('sys_cmmt_proposal').setVisible(
											true);
									Ext.getCmp('pro_approval_chief')
											.setVisible(false);
								}

								// 提案委员会主席
								if (roles.indexOf("ROLE_PROPOSAL_CHIEF") > -1
										&& roles
												.indexOf("ROLE_PROPOSAL_COMMETTIE") == -1) {
									// 显示提案子系统之提案委员会主席审核
									Ext.getCmp('sys_cmmt_proposal').setVisible(
											true);
									Ext.getCmp('pro_approval_mb').setVisible(
											false);
								}

								// 既是委员会委员，又是委员会主席
								if (roles.indexOf("ROLE_PROPOSAL_COMMETTIE") > -1
										&& roles.indexOf("ROLE_PROPOSAL_CHIEF") > -1) {
									// 显示提案子系统之提案委员会主席审核
									Ext.getCmp('sys_cmmt_proposal').setVisible(
											true);
								}

								// 提案代表
								if (roles.indexOf("ROLE_PROPOSAL_DELEGATE") > -1) {
									// 显示提案子系统之代表提案
									Ext.getCmp('sys_rep_proposal').setVisible(
											true);
								}

								// 提案办理部门
								if (roles.indexOf("ROLE_PROPOSAL_ORG") > -1) {
									// 显示提案子系统之部门办理提案
									Ext.getCmp('sys_dpt_handle_proposal')
											.setVisible(true);
								}

								// 分管校领导
								if (roles.indexOf("ROLE_HEADMASTER") > -1) {
									// 显示提案子系统之校领导审核查阅
									Ext.getCmp('sys_leader_review_proposal')
											.setVisible(true);
								}
							}
						},
						items : [
								{
									id : 'sys_mb',
									name : 'sys_mb',
									title : '会员信息管理',
									defaultType : 'button',
									defaults : {
										width : 245
									},
									items : [
											{
												text : '会员信息导入',
												// member infomation collections
												id : 'mb_info_col',
												name : 'mb_info_col',
												listeners : {
													'click' : function() {
														var tab_mb_info_col = Ext
																.getCmp('tab_mb_info_col');
														if (tab_mb_info_col)
															tabPanel
																	.setActiveTab('tab_mb_info_col');
														else {
															tabPanel
																	.add(
																			{
																				title : '会员信息导入',
																				closable : true,
																				id : 'tab_mb_info_col',
																				name : 'tab_mb_info_col',
																				width : '100%',
																				height : '100%',
																				layout : 'fit',
																				renderTo : Ext
																						.get('main.content'),
																				// src下填写的应该是对应子系统的jsp页面
																				html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="./sys_mb/add_member.jsp"></iframe>'
																			})
																	.show();
														}
													}
												}
											},
											{
												text : '会员信息导出',
												// member data opearation
												id : 'mb_data_op',
												name : 'mb_data_op',
												listeners : {
													'click' : function() {
														var tab_mb_data_op = Ext
																.getCmp('tab_mb_data_op');
														if (tab_mb_data_op)
															tabPanel
																	.setActiveTab('tab_mb_data_op');
														else {
															tabPanel
																	.add(
																			{
																				title : '会员信息导出',
																				closable : true,
																				id : 'tab_mb_data_op',
																				name : 'tab_mb_data_op',
																				layout : 'form',
																				// src下填写的应该是对应子系统的jsp页面
																				html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="./sys_mb/export_member.jsp"></iframe>'
																			})
																	.show();
														}
													}
												}
											},
											{
												text : '会员权限修改',
												// member information
												// modification
												id : 'mb_info_mdf',
												name : 'mb_info_mdf',
												listeners : {
													'click' : function() {
														var tab_mb_info_mdf = Ext
																.getCmp('tab_mb_info_mdf');
														if (tab_mb_info_mdf)
															tabPanel
																	.setActiveTab('tab_mb_info_mdf');
														else {
															tabPanel
																	.add(
																			{
																				title : '会员权限修改',
																				closable : true,
																				id : 'tab_mb_info_mdf',
																				name : 'tab_mb_info_mdf',
																				layout : 'form',
																				// src下填写的应该是对应子系统的jsp页面
																				html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="./sys_mb/mdf_mb_info.jsp"></iframe>'
																			})
																	.show();
														}
													}
												}
											} ]
								},
								{
									id : 'sys_act_admin',
									name : 'sys_act_admin',
									title : '活动管理',
									defaultType : 'button',
									defaults : {
										width : 245,
										hidden : true
									},
									// hidden : true,
									items : [
											{
												text : '添加新活动',
												id : 'act_add',
												name : 'act_add',
												listeners : {
													'click' : function() {
														var tab_act_add = Ext
																.getCmp('tab_act_add');
														if (tab_act_add)
															tabPanel
																	.setActiveTab('tab_act_add');
														else {
															tabPanel
																	.add(
																			{
																				title : '添加新活动',
																				closable : true,
																				id : 'tab_act_add',
																				name : 'tab_act_add',
																				width : '100%',
																				height : '100%',
																				layout : 'fit',
																				renderTo : Ext
																						.get('main.content'),
																				// src下填写的应该是对应子系统的jsp页面
																				html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="sys_act/add_act.jsp"></iframe>'
																			})
																	.show();
														}
													}
												}
											},
											{
												text : '查询和修改活动',
												id : 'act_query&update',
												name : 'act_query&update',
												listeners : {
													'click' : function() {
														var tab_act_query = Ext
																.getCmp('tab_act_query');
														if (tab_act_query)
															tabPanel
																	.setActiveTab('tab_act_query');
														else {
															tabPanel
																	.add(
																			{
																				title : '查询和修改活动',
																				closable : true,
																				id : 'tab_act_query',
																				name : 'tab_act_query',
																				layout : 'form',
																				// src下填写的应该是对应子系统的jsp页面
																				html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="sys_act/mdf_act.jsp"></iframe>'
																			})
																	.show();
														}
													}
												}
											},
											{

												text : '汇总活动报名表',
												id : 'sys_act_admin_report',
												name : 'sys_act_admin_report',
												listeners : {
													'click' : function() {
														var tab_act_export = Ext
																.getCmp('tab_act_export');
														if (tab_act_export)
															tabPanel
																	.setActiveTab('tab_act_export');
														else {
															tabPanel
																	.add(
																			{
																				title : '导出活动汇总表',
																				closable : true,
																				id : 'tab_act_export',
																				name : 'tab_act_export',
																				layout : 'form',
																				// src下填写的应该是对应子系统的jsp页面
																				html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="sys_act/export_act.jsp"></iframe>'
																			})
																	.show();
														}
													}
												}

											} ]
								},
								{
									id : 'sys_act_mb',
									name : 'sys_act_mb',
									title : '活动报名',
									defaultType : 'button',
									defaults : {
										width : 245
									},
									hidden : true,
									items : [
											{
												text : '个人活动报名',
												// 会员只能报名个人活动
												id : 'act_sign_up_mb',
												name : 'act_sign_up_mb',
												listeners : {
													'click' : function() {
														var tab_act_sign_up_mb = Ext
																.getCmp('tab_act_sign_up_mb');
														if (tab_act_sign_up_mb)
															tabPanel
																	.setActiveTab('tab_act_sign_up_mb');
														else {
															tabPanel
																	.add(
																			{
																				title : '个人活动报名',
																				closable : true,
																				id : 'tab_act_sign_up_mb',
																				name : 'tab_act_sign_up_mb',
																				layout : 'form',
																				// src下填写的应该是对应子系统的jsp页面
																				html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="sys_act/act_sign_up_mb.jsp"></iframe>'
																			})
																	.show();
														}
													}
												}
											},
											{
												text : '集体活动报名',
												// 分会负责人报名集体活动
												id : 'act_sign_up_team',
												name : 'act_sign_up_team',
												listeners : {
													'click' : function() {
														var tab_act_sign_up_team = Ext
																.getCmp('tab_act_sign_up_team');
														if (tab_act_sign_up_team)
															tabPanel
																	.setActiveTab('tab_act_sign_up_team');
														else {
															tabPanel
																	.add(
																			{
																				title : '集体活动报名',
																				closable : true,
																				id : 'tab_act_sign_up_team',
																				name : 'tab_act_sign_up_team',
																				layout : 'form',
																				// src下填写的应该是对应子系统的jsp页面
																				html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="sys_act/act_sign_up_team.jsp"></iframe>'
																			})
																	.show();
														}
													}
												}
											},
											{
												text : '查看活动报名结果',
												// 会员和工会负责人的报名结果放在一起
												id : 'act_sign_up_result',
												name : 'act_sign_up_result',
												listeners : {
													'click' : function() {
														var tab_act_sign_up_result = Ext
																.getCmp('tab_act_sign_up_result');
														if (tab_act_sign_up_result)
															tabPanel
																	.setActiveTab('tab_act_sign_up_result');
														else {
															tabPanel
																	.add(
																			{
																				title : '查看活动报名结果',
																				closable : true,
																				id : 'tab_act_sign_up_result',
																				name : 'tab_act_sign_up_result',
																				layout : 'form',
																				// src下填写的应该是对应子系统的jsp页面
																				html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="sys_act/act_sign_up_result.jsp"></iframe>'
																			})
																	.show();
														}
													}
												}
											} ]
								},
								{
									id : 'sys_rep_proposal',
									name : 'sys_rep_proposal',
									// Representative proposal
									title : '代表提案',
									defaultType : 'button',
									defaults : {
										width : 245
									},
									items : [
											{
												text : '添加提案',
												id : 'pro_add',
												name : 'pro_add',
												listeners : {
													'click' : function() {
														var tab_pro_add = Ext
																.getCmp('tab_pro_add');
														if (tab_pro_add)
															tabPanel
																	.setActiveTab('tab_pro_add');
														else {
															tabPanel
																	.add(
																			{
																				title : '添加提案',
																				closable : true,
																				id : 'tab_pro_add',
																				name : 'tab_pro_add',
																				width : '100%',
																				height : '100%',
																				layout : 'form',
																				renderTo : Ext
																						.get('main.content'),
																				// src下填写的应该是对应子系统的jsp页面
																				html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="sys_pro/dlg_submit.jsp"></iframe>'
																			})
																	.show();
														}
													}
												}
											},
											{
												text : '提案跟踪',
												id : 'pro_track',
												name : 'pro_track',
												listeners : {
													'click' : function() {
														var tab_pro_track = Ext
																.getCmp('tab_pro_track');
														if (tab_pro_track)
															tabPanel
																	.setActiveTab('tab_pro_track');
														else {
															tabPanel
																	.add(
																			{
																				title : '提案跟踪',
																				closable : true,
																				id : 'tab_pro_track',
																				name : 'tab_pro_track',
																				layout : 'form',
																				// src下填写的应该是对应子系统的jsp页面
																				html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="sys_pro/dlg_track.jsp"></iframe>'
																			})
																	.show();
														}
													}
												}
											},
											{
												text : '提案查询',
												id : 'pro_query',
												name : 'pro_query',
												listeners : {
													'click' : function() {
														var tab_pro_query = Ext
																.getCmp('tab_pro_query');
														if (tab_pro_query)
															tabPanel
																	.setActiveTab('tab_pro_query');
														else {
															tabPanel
																	.add(
																			{
																				title : '提案查询',
																				closable : true,
																				id : 'tab_pro_query',
																				name : 'tab_pro_query',
																				layout : 'form',
																				// src下填写的应该是对应子系统的jsp页面
																				html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="sys_pro/dlg_query.jsp"></iframe>'
																			})
																	.show();
														}
													}
												}
											} ]
								},
								{
									id : 'sys_cmmt_proposal',
									name : 'sys_cmmt_proposal',
									// Proposal Committee audit
									title : '提案委员会审核',
									defaultType : 'button',
									defaults : {
										width : 245
									},
									items : [
											{
												text : '委员阅办提案',
												id : 'pro_approval_mb',
												name : 'pro_approval_mb',
												listeners : {
													'click' : function() {
														var tab_pro_approval_mb = Ext
																.getCmp('tab_pro_approval_mb');
														if (tab_pro_approval_mb)
															tabPanel
																	.setActiveTab('tab_pro_approval_mb');
														else {
															tabPanel
																	.add(
																			{
																				title : '阅办提案',
																				closable : true,
																				id : 'tab_pro_approval_mb',
																				name : 'tab_pro_approval_mb',
																				layout : 'form',
																				// src下填写的应该是对应子系统的jsp页面
																				html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="sys_pro/cmt_approval_mb.jsp"></iframe>'
																			})
																	.show();
														}
													}
												}
											},
											{
												text : '委员会主席审核提案',
												id : 'pro_approval_chief',
												name : 'pro_approval_chief',
												listeners : {
													'click' : function() {
														var tab_pro_approval_chief = Ext
																.getCmp('tab_pro_approval_chief');
														if (tab_pro_approval_chief)
															tabPanel
																	.setActiveTab('tab_pro_approval_chief');
														else {
															tabPanel
																	.add(
																			{
																				title : '审核提案',
																				closable : true,
																				id : 'tab_pro_approval_chief',
																				name : 'tab_pro_approval_chief',
																				layout : 'form',
																				// src下填写的应该是对应子系统的jsp页面
																				html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="sys_pro/cmt_approval_chief.jsp"></iframe>'
																			})
																	.show();
														}
													}
												}
											},
											{
												text : '提案跟踪',
												id : 'pro_cmmt_track',
												name : 'pro_cmmt_track',
												listeners : {
													'click' : function() {
														var tab_pro_cmmt_track = Ext
																.getCmp('tab_pro_cmmt_track');
														if (tab_pro_cmmt_track)
															tabPanel
																	.setActiveTab('tab_pro_cmmt_track');
														else {
															tabPanel
																	.add(
																			{
																				title : '提案跟踪',
																				closable : true,
																				id : 'tab_pro_cmmt_track',
																				name : 'tab_pro_cmmt_track',
																				layout : 'form',
																				// src下填写的应该是对应子系统的jsp页面
																				html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="sys_pro/cmt_track.jsp"></iframe>'
																			})
																	.show();
														}
													}
												}
											},
											{
												text : '提案输出',
												id : 'pro_export',
												name : 'pro_export',
												listeners : {
													'click' : function() {
														var tab_pro_export = Ext
																.getCmp('tab_pro_export');
														if (tab_pro_export)
															tabPanel
																	.setActiveTab('tab_pro_export');
														else {
															tabPanel
																	.add(
																			{
																				title : '提案输出',
																				closable : true,
																				id : 'tab_pro_export',
																				name : 'tab_pro_export',
																				layout : 'form',
																				// src下填写的应该是对应子系统的jsp页面
																				html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="sys_pro/cmt_export.jsp"></iframe>'
																			})
																	.show();
														}
													}
												}
											},
											/*d by yattie 暂不使用*/
											/*{
												text : '按照所在单位（部门）统计',
												id : 'pro_stat_dpm',
												name : 'pro_stat_dpm',
												listeners : {
													'click' : function() {
														var tab_pro_stat_dpm = Ext
																.getCmp('tab_pro_stat_dpm');
														if (tab_pro_stat_dpm)
															tabPanel
																	.setActiveTab('tab_pro_stat_dpm');
														else {
															tabPanel
																	.add(
																			{
																				title : '按照所在单位（部门）统计',
																				closable : true,
																				id : 'tab_pro_stat_dpm',
																				name : 'tab_pro_stat_dpm',
																				layout : 'form',
																				// src下填写的应该是对应子系统的jsp页面
																				html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="sys_pro/stat_dpm.jsp"></iframe>'
																			})
																	.show();
														}
													}
												}
											},
											{
												text : '按照提案类别统计',
												id : 'pro_stat_type',
												name : 'pro_stat_type',
												listeners : {
													'click' : function() {
														var tab_pro_stat_type = Ext
																.getCmp('tab_pro_stat_type');
														if (tab_pro_stat_type)
															tabPanel
																	.setActiveTab('tab_pro_stat_type');
														else {
															tabPanel
																	.add(
																			{
																				title : '按照提案类别统计',
																				closable : true,
																				id : 'tab_pro_stat_type',
																				name : 'tab_pro_stat_type',
																				layout : 'form',
																				// src下填写的应该是对应子系统的jsp页面
																				html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="sys_pro/stat_type.jsp"></iframe>'
																			})
																	.show();
														}
													}
												}
											},*/
											{
												text : '提案统计输出',
												id : 'pro_stat_export',
												name : 'pro_stat_export',
												listeners : {
													'click' : function() {
														var tab_pro_stat_export = Ext
																.getCmp('tab_pro_stat_export');
														if (tab_pro_stat_export)
															tabPanel
																	.setActiveTab('tab_pro_stat_export');
														else {
															tabPanel
																	.add(
																			{
																				title : '提案统计输出',
																				closable : true,
																				id : 'tab_pro_stat_export',
																				name : 'tab_pro_stat_export',
																				layout : 'form',
																				// src下填写的应该是对应子系统的jsp页面,stat:statistic
																				html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="sys_pro/cmt_stat_export.jsp"></iframe>'
																			})
																	.show();
														}
													}
												}
											} ]
								},
								{
									id : 'sys_dpt_handle_proposal',
									name : 'sys_dpt_handle_proposal',
									// Department handling proposal
									title : '部门办理提案',
									defaultType : 'button',
									defaults : {
										width : 245
									},
									items : [ {
										text : '查阅提案',
										id : 'pro_dpt_review',
										name : 'pro_dpt_review',
										listeners : {
											'click' : function() {
												var tab_pro_dpt_review = Ext
														.getCmp('tab_pro_dpt_review');
												if (tab_pro_dpt_review)
													tabPanel
															.setActiveTab('tab_pro_dpt_review');
												else {
													tabPanel
															.add(
																	{
																		title : '查阅提案',
																		closable : true,
																		id : 'tab_pro_dpt_review',
																		name : 'tab_pro_dpt_review',
																		layout : 'form',
																		// src下填写的应该是对应子系统的jsp页面
																		html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="sys_pro/dpm_approve.jsp"></iframe>'
																	}).show();
												}
											}
										}
									} ]
								},
								{
									id : 'sys_leader_review_proposal',
									name : 'sys_leader_review_proposal',
									// Leadership audit review proposal
									title : '校领导审核查阅',
									defaultType : 'button',
									defaults : {
										width : 245
									},
									items : [
											{
												text : '审核部门答复',
												id : 'pro_leader_audit',
												name : 'pro_leader_audit',
												listeners : {
													'click' : function() {
														var tab_pro_leader_audit = Ext
																.getCmp('tab_pro_leader_audit');
														if (tab_pro_leader_audit)
															tabPanel
																	.setActiveTab('tab_pro_leader_audit');
														else {
															tabPanel
																	.add(
																			{
																				title : '审核部门答复',
																				closable : true,
																				id : 'tab_pro_leader_audit',
																				name : 'tab_pro_leader_audit',
																				layout : 'form',
																				// src下填写的应该是对应子系统的jsp页面
																				html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="sys_pro/ld_approve.jsp"></iframe>'
																			})
																	.show();
														}
													}
												}
											},
											{
												text : '查阅提案',
												id : 'pro_leader_review',
												name : 'pro_leader_review',
												listeners : {
													'click' : function() {
														var tab_pro_leader_review = Ext
																.getCmp('tab_pro_leader_review');
														if (tab_pro_leader_review)
															tabPanel
																	.setActiveTab('tab_pro_leader_review');
														else {
															tabPanel
																	.add(
																			{
																				title : '查阅提案',
																				closable : true,
																				id : 'tab_pro_leader_review',
																				name : 'tab_pro_leader_review',
																				layout : 'form',
																				// src下填写的应该是对应子系统的jsp页面
																				html : '<iframe width="100%" height="100%" scrolling="true"  frameborder=0 src="sys_pro/ld_track.jsp"></iframe>'
																			})
																	.show();
														}
													}
												}
											} ]
								}, {
									id : '',
									name : '',
									title : 'empty',

									defaultType : 'button',
									defaults : {
										width : 245
									},
									items : [ {
										text : 'empty'
									} ]
								} ]
					});
			// var tabPanel = new Ext.TabPanel({
			// // layout: 'fit',
			// title : 'tabPanel',
			// region : 'center',
			// activeTab : 0,
			// // width : 500,
			// // height : 500,
			// width : '100%',
			// height : '100%',
			// items : [{
			// title : '欢迎页',
			// closable : true,
			// html : '<iframe scrolling="auto" frameborder="0" width="100%"
			// height="100%" src="welcome.jsp"> </iframe>'
			//
			// }, {
			// id : 'sys_act_mb',
			// name : 'sys_act_mb',
			// title : '活动报名',
			// defaultType : 'button',
			// defaults : {
			// width : 245
			// },
			// hidden : true,
			// items : [{
			// text : '个人活动报名',
			// // 会员只能报名个人活动
			// id : 'act_sign_up_mb',
			// name : 'act_sign_up_mb',
			// listeners : {
			// 'click' : function() {
			// var tab_act_sign_up_mb = Ext
			// .getCmp('tab_act_sign_up_mb');
			// if (tab_act_sign_up_mb)
			// tabPanel.setActiveTab('tab_act_sign_up_mb');
			// else {
			// tabPanel.add({
			// title : '活动报名',
			// closable : true,
			// id : 'tab_act_sign_up_mb',
			// name : 'tab_act_sign_up_mb',
			// layout : 'form',
			// // src下填写的应该是对应子系统的jsp页面
			// html : '<iframe width="100%" height="100%" scrolling="true"
			// frameborder=0
			// src="sys_act/app_act.jsp"></iframe>'
			// }).show();
			// }
			// }
			// }
			// }, {
			// text : '集体活动报名',
			// // 分会负责人报名集体活动
			// id : 'act_sign_up_team',
			// name : 'act_sign_up_team',
			// listeners : {
			// 'click' : function() {
			// var tab_act_sign_up_team = Ext
			// .getCmp('tab_act_sign_up_team');
			// if (tab_act_sign_up_team)
			// tabPanel.setActiveTab('tab_act_sign_up_team');
			// else {
			// tabPanel.add({
			// title : '集体活动报名',
			// closable : true,
			// id : 'tab_act_sign_up_team',
			// name : 'tab_act_sign_up_team',
			// layout : 'form',
			// // src下填写的应该是对应子系统的jsp页面
			// html : '<iframe width="100%" height="100%" scrolling="true"
			// frameborder=0
			// src="XXXXXXXX.jsp"></iframe>'
			// }).show();
			// }
			// }
			// }
			// }, {
			// text : '查看活动报名结果',
			// // 会员和工会负责人的报名结果放在一起
			// id : 'act_sign_up_result',
			// name : 'act_sign_up_result',
			// listeners : {
			// 'click' : function() {
			// var tab_act_sign_up_result = Ext
			// .getCmp('tab_act_sign_up_result');
			// if (tab_act_sign_up_result)
			// tabPanel.setActiveTab('tab_act_sign_up_result');
			// else {
			// tabPanel.add({
			// title : '查看活动报名结果',
			// closable : true,
			// id : 'tab_act_sign_up_result',
			// name : 'tab_act_sign_up_result',
			// layout : 'form',
			// // src下填写的应该是对应子系统的jsp页面
			// html : '<iframe width="100%" height="100%" scrolling="true"
			// frameborder=0
			// src="XXXXXXXX.jsp"></iframe>'
			// }).show();
			// }
			// }
			// }
			// }]
			// }, {
			// id : 'sys_proposal',
			// name : 'sys_proposal',
			// title : '教代会提案管理',
			// hidden : true,
			// defaultType : 'button',
			// defaults : {
			// width : 245
			// },
			// items : [{
			// text : 'empty'
			// }]
			// }, {
			// id : '',
			// name : '',
			// title : 'empty',
			// hidden : true,
			// defaultType : 'button',
			// defaults : {
			// width : 245
			// },
			// items : [{
			// text : 'empty'
			// }]
			// }]
			// });
			var tabPanel = new Ext.TabPanel(
					{
						// layout: 'fit',
						title : 'tabPanel',
						region : 'center',
						activeTab : 0,
						// width : 500,
						// height : 500,
						width : '100%',
						height : '100%',
						items : [ {
							title : '欢迎页',
							closable : true,
							html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="welcome.jsp"> </iframe>'
						} ]
					})
			var toolbarpanel = new Ext.Panel(
					{
						height : 128,
						collapsible : true,
						title : '',
						region : 'north',
						renderTo : Ext.get('main.header'),
						html : '<iframe margin="100" scrolling="no" frameborder="0" width="100%" src="top.jsp"> </iframe>'

					});

			var viewport = new Ext.Viewport({
				layout : 'border',
				items : [ accordion, tabPanel, toolbarpanel ]
			});
		});