var contentData =[];

$(document).ready(function(){
    contentData = getContentData();
    populateSteps();
});

function populateSteps(){
    var stepsContainer = $('#stepsContainer');
    contentData.forEach((element, index) => {
        var video = '<div id="videoPanel" s ><video id="myVideo'+ index + '\'" contorl><source id="myVideoSrc'+ index + '\'" src=" '+ element.videoUrl +'" /></video></div>'
        var item = '<div class="card "><div class="card-header">' + element.stepName + '</div><div class="card-block">' + video + '</div>';
        var question = addQuestion(element);
        stepsContainer.append(item + question);
    });
}

function addQuestion(data){
    var result = '';
    data.questions.forEach(item => {
        switch(data.type){
            case 0:
                result += '<div class="card "><div class="card-header">' + item.question + '</div><div class="card-block">' + 
                '<a href="#" onclick="saveandcontinueVideo(0,\'Yes\')" class="btn btn-primary">Yes</a>a href="#" onclick="saveandcontinueVideo(0,\'No\')" class="btn btn-primary">No</a></div>';
                break;
            case 1:
                result += '<div class="card "><div class="card-header">' + item.question + '</div><div class="card-block"></div>'
                break;
        }
        
    });

    return result;
}

function getContentData(){
    return [
            {
                'stepName': 'step1', 
                'videoUrl': 'media/SampleVideos.mp4', 
                'questions':[
                    {'time': 2, 'question': 'Question 1?', 'answer':'', 'type':0, 'isviewed': false }
                ]
            },
            {
                'stepName': 'step2', 
                'videoUrl': 'media/suit.mp4', 
                'questions':[
                    {'time': 3, 'question': 'Question 2?', 'answer':'', 'type':0, 'isviewed': false }
                ]
            },
            {
                'stepName': 'step3', 
                'videoUrl': 'media/nature.mp4', 
                'questions':[
                    {'time': 4, 'question': 'question 3?', 'answer':'', 'type':1, 'isviewed': false }
                ]
            },
            {
                'stepName': 'step4', 
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

function CompleteAndSave(){
    //save data()
    localStorage.summaryData = JSON.stringify(contentData);
    window.location.replace("summary.html");
}