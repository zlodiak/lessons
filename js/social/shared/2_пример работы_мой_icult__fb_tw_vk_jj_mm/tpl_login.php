<?php
/*
Template Name: login
*/
?>

<?php get_header(); ?>

<span class="login_head">Вход</span>

<div class="loginform">
	<form class="login" method="post" action="#">
		<table class="form-table">
			<tbody>
				<tr class="required">
					<th scope="row">Логин</th>
					<td><input name="user_login" type="text" id="user_login" size="30" maxlength="30" value=""></td>
				</tr>
				
				<tr class="required">
					<th scope="row">Пароль</th>
					<td><input name="user_pass" type="password" id="user_pass" size="30" maxlength="30" value=""></td>
				</tr>												
			</tbody>
		</table>

		<p class="submit_block"><input type="submit" class="login_button" id="subm" name="Submit" value="Войти"></p>
	</form>
</div>

<?php get_footer(); ?>
