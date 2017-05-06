
// JavaScript Document
// ----------------------重写文本框开始----------------------//
Ext.override(Ext.form.TextField, {
	unitText : '',
	onRender : function(ct, position) {
		Ext.form.TextField.superclass.onRender.call(this, ct, position);
		// 如果单位字符串已定义 则在后方增加单位对象
		if (this.unitText != '') {
			this.unitEl = ct.createChild({
						tag : 'div',
						html : this.unitText
					});
			this.unitEl.addClass('x-form-unit');
			// 增加单位名称的同时 按单位名称大小减少文本框的长度 初步考虑了中英文混排 未考虑为负的情况
			this.width = this.width
					- (this.unitText.replace(/[^\x00-\xff]/g, "xx").length * 6 + 2);
			// 同时修改错误提示图标的位置
			this.alignErrorIcon = function() {
				this.errorIcon.alignTo(this.unitEl, 'tl-tr', [2, 0]);
			};
		}
	}
});
// ----------------------重写文本框结束----------------------//
Ext.apply(Ext.form.VTypes, {
	'limit' : function(_v) {
		if (/^\d+$/.test(_v)) {// 判断必须是数字
			return true;
		}
		return false;
	},
	limitText : '必须输入数字', // 出错信息后的默认提示信息
	limitMask : /[0-9]/i
		// 键盘输入时的校验
	})
Ext.apply(Ext.form.VTypes, {
			daterange : function(val, field) {
				var date = field.parseDate(val);
				if (!date) {
					return;
				}
				if (field.startDateField
						&& (!this.dateRangeMax || (date.getTime() != this.dateRangeMax
								.getTime()))) {
					var start = Ext.getCmp(field.startDateField);
					start.setMaxValue(date);
					start.validate();
					this.dateRangeMax = date;
				} else if (field.endDateField
						&& (!this.dateRangeMin || (date.getTime() != this.dateRangeMin
								.getTime()))) {
					var end = Ext.getCmp(field.endDateField);
					end.setMinValue(date);
					end.validate();
					this.dateRangeMin = date;
				}
				return true;
			}
		});

