var _video = document.getElementById("myVideo");
var _fillBar = document.getElementById("fill");
var _currentTime = document.getElementById("currentTime");
var _volumeSlider = document.getElementById("volume");
var _questionContainer = $('#questionContainer');

var mediaList = ['SampleVideos.mp4'];

var questionData = [{'time': 6, 'question': 'Are you OK?', 'answers':["yes", "No"], 'flag': true },
{'time': 16, 'question': 'Are you sure you are OK?', 'answers':["yes", "No"], 'flag': true }];

$(document).ready(function(){
    setVideoSource(mediaList[0]);
});

function setVideoSource(mediaName){
    var basePath = "media/";
    var src = basePath + mediaName;
    $('#myVideoSrc').attr("src", src);
    _video.load();
}

function ChangeVolume(){
    _video.volume = _volumeSlider.value;

    if(_volumeSlider.value == 0){
        //change the icon to mute
    }
    else{
        //change the icon to unmute
    }
}

function PlayOrPause(){
    if(_video.paused){
        PalyVideo();
    }
    else{
        PauseVideo();
    }
}

function PauseVideo(){
    _video.pause();
    $('#playbtn').attr("src", "img/play.png");
}

function PalyVideo(){
    _video.play();
    $('#playbtn').attr("src", "img/pause.png");
}

_video.addEventListener('timeupdate', function(){
    var position = _video.currentTime / _video.duration;
    _fillBar.style.width = position * 100 + '%';
    
    convertTime(Math.round(_video.currentTime));

    if(_video.ended){
        $('#playbtn').attr("src", "img/play.png");
        _questionContainer.attr('class', 'questionContainer-hide');
    }

    addQuestion();
})

function addQuestion(){
    var index = questionData.findIndex(x=> (
        (x.time - 0.2) < _video.currentTime && _video.currentTime <= (x.time + 0.2) &&
        x.flag === true
        )
    );
    // var index = questionData.findIndex(x=> x.time == Math.floor(_video.currentTime));
    if(index > -1){
        var item = questionData[index];
        item.flag = false;
        console.log('find item');
        PauseVideo();
        //set data 
        $('#questionBody').html(item.question);
        _questionContainer.attr('class', 'questionContainer-show');
    }
}

function convertTime(seconds){
    var min = Math.floor(seconds / 60);
    var sec = seconds % 60;

    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;

    _currentTime.textContent = min + ":" + sec;

    totalTime(Math.round(_video.duration));
}

function totalTime(seconds){
    var min =  Math.floor(seconds / 60);
    var sec = seconds % 60;

    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;

    _currentTime.textContent += "/" + min + ":" + sec;
}

function continueVideo(){
    PalyVideo();
    _questionContainer.attr('class', 'questionContainer-hide');

}