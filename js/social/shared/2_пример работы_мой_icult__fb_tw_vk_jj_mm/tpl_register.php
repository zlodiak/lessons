<?php
/*
Template Name: register
*/
?>

<?php get_header(); ?>

<span class="login_head">Регистрация</span>

<div class="loginform">
	<form class="login" method="post" action="#">
		<table class="form-table">
			<tbody>
				<tr class="required">
					<th scope="row">Логин</th>
					<td><input name="user_login" type="text" id="user_login" size="30" maxlength="30" value=""></td>
				</tr>
				
				<tr class="required">
					<th scope="row">E-mail</th>
					<td><input name="user_email" type="text" id="user_email" size="30" maxlength="30" value=""></td>
				</tr>				
				
				<tr class="required">
					<th scope="row">Пароль</th>
					<td><input name="user_pass" type="password" id="user_pass" size="30" maxlength="30" value=""></td>
				</tr>				
				
				<tr class="required">
					<th scope="row">Подтверждение пароля</th>
					<td><input name="user_cpass" type="password" id="user_cpass" size="30" maxlength="30" value=""></td>
				</tr>								
			</tbody>
		</table>

		<p class="submit_block"><input type="submit" class="login_button" id="subm" name="Submit" value="Зарегистрироваться"></p>
	</form>
</div>

<?php get_footer(); ?>
