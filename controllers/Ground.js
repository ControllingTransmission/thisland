/*
    creates blocks of ground as we move 
*/

Block = ideal.Proto.extend().newSlots({
    type: "Block",
    geometry: null,
    mesh: null,
    planeWidth: 32,
    blockSize: 20000,
}).setSlots({
    init: function () {
        this._geometry = new THREE.PlaneGeometry( this.blockSize(), this.blockSize(), 10, 10 );

		
		this._planeRandomization = []
		
		var length = this._geometry.vertices.length;
		
		for(var i = 0; i <= length; i++) {
			this._planeRandomization[i] = Math.random() * (i/length);
		}
		
		this._material = new THREE.MeshLambertMaterial( {
			side: THREE.DoubleSide,
			wireframeLinewidth: 2,
			vertexColors: THREE.FaceColors,
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
			geometry.faces[i].color.setHSL(hsl.h, hsl.s, hsl.l + Math.random()*0.05)
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
    
    sectionPos: function() {
        var p = this._mesh.position
        var s = this.blockSize()
        return new THREE.Vector3( Math.floor(p.x/s), Math.floor(p.y/s), Math.floor(p.z/s) );
    },
    
    setSectionPos: function(p) {
        var newPos = p.multiplyScalar(this.blockSize())
        console.log("setSectionPos newPos ", newPos)
        this._mesh.position.z = newPos.z
        this._mesh.position.x = newPos.x
        this.updateColors()
        return this
    },

})

Ground = ideal.Proto.extend().newSlots({
    type: "Ground",
    blocks: null
}).setSlots({
    init: function () {
        this.setBlocks([])
        
        //var block = Block.clone().add()
        //this.blocks().push(block)
        this.addBlockForSectionPos(this.cameraSectionPos())
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
        console.log("removing block ", block.sectionPos())
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
        
        var r = 3
        for (var dz = -r; dz <= r; dz ++) {
            p.z = cp.z + dz
 
             for (var dx = -r; dx <= r; dx ++) {
                p.x = cp.x + dx
                       
                if (!this.hasBlockForSectionPos(p)) {
                     this.addBlockForSectionPos(p)
                }
            }
        }
        
        this.removeDistantBlocks()
    },

})
