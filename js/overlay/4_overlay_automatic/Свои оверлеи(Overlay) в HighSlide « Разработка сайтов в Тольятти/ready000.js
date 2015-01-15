
function reg(type){
	var name = $("#name").val();
	var mail = $("#mail").val();
	var phone = $("#phone").val();
	
	if (name==''){
		$("#name").css('background','#FF5451');	
		error=1;
	}else{
		$("#name").css('background','#69E42B');
	}

	if (mail==''){
		$("#mail").css('background-color','#FF5451');	
		error=1;
	}else{
		mailTest = "^[a-z0-9]+([-_\.]?[a-z0-9])+@[a-z0-9]+([-_\.]?[a-z0-9])+\.[a-z]+$";
		
		$("#mail").css('background-color','#69E42B');
		var regex = new RegExp(mailTest); 
		if (!regex.test(mail) || !(mail.length > 0)){
			error = 1;
			$("#mail").css('background-color','#FF5451');
		}else{
			$("#mail").css('background-color','#69E42B');
			error = 0;
		}
	}	
	
	if (phone==''){
		$("#phone").css('background-color','#FF5451');	
		error=1;
	}else{
		$("#phone").css('background-color','#69E42B');
	}
	
	if (type==1){
		if ($("#type_syte").val()==0){ 
			error=1; 
			$("#type_syte").css('background-color','#FF5451');
		}else{
			$("#type_syte").css('background-color','#69E42B');
		}
		
		if ($("#domen_name").val()==''){
			error=1; 
			$("#domen_name").css('background-color','#FF5451');
		}else{
			$("#domen_name").css('background-color','#69E42B');
		}	
	}
	
	if (error==1){
		return false;
	}else{
		return true;
	}
	alert (error);
}


function show(id){
	$(id).show("slow");
}

function price_syte(){
	
	summ = 0;
	
	if ($("#type_syte").val()==0){
		summ = 0; //Ничего не выбрано
	}else if($("#type_syte").val()==1){
		summ = 5000+summ;
	}else if($("#type_syte").val()==2){
		summ = summ + 8000;
	}else if($("#type_syte").val()==3){
		summ = summ + 10000;
	}else if($("#type_syte").val()==4){
		summ = summ + 15000;
	}
	
	/*
	if ($("#domen_name").val()!=''){
		domen_test = "^(*.)+$"; 
					
		var regex = new RegExp(domen_test); 
		if (regex.test(domen_test) || (domen.length > 0)){
			summ = summ + 100;
		}else{
			alert($("#domen_name").val());
		}
	}
		*/
	if ($("#hosting").attr("checked")==true){
		summ = summ + 2400;
	}
	
	if (($("#support_site1").attr("value")=="1")&&($("#support_site1").attr("checked")==true)){
		summ = summ + 600;
	}else if (($("#support_site2").attr("value")=="2")&&($("#support_site2").attr("checked")==true)){
		summ = summ + 1500;
	}else if (($("#support_site3").attr("value")=="3")&&($("#support_site3").attr("checked")==true)){
		summ = summ + 3000;
	}else if (($("#support_site4").attr("value")=="4")&&($("#support_site4").attr("checked")==true)){
		summ = summ + 6000;
	}
	
	if ($("#content").attr("checked")==true){
		summ = summ + 3000;
	}
	
	if ($("#onhost").attr("checked")==true){
		summ = summ + 1000;
	}
	
	//ДИЗАЙН
	if ($("#design_view").attr("checked")==true){
		$("#design_block").animate({'opacity':'0'},300,function(){
			$("#design_block").css('display','none');
		});
		

	}else if($("#design_view1").attr("checked")==true){
		$("#design_block").css('display','block');
		$("#design_block").animate({'opacity':'1'},300);
	
		if ($("#logo").attr("checked")==true){
			summ = summ + 3000;
		}
		
		if ($("#firm_style").attr("checked")==true){
			summ = summ + 5000;
		}
		
		if ($("#count_design").val()==1){
			summ = summ + 4000;
		}else if($("#count_design").val()==2){
			summ = summ + 7000;
		}else if($("#count_design").val()==3){
			summ = summ + 9000;
		}else if($("#count_design").val()==4){
			summ = summ + 15000;
		}
	}
	
	if ($("#func_cms").attr("checked")==true){
		summ = summ + 5000;
	}
	
	if ($("#func_page").attr("checked")==true){
		summ = summ + 2000;
	}
	if ($("#func_search").attr("checked")==true){
		summ = summ + 2000;
	}
	if ($("#func_cat").attr("checked")==true){
		summ = summ + 1500;
	}
	if ($("#func_mapp").attr("checked")==true){
		summ = summ + 100;
	}
	if ($("#func_forum").attr("checked")==true){
		summ = summ + 2000;
	}
	if ($("#func_gal").attr("checked")==true){
		summ = summ + 1000;
	}
	if ($("#func_ww").attr("checked")==true){
		summ = summ + 300;
	}
	if ($("#func_rss").attr("checked")==true){
		summ = summ + 1000;
	}
	if ($("#func_eng").attr("checked")==true){
		summ = summ*1.3;
	}
	if ($("#func_city").attr("checked")==true){
		summ = summ+1000;
	}
	if ($("#func_mail").attr("checked")==true){
		summ = summ+300;
	}
	if ($("#func_count").attr("checked")==true){
		summ = summ+2000;
	}
	if ($("#func_news").attr("checked")==true){
		summ = summ+1500;
	}
	if ($("#func_form").attr("checked")==true){
		summ = summ+500;
	}
	if ($("#func_map").attr("checked")==true){
		summ = summ+700;
	}
	if ($("#func_pers").attr("checked")==true){
		summ = summ+2000;
	}
	if ($("#func_portf").attr("checked")==true){
		summ = summ+3000;
	}
	
	var poj = $("#poj").val();
	summ = summ+(poj.length+10)
		
	var despoj = $("#despoj").val();
	summ = summ+(despoj.length+10)
	
	
	// Вывод результата
	$("#price").text(summ);
	$("#price_from").val(summ);
}


