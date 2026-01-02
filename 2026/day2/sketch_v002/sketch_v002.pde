
ArrayList infs;
Infinitan inf;
final int NUM_INFS = 1024;
final int MAX_SPEED = 1;

// easing constants
final float C1 = 1.70158;
final float C2 = C1 * 1.525;

final color[] PAL = {#3c1518, #69140e, #a44200, #d58936, #f2f3ae};
//final color[] PAL = {#227c9d, #17c3b2, #ffcb77, #fef9ef, #fe6d73};

int flitcount = 0;

void setup() {
  size(512, 512);
  frameRate(60);
  rectMode(CENTER);
  infs = new ArrayList();
  for (int i=0; i < NUM_INFS; i++) {
    infs.add(new Infinitan(i % PAL.length));
  }
  background(0);
  noStroke();
}

void draw() {
  fill(0, 32);
  rect(width/2, height/2, width, height);
 
  for (int i=0; i < NUM_INFS; i++) {
    inf = (Infinitan)infs.get(i);
    inf.move();
    inf.draw();
  }
  
  saveFrame("frames/####.png");
  if (frameCount == 30*60){
   exit(); 
  }
}
