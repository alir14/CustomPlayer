var contentData =[];
var _currentId;
var _currentIndex;
$(document).ready(function(){
    contentData = getContentData();
    populateSteps();
    loadStepbyIndex(0);
});

function populateSteps(){
    var stepsContainer = $('#stepsContainer');

    contentData.forEach((element, index) => {
        stepsContainer.append('<li id=\'step' + index + '\' class="current" role="tab" ><a class="stepbutton" id=\'btnsection' + index + '\' " href="#" onclick="loadStepbyIndex(' + index + ')" >'+ element.stepName +' <i class="fa fa-chevron-right" aria-hidden="true"></i></a></li>');
    });
}

function loadStepbyIndex(index){
    _currentIndex = index;
    toggleButtons();
    if(_currentIndex > -1)
        loadData(contentData[_currentIndex]);
}

function loadStepbyId(Id){
    _currentIndex = contentData.findIndex(x=> x.Id == Id) ;
    toggleButtons();
    if(_currentIndex > -1)
        loadData(contentData[_currentIndex]);
}

function getContentData(){
    return [
            {
                'Id': 0,
                'stepName': 'Question 1', 
                'videoUrl': 'media/Q1.mp4', 
                'questions':[
                    {'time': 10, 'question': 'Do you have fever?', 'answer':'', 'type':0, 'isviewed': false , 'conditions':[{'ifanswer':'eq', 'value': 'yes','gotoId': 3}, {'ifanswer':'eq', 'value': 'no', 'gotoId': 1}]}
                ]
            },
            {
                'Id': 1,
                'stepName': 'Question 2', 
                'videoUrl': 'media/Q2.mp4', 
                'questions':[
                    {'time': 10, 'question': 'Do you have dry cough?', 'answer':'', 'type':0, 'isviewed': false , 'conditions':[{'ifanswer':'eq', 'value': 'yes','gotoId': 2}, {'ifanswer':'eq', 'value': 'no', 'gotoId': 3}]}
                ]
            },
            {
                'Id': 2,
                'stepName': 'Question 3', 
                'videoUrl': 'media/Q2b.mp4', 
                'questions':[
                    {'time': 10, 'question': 'How old are you?', 'answer':'', 'type':1, 'isviewed': false , 'conditions':[{'ifanswer':'lte', 'value': '30','gotoId': 3}, {'ifanswer':'gt', 'value': '30', 'gotoId': 4}]}
                ]
            },
            {
                'Id': 3,
                'stepName': 'Question 4', 
                'videoUrl': 'media/earth.mp4', 
                'questions':[
                    {'time': 10, 'question': 'How many degre is your fever?', 'answer':'', 'type':1, 'isviewed': false , 'conditions':[{'ifanswer':'lte', 'value': '30','gotoId': 4}, {'ifanswer':'gt', 'value': '30', 'gotoId': 5}]}
                ]
            },
            {
                'Id': 4,
                'stepName': 'Question 5', 
                'videoUrl': 'media/nature.mp4', 
                'questions':[
                    {'time': 10, 'question': 'Question 5?', 'answer':'', 'type':1, 'isviewed': false , 'conditions':[{'ifanswer':'lte', 'value': '30','gotoId': 4}, {'ifanswer':'gt', 'value': '30', 'gotoId': 5}]}
                ],
                
            },
            {
                'Id': 5,
                'stepName': 'Question 6', 
                'videoUrl': 'media/suit.mp4', 
                'questions':[
                    {'time': 10, 'question': 'Question 5?', 'answer':'', 'type':0, 'isviewed': false , 'conditions':[{'ifanswer':'eq', 'value': 'yes','gotoId': 4}, {'ifanswer':'no', 'value': '30', 'gotoId': 5}]}
                ],
            }

        ];
}

function loadData(data){
    setMenuItemActive();
    console.log(data);

    setVideoSource(data);
}

function NextStep(){
    if(_currentIndex < (contentData.length -1)) {
        _currentIndex ++;
        toggleButtons();
        loadStepbyIndex(_currentIndex);
    }
}

function PreviousStep(){
    if(_currentIndex > 0) {
        _currentIndex --;
        toggleButtons();
        loadStepbyIndex(_currentIndex);
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

function setMenuItemActive(){
    $( ".stepbutton" ).css( "background-color", "" );
    $('#btnsection'+_currentIndex).css('background-color','#808080');
}