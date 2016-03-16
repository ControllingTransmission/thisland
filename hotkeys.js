var listener = new window.keypress.Listener();
var gameboyMod = "1 "
var groundMod = "2 "
var skyboxMod = "3 "

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
      var gameboy = currentGameboy()
      camera.position.x = 0;
      camera.position.y = 1000;
      camera.position.z = 2500;
      
      gameboy.position.x = -6;
      gameboy.position.y = -2300;
      gameboy.position.z = 840;

      gameboy.rotation.x = 1.5707963267948963
      gameboy.rotation.y = 0
      gameboy.rotation.z = 0

      gameboy.speed.rotation.x = 0
      gameboy.speed.rotation.y = 0
      gameboy.speed.rotation.z = 0
    },
    "on_keyup"      : function(e) {
    }
  },
])


function addGameboy(){
    var r = Math.floor(Math.random()*100)
    var g = new Gameboy(function(){
      this.colorize(COLORSETS[4][ r % COLORSETS[4].length])
    }).init()
      

   return g

}


currentGameboy = function () {
    return Ground.shared().currentBlock().gameboy()
}

var gameboyCombos = listener.register_many([
  {
    "keys"          : gameboyMod+"m",
    "is_exclusive"  : true,
    "on_keydown"    : function() {
         var gameboy = currentGameboy()
         var p = gameboy.position.clone()
         p.y += 3000
         p.x -= 00
         if (gameboy) {
          var tween = new TWEEN.Tween(camera.position)
            .to({ x: 1000, z: 6000 }, 2000)
            .easing(TWEEN.Easing.Quadratic.In)
            .onUpdate(function(){
              camera.lookAt(p)
            })
            .onComplete(function(){
              gameboy.speed.rotation.y = 0.01
            })
            .start();

          gameboy.bandname.bandname.position.z = 0.5
          gameboy.bandname.bandname.scale.z = 0.5
        }
    },
    "on_keyup"      : function(e) {
    }
  },
  {
    "keys"          : gameboyMod+"=",
    "is_exclusive"  : true,
    "prevent_repeat": true,
    "on_keydown"    : function() {

        // add gameboy
    },
    "on_keyup"      : function(e) {
    }
  },
  {
    "keys"          : gameboyMod+"-",
    "is_exclusive"  : true,
    "prevent_repeat": true,
    "on_keydown"    : function() {
       // remove gameboy
    },
    "on_keyup"      : function(e) {
    }
  },
  {
    "keys"          : gameboyMod+"0",
    "is_exclusive"  : true,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      console.log('remove');
             // remove gameboy

    },
    "on_keyup"      : function(e) {
    }
  },

  {
    "keys"          : gameboyMod+"u",
    "is_exclusive"  : true,
    "prevent_repeat": true,
    "on_keydown"    : function() {
        var gameboy = currentGameboy()
        if (gameboy) {
            gameboy.colorizeScreen(COLORSETS[4][0])
        }
    },
    "on_keyup"      : function(e) {
    }
  },

  {
    "keys"          : gameboyMod+"l",
    "is_exclusive"  : true,
    "prevent_repeat": true,
    "on_keydown"    : function() {
        var gameboy = currentGameboy()
        if (gameboy) {
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
    "keys"          : gameboyMod+"o",
    "is_exclusive"  : true,
    "prevent_repeat": true,
    "on_keydown"    : function() {
        var gameboy = currentGameboy()
        if (gameboy) {
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
    "keys"          : gameboyMod+".",
    "is_exclusive"  : true,
    "prevent_repeat": true,
    "on_keydown"    : function() {
        var gameboy = currentGameboy()
        if (gameboy) {
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
    var gameboy = currentGameboy()
    if(gameboy && gameboy.bandname) {
      var o = gameboy.bandname.children[0].children
      console.log(gameboy.bandname.children[0]);
      for(var x=0; x<o.length; x++){
        action(x, o[x])
      }
    }
}

var gameboyBandnameCombos = listener.register_many([
  {
    "keys"          : gameboyMod+"b",
    "is_exclusive"  : true,
    "prevent_repeat": false,
    "on_keydown"    : function() {
        var gameboy = currentGameboy()
        if(gameboy) {
        
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
    "keys"          : gameboyMod+"x",
    "is_exclusive"  : true,
    "prevent_repeat": false,
    "on_keydown"    : function() {
      var gameboy = currentGameboy()
      gameboy.bandname.warpAway()
    },
    "on_keyup"      : function(e) {
      var gameboy = currentGameboy()
      gameboy.bandname.warpBack()
    }
  },

  {
    "keys"          : gameboyMod+"c",
    "is_exclusive"  : true,
    "prevent_repeat": false,
    "on_keydown"    : function() {
      var gameboy = currentGameboy()
      gameboy.bandname.twistOut()
    },
    "on_keyup"      : function(e) {
      var gameboy = currentGameboy()
      gameboy.bandname.twistBack()
    }
  },  
])


var speedScale = 100
var rotationScale = 0.01
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
      camera.speed.rotation.y += +rotationScale
    },
    "on_keyup"      : function(e) {
      camera.speed.rotation.y -= +rotationScale
    }
  },
  {
    "keys"          : "d",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      camera.speed.rotation.y -= +rotationScale
    },
    "on_keyup"      : function(e) {
      camera.speed.rotation.y += +rotationScale
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


var groundCombos = listener.register_many([
  // ground 
  
  {
    "keys"          : groundMod+"n",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      Ground.shared().setMode("wave2")
    },
    "on_keyup"      : function(e) {
    }
  },
  
  
   {
    "keys"          : groundMod+"m",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      Ground.shared().setMode("wave")
    },
    "on_keyup"      : function(e) {
    }
  },

  
   {
    "keys"          : groundMod+"b",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      Ground.shared().setMode("equalizer")
    },
    "on_keyup"      : function(e) {
    }
  },
  
    {
    "keys"          : groundMod+"v",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      Ground.shared().setMode("spikewaves")
    },
    "on_keyup"      : function(e) {
    }
  },
  
   
    {
    "keys"          : groundMod+",",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      Ground.shared().setMode("other")
    },
    "on_keyup"      : function(e) {
    }
  },
  
     {
    "keys"          : groundMod+".",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      Ground.shared().setMode("pause")
    },
    "on_keyup"      : function(e) {
    }
  },
  
   
     {
    "keys"          : groundMod+"/",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
        Ground.shared().setMode("evolve")
    },
    "on_keyup"      : function(e) {
    }
  },
  {
    "keys"          : groundMod+"'",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      Ground.shared().toggleWireframe()
    },
    "on_keyup"      : function(e) {
    }
  },
])


