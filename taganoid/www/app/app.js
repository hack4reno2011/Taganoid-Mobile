// http://wiki.phonegap.com/w/page/16494789/iPhone:-Camera-API


function tag_taganoid_picture() {
  navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI }); 
}

function onSuccess(imageData) {
  var image_fld = Ext.getCmp('image_base64');
  image_fld.setValue(imageData);
}

function onFail(message) {
  alert('Failed because: ' + message);
}

var form = new Ext.form.FormPanel({
    id: 'register',
	defaults: {
      labelAlign: 'left',
	  labelWidth: '40%'
	},
    items: [
        {
            xtype: 'textfield',
            name : 'entry[creator_name]',
            label: 'Your Name'
        },
        {
            xtype: 'textfield',
            name : 'entry[creator_number]',
            label: 'Your Contact Number'
        },
        {
            xtype: 'textfield',
            name : 'entry[notes]',
            label: 'Description'
        },
        {
            xtype: 'hiddenfield',
            name : 'entry[entry_type_id]',
            value : '1'
        },
        {
            xtype: 'hiddenfield',
            name : 'entry[status_id]',
            value : '1'
        },
        {
            xtype: 'hiddenfield',
            name : 'entry[group_id]',
            value : '1'
        },
        {
            xtype: 'hiddenfield',
            name : 'entry[latitude]',
            value : '39'
        },
        {
            xtype: 'hiddenfield',
            name : 'entry[longitude]',
            value : '119'
        },
        {
            xtype: 'hiddenfield',
			id : 'image_base64',
            name : 'entry[image_base64]'
        },      
        {
          xtype: 'button',
		  text: 'Take Picture',
		  scope: this,
		  margin: '20 0 20 0',
		  handler: function (b, e) { 
			var image_fld = Ext.getCmp('image_base64');
			image_fld.setValue(imageData);
		  }
        },
		{
          xtype: 'button',
		  text: 'Submit',
      	  scope: this,
      	  handler: function (b, e) {
            var form = Ext.getCmp('register');
            form.submit({
			  url: 'http://taganoid.herokuapp.com/entries',
              method: 'POST',
			  headers: {'Content-Type':'application/x-www-form-urlencoded'}, //headers: {'Content-Type':'multipart/form-data'},
              success: function (frm, res)  {
                alert('Form submitted!!');            
			  },
			  failure: function (frm, res) {
			    alert('Form no submit! ' + frm.responseText);
			  }
			});		  
		  }
	    }
    ]
});

Ext.regModel('Entry', {
    fields: [
        {name: 'entry_type_id', type: 'string'},
        {name: 'status_id', type: 'string'},
        {name: 'group_id', type: 'string'},
        {name: 'title', type: 'string'},
        {name: 'descr', type: 'string'},
        {name: 'latitude', type: 'string'},
        {name: 'longitude', type: 'string'},
        {name: 'creator_name', type: 'string'},
        {name: 'creator_number', type: 'string'}
    ]
});

var entry = Ext.ModelMgr.create({
    entry_type_id: '1',
    status_id: '1',
    group_id: '1',
    title: 'Wes Wall',
    descr: 'This is my wall',
    latitude: '39',
    longitude: '119',
    creator_name: 'Wes Hays',
    creator_number: '775-745-3013',
}, 'Entry');

form.load(entry);




new Ext.Application({
    launch: function() {
        new Ext.Panel({
            fullscreen: true,
            items: [ form ]
        });
    }
});

