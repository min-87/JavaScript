fetch('http://api.openweathermap.org/data/2.5/weather?q=Kyiv,ua&appid={API key}')
.then(function(resp){
	return resp.json()
})
.then(function(data){
	console.log(data);
	document.querySelector('h1').textContent = data.name;
	document.querySelector('.temp').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
	document.querySelector('.weather').textContent = data.weather[0]['description'];
	document.querySelector('.icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
})