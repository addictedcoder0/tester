class Pair{
  constructor(x1,y1,x2,y2,color,type){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.angle = atan2(y2-y1,x2-x1);
    this.color = color;
    this.type = type; // line , away , towards
  }
}
