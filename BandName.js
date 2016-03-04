var BandName = function(){
  THREE.Object3D.apply(this, arguments);
  this.name = null;
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
    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {

      console.log( item, loaded, total );

    };
    var loader = new THREE.OBJLoader( manager );
    loader.load( 'models/chipzel/chipzel-name.obj', function ( object ) {

      object.traverse( function ( child ) {

        if ( child instanceof THREE.Mesh ) {

          // child.material.map = texture;

        }

      } );

      this.name = object;
      object.position.x = -3.8;
      object.position.y = -8
      this.add(object);

    }.bind(this), onProgress, onError );

    this.scale.x = 1;
    this.scale.y = 1;
    this.scale.z = 1;

    scene.add(this);

    return this
  };

  this.update = function(){
    // this.rotation.x += 0.05
    // this.rotation.z += 0.05
  };

}
BandName.prototype = Object.create(THREE.Object3D.prototype);
// Planet.prototype.constructor = THREETree;