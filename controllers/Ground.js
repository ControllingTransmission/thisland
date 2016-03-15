/*
    creates blocks of ground as we move 
*/

Block = ideal.Proto.extend().newSlots({
    type: "Block",
    geometry: null,
    mesh: null,
    planeWidth: 32,
    blockSize: 20000,
	audioGain: 20,
	sectionPos: null,
	rand: null,
	mode: "equalizer", // "wave", "wave2", "equalizer", "rand"
	
}).setSlots({
    init: function () {
        this._rand = Math.random() *.8 + .2
        this._planeWidth = Spectrum._fftSize
        
        this._geometry = new THREE.PlaneGeometry( 
            this.blockSize(), this.blockSize(), 
            this.planeWidth(), this.planeWidth() 
        )
        
        this._sectionPos = new THREE.Vector3(0, 0, 0)
		
		this._planeRandomization = []
		
		var length = this._geometry.vertices.length;
		
		for(var i = 0; i <= length; i++) {
			this._planeRandomization[i] = Math.random() * (i/length);
		}
		
		this._material = new THREE.MeshLambertMaterial( {
			//side: THREE.FrontSide,
			side: THREE.DoubleSide,
			//side: THREE.BackSide,
			vertexColors: THREE.FaceColors,
			//wireframeLinewidth: 5,
			//wireframe: true,
		} );
		
        this._mesh = new THREE.Mesh( this._geometry, this._material );
		
		this._mesh.rotateX( radians(-90) )
	
    },
    
    colorForIndex: function (i) {
		var color = new THREE.Color(this._colorset[Math.floor(i/(this.planeWidth()*2)/5)]);
		var hsl = color.getHSL();   
		return hsl     
    },
    
    updateColors: function() {
		var i = Math.abs(this.sectionPos().z) % COLORSETS.length
		this._colorset = COLORSETS[i]
		
		var geometry = this._mesh.geometry;
		var length = geometry.faces.length;
		for(var i = 0; i < length; i++) {
			var hsl = this.colorForIndex(i)
			geometry.faces[i].color.setHSL(hsl.h, hsl.s, hsl.l - Math.random()*0.07)
		}
		geometry.colorsNeedUpdate = true;
	},

    
        
	add: function()
	{
		this.scene().add(this.mesh())
		return this
	},

	remove: function()
	{
		this.scene().remove(this.mesh())
		return this
	},

    update: function () {
        camera.position        
    },
    
    scene: function() {
        return window.scene
    },
    
    /*
    sectionPos: function() {
        var p = this._mesh.position
        var s = this.blockSize()
        return new THREE.Vector3( Math.floor(p.x/s), Math.floor(p.y/s), Math.floor(p.z/s) );
    },
    */
    
    setSectionPos: function(p) {
        this._sectionPos = p.clone()
        var newPos = p.multiplyScalar(this.blockSize())
        //console.log("setSectionPos newPos ", newPos)
        this._mesh.position.z = newPos.z
        this._mesh.position.x = newPos.x
        this.updateColors()
        return this
    },

/*
    shouldUpdateAudio: function() {
	    var sp = this.sectionPos()
	    return sp.x % 2 == 0 && sp.z % 2 == 0        
    },
*/
	updateAudio: function(audioBins, t) {

	        
		var g = this._geometry
		var pw = this.planeWidth()+1
		var p = this._mesh.position
		var bs = this.blockSize()
		
		var ymax = pw
		for(var y = 0; y < ymax; y ++) {
		    for(var x = 0; x < pw; x ++) {
		        var i = y*pw + x
                
    			
    			if (this._mode == "wave") {
    			    
    			    g.vertices[i].z = Math.sin(2*Math.PI*y/(pw-1) + 2*Math.PI*x/(pw-1) + t/20)*400 
 
                } else if (this._mode == "wave2")  {
                    
    			   g.vertices[i].z = Math.cos(2*Math.PI*y/(pw-1) - 2*Math.PI*x/(pw-1) + t/20)*400 

                } else if (this._mode == "colors")  {
                    
    			    var hsl = this.colorForIndex(i)
    			    g.faces[i].color.setHSL(hsl.h, hsl.s, hsl.l - Math.random()*0.07)
		            g.colorsNeedUpdate = true;
		            
                } else if (this._mode == "rand")  {

    			    g.vertices[i].z = Math.random()*400 
 			        //geometry.faces[i].color.setHSL(hsl.h, hsl.s, hsl.l - Math.random()*0.07)
                                          			    
                } else if (this._mode == "rand")  {
                    
    			    g.vertices[i].z = Math.random()*400 
                    
                } else if (this._mode == "equalizer")  {
                    
                    var r = x/(pw -1)
		        
    		        if (x/pw > .5) {
    		            // map .5 -> 1 to 0 -> 1
    		           r = 2 * (r - .5)
    		        } else {
    		            // map 0 -> .5 to 1 -> 0
    		            r = 1 - r * 2
    		        }
		        
    		        r = r*.5
		        
    		        if (r < 0 || r > 1) {
    		            throw "invalid r " + r
    		        }
		        
    		        var b = Math.floor((audioBins.length - 1) * r)
		        
        			var v = Math.pow(audioBins[b] * 4, 1.4)
        			var ydamp = 1/(1 + Math.abs(ymax/2 - y))
                    v = v * ydamp
                
    			    g.vertices[i].z = v 

/*
                    if (true) {
                        var val = v /1000
                        if (v > 1) { v = 1 }
                        
        			    var hsl = this.colorForIndex(i)
        			    g.faces[i].color.setHSL(hsl.h, hsl.s , hsl.l - v)
    		            g.colorsNeedUpdate = true;
	                }
	                */
                }

		    }
		}
		
		g.verticesNeedUpdate = true;
		return this
	},
})

