
var drumMachine;

// The midi notes of a scale
var notes = [ 60, 62, 64, 65, 67, 69, 71];

var drumSounds = {
  pad1: ["http://localhost:3000/sounds/pad1.wav"],
  pad2: ["http://localhost:3000/sounds/pad2.wav"],
  pad3: ["http://localhost:3000/sounds/pad3.wav"],
  pad4: ["http://localhost:3000/sounds/pad4.wav"],
  pad5: ["http://localhost:3000/sounds/pad5.wav"],
  pad6: ["http://localhost:3000/sounds/pad6.wav"],
  pad7: ["http://localhost:3000/sounds/pad7.wav"],
  pad8: ["http://localhost:3000/sounds/pad8.wav"]

} 

// For automatically playing the song
var index = 0;
var song = [
  { note: 4, duration: 400, display: "D" },
  { note: 0, duration: 200, display: "G" },
  { note: 1, duration: 200, display: "A" },
  { note: 2, duration: 200, display: "B" },
  { note: 3, duration: 200, display: "C" },
  { note: 4, duration: 400, display: "D" },
  { note: 0, duration: 400, display: "G" },
  { note: 0, duration: 400, display: "G" }
];
var trigger = 0;
var autoplay = false;
var osc;
let ctx, ctxOn;

let loadSounds;
let selectedPad;
let inPad;
let padArr;
let padObj = {}
function preload() {
  padArr = [
    loadSound(drumSounds["pad1"]),
    loadSound(drumSounds["pad2"]),
    loadSound(drumSounds["pad3"]),
    loadSound(drumSounds["pad4"]),
    loadSound(drumSounds["pad5"]),
    loadSound(drumSounds["pad6"]),
    loadSound(drumSounds["pad7"]),
    loadSound(drumSounds["pad8"])  
  ];
}

function setup() {
  ctx = getAudioContext();
  ctxOn = createButton('turn on Audio');
  ctxOn.mousePressed(() => {
  ctx.resume().then(() => {
  console.log('Audio Context is now ON');
      ctxOn.hide();
        });
      });
  createCanvas(720, 800);
  drumMachine = createGraphics(720, 400);
  soundFormats('wav', 'mp3', 'ogg');



  //  padArr = [
  //   loadSound(drumSounds["pad1"]),
  //   loadSound(drumSounds["pad2"]),
  //   loadSound(drumSounds["pad3"]),
  //   loadSound(drumSounds["pad4"]),
  //   loadSound(drumSounds["pad5"]),
  //   loadSound(drumSounds["pad6"]),
  //   loadSound(drumSounds["pad7"]),
  //   loadSound(drumSounds["pad8"])  
  // ];

  // loadSounds = loadSound(padArr, loaded);

  var div = createDiv("Click to play notes or ")
  div.id("instructions");
  var button = createButton("play song automatically.");
  button.parent("instructions");
  // Trigger automatically playing
  button.mousePressed(function() {
    if (!autoplay) {
      index = 0;
      autoplay = true;
    }
  });

  div.style('position', 0,400,0,0)
  drumMachine.style('position', 0,401,0,401)

  // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);
}

// A function to play a note
function playNote(note, duration) {
  if(mouseY < height/2 && mouseX < 720){
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);

  // If we set a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}
}
function loaded(){
  loadSounds.play();
}

