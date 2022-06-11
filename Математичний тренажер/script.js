let startTime;
let endTime;
$(document).ready(function(){
	$("#check").on('click', function(){
		startTime = $.now();
		exam(3);
	});
})

function exam(arg){
	let a = Math.floor(Math.random() * 100);
	let b = Math.floor(Math.random() * 100);
	let answer = a + b;

	alertify.prompt(`Example ${4 - arg}: ${a} + ${b}`, function(e, str){
		if(e){
			if(answer == parseInt(str)){
				alertify.success("Correct: " + str);
				arg--;
			}else{
				alertify.error("Incorrect: " + str);
			}
			if(arg == 0){
				endTime = $.now();
				alertify.alert(`You spend ${(endTime - startTime) / 1000} seconds`);
				return 0;
			}else{
				exam(arg);
			}
		}else{
			return 0;
		}

	});
}