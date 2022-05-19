song = "";
scoreLW = 0;
scoreRW = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function preload() {
    song = loadSound('music.mp3');
}
function setup() {
    canvas = createCanvas(300,300);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(300,300);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log("Model has been loaded");
}

function draw() {
    image(video, 0, 0, 300, 300);

    fill ("red");
    stroke("black");

    if(scoreLW > 0.2) {
    circle(leftWristX, leftWristY, 20);
    flw = Number(leftWristY);
    deci = floor(flw);
    divs = deci / 300;
    document.getElementById('Volume_Label').innerHTML = "Volume = " + divs; 

    song.setVolume(divs);
    }
    fill("red");
    stroke("red");
    if(scoreRW > 0.2) {
    circle(rightWristX, rightWristY, 20);

    if(rightWristY >0 && rightWristY <=100) {
        document.getElementById("Speed_Label").innerHTML = "Speed = 0.5";
        song.rate(0.5);
    }
    else if(rightWristY >100 && rightWristY <=200) {
        document.getElementById("Speed_Label").innerHTML = "Speed = 1.0";
        song.rate(1.0);
    }
    else if(rightWristY >200 && rightWristY <=300) {
        document.getElementById("Speed_Label").innerHTML = "Speed = 1.5";
        song.rate(1.5);
    }
    else if(rightWristY >300 && rightWristY <=400) {
        document.getElementById("Speed_Label").innerHTML = "Speed = 2.0";
        song.rate(2.0);
    }
    else if(rightWristY >400 && rightWristY <=500) {
        document.getElementById("Speed_Label").innerHTML = "Speed = 2.5";
        song.rate(2.5);
    }

    
}
}
function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreLW = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX + "leftWristY =" + leftWristY);
        scoreRW = results[0].pose.keypoints[10].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX + "rightWristY =" + rightWristY);
    }
}
function start() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
