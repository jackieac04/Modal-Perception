//------Set up canvas begin---------
const canvas_L = document.getElementById('canvas_L');
const ctx_L = canvas_L.getContext('2d'); //determines the canvas to be 2D. 
const halfCanvasWidth = canvas_L.width / 2; //half a canvas 
const halfCanvasHeight = canvas_L.height / 2;

// let screenWidth = screen.width;
// let screenHeight = screen.height; -> never used

const canvas_2 = document.getElementById('canvas_2')
const ctx_2 = canvas_2.getContext('2d')
const halfCanvasWidth_2 = canvas_2.width / 2
//const canvasHeight_2 = canvas_2.height never used

//--------------------------------------
//---------SET PARAMETERS BEGIN---------
//--------------------------------------
const secretCode = "CGFBB5IK"; //dont use I/L O/0 because they are hard to understand

let colorArray_1 = [];
for(i=0;i<256;i++){ // QUESTION: why 256 here and 255 in other color arrays?
    colorArray_1[i] = 'rgb(255, ' + i + ', 0)'
}
let colorArray_2 = [];
for(i=254;i > -1;i--){
    colorArray_2[i] = 'rgb(' + i + ', 255, 0)'
}
let colorArray_3 = [];
for(i=0;i<255;i++){
    j = i+1;
    colorArray_3[i] = 'rgb(0, 255, ' + j + ')'
}
let colorArray_4 = [];
for(i=254;i > -1;i--){
    colorArray_4[i] = 'rgb(0, ' + i + ', 255)'
}
let colorArray_5 = [];
for(i=0;i<255;i++){
    j = i+1;
    colorArray_5[i] = 'rgb(' + j + ', 0, 255)'
}
let colorArray_6 = [];
for(i=254;i > -1;i--){
    colorArray_6[i] = 'rgb(255, 0, ' + i + ')'
}

let colorArray = colorArray_1.concat(colorArray_2).concat(colorArray_3).concat(colorArray_4)
.concat(colorArray_5).concat(colorArray_6);

//what is the purpose of generating these huge arrays of colors if we set the same values everytime?

let responseAcceptable = false;
let freshRate = 1000/60; // The delay the animation needs before beginning after the function is called

let startTrialTime; //The Date and time the trial starts
let endTrialTime; //the Date and time the trial ends

/*
Retrives the browser the experiment is being displayed on
*/
function getBrowser() {
    const browsers = [
        { name: "Opera", keyword: "OPR" },
        { name: "Chrome", keyword: "Chrome" },
        { name: "Safari", keyword: "Safari" },
        { name: "Firefox", keyword: "Firefox" },
        { name: "IE", keyword: "MSIE" },
    ];

    for (const browser of browsers) {
        if (navigator.userAgent.indexOf(browser.keyword || browser.name) !== -1 ) {
            return browser.name;
        } else if (!!document.documentMode) {
            return "IE";
        }
    }

    return "Unknown";
 } //updated from navigator.userAgent to navigator.userAgentData for Chrome 101

// const browser = getBrowser(navigator.userAgentData);

// ======================== GET AMAZON MTURK WORKER ID ======================= //
    // Get inferred subject ID from URL (credit to Eyal Peer)
    function getSubjectID() {
      let parampairs = window.location.search.substring(1).split('&');
      let foundId;
      for (i in parampairs) {
        let pair = parampairs[i].split("=");
        if (pair[0] === "PROLIFIC_PID") {
          foundId = pair[1];
        }
      }
      if (foundId){
        return foundId;
      } else {
        return "testSubject";
      }
    }
// ======================== CONVERT JSON TO CSV ======================= //
// https://codingbeautydev.com/blog/javascript-convert-json-to-csv/ //
function jsonToCsv(items) {
    const header = Object.keys(items[0]);
    console.log(header);
  
    const headerString = header.join(',');
  
    // handle null or undefined values here
    const replacer = (key, value) => value ?? '';
  
    const rowItems = items.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
  
    // join header and body, and break into separate lines
    const csv = [headerString, ...rowItems].join('\r\n');
  
    return csv;
  }
function redirect() {
    // TODO: redirect elsewhere?
        window.location = "https://jhu.sona-systems.com/webstudy_credit.aspx?experiment_id=754&credit_token=2d6ab745370a4d0ba5567cdfdef69ee9&survey_code="+window.subjectID
}

// ======================== POST DATA TO SERVER ======================= //
function postData() {
    // Collect responses into JSON / csv file
    //   var dataString = JSON.stringify(window.frame);
      const csv = jsonToCsv(window.frame);

      // post response to server
      $.post("http://pclpsrescit2.services.brown.edu/blt_lab/mp-7/data/studysave.php", {
        fname: `${window.subjectID}.csv`,
        postresult_string: csv,  
      }).done(function(){
        $("#instructions").text(`Thank you! Your secret code is: ${secretCode}
        Please copy and paste this into your submission box! You may then close this window.`);
        $("#submitButton").hide();
      });
      $("#instructions").show();  
      $("#instructions").text("Thank you! Please wait while your secret code is being generated. This may take up to 5 minutes...");  
  }
  //dollar sign = jQuery

let shape_A_preview_tmp;
let shape_A_test_tmp;
let shape_B_preview_tmp;
let shape_B_test_tmp;
let ball_A_color;
let ball_B_color;

let shape_C_preview_tmp;
let shape_C_test_tmp;
let shape_D_preview_tmp;
let shape_D_test_tmp;
let ball_C_color;
let ball_D_color;