function draw() {
  // If we are autoplaying and it's time for the next note
  if (autoplay && millis() > trigger){
    playNote(notes[song[index].note], song[index].duration);
    trigger = millis() + song[index].duration;
    // Move to the next note
    index ++;
  // We're at the end, stop autoplaying.
  } else if (index >= song.length) {
    autoplay = false;
  }

  
  // Draw a keyboard

  // The width for each key
  var w = width / notes.length;
  for (var i = 0; i < notes.length; i++) {
    var x = i * w;
    // If the mouse is over the key
    if (mouseX > x && mouseX < x + w && mouseY < height/2) {
      // If we're clicking
      if (mouseIsPressed) {
        fill(100,255,200);
      // Or just rolling over
      } else {
        fill(127);
      }
    } else {
      fill(200);
    }

    // Or if we're playing the song, let's highlight it too
    if (autoplay && i === song[index-1].note) {
      fill(100,255,200);
    }

    // Draw the key
    rect(x, 0, w-1, (height-1)/2  );
  }  

  // Draw Drum Machine
  drumMachine.background(134, 124, 121)
  let drumPadSpacing = drumMachine.width / 10 
   var padSpaceX = drumMachine.width / 7
   var padSpaceY = drumMachine.height / 4



  //  console.log(padSpaceX)
  for (var i = 0; i < 8; i++) {
       // Checking to see if a pad is selected

      padObj[i] = false  
    // Draw Pads

    // Top Row
    if(i < 4){



      if (mouseX > padSpaceX && mouseX < padSpaceX + 80 && mouseY >=  (drumMachine.height + padSpaceY) - 80 + 100  && mouseY < (drumMachine.height + padSpaceY + 100) ){
        // If we're clicking on a pad
        if (mouseIsPressed) {
          padObj[i] = true
          
          selectedPad = i
          // inPad = true
          drumMachine.fill(100,255,200);
        // Or just rolling over
        } else {
          drumMachine.fill(107);
          selectedPad = i
          padObj[i] = true
        }
      } else {
        drumMachine.fill(255);
        // if (mouseX < padSpaceX && mouseX > padSpaceX + 80 && mouseY <  drumMachine.height + padSpaceY - 80 + 100  && mouseY > drumMachine.height + padSpaceY + 100 ){
          
        
        
        // selectedPad = null
        // } 
        padObj[i] = false
        
    
      }


     drumMachine.rect(padSpaceX, padSpaceY, 80, 80 );
    padSpaceX += drumPadSpacing * 2;  
    }
    // Bottom Row
    else{
      if(i === 4){
       padSpaceX = drumMachine.width / 7 
       padSpaceY = (drumMachine.height / 2) 
      }
      if (mouseX > padSpaceX && mouseX < padSpaceX + 80 && mouseY >=  drumMachine.height + padSpaceY - 80 + 100  && mouseY < drumMachine.height + padSpaceY + 100 ){
        // If we're clicking on a pad
        if (mouseIsPressed) {
          selectedPad = i
          padObj[i] = true          
          drumMachine.fill(100,255,200);

        // Or just rolling over
        } else {
          drumMachine.fill(107);
          selectedPad = i
          padObj[i] = true          
        }
      } else {

        drumMachine.fill(255);
        // if (mouseX < padSpaceX && mouseX > padSpaceX + 80 && mouseY <  drumMachine.height + padSpaceY - 80 + 100  && mouseY > drumMachine.height + padSpaceY + 100 ){
          
        
        
        // selectedPad = null
        // } 

        padObj[i] = false
      }

      drumMachine.rect(padSpaceX, padSpaceY, 80, 80 );
      padSpaceX += drumPadSpacing * 2;  
      
      

    }
    
  }
    

  drumMachine.noStroke();
    // drumMachine.rect(100, drumMachine.height / 4, 80, 80);
    image(drumMachine, 0, 420, 720, 400)
    // console.log(mouseY, (drumMachine.height / 2) + drumMachine.height  + 100 - 1);
// console.log(`x axis: ${mouseX}`, `y axis: ${mouseY}`)
// console.log(`PadSpaceX: ${drumMachine.width / 7}`, `padSPaceEnd: ${drumMachine.width / 7 + 80}`)

}

// When we click we click a key
function mousePressed() {
  // Map mouse to the key index
  var key = floor(map(mouseX, 0, width, 0, notes.length));
  playNote(notes[key]);
}

// When we click a pad
function mouseClicked() {
  // selectedPad determined by mouse hover



// will only play sound if specific pad is pressed
if(padObj[selectedPad] === true){

  // // stops all playing drum sounds
  // padArr.forEach(pad =>{
  //   pad.stop();
  // })
  
    padArr[selectedPad].playMode('restart');
  padArr[selectedPad].play();

}
else{
  padArr[selectedPad].stop();
}
  


}

// Fade it out when we release
function mouseReleased() {
  osc.fade(0,0.5);
}
var soundStuff = new p5.TriOsc();

function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}