<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Content-Language" content="en">
<title>round corners: step 6</title>

<style type="text/css">


body{
	background: #fff url(images/banner_5.jpg) left top repeat;}


.top-left { 
	margin-right: 9px; 
	background-image: url('images/corners1280x18.gif');
	height: 9px; /* vertical: show first half of the image with the top-coreners in it */
	font-size: 2px;
	background-color: red;
	}
.top-right { 
	margin-top: -9px; 
	margin-left: 9px;
	background-image: url('images/corners1280x18.gif'); 
	background-position: 100% 0; /* show bg-image starting at the right, and as much to the left as possible */
	height: 9px; 
	font-size: 2px; 
	background-color: green;
	}
div.inside {
	border-left: 1px solid #C00000;
	border-right: 1px solid #C00000;
	background: #EFEFEF;
	color: #000000;
	padding-left: 20px;
	padding-right: 20px;
	background-color: yellow;;
	}
.notopgap {
	margin-top: 0;
	}
.nobottomgap {
	margin-bottom: 0;
	}
.bottom-left { 
	margin-right: 9px;
	background-image: url('images/corners1280x18.gif');
	background-position: 0 -9px; /* show under half of the image */
	height: 9px;
	font-size: 2px;
	}
.bottom-right { 
	margin-top: -9px; 
	margin-left: 9px;
	background-image: url('images/corners1280x18.gif'); 
	background-position: 100% -9px; 
	height: 9px; 
	font-size: 2px; 
	}

/* here general styles, nothing to do with liquid corners */


#content { 
	position: relative;	
	margin-left:auto;
	width:60%;
	margin-right:auto;
	text-align:left;
	
	}


</style>

</head>

<body>

<div id="content">


   

 


 
<!-- start label-box --> 
<div class="top-left"></div><div class="top-right"></div>  
<div class="inside"> 

	<h2 class="notopgap">Header H2</h2> 
	<p>Paragraph: lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse egestas ultricies    
    pede.&nbsp;<br>   
    Phasellus suscipit blandit risus. Praesent nonummy. In erat. Duis nibh pede, accumsan eu, pulvinar et, volutpat    
    vel, elit.</p>   
	<ul>    
	  <li>Onordered list: no extra class or special properties needed. - Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse pede!</li>    
	  <li>Praesent nonummy. In erat. Duis nibh pede, accumsan eu, pulvinar et, volutpat vel, elit. Curabitur nec dui sed          
	  nunc congue tempus.</li>     
	</ul>       
	<p class="nobottomgap">And so on.</p>  
	
</div>         
<div class="bottom-left"></div><div class="bottom-right"></div>         
<!-- end label-box -->         
         
          
      
</div>          
</body>              
</html>