$(document).ready(function() {
	$("#submitFeedback").click(function() {
		$("#feedbackform").submit();
	});
	$("#feedbackform").submit(function() {
		if ($("#messageFeedback").val() == "")
			return false;
		var f = $("#feedbackform");
		var action = f.attr("action");
		var serializedForm = f.serialize();
		$("#feedbackform").attr("disable", "disable");
		$("#submitFeedback").attr("disable", "disable");
		$.post(action, serializedForm,
                                function(json) {
                                	$("#feedbackform").resetForm();
                                	alert("Ваше сообщение отправлено");
                                	$("#feedbackoverlay").css("display", "none");
                                	$("#feedbackdiv").css("display", "none");
                                }, "text");
		return false;
	})
});

$(document).ready(function() {
	$("#feedback").click(function() {
		$("#feedbackoverlay").css("display", "block");
		$("#feedbackdiv").css("display", "block");
		$("#feedbackdiv").width(295);
		$("#feedbackdiv").height(390);
		$("#feedbackdiv").css("left", $(document).width() / 2 - 175);
		$("#feedbackdiv").css("top", 100);
		$("#submitFeedback").removeAttr("disable");
	});
});

$(document).ready(function() {
	$("#closefeedback").click(function() {
		$("#feedbackoverlay").css("display", "none");
		$("#feedbackdiv").css("display", "none");
	});
});
