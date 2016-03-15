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
}).setSlots({
    init: function () {
        this._rand = Math.random()
        
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
		
		var i = Math.floor(Math.random() * COLORSETS.length)
		this.setColors(COLORSETS[i]);
    },
    
    updateColors: function() {
		var i = Math.abs(this.sectionPos().z) % COLORSETS.length
		this.setColors(COLORSETS[i]);
		return this        
    },
    
	setColors: function(colorset) {
		var geometry = this._mesh.geometry;
		var length = geometry.faces.length;
		for(var i = 0; i < length; i++) {
			var color = new THREE.Color(colorset[Math.floor(i/(this.planeWidth()*2)/5)]);
			var hsl = color.getHSL();
			//console.log(hsl.h, hsl.s, hsl.l + Math.random()*0.05)
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

    shouldUpdateAudio: function() {
	    var sp = this.sectionPos()
	    return sp.x % 2 == 0 && sp.z % 2 == 0        
    },

	updateAudio: function(audioBins, t) {
	    var audioBins = Spectrum._beatByteData
	    //console.log(audioBins)
        //if (!this.shouldUpdateAudio()) { return }
	        
		var g = this._geometry
		var pw = this.planeWidth()+1
		var p = this._mesh.position
		var bs = this.blockSize()
		
		for(var y = 0; y < 3; y ++) {
		    for(var x = 0; x < pw; x ++) {
		        var i = y*pw + x
		        
		        /*
		        var dx = (x - pw/2)/pw
		        var dy = (y - pw/2)/pw
		        var d = Math.sqrt(dx*dx + dy*dy)
		        */
		        //var b = Math.floor(audioBin.length * y / pw )
		        //var b = Math.floor(audioBin.length * Math.abs(x / pw) )
		        var b = Math.floor(audioBins.length * x / pw )
		        //var b = Math.floor(audioBins.length * this._rand)
		        //var b = Math.floor(audioBin.length * d )
    			var v = audioBins[b]/6
//                v /= (y+1)
                var damp = Math.sin( Math.PI * x / pw + Math.PI * y / pw) 
                //var damp = 1/Math.abs((x - pw/2)/(pw/2)) 
                v =  audioBins[b] * 1000
    			g.vertices[i].z = v// * damp

    			
    			/*
    			var wx = p.x + bs * x/pw
    			var wy = p.y + bs * y/pw 
    			//g.vertices[i].z = Math.sin(Math.sqrt(wx*wx + wy*wy)/1000)*300
    			*/
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
        this.blocks().forEach(function (block) { block.updateAudio(audioBin, this._t) })
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