/* ----------------------------------------------------------------------------------------------------- */
function ajax_nextpageport(page, cat){
	$('#portfolio-list').animate({'opacity':'0'},500,function(){
		$.ajax({
				type: "POST",
				url: "/modules/portfolio/ajax_nextpage.php",
				data: "page="+page+"&cat="+cat,
				success: function(html){
					$("#portfolio-list").html(html);
					$('#portfolio-list').animate({'opacity':'0'},100,function(){
						$('#portfolio-list').animate({'opacity':'1'},500);
					});
					tooltipHTE();
				}
			});
		});
}
/*
function ajax_nextwork(id_now, id_next){
	$('#portfolio').animate({'opacity':'0'},500,function(){
		$.ajax({
				type: "POST",
				url: "/modules/portfolio/ajax_nextwork.php",
				data: "id_now="+id_now+"&id_next="+id_next,
				success: function(html){
					$("#portfolio").html(html);
					$('#portfolio').animate({'opacity':'0'},100,function(){
						$('#portfolio').animate({'opacity':'1'},500);
					});
					left2right();
				}
			});
		});
		
		$('#info').slideUp(500,function(){
		$.ajax({
				type: "POST",
				url: "/modules/portfolio/ajax_nextinfo.php",
				data: "id_now="+id_now+"&id_next="+id_next,
				success: function(html){
					$("#info").html(html);
					$('#info').slideDown(500);
				}
			});
		});
		
		
}
*/


function reimg(cat, id){
	$('#full_img_1').animate({'opacity':'0'},500,function(){
		$('#full_img_1').html('<img src="/modules/portfolio/img/'+cat+'/'+id+'.jpg" />');
		$('#full_img_1').animate({'opacity':'1'},500);
	});	
}




