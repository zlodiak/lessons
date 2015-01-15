
<!DOCTYPE html>

<html>

<head>

	<title>CSS Level 3 BOX-SHADOW</title>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

	<meta http-equiv="Content-Language" content="ru">

	<meta name="author" content="Anton Diaz">

	<meta name="generator" content="Notepad++">

	<!-- <link rel="stylesheet" type="text/css" href="style.css"> -->

	<style>

		* {

			margin: 0;

			padding: 0; }



		.canvas {

			border: 1px dashed #808080;

			margin: 10px;

			padding: 0; }



			#shadow div {

				background: #e8e8e8;

				border: 1px solid #c0c0c0;

				/* */ -moz-border-radius: 5px;

				border-radius: 5px;

				/* */ -moz-box-shadow: rgba(0,0,0,0.2) 5px 5px 5px 0;

				/* */ -webkit-box-shadow: rgba(0,0,0,0.2) 5px 5px 5px 0;

				box-shadow: rgba(0,0,0,0.2) 5px 5px 5px 0;

				height: 75px;

				margin: 20px;

				width: 150px; }



			#trail div {

				background: #d0d0d0;

				border: 1px solid #c0c0c0;

				/* */ -moz-border-radius: 40px;

				border-radius: 40px;

				/* */ -moz-box-shadow:

					#d8d8d8 110px -25px 0 -10px,

					#e0e0e0 210px 15px 0 -15px,

					#e8e8e8 310px -10px 0 -20px,

					#f0f0f0 410px 5px 0 -25px,

					#f4f4f4 510px 0px 0 -30px;

				/* */ -webkit-box-shadow:

					#d8d8d8 110px -25px 0 -10px,

					#e0e0e0 210px 15px 0 -15px,

					#e8e8e8 310px -10px 0 -20px,

					#f0f0f0 410px 5px 0 -25px,

					#f4f4f4 510px 0px 0 -30px;

				box-shadow:

					#d8d8d8 110px -25px 0 -10px,

					#e0e0e0 210px 15px 0 -15px,

					#e8e8e8 310px -10px 0 -20px,

					#f0f0f0 410px 5px 0 -25px,

					#f4f4f4 510px 0px 0 -30px;

				height: 75px;

				margin: 20px;

				width: 75px; }



			#glow div {

				background: #ff8080;

				/* */ -moz-border-radius: 40px;

				border-radius: 40px;

				/* */ -moz-box-shadow:

					inset #ff0000 0 0 40px 10px,

					#ff0000 0 0 24px 12px;

				/* */ -webkit-box-shadow:

					inset #ff0000 0 0 40px 10px,

					#ff0000 0 0 24px 12px;

				box-shadow:

					inset #ff0000 0 0 40px 10px,

					#ff0000 0 0 24px 12px;

				height: 75px;

				margin: 45px; 

				width: 75px; }



			#multi-border div {

				background: #804020;

				border: 1px solid #ffffff;

				/* */ -moz-border-radius: 40px;

				border-radius: 40px;

				/* */ -moz-box-shadow:

					/* ����� ������ */

					inset #804020 0 0 0 3px,

					inset #ffffff 0 0 0 4px,

					inset #804020 0 0 0 7px,

					inset #ffffff 0 0 0 8px,

					/* ����� ������� */ 

					#804020 0 0 0 3px,

					#ffffff 0 0 0 4px,

					#804020 0 0 0 7px,

					#ffffff 0 0 0 8px,

					#804020 0 0 0 15px;

				/* */ -webkit-box-shadow:

					/* ����� ������ */

					inset #804020 0 0 0 3px,

					inset #ffffff 0 0 0 4px,

					inset #804020 0 0 0 7px,

					inset #ffffff 0 0 0 8px,

					/* ����� ������� */ 

					#804020 0 0 0 3px,

					#ffffff 0 0 0 4px,

					#804020 0 0 0 7px,

					#ffffff 0 0 0 8px,

					#804020 0 0 0 15px;

				box-shadow:

					/* ����� ������ */

					inset #804020 0 0 0 3px,

					inset #ffffff 0 0 0 4px,

					inset #804020 0 0 0 7px,

					inset #ffffff 0 0 0 8px,

					/* ����� ������� */ 

					#804020 0 0 0 3px,

					#ffffff 0 0 0 4px,

					#804020 0 0 0 7px,

					#ffffff 0 0 0 8px,

					#804020 0 0 0 15px;

				height: 75px;

				margin: 35px;

				width: 150px; }



			#embossment div {

				background: #404040;

				/* */ -moz-border-radius: 20px;

				border-radius: 20px;

				/* */ -moz-box-shadow:

					inset rgba(255,255,255,0.2) 8px 8px 18px 5px,

					inset rgba(0,0,0,0.5) -8px -8px 18px 5px;

				/* */ -webkit-box-shadow:

					inset rgba(255,255,255,0.2) 8px 8px 18px 5px,

					inset rgba(0,0,0,0.5) -8px -8px 18px 5px;

				box-shadow:

					inset rgba(255,255,255,0.2) 8px 8px 18px 5px,

					inset rgba(0,0,0,0.5) -8px -8px 18px 5px;

				height: 75px;

				margin: 20px; 

				width: 150px; }



			#gradient div {

				background: #ff0000;

				border: 1px solid #000000;

				/* */ -moz-box-shadow:

					inset #FF0000 -150px 0 100px -100px,

					inset #FF00FF -250px 0 100px -100px,

					inset #0000FF -350px 0 100px -100px,

					inset #00FFFF -450px 0 100px -100px,

					inset #00FF00 -550px 0 100px -100px,

					inset #FFFF00 -650px 0 100px -100px;

				/* */ -webkit-box-shadow:

					inset #FF0000 -150px 0 100px -100px,

					inset #FF00FF -250px 0 100px -100px,

					inset #0000FF -350px 0 100px -100px,

					inset #00FFFF -450px 0 100px -100px,

					inset #00FF00 -550px 0 100px -100px,

					inset #FFFF00 -650px 0 100px -100px;

				box-shadow:

					inset #FF0000 -150px 0 100px -100px,

					inset #FF00FF -250px 0 100px -100px,

					inset #0000FF -350px 0 100px -100px,

					inset #00FFFF -450px 0 100px -100px,

					inset #00FF00 -550px 0 100px -100px,

					inset #FFFF00 -650px 0 100px -100px;

				height: 200px;

				margin: 20px;

				width: 600px; }



			#burning {background: #000000; }



			#burning div {

				background: #402000;

				/* */ -moz-border-radius: 40px;

				border-radius: 40px;

				/* */ -moz-box-shadow:

					/* ������� */

					inset #806040 0 0 10px 2px,

					/* ���������-������-����� ����� */

					#102030 0px 0px    20px 6px,

					#c8d8e0 0px -10px  17px 4px,

					#d8e8f0 0px -20px  15px -2px,

					#e0f0f8 0px -30px  14px -6px,

					#e8f8ff 0px -40px  12px -9px,

					#ffffff 0px -50px  10px -12px,

					#ffffe0 0px -55px  10px -14px,

					#ffffc0 0px -60px  10px -20px,

					#ffffa0 0px -62px  10px -22px,

					#ffff80 0px -64px  10px -24px,

					/* �����-������� ����� */

					#ffff40 0px 0px    15px 4px,

					#ffff30 0px -10px  13px 6px,

					#ffff20 0px -20px  12px 8px,

					#ffff10 0px -30px  11px 6px,

					#ffff00 0px -40px  10px 4px,

					#fff000 0px -50px  10px 2px,

					#ffe000 0px -60px  10px 0px,

					#ffd000 0px -70px  10px -4px,

					#ffc000 0px -80px  10px -6px,

					#ffa000 0px -90px  10px -10px,

					#ff8000 0px -100px 10px -14px,

					#ff6000 0px -110px 10px -16px,

					#ff4000 0px -120px 10px -20px,

					#ff2000 0px -124px 10px -22px,

					#ff0000 0px -127px 10px -24px;

				/* */ -webkit-box-shadow:

					/* ������� */

					inset #806040 0 0 10px 2px,

					/* ���������-������-����� ����� */

					#102030 0px 0px    20px 6px,

					#c8d8e0 0px -10px  17px 4px,

					#d8e8f0 0px -20px  15px -2px,

					#e0f0f8 0px -30px  14px -6px,

					#e8f8ff 0px -40px  12px -9px,

					#ffffff 0px -50px  10px -12px,

					#ffffe0 0px -55px  10px -14px,

					#ffffc0 0px -60px  10px -20px,

					#ffffa0 0px -62px  10px -22px,

					#ffff80 0px -64px  10px -24px,

					/* �����-������� ����� */

					#ffff40 0px 0px    15px 4px,

					#ffff30 0px -10px  13px 6px,

					#ffff20 0px -20px  12px 8px,

					#ffff10 0px -30px  11px 6px,

					#ffff00 0px -40px  10px 4px,

					#fff000 0px -50px  10px 2px,

					#ffe000 0px -60px  10px 0px,

					#ffd000 0px -70px  10px -4px,

					#ffc000 0px -80px  10px -6px,

					#ffa000 0px -90px  10px -10px,

					#ff8000 0px -100px 10px -14px,

					#ff6000 0px -110px 10px -16px,

					#ff4000 0px -120px 10px -20px,

					#ff2000 0px -124px 10px -22px,

					#ff0000 0px -127px 10px -24px;

				box-shadow:

					/* ������� */

					inset #806040 0 0 10px 2px,

					/* ���������-������-����� ����� */

					#102030 0px 0px    20px 6px,

					#c8d8e0 0px -10px  17px 4px,

					#d8e8f0 0px -20px  15px -2px,

					#e0f0f8 0px -30px  14px -6px,

					#e8f8ff 0px -40px  12px -9px,

					#ffffff 0px -50px  10px -12px,

					#ffffe0 0px -55px  10px -14px,

					#ffffc0 0px -60px  10px -20px,

					#ffffa0 0px -62px  10px -22px,

					#ffff80 0px -64px  10px -24px,

					/* �����-������� ����� */

					#ffff40 0px 0px    15px 4px,

					#ffff30 0px -10px  13px 6px,

					#ffff20 0px -20px  12px 8px,

					#ffff10 0px -30px  11px 6px,

					#ffff00 0px -40px  10px 4px,

					#fff000 0px -50px  10px 2px,

					#ffe000 0px -60px  10px 0px,

					#ffd000 0px -70px  10px -4px,

					#ffc000 0px -80px  10px -6px,

					#ffa000 0px -90px  10px -10px,

					#ff8000 0px -100px 10px -14px,

					#ff6000 0px -110px 10px -16px,

					#ff4000 0px -120px 10px -20px,

					#ff2000 0px -124px 10px -22px,

					#ff0000 0px -127px 10px -24px;

				height: 60px;

				margin: 125px 35px 30px 35px;

				width: 60px; }

	</style>

</head>

<body>



<div class="canvas" id="shadow">

	<div></div>

</div>



<div class="canvas" id="trail">

	<div></div>

</div>



<div class="canvas" id="glow">

	<div></div>

</div>



<div class="canvas" id="multi-border">

	<div></div>

</div>



<div class="canvas" id="embossment">

	<div></div>

</div>



<div class="canvas" id="gradient">

	<div></div>

</div>



<div class="canvas" id="burning">

	<div></div>

</div>



</body>

</html>