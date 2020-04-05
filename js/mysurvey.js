var contentData =[];
var _currentIndex;
$(document).ready(function(){
    contentData = getContentData();
    populateSteps();
    loadStep(0);
});

function populateSteps(){
    var stepsContainer = $('#stepsContainer');

    contentData.forEach((element, index) => {
        stepsContainer.append('<li role="tab" class="first current" ><a id="section0" href="#" onclick="loadStep(' + index + ')" >'+ element.stepName +' <i class="fa fa-chevron-right" aria-hidden="true"></i></a></li>');
    });
}

function loadStep(index){
    console.log(index);
    _currentIndex = index;
    toggleButtons();
    var data = contentData[index];
    loadData(data);
}

function getContentData(){
    return [
            {
                'stepName': 'Question 1', 
                'videoUrl': 'media/SampleVideos.mp4', 
                'questions':[
                    {'time': 2, 'question': 'Question 1?', 'answer':'', 'type':0, 'isviewed': false }
                ]
            },
            {
                'stepName': 'Question 2', 
                'videoUrl': 'media/suit.mp4', 
                'questions':[
                    {'time': 3, 'question': 'Question 2?', 'answer':'', 'type':0, 'isviewed': false }
                ]
            },
            {
                'stepName': 'Question 3', 
                'videoUrl': 'media/nature.mp4', 
                'questions':[
                    {'time': 4, 'question': 'question 3?', 'answer':'', 'type':1, 'isviewed': false }
                ]
            },
            {
                'stepName': 'Question 4', 
                'videoUrl': 'media/earth.mp4', 
                'questions':[
                    {'time': 5, 'question': 'question 4?', 'answer':'', 'type':1, 'isviewed': false }
                ]
            }
        ];
}

function loadData(data){
    console.log(data);

    setVideoSource(data);
}

function NextStep(){
    if(_currentIndex < (contentData.length -1)) {
        _currentIndex ++;
        toggleButtons();
        loadStep(_currentIndex);
    }
}

function PreviousStep(){
    if(_currentIndex > 0) {
        _currentIndex --;
        toggleButtons();
        loadStep(_currentIndex);
    }
}

function toggleButtons(){
    if(_currentIndex == 0)
    {
        $('#btnComplete').css('display','none');
        $('#btnPrevious').prop('disabled', true);
        $('#btnNext').prop('disabled', false);
    }  else if(_currentIndex == (contentData.length - 1)) {
        $('#btnComplete').css('display','block');
        $('#btnPrevious').prop('disabled', false);
        $('#btnNext').prop('disabled', true);
    }
    else{
        $('#btnComplete').css('display','none');
        $('#btnNext').prop('disabled', false);
        $('#btnPrevious').prop('disabled', false);
    }
}

function CompleteAndSave(){
    //save data()
    localStorage.summaryData = JSON.stringify(contentData);
    window.location.replace("summary.html");
}