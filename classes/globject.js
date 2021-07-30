class GLObject
{
    static count = 0;
    constructor(program, positions, indices, vbo, ibo)
    {
        this.id = this.count++;

        this.vertices = positions;
        this.indices = indices;
        this.vertexCount = indices.length;

        this.setProgram(program);
        this.vertexCount = indices.length;

        this.vbo = vbo;
        this.ibo = ibo;

        this.translate = 
        {
            x: 0,
            y: 0,
            z: 0
        }

        this.rotation = 
        {
            x: 0,
            y: 0,
            z: 0
        }

        this.scale = 
        {
            x: 1,
            y: 1,
            z: 1
        }
        
    }

    setProgram(program)
    {
        this.program = program;
    }

    draw(gl)
    {
        this.program.setUniform("worldMatrix", this.getWorldMatrix());

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

    getWorldMatrix()
    {
        let worldMatrix = identity();
        worldMatrix = multiply(worldMatrix, worldMatrix, translationMatrix([this.translate.x, this.translate.y, this.translate.z]));
        worldMatrix = rotate(worldMatrix, toRadian(this.rotation.x), [1, 0, 0]);
        worldMatrix = rotate(worldMatrix, toRadian(this.rotation.y), [0, 1, 0]);
        worldMatrix = rotate(worldMatrix, toRadian(this.rotation.z), [0, 0, 1]);
        worldMatrix = scale(worldMatrix, [this.scale.x, this.scale.y, this.scale.z]);
        return worldMatrix;
    }
}