// ----------------------------------------------------------


Ground = ideal.Proto.extend().newSlots({
    type: "Ground",
    blocks: null,
    t: 0,
}).setSlots({
    init: function () {
        this.setBlocks([])
        
        //var block = Block.clone().add()
        //this.blocks().push(block)
        this.addBlockForSectionPos(this.cameraSectionPos())
    },
    
    updateAudio: function(audioBin) {
        this._t ++
        var self = this
        this.blocks().forEach(function (block) { block.updateAudio(audioBin, self._t) })
        return this
    },
    
    shared: function() {
        if (!this._shared) {
            this._shared = Ground.clone();
        }
        return this._shared;
    },
    
    cameraSectionPos: function() {
        var p = camera.position
        var s = Block.blockSize()
        return new THREE.Vector3( Math.floor(p.x/s), Math.floor(p.y/s), Math.floor(p.z/s) );
    },
    
    hasBlockForSectionPos: function(p) {
        var r = this.blocks().detect(function (block) {
            return block.sectionPos().z == p.z && block.sectionPos().x == p.x
        }) != null        
        return r
    },
        
    addBlockForSectionPos: function(p) {
        if (this.blocks().length > 100) { 
            console.log("too many blocks")
            return
        }

        var block = Block.clone().setSectionPos(p)
        this.addBlock(block)     
        return this   
    },
    
    addBlock: function(block) {
        this.blocks().push(block)
        block.add()
        return this
    },
    
    removeBlock: function(block) {
        //console.log("removing block ", block.sectionPos())
        this.blocks().remove(block)
        block.remove()
        return this
    },
    
    removeDistantBlocks: function() {      
        var p = this.cameraSectionPos()
        var self = this
        this.blocks().copy().forEach(function (block) {
            
            var dz = Math.abs(block.sectionPos().z - p.z)
            if (dz > 4) { 
                self.removeBlock(block)
            }
            
            var dx = Math.abs(block.sectionPos().x - p.x)
            if (dx > 4) { 
                self.removeBlock(block)
            }
        })
          
    },

    update: function () {
        var cp = this.cameraSectionPos()
        var p = cp.clone()
        
        //var r = 2
        for (var dz = -3; dz <= 1; dz ++) {
            p.z = cp.z + dz
 
             for (var dx = -1; dx <= 1; dx ++) {
                p.x = cp.x + dx
                       
                if (!this.hasBlockForSectionPos(p)) {
                     this.addBlockForSectionPos(p)
                }
            }
        }
        
        this.removeDistantBlocks()
        return this
    },

})
