// Fourier Series
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/125-fourier-series.html
// https://youtu.be/Mm2eYfj0SgA
// https://editor.p5js.org/codingtrain/sketches/SJ02W1OgV

let time = 0;
let waveArr = [];
let RADIUS = 75;
let slider;
const CANVAS_X = 600;
const CANVAS_Y = 400;
let radDepAng = false;
function setup() {
  createCanvas(CANVAS_X, CANVAS_Y);
  nSlider = createSlider(1, 100, 5);
  nSlider.position(10,CANVAS_Y+50);
  radiusSlider = createSlider(30, 300, 75);
  radiusSlider.position(10, CANVAS_Y + 70);
  waveFormSel = createSelect();
  waveFormSel.position(10,CANVAS_Y+20);
  waveFormSel.option("square");
  waveFormSel.option("sawtooth");
  waveFormSel.option("triangle");
  checkbox = createCheckbox("Mix Waves", false);
  checkbox.changed(()=>{radDepAng = !radDepAng;});
  checkbox.position(10,CANVAS_Y+90);
   waveFormSel2 = createSelect();
   waveFormSel2.position(100, CANVAS_Y + 20);
   waveFormSel2.option("square");
   waveFormSel2.option("sawtooth");
   waveFormSel2.option("triangle");
}

function getCoefficient(i,time) {
  var sw;
  if (waveFormSel2.value() === "square") {
    sw = new SquareWave(i, time,true);
  } else if (waveFormSel2.value() === "sawtooth") {
    sw = new SawtoothWave(i, time,true);
  } else if (waveFormSel2.value() === "triangle") {
    sw = new TriangleWave(i, time,true);
  }
  return (sw.y*sw.x)/(sw.radius*sw.radius);
}

function SquareWave (n,time,isSecond) {
  this.n = 2*n+1;
  if(radDepAng && !isSecond) {
    let coefficient = getCoefficient(this.n,time);
    this.radius =
      ((4 * RADIUS) / (this.n * PI))* (coefficient) ;
  }
  else {
    this.radius = (4 * RADIUS) / (this.n * PI);
  }
  this.x = this.radius * cos(this.n * time);
  this.y = this.radius * sin(this.n * time);
}
function SawtoothWave(n, time, isSecond) {
  this.n = n + 1;
  
  if (radDepAng && !isSecond) {
    let coefficient = getCoefficient(this.n, time);
    this.radius = (2 * RADIUS) / (Math.pow(-1, this.n) * this.n * PI) * coefficient;
  } else {
    this.radius = (2 * RADIUS) / (Math.pow(-1, this.n) * this.n * PI);
  }
  //(radDepAng ? sin(time) : 1);
  this.x = this.radius * cos(this.n * time);
  this.y = this.radius * sin(this.n * time);
}
function TriangleWave(n, time, isSecond) {
  this.n = 2 * n + 1;
   if (radDepAng && !isSecond) {
     let coefficient = getCoefficient(this.n, time);
     this.radius =
      (8 * RADIUS * Math.pow(-1, (this.n - 1) / 2)) /
      (this.n * this.n * PI * PI) * coefficient;
   } else {
    this.radius =
      (8 * RADIUS * Math.pow(-1, (this.n - 1) / 2)) /
      (this.n * this.n * PI * PI);
   }
  
  // * (radDepAng? sin(time): 1);
  this.x = this.radius * cos(this.n * time);
  this.y = this.radius * sin(this.n * time);
}

function drawWave() {
  var wave;
  
  let x = 0;
  let y = 0;

  for (let i = 0; i < nSlider.value(); i++) {
    let prevx = x;
    let prevy = y;

    if (waveFormSel.value() === "square") {
      wave = new SquareWave(i, time);
    } else if (waveFormSel.value() === "sawtooth") {
      wave = new SawtoothWave(i, time);
    } else if (waveFormSel.value() === "triangle") {
      wave = new TriangleWave(i, time);
    }

 
    x += wave.x
    y += wave.y
    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy,wave.radius*2);

    //fill(255);
    stroke(255);
    line(prevx, prevy, x, y);
    //ellipse(x, y, 8);
  }
  waveArr.unshift(y);

  translate(200, 0);
  line(x - 200, y, 0, waveArr[0]);
  beginShape();
  noFill();
  for (let i = 0; i < waveArr.length; i++) {
    vertex(i, waveArr[i]);
  }
  endShape();

  time += 0.05;
  time = time%360;
  if (waveArr.length > 250) {
    waveArr.pop();
  }
}

function draw() {
  background(0);
  textSize(20);
  text("N = " + nSlider.value(), 10, 50);
  RADIUS = radiusSlider.value();
  text("Radius = " + RADIUS, 10, 90);
  fill(255);
  translate(150, 200);
  drawWave();
  
  
}
