var listener = new window.keypress.Listener();

var speedScale = 100
var runnerGroundCombos = listener.register_many([
  {
    "keys"          : "space",
    "is_exclusive"  : true,
    "on_keydown"    : function() {
      runnerGround.rotateColorset(1);
    },
    "on_keyup"      : function(e) {
    }
  },
	{
    "keys"          : "escape",
    "is_exclusive"  : true,
    "on_keydown"    : function() {
      camera.position.x = 0;
      camera.position.y = 1000;
      camera.position.z = 2500;
      
      gameboy.position.x = -6;
      gameboy.position.y = 840;
      gameboy.position.z = 2290;

    },
    "on_keyup"      : function(e) {
    }
  },
])


function addGameboy(){
  console.log('add');
  var gl = gameboys.length
  if(gameboys[0]) {
    var g0 = gameboys[0]
    var g = new Gameboy().init();
    g.colorize(COLORSETS[4][gl%COLORSETS[4].length])
    g.position.x = g0.position.x
    g.position.y = g0.position.y
    g.position.z = g0.position.z
    g.rotation.x = g0.rotation.x
    g.rotation.y = g0.rotation.y
    g.rotation.z = g0.rotation.z
    g.scale.x =    g0.scale.x
    g.scale.y =    g0.scale.y
    g.scale.z =    g0.scale.z
    g.speed.position.x = g0.speed.position.x
    g.speed.position.y = g0.speed.position.y
    g.speed.position.z = g0.speed.position.z
    g.speed.rotation.x = g0.speed.rotation.x
    g.speed.rotation.y = g0.speed.rotation.y
    g.speed.rotation.z = g0.speed.rotation.z
    g.speed.scale.x =    g0.speed.scale.x
    g.speed.scale.y =    g0.speed.scale.y
    g.speed.scale.z =    g0.speed.scale.z
  }
  else {
    var g = new Gameboy().init();
  }
  gameboys.push(g)
  return g
}



var gameboyCombos = listener.register_many([
  {
    "keys"          : "1 m",
    "is_exclusive"  : true,
    "on_keydown"    : function() {
      var tween = new TWEEN.Tween(gameboys[0].position)
        .to({ z: 0 }, 2000)
        .easing(TWEEN.Easing.Quadratic.In)
        .onComplete(function(){
          gameboys[0].speed.rotation.y = 0.01
        })
        .start();

      gameboys[0].bandname.bandname.position.z = 0.5
      gameboys[0].bandname.bandname.scale.z = 0.5
    },
    "on_keyup"      : function(e) {
    }
  },
  {
    "keys"          : "1 =",
    "is_exclusive"  : true,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      var g = addGameboy();
      var gl = gameboys.length
      positionGameboy(g);
    },
    "on_keyup"      : function(e) {
    }
  },
  {
    "keys"          : "1 -",
    "is_exclusive"  : true,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      console.log('remove');
      var g = gameboys.pop()
      scene.remove(g)
    },
    "on_keyup"      : function(e) {
    }
  },
  {
    "keys"          : "1 0",
    "is_exclusive"  : true,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      console.log('remove');
      while(gameboys.length > 0) {
        var g = gameboys.pop()
        scene.remove(g)
      }
    },
    "on_keyup"      : function(e) {
    }
  },

  {
    "keys"          : "1 u",
    "is_exclusive"  : true,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      console.log('hi');
      for(var g=0; g<gameboys.length; g++) {
        var gameboy = gameboys[g]
        gameboy.colorizeScreen(COLORSETS[4][0])
      }
    },
    "on_keyup"      : function(e) {
    }
  },

  {
    "keys"          : "1 l",
    "is_exclusive"  : true,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      for(var g=0; g<gameboys.length; g++) {
        var gameboy = gameboys[g]
        var als = gameboy.audioLines
        var v = [1, -1]

        if(als[0]) {
          var y = als[0].position.y
        } else {
          y = 0.8
        }

        gameboy.addAudioline({y: y + 0.1 * v[(als.length+1) % 2] * Math.floor(als.length/2)});
      }
    },
    "on_keyup"      : function(e) {
    }
  },

  {
    "keys"          : "1 o",
    "is_exclusive"  : true,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      for(var g=0; g<gameboys.length; g++) {
        var gameboy = gameboys[g]
        var als = gameboy.audioLines
        for(var l=0; l<als.length; l++) {
          als[l].position.y += 0.01
        }
      }
    },
    "on_keyup"      : function(e) {
    }
  },
  {
    "keys"          : "1 .",
    "is_exclusive"  : true,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      for(var g=0; g<gameboys.length; g++) {
        var gameboy = gameboys[g]
        var als = gameboy.audioLines
        for(var l=0; l<als.length; l++) {
          als[l].position.y -= 0.01
        }
      }
    },
    "on_keyup"      : function(e) {
    }
  },
])


