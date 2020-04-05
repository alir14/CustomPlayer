$(document).ready(function(){
    if(localStorage.summaryData){
        var data = JSON.parse(localStorage.summaryData);
        data.forEach((element)=>{
            element.questions.forEach(item => {
                $('#summaryContent').append('<div class="card-body"><h5 class="card-title">' + item.question + '</h5><p class="card-text">' + item.answer + '</p>');
            })
            $('#summaryContent').append('<hr>');
        })
    }
})

function FinsihSummary(){
    window.location.replace("survey.html");

}