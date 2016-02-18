$(document).bind('keydown', 'space', function(e) {
	$('#bandname').toggle();
});

$(document).bind('keydown', 'b', function(e) { 
	for(var t=0; t<planets[0].trees.length; t++)
		planets[0].trees[t].makeBranch()
}); 

$(document).bind('keydown', 'n', function(e) { 
	for(var t=0; t<planets[0].trees.length; t++)
		planets[0].trees[t].step()
}); 	

$(document).bind('keydown', 'm', function(e) { 
	for(var p=0; p<planets.length; p++)
		planets[p].growTree()
}); 

$(document).bind('keydown', 'shift+m', function(e) { 
	for(var p=0; p<planets.length; p++)
		planets[p].closeTree()
}); 	



$(document).bind('keydown', 'p', function(e) { 
	new Planet().init()
}); 

$(document).bind('keydown', 'shift+p', function(e) { 
	planets[planets.length-1].close()
}); 	

$(document).bind('keydown', 'shift+0', function(e) { 
	var p = new Planet().init()
	p.rotation.speed = planets[0].rotation.speed
}); 

$(document).bind('keydown', 'ctrl+0', function(e) { 
	for(var p=0; p<planets.length; p++)
		planets[p].rotation.speed = planets[0].rotation.speed
}); 

$(document).bind('keydown', '0', function(e) { 
	for(var p=0; p<planets.length; p++){
		planets[p].rotation.speed = planets[0].rotation.speed
		planets[p].rotation.x = 0
		planets[p].rotation.y = 0
		planets[p].rotation.z = 0
	}
}); 




$(document).bind('keydown', 'z', function(e) { 
	for(var p=0; p<planets.length; p++)
		for(var t=0; t<planets[p].trees.length; t++)
			planets[p].trees[t].setColor(new THREE.Color('#ffffff'))
}); 	

$(document).bind('keydown', 'x', function(e) { 
	for(var p=0; p<planets.length; p++)
		for(var t=0; t<planets[p].trees.length; t++)
			planets[p].trees[t].setColor(new THREE.Color('#ff00ff'))
}); 

$(document).bind('keydown', 'c', function(e) { 
	for(var p=0; p<planets.length; p++)
		for(var t=0; t<planets[p].trees.length; t++)
			planets[p].trees[t].setColor(new THREE.Color('#ffff00'))
});

$(document).bind('keydown', 'v', function(e) { 
	for(var p=0; p<planets.length; p++)
		for(var t=0; t<planets[p].trees.length; t++)
			planets[p].trees[t].setColor(new THREE.Color('#00ffff'))
});


/* Planets rotation */ 	

$(document).bind('keydown', 'o', function(e) { 
	planet.rotation.y += .1
}); 

$(document).bind('keydown', 'shift+o', function(e) { 
	for(var p=0; p<planets.length; p++)
		planets[p].rotation.y += .1
}); 

$(document).bind('keydown', 'ctrl+o', function(e) { 
	planet.rotation.speed.y += .05
}); 

$(document).bind('keydown', 'ctrl+shift+o', function(e) { 
	for(var p=0; p<planets.length; p++)
		planets[p].rotation.speed.y += .05
}); 

$(document).bind('keydown', 'i', function(e) { 
	planet.rotation.y -= .1
}); 

$(document).bind('keydown', 'shift+i', function(e) { 
	for(var p=0; p<planets.length; p++)
		planets[p].rotation.y -= .1
}); 

$(document).bind('keydown', 'ctrl+i', function(e) { 
	planet.rotation.speed.y -= .05
}); 

$(document).bind('keydown', 'ctrl+shift+i', function(e) { 
	for(var p=0; p<planets.length; p++)
		planets[p].rotation.speed.y -= .05
}); 



$(document).bind('keydown', 'l', function(e) { 
	planet.rotation.x += .1
}); 

$(document).bind('keydown', 'shift+l', function(e) { 
	for(var p=0; p<planets.length; p++)
		planets[p].rotation.x += .1
}); 

$(document).bind('keydown', 'ctrl+l', function(e) { 
	planet.rotation.speed.x += .05
}); 

$(document).bind('keydown', 'ctrl+shift+l', function(e) { 
	for(var p=0; p<planets.length; p++)
		planets[p].rotation.speed.x += .05
}); 

