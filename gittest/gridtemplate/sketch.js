var mygui;
var doAnimate = false;
var coordinate;
var sim;
var scale ;
var vectors = [];
var control = true;
var vx;
var vy;
var gridobj;
var pairs ;
var plotcolor = '#991a55';
var plottype = 'line';
var stopwatch = 0;
var plotlimitcrossed = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  mygui = new dat.GUI();
  datcontrols();
  readyState();

  doAnimate = true;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  readyState();
}

function readyState(){
  simobj={
    "ox":10,
    "oy":0,
    "width" : width/2-10,
    "height" : height/2-10,
    "setup" : simsetup,
    "draw" : simdraw
  };
  coordinate =  new Coordinates();
  sim = new Simulation(simobj);
  let cx = 25;
  let cy = 200;
  gridobj={
    "cx" : cx,
    "cy" : cy,
    "scale" : 20,
    "ox":10,
    "oy":height/2,
    "width" : width/2-10,
    "height" : height/2,
    "angle" : 0,
    "label":{
      "x" : "X",
      "y" : "Y"
    },
    "increment":{
      "x" : 1,
      "y" : 1
    }
  };
  gridobj2={
    "cx" : cx,
    "cy" : cy,
    "scale" : 20,
    "ox":width/2+10,
    "oy":height/2,
    "width" : width/2,
    "height" : height/2,
    "angle" : 0,
    "label":{
      "x" : "X",
      "y" : "Y"
    },
    "increment":{
      "x" : 1,
      "y" : 1
    }
  };
  gridobj3={
    "cx" : cx,
    "cy" : cy,
    "scale" : 20,
    "ox":width/2+10,
    "oy":0,
    "width" : width/2,
    "height" : height/2-10,
    "angle" : 0,
    "label":{
      "x" : "X",
      "y" : "Y"
    },
    "increment":{
      "x" : 1,
      "y" : 1
    }
  };
  pairs = [];

  plotlimitcrossed = false;
  doAnimate = true;
}

function datcontrols(){
    mygui['speed']=0;
    mygui.add(mygui,'speed',-30,30).name('speed').step(10);

    mygui['plot1']=13;
    mygui.add(mygui,'plot1',12,20).name('plot1').step(1);
    mygui['plot2']=13;
    mygui.add(mygui,'plot2',12,20).name('plot2').step(1);
    mygui['plot3']=13;
    mygui.add(mygui,'plot3',12,20).name('plot3').step(1);
    mygui['readyState']=readyState;
    mygui.add(mygui,'readyState').name('Restart');
}

// function mouseMoved() {
//     doAnimate = true;
// }
//
function keyPressed(){
  if(keyCode === 32 && !plotlimitcrossed){
    doAnimate = ! doAnimate;
  }
}

function draw() {
  if(doAnimate){
    gridobj.scale = mygui['plot1'];
    gridobj2.scale = mygui['plot2'];
    gridobj3.scale = mygui['plot3'];

    background(255);

    coordinate.show(gridobj,pairs);
    coordinate.show(gridobj2,pairs);
    coordinate.show(gridobj3,pairs);
    sim.show();
    }
}

function simdraw(simobj){

  let graphics = simobj.graphics;
  graphics.background(130);

  let radius = 20;
  graphics.strokeWeight(3);
  graphics.stroke(255);
  graphics.line(0,graphics.objy+radius,graphics.width,graphics.objy+radius);
  graphics.fill('#07a5b7');

  graphics.noStroke();

  let speed = mygui['speed'];
  graphics.ellipse(graphics.objx,graphics.objy,2*radius,2*radius);
  graphics.fill('#991a55');
  graphics.ellipse(graphics.objx,graphics.objy,7,7);
  graphics.objx+=speed*0.04;

  if(stopwatch%50 === 0){
    pairs.push(new Pair(graphics.speedx,graphics.speedy,graphics.speedx+1,graphics.speedy+(speed/10),plotcolor,plottype));
    graphics.speedx+=1;
    graphics.speedy+=speed/10;
  }
  stopwatch++;
  if(graphics.speedx >= 70){
    plotlimitcrossed = true;
    doAnimate = false;
  }
}

function simsetup(simobj){
  console.log('setup is called');
  simobj.graphics.background(0);
  simobj.graphics.objx = simobj.width/2;
  simobj.graphics.objy = simobj.height/2;
  simobj.graphics.speedx = 0;
  simobj.graphics.speedy = 0;
}
