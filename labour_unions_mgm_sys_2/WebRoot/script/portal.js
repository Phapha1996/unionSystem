/*!
 * Ext JS Library 3.2.0
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.onReady(function(){

    // NOTE: This is an example showing simple state management. During development,
    // it is generally best to disable state management as dynamically-generated ids
    // can change across page loads, leading to unpredictable results.  The developer
    // should ensure that stable state ids are set for stateful components in real apps.
    Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

    // create some portlet tools using built in Ext tool ids
    var tools = [{
        id:'close',
        handler: function(e, target, panel){
            panel.ownerCt.remove(panel, true);
        }
    }];

    var viewport = new Ext.Viewport({
        layout:'fit',
        items:[{
            xtype:'portal',
            region:'center',
            margins:'35 5 5 0',
            items:[{
                columnWidth:.9,
                style:'padding:10px 0 10px 10px',
                items:[{
                    title: '系统概览',
                    tools: tools,
                    html: '<p align="center"><img alt="系统概览" src="img/sysintro.png"></p>'
                }]
            }]
           
            /*
             * Uncomment this block to test handling of the drop event. You could use this
             * to save portlet position state for example. The event arg e is the custom 
             * event defined in Ext.ux.Portal.DropZone.
             */
//            ,listeners: {
//                'drop': function(e){
//                    Ext.Msg.alert('Portlet Dropped', e.panel.title + '<br />Column: ' + 
//                        e.columnIndex + '<br />Position: ' + e.position);
//                }
//            }
        }]
    });
});

