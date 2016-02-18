var RunnerGround = function(){
	THREE.Object3D.apply(this, arguments);
	this.plane = null;

	this.init = function(){
		var geometry = new THREE.PlaneGeometry( 10000, 10000, 32, 32 );

		geometry.vertices[50].z += 1000
		var material = new THREE.MeshBasicMaterial( {
			color: 0xffff00, 
			side: THREE.DoubleSide,
			wireframe: true,
			wireframeLinewidth: 2,
			// vertexColors: THREE.Color( 0xff00ff ),
		} );
		this.plane = new THREE.Mesh( geometry, material );
		this.plane.rotateX( radians(-90) )
		this.add( this.plane )

		scene.add( this )

		return this
	};
}
RunnerGround.prototype = Object.create(THREE.Object3D.prototype);
// Planet.prototype.constructor = THREETree;