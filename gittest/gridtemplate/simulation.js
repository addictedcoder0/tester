class Simulation{

  constructor(simobj,setup){
    this.leftwall = 0;
    this.rightwall = 0;
    this.ceiling = 0;
    this.floor = 0;
    this.simobj = simobj;
    this.simobj.graphics = createGraphics(simobj.width,simobj.height);

    //this.simobj.graphics.background(0);
    simobj.setup(this.simobj);
  }

  show(){
      // translate to the sceneobj Coordinates
      // call drawscene() and testwith it all edge cases
      push();
      translate(simobj.ox,simobj.oy);
      this.simobj.draw(this.simobj);
      image(simobj.graphics,0,0);
      pop();
      }

}
