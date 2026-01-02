class Infinitan {
  PVector current;
  PVector start;
  PVector drift;
  PVector target;
  float progress;
  boolean flitting;
  float flitspeed;
  int offset;
  PVector lastpos;
  float velocity;
  color c;
  float flicker;

  Infinitan(int c_idx) {
    start = new PVector();
    current = new PVector();
    target = new PVector();

    c = PAL[c_idx];

    randompos(current);
    lastpos = current.copy();

    float angle = radians(random(0, 360));
    drift = new PVector(cos(angle), sin(angle));
    drift.mult(random(0.0001, 0.5));

    flitting = false;
    flitspeed = random(0.0005, 0.0025);
    //flitspeed = max(0.00001, min(abs(randomGaussian()), 0.0025));

    offset = (int)(random(0, 360));
    flicker = 0;
  }

  void randompos(PVector pv) {
    pv.set(random(0, width/2), random(0, height));
  }

  void diamond(float x, float y, float vel, float mult) {
    pushMatrix();
    translate(x, y);
    //rotate(radians(0.1*vel*mult*(frameCount+offset)));
    //rect(0, 0, vel, vel);
    circle(0, 0, vel);
    popMatrix();
  }

  void move() {

    // occasionally start flitting
    if (!flitting && flitcount < 30 && frameCount % (offset+1) == 0 && random(0, 1) > 0.1) {
      flitting = true;
      randompos(target);
      progress = 0;
      start = current.copy();
      drift = target.copy().sub(start).normalize().mult(random(0.0001, 0.5));
      flitcount += 1;
      flicker = 0;
    }

    // Movement if flitting!
    if (flitting) {
      progress += flitspeed;
      current.set(
        map(easeInOutQuint(progress), 0, 1, start.x, target.x),
        map(easeInOutQuint(progress), 0, 1, start.y, target.y)
        );
      start.add(drift);
      target.add(drift);

      // Otherwise just boop around;
    } else {
      flicker = random(0, 1);
      current.add(drift);
    }

    // if done flitting; reset!
    if (flitting && progress >= 1) {
      start = current.copy();
      randompos(target);
      progress = 0.0;
      flitting = false;
      flitcount -= 1;
    }

    // store speed for use in other places!
    velocity = abs(current.copy().sub(lastpos).mag());
    velocity = max(1, velocity);
    velocity = min(velocity, 5);
    lastpos = current.copy();
  }

  // Adapted from: https://easings.net/#easeInOutQuint
  float easeInOutQuint(float x) {
    return x < 0.5 ? 16 * x * x * x * x * x : (float)(1 - Math.pow(-2 * x + 2, 5) / 2);
  }

  // Adapted from: https://easings.net/#easeInOutCubic
  float easeInOutCubic(float x){
   return x < 0.5 ? 4 * x * x * x : (float)(1 - Math.pow(-2 * x + 2, 3) / 2); 
  }
  
  // Adpted from: https://easings.net/#easeInOutBack
  float easeInOutBack(float x) {
    return x < 0.5
      ? (float)(Math.pow(2 * x, 2) * ((C2 + 1) * 2 * x - C2)) / 2
      : (float)(Math.pow(2 * x - 2, 2) * ((C2 + 1) * (x * 2 - 2) + C2) + 2) / 2;

}

  void draw() {
    // Debug start/target
    /*if (flitting){
     circle(start.x, start.y, 10);
     circle(target.x, target.y, 10);
     }*/
    fill(lerpColor(c, #000000, flicker));
    diamond(current.x, current.y, velocity, -1);
    diamond(width-current.x, current.y, velocity, 1);
    //diamond(current.x, height-current.y, velocity, -1);
    //diamond(width-current.x, height-current.y, velocity, 1);
  }
}
