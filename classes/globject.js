class GLObject
{
    static count = 0;
    constructor(gl, program, positions, indices, vbo, ibo)
    {
        this.id = this.count++;

        this.vertices = positions;
        this.indices = indices;
        this.vertexCount = indices.length;

        this.setProgram(program);
        this.vertexCount = indices.length;

        this.vbo = vbo;
        this.ibo = ibo;
    }

    setProgram(program)
    {
        this.program = program;
    }

    draw(gl)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
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