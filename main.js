img = "";
Status = "";
objects = [];

function preload() {
    song = loadSound("Alarm.mp3");
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500, 500);
    video.hide();
}

function start() {
    imagedetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status - Detecting Object";
}

function draw() {
    image(video, 0, 0, 500, 500);
    if (Status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        imagedetector.detect(video, gotresult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status : object detected";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label=="person"){
                document.getElementById("number_object").innerHTML ="Baby Found";
                song.stop();
            }
            else{
                document.getElementById("number_object").innerHTML ="Baby Not Found";
                song.play();
            }
        }
    }
}

function modelloaded() {
    console.log("cocossd is initialized");
    Status = true;
}

function gotresult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}