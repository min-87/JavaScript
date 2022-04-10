$('input').on('change', function(){
	let username = $('input').val();
	$.ajax(`https://api.github.com/users/${username}`,{
		success: function(result){
			$('#results').html(`
					<h3>${result.login}</h3>
					<img src="${result.avatar_url}">
					<a href="${result.html_url}">Перейти к профилю</a>
				`);
		}
	});
});