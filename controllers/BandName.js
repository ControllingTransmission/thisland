var BandName = function(onloaded){
  THREE.Object3D.apply(this, arguments);
  this.renderOn = true;
  this.name = null;
  this.model = null;
  this.audioGain = 20;
  this.colorSet = 0;
  this.onloaded = (onloaded) ? onloaded : function(){};
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

  this.loadModel = function(){
    var onProgress = function ( xhr ) {
      if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round(percentComplete, 2) + '% downloaded' );
      }
    };

    var onError = function ( xhr ) {
    };

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

      object.position.x = -3.8;
      object.position.y = -8
      BandName.model = object

      this.orient();

    }.bind(this), onProgress, onError );
  }

  this.orient = function(){
    // this.scale.x = 1;
    // this.scale.y = 1;
    // this.scale.z = 1;

    this.bandname = BandName.model.clone()
    for(var child in BandName.model.children) {
      this.bandname.children[child].material = BandName.model.children[child].material.clone()
    }
    this.add(this.bandname)

    this.onloaded()
  }

  this.init = function(){

    if(BandName.model === undefined) { 
      console.log('not loaded');
      this.loadModel();
    } else {
      this.orient();
    }

    return this
  };

  this.update = function(){
    // this.rotation.x += 0.05
    // this.rotation.z += 0.05
    this.rotation.x += this.speed.rotation.x
    this.rotation.y += this.speed.rotation.y
    this.rotation.z += this.speed.rotation.z
  };

}
BandName.prototype = Object.create(THREE.Object3D.prototype);
// Planet.prototype.constructor = THREETree;