img="";
status="";
objdetector="";
object=[];
function preload(){
    song=loadSound("alert_alert.mp3");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380,380);
}
function start(){
    objdetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting object";
}
function modelLoaded(){
    console.log("model has been successfully loaded");
    status=true;
   
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
    
}

function draw(){
    image(video,0,0,380,380)
   if(status!=""){
    r=random(255);
    g=random(255);
    b=random(255);
    objdetector.detect(video,gotResult);
    for(i=0;i<object.length;i++){
        document.getElementById("status").innerHTML="status:Object has been successfully detected";
        document.getElementById("nofobj").innerHTML="Number of object detected is:"+object.length;
        fill(r,g,b);
        percent=floor(object[i].confidence*100);
        text(object[i].label+" " +percent+"%",object[i].x,object[i].y);
        noFill();
        stroke(r,g,b);
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
        if(objects[i].label=="person"){
            document.getElementById("nofobj").innerHTML="Baby found";
            console.log("stop");
            song.stop();
        }
        else{
            document.getElementById("nofobj"),innerHTML="Baby not found";
        console.log("play");
    song.start();
    }
    if(objects.length==0){
        document.getElementById("nofobj").innerHTML="Baby not found";
        console.log("play");
        song.play();
    }
    }
   } 
}