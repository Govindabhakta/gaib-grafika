class GLObject
{
    static count = 0;
    constructor(gl, program, positions, indices)
    {
        this.id = this.count++;

        this.vertices = positions;
        this.indices = indices;
        this.vertexCount = indices.length;

        this.vbo = gl.createBuffer(); // Vertex buffer object
        this.ibo = gl.createBuffer(); // Index buffer object
        // this.tbo = gl.createBuffer(); // Texture buffer objects later

        this.setProgram(program);
        this.vertexCount = indices.length;
    }

    setProgram(program)
    {
        this.program = program;
    }

    draw(gl)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        let posAttribLocation = gl.getAttribLocation(this.program, "vertPosition");
        gl.vertexAttribPointer(
            posAttribLocation,
            3,
            gl.FLOAT,
            gl.FALSE,
            3 * Float32Array.BYTES_PER_ELEMENT,
            0
        )
        gl.enableVertexAttribArray(posAttribLocation);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

        // gl.bindBuffer(gl.ARRAY_BUFFER, tbo);
        // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);

        // gl.bindTexture(this.texture)
        // gl.activeTexture(gl.TEXTURE0)

        gl.drawElements(gl.TRIANGLES, this.vertexCount, gl.UNSIGNED_SHORT, 0);
    }
}