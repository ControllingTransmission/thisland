var RunnerGround = function(){
	THREE.Object3D.apply(this, arguments);
	this.renderOn = true;
	this.plane = null;
	this.planeWidth = 32;
	this.planeRandomization = [];
	this.planeColors = [];
	this.audioGain = 20;
	this.colorSet = 0;

	this.init = function(){
		var geometry = new THREE.PlaneGeometry( 10000, 10000, this.planeWidth, this.planeWidth );

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
		this.plane.rotateX( radians(-90) )
		this.add( this.plane )

		scene.add( this )
		this.position.z = -1000

		this.setColors(COLORSETS[this.colorSet]);

		return this
	};

	this.update = function(audioBin){
		console.log('update');
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
RunnerGround.prototype = Object.create(THREE.Object3D.prototype);
// Planet.prototype.constructor = THREETree;