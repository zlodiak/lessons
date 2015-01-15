<!DOCTYPE html>

<html>
	<head>
		<meta charset="utf-8" />
		
		<title></title>

		<link rel="stylesheet" href="css/styles.css" />	
	</head>
	
	<body>
		<div class="simply_form2" id="signupwrap">	
			<form class="form2" id="signupform" name="form2" action="index2.html" method="post">
				<p>
					<label class="lbl_name_form2" for="fld_name_form2">Ваше имя: <sup>*</sup></label>										
					<input class="fld_name_form2 fld" id="fld_name_form2" name="fld_name_form2" type="text" value="" />
				</p>																	

				<p>
					<label class="lbl_email_form2" for="fld_email_form2">Электронная почта: <sup>*</sup></label>										
					<input class="fld_email_form2 fld" id="fld_email_form2" name="fld_email_form2" type="text" value="" />
				</p>
				
				<p>
					<label class="lbl_phone_form2" for="fld_phone_form2">Контактный телефон: </label>										
					<input class="fld_phone_form2 fld" id="fld_phone_form2" name="fld_phone_form2" type="text" value="" />
				</p>															
				
				<p>
					<label class="lbl_comments_form2" for="fld_comments_form2">Сообщение: </label>										
					<textarea class="fld_comments_form2 fld" id="fld_comments_form2" name="fld_comments_form2" rows="20" cols="20"></textarea>
				</p>

				<p>	
					<input class="btn_form2" id="signupsubmit" name="btn_form2" type="submit" value="Отправить" />
				</p>
			</form>
		</div>	
		
		<h3>Таблица 1 без оформления с помощью плагина.</h3>
		<table class="aClass">
		  <tr>
			<th>Столбец 1</th><th>Столбец 2</th><th>Столбец 3</th><th>Столбец 4</th><th>Столбец 5</th>
		  </tr>
		  <tr>
			<td>1-1</td><td>1-2</td><td>1-3</td><td>1-4</td><td>1-5</td>
		  </tr>
		  <tr>
			<td>2-1</td><td>2-2</td><td>2-3</td><td>2-4</td><td>2-5</td>
		  </tr>
		  <tr>
			<td>5-1</td><td>5-2</td><td>5-3</td><td>5-4</td><td>5-5</td>
		  </tr>
		  <tr>
			<td>6-1</td><td>6-2</td><td>6-3</td><td>6-4</td><td>6-5</td>
		  </tr>
		  <tr>
			<td>7-1</td><td>7-2</td><td>7-3</td><td>7-4</td><td>7-5</td>
		  </tr>
		</table>
		<h3>Таблица 2 оформлена с настройками по умолчанию.</h3>
		<table class="bClass">
		  <tr>
			<th>Столбец 1</th><th>Столбец 2</th><th>Столбец 3</th><th>Столбец 4</th><th>Столбец 5</th>
		  </tr>
		  <tr>
			<td>1-1</td><td>1-2</td><td>1-3</td><td>1-4</td><td>1-5</td>
		  </tr>
		  <tr>
			<td>2-1</td><td>2-2</td><td>2-3</td><td>2-4</td><td>2-5</td>
		  </tr>
		  <tr>
			<td>3-1</td><td>3-2</td><td>3-3</td><td>3-4</td><td>3-5</td>
		  </tr>
		  <tr>
			<td>4-1</td><td>4-2</td><td>4-3</td><td>4-4</td><td>4-5</td>
		  </tr>
		  <tr>
			<td>6-1</td><td>6-2</td><td>6-3</td><td>6-4</td><td>6-5</td>
		  </tr>
		  <tr>
			<td>7-1</td><td>7-2</td><td>7-3</td><td>7-4</td><td>7-5</td>
		  </tr>
		</table>
		<h3>Таблица 3 оформлена с пользовательскими настройками.</h3>
		<table class="cClass">
		  <tr>
			<th>Столбец 1</th><th>Столбец 2</th><th>Столбец 3</th><th>Столбец 4</th><th>Столбец 5</th>
		  </tr>
		  <tr>
			<td>1-1</td><td>1-2</td><td>1-3</td><td>1-4</td><td>1-5</td>
		  </tr>
		  <tr>
			<td>2-1</td><td>2-2</td><td>2-3</td><td>2-4</td><td>2-5</td>
		  </tr>
		  <tr>
			<td>3-1</td><td>3-2</td><td>3-3</td><td>3-4</td><td>3-5</td>
		  </tr>

		</table>
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
		
		<!--validate-->
		<script src="js/validate/validate.js" type="text/javascript"></script>		
		<script type="text/javascript">
		$(document).ready(function(){
			
			console.log($('table').maxHeight());
				

		});
		</script>		
	</body>
</html>