$(document).ready(function(){
	var flaghas = 0;
	$("#top-site-cover").css('opacity', '0.2');
	$("#top-dev-cover").css('opacity', '0.2');
	$("#top-install-cover").css('opacity', '0.2');
	$("#top-site-cover").css('display', 'block');
	$("#top-dev-cover").css('display', 'block');
	$("#top-install-cover").css('display', 'block');

	
	$('#mainmenu li').hover(function(){

		menul = $(this).find('.menu-l');
		menur = $(this).find('.menu-r');
		menuc = $(this).find('.menu-c');
		if(menul.hasClass('l-bg')) {
			menul.addClass('flaghas');
			var unmenu = $(this).find('.wrap-un-menu');
			if(unmenu.html() == null) {
				
			} else {
				menul.removeClass('l-bg').addClass('l-bg-action');
				menur.removeClass('r-bg').addClass('r-bg-action');
				unmenu.css('display', 'block');
			}
		} else {
			var unmenu = $(this).find('.wrap-un-menu');
				menul.addClass('l-bg');
				menuc.addClass('c-bg actiontext');
				menur.addClass('r-bg');
			if(unmenu.html() == null) {
				
			} else {
				menul.removeClass('l-bg').addClass('l-bg-action');
				menur.removeClass('r-bg').addClass('r-bg-action');
				unmenu.css('display', 'block');
			}
			
		}
	}, function(){
		menul = $(this).find('.menu-l');
		menur = $(this).find('.menu-r');
		menuc = $(this).find('.menu-c');
		if(menul.hasClass('flaghas')) {
			menul.removeClass('flaghas');
			menul.removeClass('l-bg-action').addClass('l-bg');
			menur.removeClass('r-bg-action').addClass('r-bg');
			
			var unmenu = $(this).find('.wrap-un-menu');
			if(unmenu.html() != null) {
				unmenu.css('display', 'none');
			}
		} else {
			menul.removeClass('l-bg');
			menuc.removeClass('c-bg actiontext');
			menur.removeClass('r-bg');
			var unmenu = $(this).find('.wrap-un-menu');
			
			if(unmenu.html() == null) {
				
			} else {
				menul.removeClass('l-bg-action');
				menur.removeClass('r-bg-action');
				unmenu.css('display', 'none');
			}
			
		}
	})
	
	$("#top-site-cover").hover(function(){
		stopAnimate();
		$("#top-site-cover").animate({'opacity':'0'}, 500);
		$("#top-install-cover").animate({'opacity':'0.4'}, 500);
		$("#top-dev-cover").animate({'opacity':'0.4'}, 500);
	}, function(){
		stopAnimate();
		$("#top-install-cover").animate({'opacity':'0.2'}, 500);
		$("#top-dev-cover").animate({'opacity':'0.2'}, 500);
		$("#top-site-cover").animate({'opacity':'0.2'}, 500);
	})
	
	$("#top-install-cover").hover(function(){
		stopAnimate();
		$("#top-install-cover").animate({'opacity':'0'}, 500);
		$("#top-dev-cover").animate({'opacity':'0.4'}, 500);
		$("#top-site-cover").animate({'opacity':'0.4'}, 500);
	}, function(){
		stopAnimate();
		$("#top-install-cover").animate({'opacity':'0.2'}, 500);
		$("#top-dev-cover").animate({'opacity':'0.2'}, 500);
		$("#top-site-cover").animate({'opacity':'0.2'}, 500);
	})
	
	$("#top-dev-cover").hover(function(){
		stopAnimate();
		$("#top-dev-cover").animate({'opacity':'0'}, 500);
		$("#top-install-cover").animate({'opacity':'0.4'}, 500);
		$("#top-site-cover").animate({'opacity':'0.4'}, 500);
	}, function(){
		stopAnimate();
		$("#top-install-cover").animate({'opacity':'0.2'}, 500);
		$("#top-dev-cover").animate({'opacity':'0.2'}, 500);
		$("#top-site-cover").animate({'opacity':'0.2'}, 500);
	})
	
	
	$("#a-input").toggle(function(){
		var input = $("#input");
		input.css('opacity','0');
		input.css('display','block');
		input.animate({'opacity':'0.8'}, 500);
		return false;
	}, 
	function() {
		var input = $("#input");
		input.animate({'opacity':'0'}, 500, function(){
			input.css('display','none');
		});
		return false;
	})
	
	$(".un-menu li a").hover(function(){
		$(this).parent().css('background', '#0076A2 url(images/un-menu-marker-1.png) no-repeat left center');
	}, function(){
		$(this).parent().css('background', '#0076A2');
	})
	tooltipHTE();
	left2right();
})

function stopAnimate() {
	$("#top-install-cover").stop();
	$("#top-dev-cover").stop();
	$("#top-site-cover").stop();
}

function tooltipHTE( ) {
	$('.tooltip-cover').hover(function(){
		var parent = $(this).parent();
		var bg = parent.find('.tooltip-bg');
		var text = parent.find('.tooltip-text');
		bg.stop();
		text.stop();
		
		bg.css('opacity', '0');
		bg.css('display', 'block');
		bg.animate({'opacity':'0.8'}, 400)
		text.css('opacity', '0');
		text.css('display', 'block');
		text.animate({'opacity':'1'}, 400)
	}, function(){
		var parent = $(this).parent();
		var bg = parent.find('.tooltip-bg');
		var text = parent.find('.tooltip-text');
		bg.stop();
		text.stop();
		bg.animate({'opacity':'0'}, 400, function(){
			bg.css('display', 'none');
		})
		text.animate({'opacity':'0'}, 400, function(){
			text.css('display', 'none');
		})
	})
	
}


	function left2right(){
		$("#full_img").hover(function(){
			$("#left_img").stop(1);
			$("#right_img").stop(1);
			
			$("#left_img").animate({opacity: 0.2},300);
			$("#right_img").animate({opacity: 0.2},300);
		}, function(){
			$("#left_img").animate({opacity: 0},200);
			$("#right_img").animate({opacity: 0},200);
		})
		
		$("#left_img").hover(function(){
			$("#left_img").stop(1);
			$("#left_img").animate({opacity: 1},300);
		}, function(){
			$("#left_img").animate({opacity: 0.2},200);
		})
		
		$("#right_img").hover(function(){
			$("#right_img").stop(1);
			$("#right_img").animate({opacity: 1},300);
		}, function(){
			$("#right_img").animate({opacity: 0.2},200);
		})
	}