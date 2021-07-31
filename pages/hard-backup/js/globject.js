class glObject {
    
    constructor()
    {
        this.rotation = [0, 0, 0];
        this.translate = [0, 0, 0];

        this.vertices = 
        [
        // Top
		-1.0, 1.0, -1.0,    
		-1.0, 1.0, 1.0,     
		1.0, 1.0, 1.0,      
		1.0, 1.0, -1.0,     

		// Left
		-1.0, 1.0, 1.0,     
		-1.0, -1.0, 1.0,    
		-1.0, -1.0, -1.0,   
		-1.0, 1.0, -1.0,    

		// Right
		1.0, 1.0, 1.0,      
		1.0, -1.0, 1.0,     
		1.0, -1.0, -1.0,    
		1.0, 1.0, -1.0,     

		// Front
		1.0, 1.0, 1.0,      
		1.0, -1.0, 1.0,     
		-1.0, -1.0, 1.0,    
		-1.0, 1.0, 1.0,     

		// Back
		1.0, 1.0, -1.0,     
		1.0, -1.0, -1.0,    
		-1.0, -1.0, -1.0,   
		-1.0, 1.0, -1.0,    

		// Bottom
		-1.0, -1.0, -1.0,   
		-1.0, -1.0, 1.0,    
		1.0, -1.0, 1.0,     
		1.0, -1.0, -1.0   
        ];

        this.indices =
        [
            // Top
            0, 1, 2,
            0, 2, 3,

            // Left
            5, 4, 6,
            6, 4, 7,

            // Right
            8, 9, 10,
            8, 10, 11,

            // Front
            13, 12, 14,
            15, 14, 12,

            // Back
            16, 17, 18,
            16, 18, 19,

            // Bottom
            21, 20, 22,
            22, 20, 23
        ];

        this.texCoord =
        [
            // Top
            0, 0,
            0, 1,
            1, 1,
            1, 0,
    
            // Left
            0, 0,
            1, 0,
            1, 1,
            0, 1,
    
            // Right
            1, 1,
            0, 1,
            0, 0,
            1, 0,
    
            // Front
            1, 1,
            1, 0,
            0, 0,
            0, 1,
    
            // Back
            0, 0,
            0, 1,
            1, 1,
            1, 0,
    
            // Bottom
            1, 1,
            1, 0,
            0, 0,
            0, 1
        ];

        this.count = 0;
 
        this.buffervar = this.rotation[2];
    }

    rotateBy(angle)
    {
        this.buffervar += angle[2];
        this.rotation[2] += this.buffervar;
    }

    setRotation(angle)
    {
        this.rotation = angle;
    }

    translateBy(vector)
    {
        let newT = this.translate;
        newT[0] += vector[0];
        newT[1] += vector[1];
        newT[2] += vector[2];

        this.translate = newT;
    }

    setTexture(texture)
    {
        this.texture = texture;
    }

    setTranslation(vector)
    {
        this.translate = vector;
    }

    render(gl, program, vertexBufferObject, indexBufferObject, textureCoordBufferObject)
    {
        let wTranslateUniformLocation = gl.getUniformLocation(program, 'WorldTranslate');
        let wRotateUniformLocation = gl.getUniformLocation(program, 'WorldRotate');

        gl.uniformMatrix4fv(wTranslateUniformLocation, gl.FALSE, this.getTranslationMatrix());
        gl.uniformMatrix4fv(wRotateUniformLocation, gl.FALSE, this.getRotationMatrix());

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texCoord), gl.STATIC_DRAW);

        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.activeTexture(gl.TEXTURE0);

        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
    }

    getRotationMatrix()
    {
        let rot = new Float32Array(16);
        rot = identity();

        rot = rotate(rot, this.rotation[0], [1, 0, 0]);
        rot = rotate(rot, this.rotation[1], [0, 1, 0]);
        rot = rotate(rot, this.rotation[2], [0, 0, 1]);

        return rot;
    }

    getTranslationMatrix()
    {
        let trl = translationMatrix(this.translate);
        return trl;
    }
}