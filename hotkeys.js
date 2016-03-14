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
      camera.position.y = 300;
      camera.position.z = 2500;
      
      gameboy.position.y = 140;
      gameboy.position.z = 2300

    },
    "on_keyup"      : function(e) {
    }
  },
  {
    "keys"          : "m",
    "is_exclusive"  : true,
    "on_keydown"    : function() {
      var tween = new TWEEN.Tween(gameboy.position)
        .to({ z: -500 }, 2000)
        .easing(TWEEN.Easing.Quadratic.In)
        .onComplete(function(){
          gameboy.speed.rotation.y = 0.01
        })
        .start();
      var tween2 = new TWEEN.Tween(gameboy.position)
        .to({ y: 400 }, 2000)
        // .easing(TWEEN.Easing.Exponential.In)
        .start();
      gameboy.bandname.bandname.position.z = 0.5
      gameboy.bandname.bandname.scale.z = 0.5
    },
    "on_keyup"      : function(e) {
    }
  },

  {
    "keys"          : "g =",
    "is_exclusive"  : true,
    "prevent_repeat": true,
    "on_keydown"    : function() {
    	console.log('add');
    	var g = new Gameboy().init();
    	var gl = gameboys.length
    	console.log((gl%2)?1:-1);
    	g.position.x = (gl+1) * 500 * ((gl%2)?-1:1)
    	g.colorize(COLORSETS[4][gl%COLORSETS[4].length])
    	gameboys.push(g)
    },
    "on_keyup"      : function(e) {
    }
  },
  {
    "keys"          : "g -",
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
    "keys"          : "g 0",
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


])

var movementCombos = listener.register_many([
  {
    "keys"          : "w",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      camera.speed.position.z += -10
    },
    "on_keyup"      : function(e) {
      camera.speed.position.z -= -10
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
      camera.speed.position.z -= +10
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
      camera.speed.position.x += +10
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
      camera.speed.position.x -= +10
    }
  },

  {
    "keys"          : "w shift",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      camera.speed.position.z += -10
    },
    "on_keyup"      : function(e) {
      camera.speed.position.z -= -10
    }
  },
  {
    "keys"          : "s shift",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      camera.speed.position.z += +10
    },
    "on_keyup"      : function(e) {
      camera.speed.position.z -= +10
    }
  },
  {
    "keys"          : "a shift",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      camera.speed.position.x -= +10
    },
    "on_keyup"      : function(e) {
      camera.speed.position.x += +10
    }
  },
  {
    "keys"          : "d shift",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      camera.speed.position.x += +10
    },
    "on_keyup"      : function(e) {
      camera.speed.position.x -= +10
    }
  },

])