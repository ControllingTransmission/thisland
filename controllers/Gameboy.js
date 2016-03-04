var Gameboy = function(){
  THREE.Object3D.apply(this, arguments);
  this.bandname = null;
  this.audioGain = 20;
  this.colorSet = 0;

  var onProgress = function ( xhr ) {
    if ( xhr.lengthComputable ) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };

  var onError = function ( xhr ) {
  };

  this.init = function(){
    // model

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

      materials.preload();

      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials( materials );
      objLoader.setPath( 'models/gameboy/' );
      objLoader.load( 'gameboy.obj', function ( object ) {
        object.position.y = -1.7;
        this.add( object );

      }.bind(this), onProgress, onError );

    }.bind(this));

    b = new BandName(function() {
      this.position.set(0, 0.7999999999999999, 0.25)
      this.scale.set(0.019999999999999997, 0.019999999999999997, 0.019999999999999997)
      this.name.position.set(-3.8, -8, -0.5)
    }).init();

    this.bandname = b
    this.add(this.bandname);

    this.position.y = 140;
    this.position.z = 2300;
    // this.position.z = 200;

    this.scale.x = 200;
    this.scale.y = 200;
    this.scale.z = 200;

    scene.add(this);

    return this
  };

  this.update = function(){
    // this.rotation.y += 0.05
    // this.rotation.z += 0.05
  };

}
Gameboy.prototype = Object.create(THREE.Object3D.prototype);
// Planet.prototype.constructor = THREETree;