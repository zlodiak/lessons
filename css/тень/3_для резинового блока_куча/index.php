<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>clear</title>
  <style type="text/css">

body {
	margin: 0; 
	padding: 0; 
	background-color: cyan;
}

h1{
	padding-left: 30px;
}

/*****************************************************************************************************************************************************/

.shadow{
    box-shadow: 0 0 50px black; /* ��������� ���� */
    box-shadow: 0 0 100px rgba(0,0,0,0.5); /* ��������� ���� */
    -moz-box-shadow: 0 0 100px rgba(0,0,0,0.5); /* ��� Firefox */
    -webkit-box-shadow: 4px 4px 10px rgba(0,0,0,0.5); /* ��� Safari � Chrome */	
	filter: progid:DXImageTransform.Microsoft.shadow(direction=120, color=#000000, strength=10);
	float: left;
	margin: 10px;
}

	.shadow img{		
		margin-bottom: -5px;
	}

/*****************************************************************************************************************************************************/
	
.shadow2{
	background-color: gray;
	float: left;
}

	.shadow2 img{
		position: relative;
		right: 6px;
		bottom: 6px;
		margin-bottom: -5px;
	}
	
/*****************************************************************************************************************************************************/
	
.ten{
    box-shadow: 4px 4px 50px black; /* ��������� ���� */
    box-shadow: 4px 4px 10px rgba(0,0,0,0.5); /* ��������� ���� */
    -moz-box-shadow: 4px 4px 10px rgba(0,0,0,0.5); /* ��� Firefox */
    -webkit-box-shadow: 4px 4px 10px rgba(0,0,0,0.5); /* ��� Safari � Chrome */	
	filter: progid:DXImageTransform.Microsoft.shadow(direction=120, color=#000000, strength=10);
width: 50%;
	margin: 0 auto;
	min-width: 350px;
}	
	
	.ten .content {
		width: 100%;
		margin: 0 auto;
		background: #FCEBCF url(images/bg_articles.gif) right top no-repeat;		
		min-width: 350px;
		
		/*outline: 7px solid #FFF;	    		��� �������
		position: relative;
		top: -7px;
		left: -7px;*/
	}

		.ten .content img{
			float: left;
			margin: 5px;
		}

		.ten .content p{
			margin: 5px;
		}	
		
		.ten .content .col1, .content .col2{
			width: 49%;
			float: left;
		}
			
		.ten .content .col1{
			
		}  
		
		.ten.content .col2{
			overflow: hidden;	
			border-left: 2px dotted red;
		}  

  
  </style>
 </head> 
 <body>  
<div class="shadow">
	<img class="home" src="images/homesweethome.jpg" alt="����� � �������" />
</div>
<div style="clear: both"></div>
 
<br /><br /><br /><br /> 
 
<div class="shadow2">
	<img class="home" src="images/homesweethome.jpg" alt="����� � �������" />
</div>
<div style="clear: both"></div>
 
<br /><br /><br /> 
 
 <div class="ten">
	<div class="content">
		<h1>������</h1>	
		
		<div class="col1">
			<img class="home" src="images/homesweethome.jpg" width="46px" height="45px" alt="����� � �������" />
			<p>This box stays in the middle of the browser's viewport. The content does not disappear when the viewport gets smaller than the box.</p>
			
			<img class="home" src="images/homesweethome.jpg" width="46px" height="45px" alt="����� � �������" />
			<p>This box stays in the middle of the browser's viewport. The content does not disappear when the viewport gets smaller than the box.</p>	

			<img class="home" src="images/homesweethome.jpg" width="46px" height="45px" alt="����� � �������" />
			<p>This box stays in the middle of the browser's viewport. The content does not disappear when the viewport gets smaller than the box.</p>
			
			<img class="home" src="images/homesweethome.jpg" width="46px" height="45px" alt="����� � �������" />
			<p>This box stays in the middle of the browser's viewport. The content does not disappear when the viewport gets smaller than the box.</p>				
		</div>			
		
		<div class="col2">
			<img class="home" src="images/homesweethome.jpg" width="46px" height="45px" alt="����� � �������" />
			<p>This box stays in the middle of the browser's viewport. The content does not disappear when the viewport gets smaller than the box.</p>
			
			<img class="home" src="images/homesweethome.jpg" width="46px" height="45px" alt="����� � �������" />
			<p>This box stays in the middle of the browser's viewport. The content does not disappear when the viewport gets smaller than the box.</p>	

			<img class="home" src="images/homesweethome.jpg" width="46px" height="45px" alt="����� � �������" />
			<p>This box stays in the middle of the browser's viewport. The content does not disappear when the viewport gets smaller than the box.</p>
			
			<img class="home" src="images/homesweethome.jpg" width="46px" height="45px" alt="����� � �������" />
			<p>This box stays in the middle of the browser's viewport. The content does not disappear when the viewport gets smaller than the box.</p>				
		</div>	
			
		<div style="clear: both"></div>	
	</div>
</div>	

<br />
<br />
<br />
<br />
<br />
 </body>
</html>