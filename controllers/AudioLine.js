var AudioLine = function(onloaded){
  THREE.Object3D.apply(this, arguments);
  this.plane = null;
  this.planeWidth = 32;
  this.planeHeight = 1;
  this.planeRandomization = [];
  this.planeColors = [];
  this.audioGain = 20;
  this.colorSet = 0;
  this.onloaded = (onloaded) ? onloaded : function(){};

  this.init = function(){
    var geometry = new THREE.PlaneGeometry( 50, 1, this.planeWidth, this.planeHeight );

    // geometry.vertices[50].z += 1000
    var length = geometry.vertices.length;
    for(var i = 0; i <= length; i++) {
      this.planeRandomization[i] = Math.random() * (i/length);
    }
    var material = new THREE.MeshLambertMaterial( {
      // color: 0xffffff, 
      side: THREE.DoubleSide,
      // wireframe: true,
      wireframeLinewidth: 2,
      // vertexColors: THREE.Color( 0xff00ff ),
      vertexColors: THREE.FaceColors,
    } );
    this.plane = new THREE.Mesh( geometry, material );
    // this.plane.rotateX( radians(-90) )
    this.add( this.plane )

    scene.add( this )

    this.setColors(COLORSETS[this.colorSet]);

    this.onloaded();

    return this
  };

  this.update = function(audioBin){
    // console.log('updating');
    var g = this.plane.geometry;
    for(var i=0; i<=(this.planeWidth+1); i++) {
      var row = i%(this.planeWidth+1);
      var col = Math.floor(i/(this.planeWidth+1));
      var x = (audioBin[row*25 + 64] - 50) * this.audioGain / 200;
      console.log(x);
      g.vertices[i].y = x;
      g.vertices[i+this.planeWidth].y = x - 1;
      // console.log(x);
    }
    g.verticesNeedUpdate = true;
  };

  this.setColors = function(colorset){
    console.log('colors');
    var geometry = this.plane.geometry;
    var length = geometry.faces.length;
    for(var i = 0; i < length; i++) {
      var color = new THREE.Color(colorset[Math.floor(i/(this.planeWidth*2)/5)]);
      var hsl = color.getHSL();
      geometry.faces[i].color.setHSL(hsl.h, hsl.s, hsl.l + Math.random()*0.05)
      // geometry.faces[i].color = this.planeColors[i];
    }
    geometry.colorsNeedUpdate = true;
    console.log(geometry.colorsNeedUpdate);
  }

  this.rotateColorset = function(dist){
    this.colorSet = (this.colorSet + dist) % COLORSETS.length;
    console.log(this.colorSet);
    this.setColors(COLORSETS[this.colorSet]);
  }
}
AudioLine.prototype = Object.create(THREE.Object3D.prototype);
// Planet.prototype.constructor = THREETree;