var express = require('express');
var router = express.Router();
var ms = require('mediaserver');
var fs = require('fs')

/* GET users listing. */
router.get('/', function(req, res, next) {
  // var drumSounds = {
  //   pad1: '../assets/LowTomA_GatedReverb_Mono.wav',
  //   pad2: '../assets/BigSnareE_12BitLoFi_Mono.wav',
  //   pad3: '../assets/RimTomB_GatedReverb_Mono.wav',
  //   pad4: '../assets/ReverseCymbal_Mono.wav',
  //   pad5: '../assets/ArcadeGameHits_Mono.wav',
  //   pad6: '../assets/90BpmBongoRiddim_Edit1_Mono.wav',
  //   pad7: '../assets/SleighBell_LargeF#_Reverb_Mono.wav',
  //   pad8: '../assets/90BpmFunkDrumLoop2_Edit_Mono.wav'
  
  // };
  // let padArr = [
  //   drumSounds["pad1"],
  //   drumSounds["pad2"],
  //   drumSounds["pad3"],
  //   drumSounds["pad4"],
  //   drumSounds["pad5"],
  //   drumSounds["pad6"],
  //   drumSounds["pad7"],
  //   drumSounds["pad8"]  
  // ];

  // res.send(loadSound(padArr) )

  var arrayBuffer;
  var fileReader = new FileReader();
  fileReader.onload = function() {
      arrayBuffer = this.result;
  };
  fileReader.readAsArrayBuffer(blob);

});

// var reader = new FileReader()
// reader.onload = function(){
//     var buffer = new Buffer(reader.result)
//     fs.writeFile(path, buffer, {}, (err, res) => {
//         if(err){
//             console.error(err)
//             return
//         }
//         console.log('audio saved')
//     })
// }
// reader.readAsArrayBuffer(blob)
router.get('/pad1.wav', function(req, res, next){
  // ms.pipe(req, res, "../assets/LowTomA_GatedReverb_Mono.wav");
  
  res.send(`${ new Blob( ["../assets/LowTomA_GatedReverb_Mono.wav" ], {type: "audio/wav"}) }` )
});

router.get('/pad2.wav', function(req, res, next){
  // ms.pipe(req, res, "../assets/BigSnareE_12BitLoFi_Mono.wav");
  
  res.send(`${ new Blob( ["../assets/BigSnareE_12BitLoFi_Mono.wav" ], {type: "audio/wav"}) }` )
});

router.get('/pad3.wav', function(req, res, next){
  // ms.pipe(req, res, "../assets/RimTomB_GatedReverb_Mono.wav");
  
  res.send(`${ new Blob( ["../assets/RimTomB_GatedReverb_Mono.wav" ], {type: "audio/wav"}) }` )
});

router.get('/pad4.wav', function(req, res, next){
  // ms.pipe(req, res, "../assets/ReverseCymbal_Mono.wav");
  
  res.send(`${ new Blob( ["../assets/ReverseCymbal_Mono.wav" ], {type: "audio/wav"}) }` )
});


router.get('/pad5.wav', function(req, res, next){
  // ms.pipe(req, res, "../assets/ArcadeGameHits_Mono.wav");
  
  res.send(`${ new Blob( ["../assets/ArcadeGameHits_Mono.wav" ], {type: "audio/wav"}) }` )
});

router.get('/pad6.wav', function(req, res, next){
  // ms.pipe(req, res, "../assets/90BpmBongoRiddim_Edit1_Mono.wav");
  
  res.send(`${ new Blob( ["../assets/90BpmBongoRiddim_Edit1_Mono.wav" ], {type: "audio/wav"}) }` )
});

router.get('/pad7.wav', function(req, res, next){
  // ms.pipe(req, res, "../assets/SleighBell_LargeF#_Reverb_Mono.wa
  
  res.send(`${ new Blob( ["../assets/SleighBell_LargeF#_Reverb_Mono.wav" ], {type: "audio/wav"}) }` );
});

router.get('/pad8.wav', function(req, res, next){
  // ms.pipe(req, res, "../assets/90BpmFunkDrumLoop2_Edit_Mono.wav");
  
  res.send(`${ new Blob( ["../assets/90BpmFunkDrumLoop2_Edit_Mono.wav" ], {type: "audio/wav"}) }` )
});

module.exports = router;
