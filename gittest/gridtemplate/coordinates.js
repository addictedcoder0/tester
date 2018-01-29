
class Coordinates {
  constructor(){
    this.leftwall = 0;
    this.rightwall = 0;
    this.ceiling = 0;
    this.floor = 0;
  }

  show(gridobj,pairs){
      push();
      if(gridobj.cx>gridobj.width || gridobj.cy>gridobj.height ||gridobj.ox < 0 ||gridobj.oy < 0 ){
        console.log('plot origin (ox ,oy) and cooordinate origin (cx,cy) must be positive ');
        return;
      }
      this.leftwall = -gridobj.cx;
      this.rightwall = gridobj.width-gridobj.cx;
      this.ceiling = -gridobj.cy;
      this.floor = (gridobj.height-gridobj.cy);
      strokeWeight(1.5);
      rect(gridobj.ox,gridobj.oy,gridobj.width,gridobj.height);
      translate(gridobj.ox,gridobj.oy);
      this.drawCoordinates(gridobj,pairs);
      pop();
  }

  drawCoordinates(gridobj,pairs){
    push();
    translate(gridobj.cx,gridobj.cy);
    let leftcount = (gridobj.cx)/gridobj.scale;
    let rightcount = (gridobj.width-gridobj.cx)/gridobj.scale;
    let upcount = gridobj.cy/gridobj.scale;
    let downcount = (gridobj.height-gridobj.cy)/gridobj.scale;
    let angle = gridobj.angle;

    // horizontal lines
    this.drawGrid(angle,upcount,-gridobj.scale,-gridobj.cx,gridobj.width-gridobj.cx);
    this.drawGrid(angle,downcount,gridobj.scale,-gridobj.cx,gridobj.width-gridobj.cx);
    // vertical lines
    this.drawGrid(angle+PI/2,leftcount,gridobj.scale,-gridobj.cy,gridobj.height-gridobj.cy);
    this.drawGrid(angle+PI/2,rightcount,-gridobj.scale,-gridobj.cy,gridobj.height-gridobj.cy);
    textSize(15);
    let label = gridobj.label.x;
    text(label,gridobj.width-100,-10);
    label = gridobj.label.y;
    text(label,10,-gridobj.cy+20);
    this.plotpoints(gridobj.scale,pairs);
    fill(0);
    stroke(0);
    ellipse(0,0,6,6);
    pop();
  }

  drawGrid(angle,count,scale,lowbound,highbound){
    push();
    count = parseInt(count);
    let i =0;
    rotate(angle);
    stroke('#0087bc');
    strokeWeight(3);
    line(lowbound,scale*i,highbound,scale*i);
    stroke(220);
    strokeWeight(1.5);
    while(count>0){
      i++;
      line(lowbound,scale*i,highbound,scale*i);
      count--;
    }
    pop();
  }

  plotpoints(scale,pairs){
    pairs.forEach((p)=>{
      stroke(p.color);
      strokeWeight(2.5);
      push();
      this.drawpairs(p.type,p.x1*scale,-p.y1*scale,p.x2*scale,-p.y2*scale,-p.angle,p.color);
      pop();
    });
  }

  drawpairs(type,x1,y1,x2,y2,angle,color){
   if(x1 < this.leftwall || x1 > this.rightwall){
     return;
   }
   if(x2 < this.leftwall || x2 > this.rightwall){
     return;
   }
   if(y1 > this.floor || y1 < this.ceiling){
     return;
   }
   if(y2 > this.floor || y2 < this.ceiling){
     return;
   }
    push();
    switch (type) {
      case "line":line(x1,y1,x2,y2);
                  break;
      case "away":line(x1,y1,x2,y2);
                  translate(x2,y2);
                  rotate(angle);
                  fill(color);
                  strokeWeight(1);
                  triangle(-15,4,-15,-4,0,0);
                  break;
      case "towards":line(x1,y1,x2,y2);
                  translate(x1,y1);
                  rotate(PI+angle);
                  fill(color);
                  strokeWeight(1);
                  triangle(-12,3,-12,-3,-1,0);
                  break;
      default: break;

    }
    pop();
  }
}
