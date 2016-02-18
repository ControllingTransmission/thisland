function initSkybox(){
	var urlPrefix = "img/s_";
	var urls = [ urlPrefix + "px.jpg", urlPrefix + "nx.jpg",
	    urlPrefix + "py.jpg", urlPrefix + "ny.jpg",
	    urlPrefix + "pz.jpg", urlPrefix + "nz.jpg" ];
	var textureCube = THREE.ImageUtils.loadTextureCube( urls );

	var shader = THREE.ShaderLib[ "cube" ];
	shader.uniforms[ "tCube" ].value = textureCube;

	var material = new THREE.ShaderMaterial( {

		fragmentShader: shader.fragmentShader,
		vertexShader: shader.vertexShader,
		uniforms: shader.uniforms,
		depthWrite: false,
		side: THREE.BackSide

	} )

	// build the skybox Mesh 
	skybox = new THREE.Mesh( new THREE.CubeGeometry( 100000, 100000, 100000 ), material );
	skybox.materials = [material, 
		new THREE.MeshBasicMaterial({color:0x000000, depthWrite:false, side:THREE.BackSide}), 
		new THREE.MeshBasicMaterial({color:0xff00ff, depthWrite:false, side:THREE.BackSide}),
		new THREE.MeshBasicMaterial({color:0xffff00, depthWrite:false, side:THREE.BackSide}),
		new THREE.MeshBasicMaterial({color:0x00ffff, depthWrite:false, side:THREE.BackSide}),
		] 
	skybox.materialIndex = 0
	// add it to the scene
	sceneCube.add( skybox );
}


// var skybox;
// var skyboxUniforms;

// var cameraCube, sceneCube;

// function setupSkyboxScene(){
// 	cameraCube = camera;
// 	sceneCube = scene;	
// }

// function initSkybox( highres ){
// 	// setLoadMessage("Loading internal stars")
// 	var r = "img/";

// 	r += "s_";

// 	var urls = [ r + "px.jpg", r + "nx.jpg",
// 				 r + "py.jpg", r + "ny.jpg",
// 				 r + "pz.jpg", r + "nz.jpg" ];

// 	var textureCube = THREE.ImageUtils.loadTextureCube( urls, undefined, null );
// 	textureCube.anisotropy = maxAniso;
// 	var shader   = THREE.ShaderLib[ "cube" ];
// 	shader.uniforms[ "tCube" ].value = textureCube;
// 	shader.uniforms[ "opacity" ] = { value: 1.0, type: "f" };
// 	skyboxUniforms = shader.uniforms;
// 	var skyboxMat = new THREE.ShaderMaterial( {
// 		fragmentShader: shader.fragmentShader,
// 		vertexShader: shader.vertexShader,
// 		uniforms: shader.uniforms,
// 		side: THREE.BackSide,
// 		depthWrite: false,
// 		depthTest: false,
// 	} );

// 	skybox = new THREE.Mesh( new THREE.CubeGeometry( 1000, 1000, 1000 ), skyboxMat );
// 	skybox.scale.x = 2
// 	skybox.scale.y = 2
// 	skybox.scale.z = 2
// 	sceneCube.add( skybox );
// }

// function updateSkybox(override){
// 	cameraCube.eulerOrder = 'YXZ';
// 	if( starModel )
// 		cameraCube.rotation.copy( starModel.rotation.clone().negate());
// 	else
// 		cameraCube.rotation.copy( rotating.rotation.clone().negate() );
// 	cameraCube.fov = constrain( camera.position.z * 20.0, 60, 70);
// 	cameraCube.updateProjectionMatrix();

// 	var skyboxBrightness = constrain(1.4 / camera.position.z, 0.0, 1.0);
// 	skyboxUniforms["opacity"].value = skyboxBrightness;
// 	skyboxUniforms["opacity"].value = 1.0;
// }

// function renderSkybox(){
// 	// if( skyboxUniforms["opacity"].value > 0.001 )
// 	renderer.render( sceneCube, cameraCube );
// }