function manipulateGameboyBandnames(action) {
  for(var g=0; g<gameboys.length; g++) {
    var gameboy = gameboys[g]
    if(gameboy.bandname) {
      var o = gameboy.bandname.children[0].children
      console.log(gameboy.bandname.children[0]);
      for(var x=0; x<o.length; x++){
        action(x, o[x])
      }
    }
  }
}

var gameboyBandnameCombos = listener.register_many([
  {
    "keys"          : "1 b",
    "is_exclusive"  : true,
    "prevent_repeat": false,
    "on_keydown"    : function() {
      for(var g=0; g<gameboys.length; g++) {
        var gameboy = gameboys[g]
        if(gameboy.bandname) {
          gameboy.remove(gameboy.bandname)
          scene.remove(gameboy.bandname)
          gameboy.bandname = null
        } else {
          gameboy.addBandname()
        }
      }
    },
    "on_keyup"      : function(e) {
    }
  },
  {
    "keys"          : "1 x",
    "is_exclusive"  : true,
    "prevent_repeat": false,
    "on_keydown"    : function() {
      manipulateGameboyBandnames(function warpAway(index, object){
        var scale = 10
        if(object.tween) { object.tween.stop() }
        object.tween = new TWEEN.Tween(object.position)
          .to({ x: (Math.random()-0.5)*scale, y: (Math.random()-0.5)*scale}, 100)
          .easing(TWEEN.Easing.Quadratic.In)
          .start();
      })
    },
    "on_keyup"      : function(e) {
      manipulateGameboyBandnames(function warpBack(index, object){
        if(object.tween) { object.tween.stop() }
        object.tween = new TWEEN.Tween(object.position)
          .to({ x: 0, y: 0, z: 0 }, 100)
          .easing(TWEEN.Easing.Quadratic.In)
          .start();
      })
    }
  },

  {
    "keys"          : "1 c",
    "is_exclusive"  : true,
    "prevent_repeat": false,
    "on_keydown"    : function() {
      manipulateGameboyBandnames(function spinAway(index, object){
        if(object.tween) { object.tween.stop() }
        object.tween = new TWEEN.Tween(object.rotation)
          .to({ z: radians(45 * (Math.random()-0.5)) }, 100)
          .easing(TWEEN.Easing.Quadratic.In)
          .start();

      })
    },
    "on_keyup"      : function(e) {
      manipulateGameboyBandnames(function spinBack(index, object){
        if(object.tween) { object.tween.stop() }
        object.tween = new TWEEN.Tween(object.rotation)
          .to({ z: radians(0) }, 100)
          .easing(TWEEN.Easing.Quadratic.In)
          .start();
      })
    }
  },  
])

var movementCombos = listener.register_many([
  {
    "keys"          : "w",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      camera.speed.position.z += -speedScale
    },
    "on_keyup"      : function(e) {
      camera.speed.position.z -= -speedScale
    }
  },
  {
    "keys"          : "s",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      camera.speed.position.z += +speedScale
    },
    "on_keyup"      : function(e) {
      camera.speed.position.z -= +speedScale
    }
  },
  {
    "keys"          : "a",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      camera.speed.position.x -= +speedScale
    },
    "on_keyup"      : function(e) {
      camera.speed.position.x += +speedScale
    }
  },
  {
    "keys"          : "d",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      camera.speed.position.x += +speedScale
    },
    "on_keyup"      : function(e) {
      camera.speed.position.x -= +speedScale
    }
  },

  {
    "keys"          : "w shift",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      camera.speed.position.z += -speedScale
    },
    "on_keyup"      : function(e) {
      camera.speed.position.z -= -speedScale
    }
  },
  {
    "keys"          : "s shift",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      camera.speed.position.z += +speedScale
    },
    "on_keyup"      : function(e) {
      camera.speed.position.z -= +speedScale
    }
  },
  {
    "keys"          : "a shift",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      camera.speed.position.x -= +speedScale
    },
    "on_keyup"      : function(e) {
      camera.speed.position.x += +speedScale
    }
  },
  {
    "keys"          : "d shift",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      camera.speed.position.x += +speedScale
    },
    "on_keyup"      : function(e) {
      camera.speed.position.x -= +speedScale
    }
  },

])