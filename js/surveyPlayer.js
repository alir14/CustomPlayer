var _video = document.getElementById("myVideo");
var _currentTime = document.getElementById("currentTime");
var _questionContainer;
var _questionData=[];
var _currentQuestion;

function setVideoSource(data){
    hideQuestions();
    _questionData = data.questions;
    $('#myVideoSrc').attr("src", data.videoUrl);
    _video.load();
}

_video.addEventListener('timeupdate', function(){
    if(_video.ended){
        hideQuestions();
    }

    addQuestion();
})

function addQuestion(){
    var index = _questionData.findIndex(x=> (
        (x.time - 0.2) < _video.currentTime && _video.currentTime <= (x.time + 0.2) &&
        x.isviewed === false
        )
    );
    if(index > -1){
        _currentQuestion = _questionData[index];
        getQuestion();
        _currentQuestion.isviewed = true;
        console.log('find item');
        _video.pause();
        //set data 
        _questionContainer.find('#questionBody').html(_currentQuestion.question);
        _questionContainer.attr('class', 'questionContainer-show');
    }
}

function saveandcontinueVideo(type, answer){

    switch(type){
        case 0:{
            _currentQuestion.answer = answer;
            break;
        }
        case 1:{
            _currentQuestion.answer = $('#txtanswer').val();
            break;
        }
        default: 
            break;
    }

    _questionContainer.attr('class', 'questionContainer-hide');

    if(!_video.ended)
        _video.play();

}

function ReplayVideo(){
    _video.currentTime = 0;
    _video.play();
}

function getQuestion(){

    switch(_currentQuestion.type){
        case 0:{
            _questionContainer = $('#yesNoquestionContainer');
            break;
        }
        case 1:{
            _questionContainer = $('#textValuequestionContainer');
            break;
        }
        default:
            break;
    }
}

function hideQuestions(){
    $('#txtanswer').val('');
    $('#yesNoquestionContainer').attr('class', 'questionContainer-hide');
    $('#textValuequestionContainer').attr('class', 'questionContainer-hide');
}

