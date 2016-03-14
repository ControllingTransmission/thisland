var listener = new window.keypress.Listener();

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
    "keys"          : "w",
    "is_exclusive"  : true,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      camera.speed.position.z -= 100
    },
    "on_keyup"      : function(e) {
    	camera.speed.position.z += 100
    }
  },
	{
    "keys"          : "s",
    "is_exclusive"  : true,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      camera.speed.position.z += +100
    },
    "on_keyup"      : function(e) {
    	camera.speed.position.z -= +100
    }
  },
	{
    "keys"          : "a",
    "is_exclusive"  : true,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      camera.speed.position.x -= +100
    },
    "on_keyup"      : function(e) {
    	camera.speed.position.x += +100
    }
  },
	{
    "keys"          : "d",
    "is_exclusive"  : true,
    "prevent_repeat": true,
    "on_keydown"    : function() {
      camera.speed.position.x += +100
    },
    "on_keyup"      : function(e) {
    	camera.speed.position.x -= +100
    }
  },
  {
    "keys"          : "g",
    "is_exclusive"  : true,
    "prevent_repeat": true,
    "on_keydown"    : function() {
    	console.log('add');
    	var g = new Gameboy().init();
    	var gl = gameboys.length
    	console.log((gl%2)?1:-1);
    	g.position.x = (gl+1) * 500 * ((gl%2)?-1:1)
    	g.colorize(COLORSETS[4][gl])
    	gameboys.push(g)
    },
    "on_keyup"      : function(e) {
    }
  },
  {
    "keys"          : "h",
    "is_exclusive"  : true,
    "prevent_repeat": true,
    "on_keydown"    : function() {
    	console.log('remove');
    	var g = gameboys.pop()
    	g.remove()
    },
    "on_keyup"      : function(e) {
    }
  }

])

