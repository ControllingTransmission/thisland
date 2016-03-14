var Gameboy = function(){
  THREE.Object3D.apply(this, arguments);
  this.renderOn = true;
  this.model = null;
  this.materials = null;
  this.bandname = null;
  this.gameboy = null;
  this.audioLines = []
  this.audioGain = 20;
  this.colorSet = 0;
  this.speed = {
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    scale: {
      x: 0,
      y: 0,
      z: 0
    }
  }

  this.loadModel = function() {
    var onProgress = function ( xhr ) {
      if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round(percentComplete, 2) + '% downloaded' );
      }
    };

    var onError = function ( xhr ) { };

    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setBaseUrl( 'models/gameboy/' );
    mtlLoader.setPath( 'models/gameboy/' );
    mtlLoader.load( 'gameboy.mtl', function( materials ) {

      console.log(materials);
      materials.preload();
      console.log(materials);
      Gameboy.materials = materials

      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials( Gameboy.materials );
      objLoader.setPath( 'models/gameboy/' );
      objLoader.load( 'gameboy.obj', function ( object ) {
        object.position.y = -1.7;
        Gameboy.model = object;
        this.orient();

      }.bind(this), onProgress, onError );

    }.bind(this));
  }

  this.orient = function() {
    console.log('GAMEBOY ORIENT', Gameboy.materials);
    this.gameboy = Gameboy.model.clone()
    for(var child in Gameboy.model.children) {
      this.gameboy.children[child].material = Gameboy.model.children[child].material.clone()
    }
    this.gameboy.children[3].material.side = THREE.DoubleSide
    this.add( this.gameboy );
  }

  this.colorize = function(bodyColor) {
    this.gameboy.children[3].material.color = new THREE.Color(bodyColor)
  }

  this.init = function() {

    if(Gameboy.model === undefined) { 
      console.log('not loaded');
      this.loadModel();
    } else {
      this.orient();
    }

    this.bandname = new BandName(function() {
      this.position.set(0, 0.7999999999999999, 0.3)
      this.scale.set(0.019999999999999997, 0.019999999999999997, 0.000001)
      // this.bandname.position.set(-3.8, -8, -0.5)
    }).init();

    this.add(this.bandname);

    var audioLine = new AudioLine(function() {
      this.position.set(0.03100000000000005, 0.7999999999999999, 0.3)
      this.scale.set(0.0219, 0.019999999999999997, 0.019999999999999997)
    }).init();

    this.audioLines.push(audioLine)

    this.add(audioLine)

    // this.bandname.speed.rotation.z = 0.1

    this.position.y = 140;
    this.position.z = 2300;

    // this.position.y = 400;
    // this.position.z = 2000;

    this.scale.x = 200;
    this.scale.y = 200;
    this.scale.z = 200;

    scene.add(this);

    return this
  };

  this.update = function(audioBin){
    // this.rotation.y += 0.05
    // this.rotation.z += 0.05
    this.rotation.x += this.speed.rotation.x
    this.rotation.y += this.speed.rotation.y
    this.rotation.z += this.speed.rotation.z
    this.position.x += this.speed.position.x
    this.position.y += this.speed.position.y
    this.position.z += this.speed.position.z

    this.bandname.update()
    for(var l in this.audioLines) {
      var line = this.audioLines[l]
      line.update(audioBin);
    }
  };

}
Gameboy.prototype = Object.create(THREE.Object3D.prototype);
// Planet.prototype.constructor = THREETree;