var skyboxCombos = listener.register_many([
  {
    "keys"          : skyboxMod+"n",
    "is_exclusive"  : false,
    "prevent_repeat": false,
    "on_keydown"    : function() {
      skybox.twinkle()
    },
    "on_keyup"      : function(e) {
    }
  },
  {
    "keys"          : skyboxMod+"b",
    "is_exclusive"  : false,
    "prevent_repeat": false,
    "on_keydown"    : function() {
      skybox.setSolidColor('#000000')
    },
    "on_keyup"      : function(e) {
      skybox.twinkle()
    }
  },

  {
    "keys"          : groundMod+";",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
        var p = Ground.shared().randomBandnamePos().clone()
        if (p) {
            p.y = 980
            
            var gp = p.clone()
            gp.z += 4000
            gp.x += 4000*(Math.random() - .5)
                        
            var tween = new TWEEN.Tween(camera.position)
                .to(gp, 1500)
                .easing(TWEEN.Easing.Quadratic.InOut)
                 .onUpdate(function() {
                     camera.lookAt(p)
                }).start();
        }
    },
    "on_keyup"      : function(e) {
    }
  },  
 
    {
    "keys"          : groundMod+"k",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
        var p = Ground.shared().randomBandnamePos().clone()
        if (p) {
            console.log(p)
            p.y = 980
            
            var gp = p.clone()
            gp.z += 4500
                        
            var tween = new TWEEN.Tween(camera.position)
                .to(gp, 1500)
                .easing(TWEEN.Easing.Quadratic.InOut)
                 .onUpdate(function() {
                     camera.lookAt(p)
                }).start();
        }
    },
    "on_keyup"      : function(e) {
    }
  }, 
  
    {
    "keys"          : groundMod+"l",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
        var p = Ground.shared().randomGameboyPos().clone()
        if (p) {
            console.log(p)
            p.y = 980
            
            var gp = p.clone()
            gp.z += 2500
                        
            var tween = new TWEEN.Tween(camera.position)
                .to(gp, 1500)
                .easing(TWEEN.Easing.Quadratic.InOut)
                 .onUpdate(function() {
                     camera.lookAt(p)
                }).start();
        }
    },
    "on_keyup"      : function(e) {
    }
  }, 
  
  {
    "keys"          : groundMod+"j",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
        console.log("pulse key")
        Ground.shared().performOnBlockObjects("pulse")
    },
    "on_keyup"      : function(e) {
    }
  }, 

  {
    "keys"          : groundMod+"u",
    "is_exclusive"  : false,
    "prevent_repeat": true,
    "on_keydown"    : function() {
        console.log("pulse key")
        
        Ground.shared().performOnBlockObjects("warpAway")
        
    },
    "on_keyup"      : function(e) {
        Ground.shared().performOnBlockObjects("warpBack")

    }
  },   
  


])