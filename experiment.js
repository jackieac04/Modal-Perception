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
    //   let dataString = JSON.stringify(window.frame);
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

    // for (let i = 0; i < nRepetitions; i++) { // 44 trials?
    //      setShape(2,5,1,1,0)
    //      setColor(1,5,0)
    //      setTMP()
    //      pushTrialInfo(trialsInfo, "spatiotemporal_inconsistent", "match", "samecolor")
              
    // }
    for (let i = 0; i < nRepetitions; i++) { // 44 trials?
        setShape(2,5,1,0,1)
        setColor(2,5,1)
        setTMP()
        pushTrialInfo(trialsInfo, "non_spatiotemporal", "match", "diffcolor") 
    }

    for (let i = 0; i < nRepetitions; i++) { // 22 trials?
        setShape(3,5,1,0,2)
        setColor(2,5,1)
        setTMP()
        pushTrialInfo(trialsInfo, "non_spatiotemporal", 'new', 'diffcolor')
    }

    // for (let i = 0; i < nRepetitions; i++) { // 22 trials
    //      setShape(3,5,1,2,2) //selects 3 shapes from 5 randomly, then replaces one of the original shapes with a new one
    //     setColor(1,5,0)
    //      setTMP()
    //      pushTrialInfo(trialsInfo, "spatiotemporal_inconsistent", "new", "samecolor")
    // }

    for (let i = 0; i < nRepetitions; i++) { // 44 trials
        setShape(2,5,1,1,0) //randomy selects 2 shapes from up to 5, then swaps them on the bottom circles
        setColor(2, 5, 1) //up to 2 colors - 5 possible color values,  1 = different colors
        setTMP()
        pushTrialInfo(trialsInfo, "non_spatiotemporal", "swap", "diffcolor")
    }
    trialsInfo = shuffle(trialsInfo);
    return trialsInfo;
}

let trialsInfo = [];

function generateRandomNumbers(count, limit) {
    let arr = [];
    while(arr.length < count) {
        var r = Math.floor(Math.random() * limit);
        if(arr.indexOf(r) === -1) arr.push(r); //javaScript checks by index so you can't use !(r in arr)
    }
    return arr;
}

function setShape(count, limit, arrNumBPrev, arrNumATest, arrNumBTest) {
    shapes = generateRandomNumbers(count, limit);
    shape_A_preview_tmp = shape_C_preview_tmp = shapes[0];
    shape_B_preview_tmp = shape_D_preview_tmp = shapes[arrNumBPrev];
    shape_A_test_tmp = shape_C_test_tmp = shapes[arrNumATest];
    shape_B_test_tmp = shape_D_test_tmp = shapes[arrNumBTest];
}

function setColor(count, limit, num) {
    colors = generateRandomNumbers(count, limit)
    ball_A_color = colors[0];
    ball_B_color = colors[num];
    ball_C_color = colors[0];
    ball_D_color = colors[num];
}

function setTMP() { 
        vertical = generateRandomNumbers(2, 2) 
        console.log("vertical" + JSON.stringify(vertical))
        vertical_tmp_A = vertical_tmp_C = vertical_tmp_array[vertical[0]];
        console.log("A and C " + vertical_tmp_array[vertical[0]])
        vertical_tmp_B = vertical_tmp_D = vertical_tmp_array[vertical[1]];
        console.log("B and D " + vertical_tmp_array[vertical[1]])
    }

