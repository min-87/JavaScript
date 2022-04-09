let types = ['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork'];
$.each(types, function(index, type){
	$('#types').append(`
			<label for="${type}">${type.toUpperCase()}:</label>
			<input type="radio" id="${type}" name="type" value="${type}">
		`);
});
$('#activity').hide();
$('#rnd-act-btn').click(function(){
	let params = $('#filters').serialize();
	console.log(params);
	$.ajax(`http://www.boredapi.com/api/activity/?${params}`, {
		success: function(result){
			$('#activity').show();
			$('#activity').html(`
					<p>Activity: ${result.activity}</p>
					<p>Price: ${result.price}</p>
					<p>Type: ${result.type}</p>
				`);
		},
		error: function(xhr){
			console.log(xhr.statusText);
		}
	});
});