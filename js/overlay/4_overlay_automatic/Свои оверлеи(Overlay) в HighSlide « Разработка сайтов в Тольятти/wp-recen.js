(function() {

function page(wpurl, args, start, loading) {
	var url = wpurl + '?action=rc_ajax&args=' + args + '&start=' + start;
	runChange(url, loading);
}

function detail(id, wpurl, args, start, loading) {
	var url = wpurl + '?action=rc_detail_ajax&id=' + id + '&args=' + args + '&start=' + start;
	runChange(url, loading);
}

function runChange(url, loading) {
	jQuery.ajax({
		type:         'GET'
		,url:         url
		,cache:       false
		,contentType: 'text/html; charset=utf-8'

		,beforeSend: function(data){
			document.body.style.cursor = 'wait';
			jQuery('#rc_nav').html('<span class="rc_ajax_loader">' + ((loading == undefined) ? 'Loading...' : loading + '...') + '</span>');
		}

		,success: function(data){
			jQuery('#rc_item_1').parent().fadeOut(function() {
				jQuery(this).html(data).fadeIn();
			});
			document.body.style.cursor = 'auto';
		}

		,error: function(data){
			alert('Oops, failed to load data.');
		}
	});
}

window['RCJS'] = {};
window['RCJS']['page'] = page;
window['RCJS']['detail'] = detail;

})();