$(document).bind('keydown', 'k', function(e) { 
	planet.rotation.x -= .1
}); 

$(document).bind('keydown', 'shift+k', function(e) { 
	for(var p=0; p<planets.length; p++)
		planets[p].rotation.x -= .1
}); 

$(document).bind('keydown', 'ctrl+k', function(e) { 
	planet.rotation.speed.x -= .05
}); 

$(document).bind('keydown', 'ctrl+shift+k', function(e) { 
	for(var p=0; p<planets.length; p++)
		planets[p].rotation.speed.x -= .05
}); 

/* stop Planets rotation */
$(document).bind('keydown', 'a', function(e) { 
	for(var p=0; p<planets.length; p++){
		planets[p].rotation.x = 0
		planets[p].rotation.y = 0
		planets[p].rotation.z = 0
	}
});

/* reset Planets rotation */
$(document).bind('keydown', 'ctrl+a', function(e) { 
	for(var p=0; p<planets.length; p++){
		planets[p].rotation.speed.x = 0
		planets[p].rotation.speed.y = 0
		planets[p].rotation.speed.z = 0
	}
});

$(document).bind('keydown', 'shift+ctrl+a', function(e) { 
	for(var p=0; p<planets.length; p++){
		planets[p].rotation.speed.x = 0
		planets[p].rotation.speed.y = 0
		planets[p].rotation.speed.z = 0
		planets[p].rotation.x = 0
		planets[p].rotation.y = 0
		planets[p].rotation.z = 0
	}
});

/* end Planets rotation */


/* skybox rotation */

$(document).bind('keydown', 'y', function(e) { 
	cameraCube.rotation.y += .01
}); 

$(document).bind('keydown', 'ctrl+y', function(e) { 
	cameraCube.rotation.speed.y += .005
}); 

$(document).bind('keydown', 'u', function(e) { 
	cameraCube.rotation.y -= .01
}); 

$(document).bind('keydown', 'ctrl+u', function(e) { 
	cameraCube.rotation.speed.y -= .005
}); 

$(document).bind('keydown', '6', function(e) { 
	cameraCube.rotation.x += .01
}); 

$(document).bind('keydown', 'ctrl+6', function(e) { 
	cameraCube.rotation.speed.x += .005
}); 

$(document).bind('keydown', '7', function(e) { 
	cameraCube.rotation.x -= .01
}); 

$(document).bind('keydown', 'ctrl+7', function(e) { 
	cameraCube.rotation.speed.x -= .005
}); 

$(document).bind('keydown', 'h', function(e) { 
	cameraCube.rotation.z += .01
}); 

$(document).bind('keydown', 'ctrl+h', function(e) { 
	cameraCube.rotation.speed.z += .005
}); 

$(document).bind('keydown', 'j', function(e) { 
	cameraCube.rotation.z -= .01
}); 

$(document).bind('keydown', 'ctrl+j', function(e) { 
	cameraCube.rotation.speed.z -= .005
}); 

/* stop skybox rotation */
$(document).bind('keydown', 's', function(e) { 
	cameraCube.rotation.speed.x = 0
	cameraCube.rotation.speed.y = 0
	cameraCube.rotation.speed.z = 0
}); 

/* reset skybox rotation */
$(document).bind('keydown', 'ctrl+s', function(e) { 
	cameraCube.rotation.x = 0
	cameraCube.rotation.y = 0
	cameraCube.rotation.z = 0
});

/* random skybox rotation */
$(document).bind('keydown', 'alt+ctrl+s', function(e) { 
	cameraCube.rotation.x = Math.random()*255
	cameraCube.rotation.y = Math.random()*255
	cameraCube.rotation.z = Math.random()*255
});

/* end skybox rotation */

$(document).bind('keydown', 'q', function(e) { 
	skybox.materialIndex++
	if(skybox.materialIndex==skybox.materials.length)
		skybox.materialIndex=0
	skybox.material = skybox.materials[skybox.materialIndex]
	skybox.material.needsUpdate = true
});

$(document).bind('keyup', 'q', function(e) { 
	skybox.materialIndex = 0
	skybox.material = skybox.materials[skybox.materialIndex]
	skybox.material.needsUpdate = true
});


