var curQuest;
var curAnswer;
var questions;

function loadText(){
	$.ajax({
		type: "GET",
		url: "dictionary.txt",
		success: function(data){ sortQuestions(data); }
	});
}

function sortQuestions(data){
	var sortData = JSON.parse(data);
	console.log(sortData);

	questions = shuffle(sortData);
	console.log(questions);

	curQuest = -1;
	nextQuestion();
	//shuffle(sortData);
	/*$.each(sortData, function(key, value){
		$("#question").append("<div>"+value+"</div>");
	});*/	
}

function shuffle(array){
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function nextQuestion(){
	curQuest ++;
	$("#question > h2").text(questions[curQuest]["text"]);
	curAnswer = questions[curQuest]["abr"];
}

function submit(){
	var given = $("#givenAns").val();
	if(given == curAnswer){
		$("#message").html("<h2 class='right'>That's right! Great job!</h2>");
		$("#givenAns").val("");
		$("#past > ul").append("<li><b>"+questions[curQuest]["abr"]+"</b><span> - "+questions[curQuest]["text"]+"</span></li>")
		nextQuestion();
	}
	else{
		$("#message").html("<h2 class='wrong'>Sorry, that's wrong. Please try again. Maybe try another abbreviation?</h2>");
		console.log(questions[curQuest]['abr']);
	}
}

function skip(){
	//Skip the answer and add to the end.
	nextQuestion();
}

function getAnswer(){
	$("#message").html("<h2>The answer was "+questions[curQuest]['abr']+" ("+questions[curQuest]['text']+")</h2>");
	$("#past > ul").append("<li><b>"+questions[curQuest]["abr"]+"</b><span> - "+questions[curQuest]["text"]+"</span></li>");
	nextQuestion();
}