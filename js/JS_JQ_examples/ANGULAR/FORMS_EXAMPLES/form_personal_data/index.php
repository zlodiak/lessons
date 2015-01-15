<!doctype html>

<html lang="ru" ng-app>
	<head>
		<meta charset="utf-8">
		
		<title>form</title>
		
		<link rel="stylesheet" href="css/style.css">
		
		<!-- angularJS -->
		<script src="js/angular/angular.js"></script>
		
		<script src="js/angular/angular_controllers.js"></script>
	</head>
	
	<body>
		<?php
			if($_POST['btn_submit']){
				echo('<pre>');
				print_r($_POST);
				echo('</pre>');
			}
		?>
		<section class="wrap">
			<h1>Пример формы ввода персональных данных</h1>
			
			<form class="personal_data" name="personalData" method="post" action="#" ng-controller="ctrlPersonalData">
				<div class="form_item">
					<label class="lbl_name" for="fld_name" />Имя<span class="mark_rquired">*</span></label>
					
					<input class="fld_name" id="fld_name" type="text" name="fld_name" ng-model="fld_name" required />
					
					<span class="error" ng-show="personalData.input.$error.required">Required!</span>
				</div>
				
				<div class="form_item">
					<label class="lbl_family" for="fld_family">Фамилия<span class="mark_rquired">*</span></label>
					
					<input class="fld_family" id="fld_family" type="text" name="fld_family" ng-model="fld_family" required />
					
					<span class="error" ng-show="personalData.input.$error.required">Required!</span>	
				</div>	

				<div class="form_item">
					<label class="lbl_organisation" for="fld_organisation">Название организации</label>
					
					<input class="fld_organisation" id="fld_organisation" type="text" name="fld_organisation" ng-model="fld_organisation" />
					
					<span class="error" ng-show="personalData.input.$error.required">Required!</span>	
				</div>	

				<div class="form_item">
					<label class="lbl_position" for="fld_position">Должность</label>
					
					<input class="fld_position" id="fld_position" type="text" name="fld_position" ng-model="fld_position" />
					
					<span class="error" ng-show="personalData.input.$error.required">Required!</span>	
				</div>	
				
				<div class="form_item">
					<label class="lbl_gender" for="fld_gender1">Пол</label>
					
					<div class="form_sub">
						<div class="gender_item">
							<input class="fld_gender" id="fld_gender1" type="radio" name="fld_gender" ng-model="fld_gender" value="male" />
							
							<label class="lbl_gender1 label_sub" for="fld_gender1">Мужской</label>
						</div>
						
						<div class="gender_item">
							<input class="fld_gender" id="fld_gender2" type="radio" name="fld_gender" ng-model="fld_gender" value="female" />
							
							<label class="lbl_gender2 label_sub" for="fld_gender2">Женский</label>
						</div>
						
						<div class="gender_item">
							<input class="fld_gender" id="fld_gender3" type="radio" name="fld_gender" ng-model="fld_gender" value="other" />
							
							<label class="lbl_gender3 label_sub" for="fld_gender3">Неопределённый</label>
						</div>
						
						<span class="error" ng-show="personalData.input.$error.required">Required!</span>	
					</div>	
				</div>	
				
				<div class="form_item">
					<label class="lbl_status" for="fld_status">Статус</label>
					
					<select name="status[]">
						<option value="member">Член</option>
						
						<option value="dont_member">Не член</option>
					</select>	
					
					<span class="error" ng-show="personalData.input.$error.required">Required!</span>	
				</div>					

				<div class="form_item">
					<label class="lbl_city" for="fld_city">Город<span class="mark_rquired">*</span></label>
					
					<input class="fld_city" id="fld_city" type="text" name="fld_city" ng-model="fld_city" required />
					
					<span class="error" ng-show="personalData.input.$error.required">Required!</span>	
				</div>	

				<div class="form_item">
					<label class="lbl_index" for="fld_index">Почтовый индекс<span class="mark_rquired">*</span></label>
					
					<input class="fld_index" id="fld_index" type="text" name="fld_index" ng-model="fld_index" required />
					
					<span class="error" ng-show="personalData.input.$error.required">Required!</span>	
				</div>	

				<div class="form_item">
					<label class="lbl_address" for="fld_address">Адрес<span class="mark_rquired">*</span></label>
					
					<input class="fld_address" id="fld_address" type="text" name="fld_address" ng-model="fld_address" required />
					
					<span class="error" ng-show="personalData.input.$error.required">Required!</span>	
				</div>	

				<div class="form_item">
					<label class="lbl_phone" for="fld_phone">Номер телефона<span class="mark_rquired">*</span></label>
					
					<input class="fld_phone" id="fld_phone" type="text" name="fld_phone" ng-model="fld_phone" required />
					
					<span class="error" ng-show="personalData.input.$error.required">Required!</span>	
				</div>	

				<div class="form_item">
					<label class="lbl_email" for="fld_email">E-mail<span class="mark_rquired">*</span></label>
					
					<input class="fld_email" id="fld_email" type="email" name="fld_email" ng-model="fld_email" required />
					
					<span class="error" ng-show="personalData.input.$error.required">Required!</span>	
				</div>	

				<div class="form_item">
					<label class="lbl_url" for="fld_url">URL домашней странички</label>
					
					<input class="fld_url" id="fld_url" type="url" name="fld_url" ng-model="fld_url" />
					
					<span class="error" ng-show="personalData.input.$error.required">Required!</span>	
				</div>	

				<div class="form_item">
					<label class="lbl_info" for="fld_info">Дополнительная информация</label>

					<textarea class="fld_info" id="fld_info" name="fld_info" rows="10" cols="45" ng-model="fld_info"></textarea>
				</div>					
				
				<div class="form_item">
					<input class="btn_submit" type="submit" name="btn_submit" value="Отправить" />
					
					<input class="btn_reset" type="reset" name="btn_reset" value="Сбросить" />
				</div>
			</form>
		</section>
	</body>
</html>