let vertical_tmp_A;
let vertical_tmp_B;
let vertical_tmp_C;
let vertical_tmp_D;
let vertical_tmp_array = [-50,+50]; // QUESTION: what THIS?

function trialGenerator(nRepetitions,trialsInfo) {

    // for (var j1 = 0; j1 < nRepetitions; j1++) { // 44 trials?
        
    //     var arr = [];
    //     while(arr.length < 2) {
    //         var r = Math.floor(Math.random() * 5);
    //         if(arr.indexOf(r) === -1) arr.push(r);
    //     }
    //     shape_A_preview_tmp = arr[0];
    //     shape_A_test_tmp = shape_A_preview_tmp;
    //     shape_B_preview_tmp = arr[1];
    //     shape_B_test_tmp = shape_B_preview_tmp; 

    //     shape_C_preview_tmp = shape_A_preview_tmp;
    //     shape_C_test_tmp = shape_A_test_tmp;
    //     shape_D_preview_tmp = shape_B_preview_tmp;
    //     shape_D_test_tmp = shape_B_test_tmp;   

    //     var arr_color = [];
    //     while(arr_color.length < 1) {
    //         var r = Math.floor(Math.random() * 5);
    //         if(arr_color.indexOf(r) === -1) arr_color.push(r);
    //     }
    //     ball_A_color = arr_color[0];
    //     ball_B_color = arr_color[0]; 
    //     ball_C_color = arr_color[0];
    //     ball_D_color = arr_color[0];

    //     var arr_vertical = [];
    //     while(arr_vertical.length < 2) {
    //     var r = Math.floor(Math.random() * 2);
    //     if(arr_vertical.indexOf(r) === -1) arr_vertical.push(r);
    //     }
    //     vertical_tmp_A = vertical_tmp_array[arr_vertical[0]];
    //     vertical_tmp_B = vertical_tmp_array[arr_vertical[1]];
    //     vertical_tmp_C = vertical_tmp_A;
    //     vertical_tmp_D = vertical_tmp_B;

    //     trialsInfo.push({
    //         "spatiotemporalType":"spatiotemporal_inconsistent",
    //         "matchType":"match",
    //         "colorType":"samecolor",
    //         "shape_A_pre_ind":shape_A_preview_tmp,
    //         "shape_A_test_ind":shape_A_test_tmp,
    //         "shape_B_pre_ind":shape_B_preview_tmp,
    //         "shape_B_test_ind":shape_B_test_tmp,  
    //         "ball_A_color":ball_A_color,
    //         "ball_B_color":ball_B_color,
    //         "ball_C_color":ball_C_color,
    //         "ball_D_color":ball_D_color,   
    //         "ball_A_vertical":vertical_tmp_A,
    //         "ball_B_vertical":vertical_tmp_B,
    //         "responseC": "null",
    //         "browser": getBrowser(navigator.userAgentData),
    //         "subjectID": getSubjectID(),
    //         "startTime": "null",
    //         "endTime": "null",
    //         "reactTime":"null",
    //     });                  
    // }
    for (var j1 = 0; j1 < nRepetitions; j1++) { // 44 trials?
        
        var arr = [];
        while(arr.length < 2) {
            const r = Math.floor(Math.random() * 5);
            if(!(r in arr)) arr.push(r);
        }
        shape_A_preview_tmp = arr[0];
        shape_A_test_tmp = shape_A_preview_tmp;
        shape_B_preview_tmp = arr[1];
        shape_B_test_tmp = shape_B_preview_tmp;  

        shape_C_preview_tmp = shape_A_preview_tmp;
        shape_C_test_tmp = shape_A_test_tmp;
        shape_D_preview_tmp = shape_B_preview_tmp;
        shape_D_test_tmp = shape_B_test_tmp;  

        var arr_color = [];
        while(arr_color.length < 2) {
            var r = Math.floor(Math.random() * 5);
            if(!(r in arr_color)) arr_color.push(r);
        }
        ball_A_color = arr_color[0];
        ball_B_color = arr_color[1];
        ball_C_color = arr_color[0];
        ball_D_color = arr_color[1];

        var arr_vertical = [];
        while(arr_vertical.length < 2) {
        var r = Math.floor(Math.random() * 2);
        if(!(r in arr_vertical)) arr_vertical.push(r);
        }
        vertical_tmp_A = vertical_tmp_array[arr_vertical[0]];
        vertical_tmp_B = vertical_tmp_array[arr_vertical[1]];
        vertical_tmp_C = vertical_tmp_A;
        vertical_tmp_D = vertical_tmp_B;

        trialsInfo.push({
            "spatiotemporalType":"non_spatiotemporal",
            "matchType":"match",
            "colorType":"diffcolor",
            "shape_A_pre_ind":shape_A_preview_tmp,
            "shape_A_test_ind":shape_A_test_tmp,
            "shape_B_pre_ind":shape_B_preview_tmp,
            "shape_B_test_ind":shape_B_test_tmp,  
            "ball_A_color":ball_A_color,
            "ball_B_color":ball_B_color, 
            "ball_C_color":ball_C_color,
            "ball_D_color":ball_D_color,  
            "ball_A_vertical":vertical_tmp_A,
            "ball_B_vertical":vertical_tmp_B,
            "responseC": "null",
            "browser": getBrowser(),
            "subjectID": getSubjectID(),
            "startTime": "null",
            "endTime": "null",
            "reactTime":"null",
        });                  
    }
    for (var j1 = 0; j1 < nRepetitions; j1++) { // 22 trials?

        var arr = [];
        while(arr.length < 3) {
            var r = Math.floor(Math.random() * 5);
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        shape_A_preview_tmp = arr[0];
        shape_A_test_tmp = shape_A_preview_tmp;
        shape_B_preview_tmp = arr[1];
        shape_B_test_tmp = arr[2];  

        shape_C_preview_tmp = shape_A_preview_tmp;
        shape_C_test_tmp = shape_A_test_tmp;
        shape_D_preview_tmp = shape_B_preview_tmp;
        shape_D_test_tmp = shape_B_test_tmp;  

        var arr_color = [];
        while(arr_color.length < 2) {
            var r = Math.floor(Math.random() * 5);
            if(arr_color.indexOf(r) === -1) arr_color.push(r);
        }
        ball_A_color = arr_color[0];
        ball_B_color = arr_color[1];
        ball_C_color = arr_color[0];
        ball_D_color = arr_color[1];

        var arr_vertical = [];
        while(arr_vertical.length < 2) {
        var r = Math.floor(Math.random() * 2);
        if(arr_vertical.indexOf(r) === -1) arr_vertical.push(r);
        }
        vertical_tmp_A = vertical_tmp_array[arr_vertical[0]];
        vertical_tmp_B = vertical_tmp_array[arr_vertical[1]];
        vertical_tmp_C = vertical_tmp_A;
        vertical_tmp_D = vertical_tmp_B;

        trialsInfo.push({
            "spatiotemporalType":"non_spatiotemporal",
            "matchType":"new",
            "colorType":"diffcolor",
            "shape_A_pre_ind":shape_A_preview_tmp,
            "shape_A_test_ind":shape_A_test_tmp,
            "shape_B_pre_ind":shape_B_preview_tmp,
            "shape_B_test_ind":shape_B_test_tmp,
            "ball_A_color":ball_A_color,
            "ball_B_color":ball_B_color,
            "ball_C_color":ball_C_color,
            "ball_D_color":ball_D_color,
            "ball_A_vertical":vertical_tmp_A,
            "ball_B_vertical":vertical_tmp_B,
            "responseC": "null",
            "browser": getBrowser(),
            "subjectID": getSubjectID(),
            "startTime": "null",
            "endTime": "null",
            "reactTime":"null",
        });
    }

    // for (var j1 = 0; j1 < nRepetitions; j1++) { // 22 trials
        
    //     var arr = [];
    //     while(arr.length < 3) {
    //         var r = Math.floor(Math.random() * 5);
    //         if(arr.indexOf(r) === -1) arr.push(r);
    //     }
    //     shape_A_preview_tmp = arr[0];
    //     shape_A_test_tmp = arr[1];
    //     shape_B_preview_tmp = arr[2];
    //     shape_B_test_tmp = shape_B_preview_tmp;

    //     shape_C_preview_tmp = shape_A_preview_tmp;
    //     shape_C_test_tmp = shape_A_test_tmp;
    //     shape_D_preview_tmp = shape_B_preview_tmp;
    //     shape_D_test_tmp = shape_B_test_tmp; 

    //     var arr_color = [];
    //     while(arr_color.length < 1) {
    //         var r = Math.floor(Math.random() * 5);
    //         if(arr_color.indexOf(r) === -1) arr_color.push(r);
    //     }
    //     ball_A_color = arr_color[0];
    //     ball_B_color = arr_color[0];
    //     ball_C_color = arr_color[0];
    //     ball_D_color = arr_color[0];

    //     var arr_vertical = [];
    //     while(arr_vertical.length < 2) {
    //     var r = Math.floor(Math.random() * 2);
    //     if(arr_vertical.indexOf(r) === -1) arr_vertical.push(r);
    //     }
    //     vertical_tmp_A = vertical_tmp_array[arr_vertical[0]];
    //     vertical_tmp_B = vertical_tmp_array[arr_vertical[1]];
    //     vertical_tmp_C = vertical_tmp_A;
    //     vertical_tmp_D = vertical_tmp_B;

    //     trialsInfo.push({
    //         "spatiotemporalType":"spatiotemporal_inconsistent",
    //         "matchType":"new",
    //         "colorType":"samecolor",
    //         "shape_A_pre_ind":shape_A_preview_tmp,
    //         "shape_A_test_ind":shape_A_test_tmp,
    //         "shape_B_pre_ind":shape_B_preview_tmp,
    //         "shape_B_test_ind":shape_B_test_tmp,
    //         "ball_A_color":ball_A_color,
    //         "ball_B_color":ball_B_color,
    //         "ball_C_color":ball_C_color,
    //         "ball_D_color":ball_D_color,
    //         "ball_A_vertical":vertical_tmp_A,
    //         "ball_B_vertical":vertical_tmp_B,
    //         "responseC": "null",
    //         "browser": getBrowser(navigator.userAgentData),
    //         "subjectID": getSubjectID(),
    //         "startTime": "null",
    //         "endTime": "null",
    //         "reactTime":"null",
    //     });
    // }

    for (var j1 = 0; j1 < nRepetitions; j1++) { // 44 trials
        
        var arr = [];
        while(arr.length < 2) {
            var r = Math.floor(Math.random() * 5);
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        shape_A_preview_tmp = arr[0];
        shape_B_preview_tmp = arr[1];
        shape_A_test_tmp = shape_B_preview_tmp;
        shape_B_test_tmp = shape_A_preview_tmp;

        shape_C_preview_tmp = shape_A_preview_tmp;
        shape_C_test_tmp = shape_A_test_tmp;
        shape_D_preview_tmp = shape_B_preview_tmp;
        shape_D_test_tmp = shape_B_test_tmp; 

        var arr_color = [];
        while(arr_color.length < 2) {
            var r = Math.floor(Math.random() * 5);
            if(arr_color.indexOf(r) === -1) arr_color.push(r);
        }
        ball_A_color = arr_color[0];
        ball_B_color = arr_color[1];
        ball_C_color = arr_color[0];
        ball_D_color = arr_color[1];

        var arr_vertical = [];
        while(arr_vertical.length < 2) {
        var r = Math.floor(Math.random() * 2);
        if(arr_vertical.indexOf(r) === -1) arr_vertical.push(r);
        }
        vertical_tmp_A = vertical_tmp_array[arr_vertical[0]];
        vertical_tmp_B = vertical_tmp_array[arr_vertical[1]];
        vertical_tmp_C = vertical_tmp_A;
        vertical_tmp_D = vertical_tmp_B;

        trialsInfo.push({
            "spatiotemporalType":"non_spatiotemporal",
            "matchType":"swap",
            "colorType":"diffcolor",
            "shape_A_pre_ind":shape_A_preview_tmp,
            "shape_A_test_ind":shape_A_test_tmp,
            "shape_B_pre_ind":shape_B_preview_tmp,
            "shape_B_test_ind":shape_B_test_tmp,
            "ball_A_color":ball_A_color,
            "ball_B_color":ball_B_color,
            "ball_C_color":ball_C_color,
            "ball_D_color":ball_D_color,
            "ball_A_vertical":vertical_tmp_A,
            "ball_B_vertical":vertical_tmp_B,
            "responseC": "null",
            "browser": getBrowser(),
            "subjectID": getSubjectID(),
            "startTime": "null",
            "endTime": "null",
            "reactTime":"null",
        });
    }
    trialsInfo = shuffle(trialsInfo);
    return trialsInfo;
}

var trialsInfo = [];
/*
nRepetitions is used to determine the number of trials in the experiment!
There are four sets of trials, which results in the following numbers within
the trialGenerator:
nRepetitions * 2
+ nRepetitions
+ nRepetitions
+ nRepetitions * 2!

So with nRepetitions = 22, you would have
22 + 22 + 22 + 22+22 = 132 trials
*/
var nRepetitions = 51; // 22
var frame = trialGenerator(nRepetitions,trialsInfo);
var nTrials = frame.length;

var trialsInfo_training = [];
var nRepetitions_training = 1;
var frame_training = trialGenerator(nRepetitions_training,trialsInfo_training);
var nTrials_training = frame_training.length;

var subjectID = getSubjectID();

//---------------------------------------
//-----------FUNCTIONS BEGIN-------------
//---------------------------------------
/* Fisher-Yates shuffle */
function shuffle(o){
    for(let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
}

function random(min,max) {
    const num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}
function Ball(x,y,color,size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
};
var nDots = 1; 
var dotRadius = 40; //Radius of each dot in pixels
var balls = [];
// colorNumb = 10, red/ 200, yellow /380, green/ 1000, blue/ 1200, purple
var balls_colorArray = [10,200,380,1000,1200]; // QUESTION: what THIS? Why these numbers??
var colorInd;
var vartical_position

var x_0_A;
var y_0_A;



function generateNewBalls_A(ball_A_color) { // the ball on the left at beginning
    let colorNum = balls_colorArray[ball_A_color];
    let colorNums = [];
    // var x_0s = [];
    // var y_0s = [];
    x_0_A = halfCanvasWidth - 230;
    y_0_A = halfCanvasHeight;
    // x_0s.push(x_0_A);
    // y_0s.push(y_0_A);

    let ball = new Ball(
        x_0_A,
        y_0_A,
        colorArray[colorNum],
        dotRadius,
        );
    balls.push(ball);
    colorNums.push(colorNum);
    return balls;
}

var x_0_B;
var y_0_B;

function generateNewBalls_B(ball_B_color) { // the ball on the right at beginning
    colorInd = balls_colorArray[ball_B_color];
    let colorNums = [];
    // var x_0s = [];
    // var y_0s = [];
    x_0_B = halfCanvasWidth+230;
    y_0_B = halfCanvasHeight;
    // x_0s.push(x_0_B);
    // y_0s.push(y_0_B);
    var colorNum = colorInd;
    let ball = new Ball(
        x_0_B,
        y_0_B,
        colorArray[colorNum],
        dotRadius,
        );
    balls.push(ball);
    colorNums.push(colorNum);
    return balls;
}

var x_0_C;
var y_0_C;

//var vertical_tmp_array = [-50,+50];

function generateNewBalls_C(ball_C_color,arr_vertical) { // the ball on top
    colorInd = balls_colorArray[ball_C_color];
    vertical_position_C = vertical_tmp_A;
    let verticalNums = []
    //console.log("generateNewBalls_C:" vertical_tmp_C);
    let colorNums = [];
    // var x_0s = [];
    // var y_0s = [];
    x_0_C = halfCanvasWidth;
    y_0_C = 650 + vertical_position_C ;
    console.log("generateNewBalls_C:", vertical_position_C);
    // x_0s.push(x_0_C);
    // y_0s.push(y_0_C);
    var colorNum = colorInd;
    let ball = new Ball(
        x_0_C,
        y_0_C,
        colorArray[colorNum],
        dotRadius,
        );
    balls.push(ball);
    colorNums.push(colorNum);
    return balls;
}

var x_0_D;
var y_0_D;

function generateNewBalls_D(ball_D_color,arr_vertical) { // the ball on bottom
    colorInd = balls_colorArray[ball_D_color];
    vertical_position_D = vertical_tmp_B;
    //console.log("generateNewBalls_D:" vertical_tmp_D);
    let colorNums = [];
    var x_0s = [];
    var y_0s = [];
    x_0_D = halfCanvasWidth;
    y_0_D = 650 + vertical_position_D;
    console.log("generateNewBalls_D:", vertical_position_D);
    x_0s.push(x_0_D);
    y_0s.push(y_0_D);
    var colorNum = colorInd;
    let ball = new Ball(
        x_0_D,
        y_0_D,
        colorArray[colorNum],
        dotRadius,
        );
    balls.push(ball);
    colorNums.push(colorNum);
    return balls;
}


Ball.prototype.draw_balls = function() {
    ctx_L.beginPath();
    ctx_L.fillStyle = this.color;
    ctx_L.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx_L.fill();
};

Ball.prototype.draw_balls_2 = function() {
    ctx_2.beginPath();
    ctx_2.fillStyle = this.color;
    ctx_2.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx_2.fill();
}

Ball.prototype.updateColor = function() { // updates color, when color_change_rate is zero, no color change
    var pos = colorArray.indexOf(this.color);
    if(pos >= colorArray.length - 1 - color_change_rate) {
        pos = colorArray.length - 1 -  pos;
    } else {
        pos = colorArray.indexOf(this.color);
    }
    this.color = colorArray[pos+color_change_rate];
};
var velX = 4.5; // QUESTION: what THIS?
// var velY = 1.5;
var edgeX = 100; // QUESTION: what THIS?

Ball.prototype.updatePosition_A = function() { // define the moving path
    if (this.x < halfCanvasWidth) {
        this.x = this.x + velX;
        if (this.x < x_0_A+dotRadius/4) {
            this.y = this.y+10;
        }
        if (x_0_A+dotRadius/4 <= this.x && this.x < x_0_A+dotRadius/2) {
            this.y = this.y+15;
        }
        if (x_0_A+dotRadius/2 <= this.x && this.x < x_0_A+1.5*dotRadius) {
            this.y = this.y-3;
        }
        if (x_0_A+1.5*dotRadius <= this.x && this.x < x_0_A+2*dotRadius) {
            this.y = this.y;
        }
        if (x_0_A+2*dotRadius <= this.x && this.x < x_0_A+3*dotRadius) {
            this.y = this.y-3;
        }
        if (x_0_A+3*dotRadius <= this.x && this.x < x_0_A+3*dotRadius) {
            this.y = this.y+3;
        }
        if (x_0_A+3*dotRadius <= this.x && this.x < halfCanvasWidth) {
            this.y = halfCanvasHeight;
        }
    } 
    else {
        this.x = halfCanvasWidth;
        this.y = halfCanvasHeight+vertical_tmp_A;
    }
};
Ball.prototype.updatePosition_B = function() {    
    if (this.x > halfCanvasWidth) {
        this.x = this.x - velX;

        if (this.x > x_0_B-dotRadius/4) {
            this.y = this.y+10;
        }
        if (x_0_B-dotRadius/2 < this.x && this.x <= x_0_B-dotRadius/4) {
            this.y = this.y+15;
        }
        if (x_0_B-1.5*dotRadius < this.x && this.x <= x_0_B-dotRadius/2) { // QUESTION: WHY 1.5?? WHAT IS THIS?
            this.y = this.y-3;
        }
        if (x_0_B-2*dotRadius < this.x && this.x <= x_0_B-1.5*dotRadius) {
            this.y = this.y;
        }
        if (x_0_B-3*dotRadius < this.x && this.x <= x_0_B-2*dotRadius) {
            this.y = this.y-3;
        }
        if (x_0_B-5*dotRadius < this.x && this.x <= x_0_B-5*dotRadius) {
            this.y = this.y+3;
        }
        if (halfCanvasWidth < this.x && this.x <= x_0_B-5*dotRadius) {
            this.y = halfCanvasHeight;
        }
    } 
    else {
        this.x = halfCanvasWidth;
        this.y = halfCanvasHeight+vertical_tmp_B;
    }
};

// exp procedures
function showInstructions() {
    $('#consent').hide();
    $('#Instruction1').show();
    $('#continueInstructionButton1').show();
}
function continueInstruction1() {
    $('#Instruction1').hide();
    $('#continueInstructionButton1').hide();
    $('#Instruction2').show(); 
    $('#startTrainingButton').show();
}
let balls_A = [];
let balls_B = [];
let balls_C = [];
let balls_D = [];

var trainingTrial = 0;
function showTrials_training_0() {
    responseAcceptable = false;
    $('#title').hide();
    $('#Instruction2').hide();
    $('#startTrainingButton').hide();
    $('#InstructionPractice').show();

    balls = generateNewBalls_A(trialsInfo_training[trainingTrial].ball_A_color);
    balls_A = balls;
    balls = [];
    balls = generateNewBalls_B(trialsInfo_training[trainingTrial].ball_B_color);
    balls_B = balls;
    balls = [];

    balls = generateNewBalls_C(trialsInfo_training[trainingTrial].ball_C_color, trialsInfo_training[trainingTrial].vertical_tmp_C);
    balls_C = balls;
    balls = [];
    balls = generateNewBalls_D(trialsInfo_training[trainingTrial].ball_D_color, trialsInfo_training[trainingTrial].vertical_tmp_D);
    balls_D = balls;
    balls = [];

    $('#canvas_L').show(); 
    //$('#canvas_2').show();
    ctx_L.drawImage(occluder,halfCanvasWidth-50,halfCanvasHeight-100);
    balls_A[0].draw_balls();
    //balls_A[0].updateColor();
    balls_B[0].draw_balls();
    //balls_B[0].updateColor();
    
    balls_C[0].draw_balls();
    //balls_C[0].updateColor();
    balls_D[0].draw_balls();
    //balls_D[0].updateColor();
    stimuliPreview(); 
}

function showTrials_training() {
    responseAcceptable = false;
    $('#Instruction4').hide();
    $('#nextTrainingTrialButton').hide();
    trainingTrial ++;

    if (trainingTrial <= trialsInfo_training.length-1) {
        balls = generateNewBalls_A(trialsInfo_training[trainingTrial].ball_A_color);
        balls_A = balls;
        balls = [];
        balls = generateNewBalls_B(trialsInfo_training[trainingTrial].ball_B_color);
        balls_B = balls;
        balls = [];

        balls = generateNewBalls_C(trialsInfo_training[trainingTrial].ball_C_color, trialsInfo_training[trainingTrial].vertical_tmp_C);
        balls_C = balls;
        balls = [];
        balls = generateNewBalls_D(trialsInfo_training[trainingTrial].ball_D_color, trialsInfo_training[trainingTrial].vertical_tmp_D);
        balls_D = balls;
        balls = [];

        $('#Instruction2').hide();
        ctx_L.fillStyle = 'gray';
        ctx_L.clearRect(0,0,canvas_L.width, canvas_L.height);  
        $('#canvas_L').show();
        ctx_L.drawImage(occluder,halfCanvasWidth-50,halfCanvasHeight-100);
        balls_A[0].draw_balls();
        //balls_A[0].updateColor();
        balls_B[0].draw_balls();
        //balls_B[0].updateColor();
        balls_C[0].draw_balls();
        //balls_C[0].updateColor();
        balls_D[0].draw_balls();
        //balls_D[0].updateColor();
        stimuliPreview(); 
    } else {
        $('#InstructionPractice').hide();
        $('#Instruction3').show();
        $('#startExpButton').show();
    }
}
var curTrial = 0;
function showTrials_exp_0() {
    responseAcceptable = false;
    $('#title').hide();
    $('#Instruction3').hide();
    $('#startExpButton').hide();

    balls = generateNewBalls_A(trialsInfo[curTrial].ball_A_color);
    balls_A = balls;
    balls = [];
    balls = generateNewBalls_B(trialsInfo[curTrial].ball_B_color);
    balls_B = balls;
    balls = [];

    balls = generateNewBalls_C(trialsInfo[curTrial].ball_C_color);
    balls_C = balls;
    balls = [];
    balls = generateNewBalls_D(trialsInfo[curTrial].ball_D_color);
    balls_D = balls;
    balls = [];

    ctx_L.fillStyle = 'gray';
    ctx_L.clearRect(0,0,canvas_L.width, canvas_L.height);  
    startTrialTime = new Date();
    trialsInfo[curTrial].startTime= startTrialTime;
    $('#canvas_L').show();
    ctx_L.drawImage(occluder,halfCanvasWidth-50,halfCanvasHeight-100);
    balls_A[0].draw_balls();
    balls_A[0].updateColor();
    balls_B[0].draw_balls();
    balls_B[0].updateColor();
    balls_C[0].draw_balls();
    //balls_C[0].updateColor();
    balls_D[0].draw_balls();
    //balls_D[0].updateColor();
    stimuliPreview(); 
}
function showTrials_exp() {
    responseAcceptable = false;
    curTrial++;
    $('#Instruction4').hide();
    $('#nextTrialButton').hide();
    
    if (curTrial <= trialsInfo.length - 1) {

        balls = generateNewBalls_A(trialsInfo[curTrial].ball_A_color);
        balls_A = balls;
        balls = [];
        balls = generateNewBalls_B(trialsInfo[curTrial].ball_B_color);
        balls_B = balls;
        balls = [];

        balls = generateNewBalls_C(trialsInfo[curTrial].ball_C_color);
        balls_C = balls;
        balls = [];
        balls = generateNewBalls_D(trialsInfo[curTrial].ball_D_color);
        balls_D = balls;
        balls = [];

        ctx_L.fillStyle = 'gray';
        ctx_L.clearRect(0,0,canvas_L.width, canvas_L.height);  
        startTrialTime = new Date();
        trialsInfo[curTrial].startTime= startTrialTime;
        $('#canvas_L').show(); 
        ctx_L.drawImage(occluder,halfCanvasWidth-50,halfCanvasHeight-100);
        balls_A[0].draw_balls();
        balls_A[0].updateColor();
        balls_B[0].draw_balls();
        balls_B[0].updateColor();
        balls_C[0].draw_balls();
        //balls_C[0].updateColor();
        balls_D[0].draw_balls();
        //balls_D[0].updateColor();
        stimuliPreview(); 
    } else {
        $('#Instruction5').show();
        $('#submitButton').show();
    }
}

var myTimeout10;
var myTimeout11;
var myTimeout12;
var shapeInd_A_pre;
var shapeInd_A_test;
var shapeInd_B_pre;
var shapeInd_B_test;
var colorDisk = 500; // QUESTION: WHY 500
var previewShape = 1200; // QUESTION: WHAT THIS???

function stimuliPreview() { // the phases before the diska and shapes move
    myTimeout10 = setTimeout(function() {
        if (trainingTrial <= trialsInfo_training.length-1) {
            shapeInd_A_pre = trialsInfo_training[trainingTrial].shape_A_pre_ind;
            shapeInd_B_pre = trialsInfo_training[trainingTrial].shape_B_pre_ind;  
        }
        if (trainingTrial === trialsInfo_training.length && curTrial>=0) {
            shapeInd_A_pre = trialsInfo[curTrial].shape_A_pre_ind;
            shapeInd_B_pre = trialsInfo[curTrial].shape_B_pre_ind;
        }
            if (shapeInd_A_pre === 0) {
                shapeTmp = document.getElementById("shape0");
            } else if (shapeInd_A_pre === 1) {
                shapeTmp = document.getElementById("shape1");
            } else if (shapeInd_A_pre === 2) {
                shapeTmp = document.getElementById("shape2");
            } else if (shapeInd_A_pre === 3) {
                shapeTmp = document.getElementById("shape3");
            } else if (shapeInd_A_pre === 4) {
                shapeTmp = document.getElementById("shape4");
            }
            ctx_L.drawImage(shapeTmp, balls_A[0].x-27, balls_A[0].y-27)
            // ctx_L.fillStyle = 'white';
            // ctx_L.font = "20px Arial";
            // ctx_L.fillText(shapeInd_A_pre, balls_A[0].x, balls_A[0].y);

            if (shapeInd_B_pre === 0) { // shapeTmp is being set to the shape objects in the DOM
                shapeTmp = document.getElementById("shape0");
            } else if (shapeInd_B_pre === 1) {
                shapeTmp = document.getElementById("shape1");
            } else if (shapeInd_B_pre === 2) {
                shapeTmp = document.getElementById("shape2");
            } else if (shapeInd_B_pre === 3) {
                shapeTmp = document.getElementById("shape3");
            } else if (shapeInd_B_pre === 4) {
                shapeTmp = document.getElementById("shape4");
            }
            ctx_L.drawImage(shapeTmp, balls_B[0].x-27, balls_B[0].y-27)
            // ctx_L.fillStyle = 'white';
            // ctx_L.font = "20px Arial";
            // ctx_L.fillText(shapeInd_B_pre, balls_B[0].x, balls_B[0].y);

        myTimeout11 = setTimeout(function() {  
            balls_A[0].draw_balls();
            //balls_A[0].updateColor();
            balls_B[0].draw_balls();
            //balls_B[0].updateColor();

            balls_C[0].draw_balls();
            //balls_C[0].updateColor();
            balls_D[0].draw_balls();
            //balls_D[0].updateColor();
            myTimeout12 = setTimeout(function() {
                animate();
            },colorDisk)
        },previewShape)
    },colorDisk)
}

var refresh_stimuliOnset_test = 0;
var color_change_rate = 0;
var myTimeout;
var myReq;
var startResponseTiming = false;
var occluder_velX = 0;
var occluder_velY = 40;
var occluder_posX = 0;
var occluder_posY = 40;

function animate() { // make the balls and the shapes move together, and occluder when spatiotemporal feature is inconsistent
    myTimeout = setTimeout (function() {     
    ctx_L.fillStyle = 'gray';
    ctx_L.clearRect(0,0,canvas_L.width, canvas_L.height);
if (trainingTrial < trialsInfo_training.length) {
    vertical_tmp_A = trialsInfo_training[trainingTrial].ball_A_vertical;
    vertical_tmp_B = trialsInfo_training[trainingTrial].ball_B_vertical;
}
if (trainingTrial === trialsInfo_training.length && curTrial < trialsInfo.length) {
    vertical_tmp_A = trialsInfo[curTrial].ball_A_vertical;
    vertical_tmp_B = trialsInfo[curTrial].ball_B_vertical;
}
    
    balls_A[0].draw_balls();
    balls_A[0].updateColor();
    balls_A[0].updatePosition_A();
    balls_B[0].draw_balls();
    balls_B[0].updateColor();
    balls_B[0].updatePosition_B();
    balls_C[0].draw_balls();
    //balls_C[0].updateColor();
    balls_D[0].draw_balls();
    //balls_D[0].updateColor();
    refresh_stimuliOnset_test ++;
    console.log(refresh_stimuliOnset_test);
    
    if (refresh_stimuliOnset_test < 76) {
        ctx_L.drawImage(occluder,halfCanvasWidth-50,halfCanvasHeight-100);
        occluder_posY = 40;
        balls_C[0].draw_balls();
        //balls_C[0].updateColor();
        balls_D[0].draw_balls();
        //balls_D[0].updateColor();
        myReq = requestAnimationFrame(animate);
    } else { // QUESTION: WHY 76
       if (trainingTrial <= trialsInfo_training.length-1) {
            shapeInd_A_test = trialsInfo_training[trainingTrial].shape_A_test_ind;
            shapeInd_B_test = trialsInfo_training[trainingTrial].shape_B_test_ind;
        }

        if (trainingTrial === trialsInfo_training.length && curTrial>=0) {
            shapeInd_A_test = trialsInfo[curTrial].shape_A_test_ind;
            shapeInd_B_test = trialsInfo[curTrial].shape_B_test_ind;
        }

            if (shapeInd_A_test === 0) {
                shapeTmpA = document.getElementById("shape0");
            } else if (shapeInd_A_test === 1) {
                shapeTmpA = document.getElementById("shape1");
            } else if (shapeInd_A_test === 2) {
                shapeTmpA = document.getElementById("shape2");
            } else if (shapeInd_A_test === 3) {
                shapeTmpA = document.getElementById("shape3");
            } else if (shapeInd_A_test === 4) {
                shapeTmpA = document.getElementById("shape4");
            }
            
            // ctx_L.fillStyle = 'white';
            // ctx_L.font = "20px Arial";
            // ctx_L.fillText(shapeInd_A_test, balls_A[0].x, balls_A[0].y);
            
            if (shapeInd_B_test === 0) {
                shapeTmpB = document.getElementById("shape0");
            } else if (shapeInd_B_test === 1) {
                shapeTmpB = document.getElementById("shape1");
            } else if (shapeInd_B_test === 2) {
                shapeTmpB = document.getElementById("shape2");
            } else if (shapeInd_B_test === 3) {
                shapeTmpB = document.getElementById("shape3");
            } else if (shapeInd_B_test === 4) {
                shapeTmpB = document.getElementById("shape4");
            }
            
            // ctx_L.fillStyle = 'white';
            // ctx_L.font = "20px Arial";
            // ctx_L.fillText(shapeInd_B_test, balls_B[0].x, balls_B[0].y);

        // QUESTION: WHY THESE NUMBERS???
        ctx_L.drawImage(occluder,halfCanvasWidth-50,halfCanvasHeight-100);
       // occluder_posY = occluder_posY + occluder_velY;
        balls_C[0].draw_balls();
        //balls_C[0].updateColor();
        balls_D[0].draw_balls();
        //balls_D[0].updateColor();

         if (efresh_stimuliOnset_test = 84) {
            setTimeout(function() {
            ctx_L.drawImage(shapeTmpA, balls_C[0].x-27, balls_C[0].y-27) // QUESTION: WHY -27?????
            ctx_L.drawImage(shapeTmpB, balls_D[0].x-27, balls_D[0].y-27);
            responseAcceptable = true; // only allow response when the occlude is removed/equivalent time in no occluder condition
            console.log("Truth");
            console.log(occluder_posY);
            console.log(canvas_L.height);

            }, 1000);
         } // else {
        //     myReq = requestAnimationFrame(animate); //never gets called?
        // }
    }  
    }, freshRate)
};

// record keyboard response
window.addEventListener('keydown', function(e) {
if (responseAcceptable === true) {
    if (e.key === '1') {
        endTrialTime = new Date();
        window.cancelAnimationFrame(myReq);
        clearTimeout(myTimeout);
        refresh_stimuliOnset_test = 0;
        $('#canvas_L').hide();
        $('#canvas_2').hide();
        $('#Instruction4').show();
        if (trainingTrial <= trialsInfo_training.length-1) {
            $('#nextTrainingTrialButton').show();
        } 
        if (trainingTrial === trialsInfo_training.length && curTrial>=0) {
            $('#nextTrialButton').show();
        }
        balls_A[0].x = halfCanvasWidth-230;
        balls_A[0].y = halfCanvasHeight;
        balls_B[0].x = halfCanvasWidth+230;
        balls_B[0].y = halfCanvasHeight;
        balls_C[0].x = halfCanvasWidth;
        balls_C[0].y = 600;
        balls_D[0].x = halfCanvasWidth;
        balls_D[0].y = 700;
        trialsInfo[curTrial].endTime = endTrialTime;
        trialsInfo[curTrial].reactTime = endTrialTime - startTrialTime-colorDisk-previewShape-colorDisk-76*20;
        trialsInfo[curTrial].responseC = 1;     
    }
    if (e.key === '2') {
        endTrialTime = new Date();
        window.cancelAnimationFrame(myReq);
        clearTimeout(myTimeout);
        refresh_stimuliOnset_test = 0;
        $('#canvas_L').hide();
        $('#canvas_2').hide();
        $('#Instruction4').show();
        if (trainingTrial <= trialsInfo_training.length-1) {
            $('#nextTrainingTrialButton').show();
        } 
        if (trainingTrial === trialsInfo_training.length && curTrial>=0) {
            $('#nextTrialButton').show();
        }
        balls_A[0].x = halfCanvasWidth-230;
        balls_A[0].y = halfCanvasHeight;
        balls_B[0].x = halfCanvasWidth+230;
        balls_B[0].y = halfCanvasHeight; 
        balls_C[0].x = halfCanvasWidth;
        balls_C[0].y = 600;
        balls_D[0].x = halfCanvasWidth;
        balls_D[0].y = 700;       
        trialsInfo[curTrial].endTime = endTrialTime;
        trialsInfo[curTrial].reactTime = endTrialTime - startTrialTime-colorDisk-previewShape-colorDisk-76*20;
        trialsInfo[curTrial].responseC = 0;  
    }
}           
}, false);
// save json file to local device
function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
};

function doneExperiment() {
    JSONObj = JSON.stringify(window.frame);
    download(JSONObj, "test_data.json", "json"); 
};
/* wait for clicks */

// Testing data posting
//$('#continueInstructionButton1').click(postData);
$('#consented').click(showInstructions);
$('#continueInstructionButton1').click(continueInstruction1);
$('#startTrainingButton').click(showTrials_training_0);
$('#nextTrainingTrialButton').click(showTrials_training);
$('#startExpButton').click(showTrials_exp_0);
$('#nextTrialButton').click(showTrials_exp);

//$('#submitButton').attr("onclick", "doneExperiment()");
$('#submitButton').attr("onclick", "postData()");

// this script is written by Qihan Wu on 10/11/2022 for experiments investigating what dominates object correspondece