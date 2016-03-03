var Name = function(){
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
      this.add(object);

    }.bind(this), onProgress, onError );

    
    this.scale.x = 100;
    this.scale.y = 100;
    this.scale.z = 100;

    scene.add(this);

    return this
  };

  this.update = function(audioBin){
    var g = this.plane.geometry;
    for(var i=0; i<=(this.planeWidth+1)*20; i++) {
      var row = i%(this.planeWidth+1);
      var col = Math.floor(i/(this.planeWidth+1));
      var x = audioBin[row*25+64] * this.audioGain / ((this.planeRandomization[i]+1)*col);
      g.vertices[i].z = x;
      // console.log(x);
    }
    g.verticesNeedUpdate = true;
  };

}
Name.prototype = Object.create(THREE.Object3D.prototype);
// Planet.prototype.constructor = THREETree;