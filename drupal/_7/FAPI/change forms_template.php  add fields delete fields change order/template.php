<?php
	function surma_form_contact_site_form_alter(&$form, &$form_state, $form_id){
		// add field
		$form["example_text_field"] = array(
			'#type' => 'textfield',
			'#title' => 'Example text field',
		);
		
		$form['name']['#weight'] = 1;	//change weight of field
		$form['example_text_field']['#weight'] = 11;	//change weight of field
		
		unset($form['message']['#title']);	//delete label of textarea field
		unset($form['subject']);	//delete full subject field(label + input)
	}	


	//hook for all forms. id difference
	// function surma_form_alter(&$form, &$form_state, $form_id){
		// switch ($form_id){
			// case 'contact_site_form':{ // �������� ����� �� �� id
				// $form["example_text_field"] = array(
					// '#type' => 'textfield',
					// '#title' => 'Example text field',
				// );
				// break;
			// }
		// }
	// }	