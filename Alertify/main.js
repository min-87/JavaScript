alertify.prompt("Введите текст", function(e, str){
	$('#block').append(str);
		alertify.prompt("Введите ширину блока", function(e, str){
		$('#block').width(str);
			alertify.prompt("Введите цвет блока английским языком", function(e, str){
			$('#block').css('background-color', str);
		});
	});
});

