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
    for(var c=0; c<BandName.model.children.length; c++) {
      this.bandname.children[c].material = BandName.model.children[c].material.clone()
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
  
   this.pulse = function () {
      var self = this
      var begin = this.scale.clone()
      var end = this.scale.clone().multiplyScalar(2)
      console.log("pulse bandname")
/*
      new TWEEN.Tween(this.scale).to(end, 200)
         .onComplete(function() {
            var end = self.scale.clone().multiplyScalar(.5)
            new TWEEN.Tween(self.scale).to(begin, 200).start();
        })        
        .start();
        */
        
        self.scale = end
        setTimeout(function () { self.scale = begin }, 1000)
  };

  this.warpAway = function(index, object){
    var o = this.children[0].children
    for(var x=0; x<o.length; x++){
      var index = x
      var object = o[x]
      var scale = 10
      if(object.tween) { object.tween.stop() }
      object.tween = new TWEEN.Tween(object.position)
        .to({ x: (Math.random()-0.5)*scale, y: (Math.random()-0.5)*scale}, 100)
        .easing(TWEEN.Easing.Quadratic.In)
        .start();
    }
  }

  this.warpBack = function(index, object){
    var o = this.children[0].children
    for(var x=0; x<o.length; x++){
      var index = x
      var object = o[x]
      if(object.tween) { object.tween.stop() }
      object.tween = new TWEEN.Tween(object.position)
        .to({ x: 0, y: 0, z: 0 }, 100)
        .easing(TWEEN.Easing.Quadratic.In)
        .start();
    }
  }

  this.twistOut = function(){
    var o = this.children[0].children
    for(var x=0; x<o.length; x++){
      var index = x
      var object = o[x]
      if(object.tween) { object.tween.stop() }
      object.tween = new TWEEN.Tween(object.rotation)
        .to({ z: radians(45 * (Math.random()-0.5)) }, 100)
        .easing(TWEEN.Easing.Quadratic.In)
        .start();
    }
  }

  this.twistBack = function(){
    var o = this.children[0].children
    for(var x=0; x<o.length; x++){
      var index = x
      var object = o[x]
      if(object.tween) { object.tween.stop() }
        object.tween = new TWEEN.Tween(object.rotation)
          .to({ z: radians(0) }, 100)
          .easing(TWEEN.Easing.Quadratic.In)
          .start();
    }
  }


}
BandName.prototype = Object.create(THREE.Object3D.prototype);
// Planet.prototype.constructor = THREETree;