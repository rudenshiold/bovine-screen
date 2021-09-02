// some of this code adapted from this project: https://editor.p5js.org/brunoruchiga/sketches/bmAOI_p9F

let cow;

let x, y, z;
let w, h, l;

let maxX, maxY, maxZ;

let speed;
let xVel, yVel, zVel;

let r, g, b;

function preload() {
  // Load model with normalise parameter set to true
  // model from: https://groups.csail.mit.edu/graphics/classes/6.837/F03/models/
  cow = loadModel('cow.obj', true);

}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0,0,0,220);
  maxX = width;
  maxY = height;
  maxZ = width;

  let em = width / 10;
  w = 2 * em;
  h = em;
  l = 2 * em;

  x = random(-maxX / 2 + w, maxX / 2 - w);
  y = random(-maxY / 2 + h, maxY / 2 - h);
  z = random(-maxZ / 2 + l, maxZ / 2 - l);

  speed = 1;

  xVel = speed;
  if (random(1) < 0.5) {
    xVel = -xVel;
  }
  yVel = speed;
  if (random(1) < 0.5) {
    xVel = -xVel;
  }
  zVel = speed;
  if (random(1) < 0.5) {
    xVel = -xVel;
  }

}

function draw() {
  translate(0, 0, -maxZ / 2 + maxZ / 20);

  let perspectiveX = map(0, 0, width, -HALF_PI / 30, HALF_PI / 30);
  rotateY(perspectiveX);
  let perspectiveY = map(0, 0, height, HALF_PI / 30, -HALF_PI / 30);
  rotateX(perspectiveY);
  let perspectiveZ = map(0, 0, height, maxZ / 10, 0);
  translate(0, 0, perspectiveZ);

  //these settings adapted from https://p5js.org/reference/#/p5/loadModel
  ambientLight(r, g, b);
  scale(2.5); // Scaled to make model fit into canvas
  push();
  //translate(width/2, height/2);
  box(maxX, maxY, maxZ);
  noStroke();
  translate(x, y, -z);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  rotateZ(frameCount * 0.01);
  normalMaterial(); // For effect
  model(cow);
  pop();
  
  x = x + xVel;
  y = y + yVel;
  z = z + zVel;

  if (x + w / 2 > maxX / 2 || x - w / 2 < -maxX / 2) {
    xVel = -xVel;
  }
  if (y + h / 2 > maxY / 2 || y - h / 2 < -maxY / 2) {
    yVel = -yVel;
  }
  if (z + l / 2 > maxZ / 2 || z - l / 2 < -maxZ / 2) {
    zVel = -zVel;
  }

  
}