function pushTrialInfo(trialsInfo, spatioType, matchType, colorType) {
    trialsInfo.push({ //pushes info about each trial to the database
        "spatiotemporalType":spatioType,
        "matchType": matchType,
        "colorType":colorType,
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
const nRepetitions = 51; // 22
const frame = trialGenerator(nRepetitions,trialsInfo);
const nTrials = frame.length;

let trialsInfo_training = [];
const nRepetitions_training = 1;
const frame_training = trialGenerator(nRepetitions_training,trialsInfo_training);
const nTrials_training = frame_training.length;

const subjectID = getSubjectID();

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
const nDots = 1; 
const dotRadius = 40; //Radius of each dot in pixels
let balls = [];
// colorNumb = 10, red/ 200, yellow /380, green/ 1000, blue/ 1200, purple
const balls_colorArray = [10,200,380,1000,1200]; // QUESTION: what THIS? Why these numbers??


let AWidth;
let AHeight;
let BWidth;
let BHeight;
let CWidth;
let CHeight;
let DWidth;
let DHeight;


function generateNewBallsHelper(ballColor, x, y, width, height) {
    let colorNum = balls_colorArray[ballColor];
    x = width;
    y = height;

    let ball = new Ball(
        x,
        y,
        colorArray[colorNum],
        dotRadius,
    );
    balls.push(ball);
    return balls;
}

function generateNewBalls(ballColor, letter){ //note = do we need the vertical_pos array?
    switch (letter) {
        case 'a':
            return generateNewBallsHelper(ballColor, AWidth, AHeight, halfCanvasWidth - 230, halfCanvasHeight)
        case 'b':
            return generateNewBallsHelper(ballColor, BWidth, BHeight, halfCanvasWidth+230, halfCanvasHeight)
        case 'c':
            return generateNewBallsHelper(ballColor, CWidth, CHeight, halfCanvasWidth, vertical_tmp_A + 650)
        case 'd':
            return generateNewBallsHelper(ballColor, DWidth, DHeight, halfCanvasWidth, vertical_tmp_B + 650)
            
    }
}

Ball.prototype.draw_balls = function() {
    ctx_L.beginPath();
    ctx_L.fillStyle = this.color; //in this case, "this." refers to Ball.prototype. to create a new funciton we would need to use [functionName].call(this)
    ctx_L.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx_L.fill();
};

Ball.prototype.updateColor = function() { // updates color, when color_change_rate is zero, no color change
    let pos = colorArray.indexOf(this.color);
    if(pos >= colorArray.length - 1 - color_change_rate) {
        pos = colorArray.length - 1 -  pos;
    } else {
        pos = colorArray.indexOf(this.color);
    }
    this.color = colorArray[pos+color_change_rate];
};
let velX = 4.5; // QUESTION: what THIS?
// let velY = 1.5;
let edgeX = 100; // QUESTION: what THIS?

Ball.prototype.updatePosition = function(type, vel, verticalTMP) {
    if (type === 'a') {
      if (this.x < halfCanvasWidth) {
        this.x = this.x + vel;
        if (this.x < AWidth + dotRadius / 4) {
          this.y = this.y + 10;
        }
        if (AWidth + dotRadius / 4 <= this.x && this.x < AWidth + dotRadius / 2) {
          this.y = this.y + 15;
        }
        if (AWidth + dotRadius / 2 <= this.x && this.x < AWidth + 1.5 * dotRadius) {
          this.y = this.y - 3;
        }
        if (AWidth + 1.5 * dotRadius <= this.x && this.x < AWidth + 2 * dotRadius) {
          this.y = this.y;
        }
        if (AWidth + 2 * dotRadius <= this.x && this.x < AWidth + 3 * dotRadius) {
          this.y = this.y - 3;
        }
        if (AWidth + 3 * dotRadius <= this.x && this.x < halfCanvasWidth) {
          this.y = halfCanvasHeight;
        }
      } else {
        this.x = halfCanvasWidth;
        this.y = halfCanvasHeight + verticalTMP;
      }
    } else if (type === 'b') {
      if (this.x > halfCanvasWidth) {
        this.x = this.x - vel;
        if (this.x > BWidth - dotRadius / 4) {
          this.y = this.y + 10;
        }
        if (BWidth - dotRadius / 2 < this.x && this.x <= BWidth - dotRadius / 4) {
          this.y = this.y + 15;
        }
        if (BWidth - 1.5 * dotRadius < this.x && this.x <= BWidth - dotRadius / 2) {
          this.y = this.y - 3;
        }
        if (BWidth - 2 * dotRadius < this.x && this.x <= BWidth - 1.5 * dotRadius) {
          this.y = this.y;
        }
        if (BWidth - 3 * dotRadius < this.x && this.x <= BWidth - 2 * dotRadius) {
          this.y = this.y - 3;
        }
        if (BWidth - 5 * dotRadius < this.x && this.x <= BWidth - 5 * dotRadius) {
          this.y = this.y + 3;
        }
        if (halfCanvasWidth < this.x && this.x <= BWidth - 5 * dotRadius) {
          this.y = halfCanvasHeight;
        }
      } else {
        this.x = halfCanvasWidth;
        this.y = halfCanvasHeight + verticalTMP;
      }
    }
  };
//exp procedures
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

let trainingTrial = 0;

function showTrials_training_0() {
    responseAcceptable = false;
    $('#title').hide();
    $('#Instruction2').hide();
    $('#startTrainingButton').hide();
    $('#InstructionPractice').show();

    console.log("color info " + JSON.stringify(trialsInfo_training))
    balls = generateNewBalls(trialsInfo_training[trainingTrial].ball_A_color, 'a');
    balls_A = balls;
    balls = [];
    balls = generateNewBalls(trialsInfo_training[trainingTrial].ball_B_color, 'b');
    balls_B = balls;
    balls = [];

    balls = generateNewBalls(trialsInfo_training[trainingTrial].ball_C_color, 'c');
    balls_C = balls;
    balls = [];
    balls = generateNewBalls(trialsInfo_training[trainingTrial].ball_D_color, 'd');
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
        balls = generateNewBalls(trialsInfo_training[trainingTrial].ball_A_color, 'a');
        balls_A = balls;
        balls = [];
        balls = generateNewBalls(trialsInfo_training[trainingTrial].ball_B_color, 'b');
        balls_B = balls;
        balls = [];

        balls = generateNewBalls(trialsInfo_training[trainingTrial].ball_C_color,'c');
        balls_C = balls;
        balls = [];
        balls = generateNewBalls(trialsInfo_training[trainingTrial].ball_D_color, 'd');
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
let curTrial = 0;
function showTrials_exp_0() {
    responseAcceptable = false;
    $('#title').hide();
    $('#Instruction3').hide();
    $('#startExpButton').hide();

    balls = generateNewBalls(trialsInfo[curTrial].ball_A_color, 'a');
    balls_A = balls;
    balls = [];
    balls = generateNewBalls(trialsInfo[curTrial].ball_B_color, 'b');
    balls_B = balls;
    balls = [];

    balls = generateNewBalls(trialsInfo[curTrial].ball_C_color, 'c');
    balls_C = balls;
    balls = [];
    balls = generateNewBalls(trialsInfo[curTrial].ball_D_color, 'd');
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

        balls = generateNewBalls(trialsInfo[curTrial].ball_A_color, 'a');
        balls_A = balls;
        balls = [];
        balls = generateNewBalls(trialsInfo[curTrial].ball_B_color, 'b');
        balls_B = balls;
        balls = [];

        balls = generateNewBalls(trialsInfo[curTrial].ball_C_color, 'c');
        balls_C = balls;
        balls = [];
        balls = generateNewBalls(trialsInfo[curTrial].ball_D_color, 'd');
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

let myTimeout10;
let myTimeout11;
let myTimeout12;
let shapeInd_A_pre;
let shapeInd_A_test;
let shapeInd_B_pre;
let shapeInd_B_test;
const colorDisk = 500; // QUESTION: WHY 500
const previewShape = 1200; // QUESTION: WHAT THIS???

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

let refresh_stimuliOnset_test = 0; //DO NOT make these const - even though they don't change it causes the occluder to disappear
let color_change_rate = 0;
let myTimeout;
let myReq;
let startResponseTiming = false;
let occluder_velX = 0;
let occluder_velY = 40;
let occluder_posX = 0;
let occluder_posY = 40;

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
    balls_A[0].updatePosition('a', velX, vertical_tmp_A);
    balls_B[0].draw_balls();
    balls_B[0].updateColor();
    balls_B[0].updatePosition('b', velX, vertical_tmp_B);
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
    let a = document.createElement("a");
    let file = new Blob([content], {type: contentType});
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