Ext.onReady(function() {
	      Ext.QuickTips.init();
          Ext.form.Field.prototype.msgTarget = 'side';
	// 添加活动
	var huodongname = new Ext.form.TextField({
				width : 140,
				allowBlank : false,
				maxLength : 20,
				id : 'activity.name',
				name : 'activity.name',
				fieldLabel : '活动名称',
				blankText : '请输入活动名称',
				maxLengthText : '活动名称不能超过20个字符',
				listeners:{
					focus: function(){
						//获取焦点
						 Ext.get("msg").dom.innerHTML = ""
						}
					}
			});
	
	 var combostore = new Ext.data.ArrayStore({
         fields: ['id', 'name'],
         data: [[1, '全体教职工'], [2, '男性教职工'], [3, '女性教职工'], [4, '自由编辑']]
     });
     var combobox = new Ext.form.ComboBox({
         fieldLabel: '活动对象',
         id : 'activity.object',
		 name : 'activity.object',
         width : 140,
         store: combostore,
         displayField: 'name',
         valueField: 'id',
         triggerAction: 'all',
         emptyText: '请选择或者编辑',
         allowBlank: false,
         blankText: '请选择或编辑活动对象',
         mode: 'local'
     });
     
	var duixiang = new Ext.form.TextField({
				width : 140,
				allowBlank : false,
				id : 'activity.object',
				name : 'activity.object',
				fieldLabel : '对象',
				blankText : '请输入对象'
			});
	var time1 = new Ext.form.DateField({
				fieldLabel : '报名截止日期',
				format : 'Y-m-d',
				editable : false,
				width : 140,
				vtype : 'daterange',
				id : 'activity.deadLine',
				name : 'activity.deadLine',
				endDateField : 'activity.activityTime',
				allowBlank : false,
				blankText : '请选择日期'
			});
	var time2 = new Ext.form.DateField({
				fieldLabel : '活动日期',
				format : 'Y-m-d',
				editable : false,
				width : 140,
				vtype : 'daterange',
				id : 'activity.activityTime',
				name : 'activity.activityTime',
				startDateField : 'activity.deadLine',
				allowBlank : false,
				blankText : '请选择日期'
			});
	 var act_time_begin = new Ext.form.TimeField({
		 fieldLabel : '活动时间',
         increment: 10,                             //时间间隔
         invalidText: '请按照正确的时间格式输入！',    
         id : 'actTime',
		 //name : 'actTime',
         value: Ext.get('times'),
         autoShow: true,
         format: 'H:i',                                 //显示格式，H代表小时；i代表分钟；m代表秒
         width : 80,
     });
	 var checkbox2 = new Ext.form.Checkbox({  
		    id : 'checkbox2',
		    name: 'checkbox2', 
		    boxLabel: '自定义',
		    listeners: {
	            check: function (obj, ischecked) {
	                if (ischecked) {
	       	         Ext.getCmp('activity.activityTime').setDisabled(true);
	       	         Ext.getCmp('actTime').setDisabled(true);
	       	         Ext.getCmp('activity.actCustomtime').setDisabled(false);
	       	         Ext.getCmp('activity.actTime').setDisabled(true);
	                } else {
	                Ext.getCmp('activity.activityTime').setDisabled(false);
		       	    Ext.getCmp('actTime').setDisabled(false);
		       	    Ext.getCmp('activity.actCustomtime').setDisabled(true);
		       	    Ext.getCmp('activity.actTime').setDisabled(false);
	                }
	            }                 }
		});  
	 
	 var customtime = new Ext.form.TextField({
		 	fieldLabel : '自定义活动时间',
			width : 400,
			id : 'activity.actCustomtime',
			name : 'activity.actCustomtime',
		});
	 
	var actLocation = new Ext.form.TextField({
		width : 400,	
		id : 'activity.actLocation',
		name : 'activity.actLocation',
		//allowBlank : false,
		fieldLabel : '活动地点',
		blankText : '请输入地点'
	});
	var zysx = new Ext.form.TextArea({
				width : '90%',
				height : 65,
				id : 'activity.notes',
				name : 'activity.notes',
				allowBlank : false,
				fieldLabel : '注意事项',
				blankText : '请输入注意事项'
			});
	var rsxz = new Ext.form.NumberField({
				fieldLabel : '人数/单位数限制',
				width : 140,
				vtype : 'limit',
				vtypeText : '请输入数字',
				decimalPrecision : 0,
				id : 'activity.populationLimit',
				name : 'activity.populationLimit',
				allowBlank : false,
				blankText : '请输入人数限制，0表示无限制',
				minValue : 0,
				unitText : ' 人',
			});
	var checkbox = new Ext.form.Checkbox({  
	    id : 'checkbox',
	    name: 'checkbox', 
	    boxLabel: '无限制',
	    listeners: {
            check: function (obj, ischecked) {
                if (ischecked) {
                	var value="0";
       	         Ext.getCmp('activity.populationLimit').setValue(value);
       	         Ext.getCmp('activity.populationLimit').setDisabled(true);
                } else {
                	var value="";
       	         Ext.getCmp('activity.populationLimit').setValue(value);
       	         Ext.getCmp('activity.populationLimit').setDisabled(false);
                }
            }                 }
	});  
	
	var file = new Ext.form.TextField({
		fieldLabel : '附件',
		name : 'file',
		allowBlank : true,
		msgTarget : 'under',
		validator : function(value) {
			if (value != "") {
				var arr = value.split('.');
				// doc,docx两种格式均可 by xupk
				if (arr[arr.length - 1] != 'doc'
						&& arr[arr.length - 1] != 'docx'
							&& arr[arr.length - 1] != 'xls'
								&& arr[arr.length - 1] != 'xlsx') {
					return '文件不合法，请上传word文件或Excel文件';
				} else {
					return true;
				}
			}else{
				return true;
			}
		},
		inputType : 'file'// 文件类型
	});
	var hdlx = new Ext.form.RadioGroup({
				fieldLabel : '活动类型',
				width : 150,
				id : 'act_type',
				name : 'act_type',
				allowBlank : false,
				blankText : '请选择活动类型',
				items : [{
							name : 'xxx',
							inputValue : '个人',
							boxLabel : '个人'
						}, {
							name : 'xxx',
							inputValue : '集体',
							boxLabel : '集体'
						}]
			});
	//----------------------下拉列表开始----------------------//
    //创建数据源[数组数据源]
    var combostore2 = new Ext.data.Store({
    	autoLoad:true,  
        //url : "../sys_act/adminAction_act_findAllActivityGroup",  
    	proxy: new Ext.data.HttpProxy({
    		url : "../sys_act/adminAction_act_findAllActivityGroup",  //这里是参数可以顺便写,这个数据源是在第一个下拉框select的时候load的
        }),
        reader: new Ext.data.JsonReader({
        	totalProperty : 'totalProperty',
			root : 'root'
        },[{
					name : 'activities'
				}, {
					name : 'applyLimit'
				}, {
					name : 'groupName'
				},{
					name : 'id'
				}])
    });
    //创建Combobox
    var combobox2 = new Ext.form.ComboBox({
        fieldLabel: '活动分组',	
        width : 140,
        store: combostore2,
       // id : 'activityGroupID',
		//name : 'activityGroupID',
		hiddenName:'activityGroupID',
        displayField: 'groupName',
        valueField: 'id',
        triggerAction: 'all',
        emptyText: '请选择...',
        blankText: '请选择活动分组',
        editable: false,
        
    });
    //Combobox获取值
   // combobox2.on('select', function () {
   //     alert(combobox2.getValue());
   //});
    //----------------------下拉列表结束----------------------//
	var sure1 = new Ext.Button({
				text : '确定',
				handler : function() {
					//alert(act_time_begin.getValue());
					//将人数限制输入框解除禁用，提交表单时就能提交限制人数的数目
					Ext.getCmp('activity.populationLimit').setDisabled(false);
					// 这里的作用是将radiogroup的值获取并传到隐藏域, 和将活动时间的值传到隐藏域
					
					if (form.getForm().isValid()) {
						form.getForm().findField('activity.activityType')
						.setValue(hdlx.getValue().inputValue);
						if(Ext.getCmp('activity.activityTime').isValid()){
						form.getForm().findField('activity.actTime')
						.setValue(act_time_begin.getValue()+":00");
						if(Ext.getCmp('activity.activityTime').isValid()){
							
						}
						}
						//alert(form.getForm().findField('activity.actTime').getValue()+":00");
						form.getForm().submit({
									// waitTitle : '请稍后',
									// waitMsg : '正在上传文档文件 ...',
									success : function(form, response) {
										Ext.getCmp('form').form.reset();
										// 添加活动成功后，清除已填入的数据，防止多次提交
										Ext.get("msg").dom.innerHTML = "成功";

									},
									failure : function() {
										Ext.get("msg").dom.innerHTML = "失败，请与管理员联系";
									}
								});
					}
				}
			});
	var reset1 = new Ext.Button({
				text : '重置',
				handler : function() {
					form.getForm().reset();
				}
	});
	
	var column1 = {
            layout: 'column',
            items: [{
                layout: 'form',
                width : 280,	
                items: [time2]
            }, {
            	layout: 'form',
            	labelWidth : 60,
                items: [act_time_begin]
            },
            {
            	layout: 'form',
            	labelWidth : 20,
                items: [checkbox2]
            }]
        };

	var column2 = {
            layout: 'column',
            items: [{
                layout: 'form',
                items: [rsxz]
            }, {
            	layout: 'column',
                items: [{
                    html: '<div style="padding:8px"></div>',
                },{
                    items:[{
                        html: '<div style="padding:2px"></div>',
                    },checkbox,]
                }]
            }]
        };
	var form = new Ext.form.FormPanel({
				renderTo : 'mainform',
				frame : true,
				id : 'form',
				name : 'form',
				url : '../sys_act/adminAction_act_addActivity',//
				// fileUploadServlet
				width : '100%',
				html : '<div id="msg" class="tipmsg"></div>',
				height : '100%',
				fileUpload : true,
				// radioGroup不能直接将值传给action所以我在这里添加了一个隐藏域来传值
				items : [huodongname, combobox, time1, time2,column1,customtime,actLocation,zysx,column2,hdlx,combobox2,file,
						{
							xtype : 'hidden',
							id : 'activity.activityType',
							name : 'activity.activityType'
						},
						{
							xtype : 'hidden',
							id : 'activity.actTime',
							name : 'activity.actTime'
						}],
				buttons : [sure1, reset1]
			});
	var win = new Ext.Window({
				title : '添加活动',
				resizable : true,
				width : '80%',
				y: 2, //窗口的初始化Y坐标强制为2，以防窗口太大被标题遮盖
				shadow : true,
				modal : false,
				maximizable : true,
				closable : true,
				items : form
			});
	Ext.getCmp('activity.actCustomtime').setDisabled(true);
	win.show();

});
