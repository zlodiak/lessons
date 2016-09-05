/************************************************/
/* IPB3 Javascript															*/
/* -------------------------------------------- */
/* ritsu_hide_text.js - Hidden text							*/
/* (c) Ritsuka, 2010														*/
/* -------------------------------------------- */
/* Author: Aoyagi Ritsuka												*/
/************************************************/

var _hide = window.IPBoard;

_hide.prototype.hide = {

	stop: 0,
	hides: [],
	
	init: function()
	{
		
		document.observe("dom:loaded", function(){			
				ipb.hide.renew_all();			
		});

    Ajax.Responders.register({
        onComplete: function() {
            var request = arguments[0];
            if(!request.parameters.noupdate) ipb.hide.renew_all();
        }
    });	
	},

  renew_all: function()
  {
	    var f = $$('div .ristu_hide_text'); 
			var s = '';

	    for(var i=0; i<f.length; i++)
      {
           s += f[i].id.replace(/hide_/i, "") + '.';
      }

      if(s != '')
      {

    		var url = ipb.vars['base_url'] + 'app=forums&module=ajax&secure_key=' + ipb.vars['secure_hash'] + '&section=ritsu_hide_text&do=load_data';
    		new Ajax.Request(	url, {
								  method: 'post',
								  evalJSON: 'force',
								  encoding: ipb.vars['charset'],
								  parameters: {
									  md5check: 			ipb.vars['secure_hash'],
									  dataset: 	      s,
                    noupdate:       1,
								  },
								  onSuccess: function(t)
								  {
									  if( !t.responseJSON['error'] )
									  {
	                    var f = $$('div .ristu_hide_text');
	                    for(var i=0; i<f.length; i++)
											{      
		                    f[i].update(t.responseJSON[f[i].id.replace(/hide_/i, "")]);                          
	                    }
									  }
								  }
							  }
						  );
      }
  },
}
ipb.hide.init();
