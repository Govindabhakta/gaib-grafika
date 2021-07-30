class ShaderProgram {

    constructor(gl)
    {
        this.gl = gl;
        this.vertex_shader = null;
        this.fragment_shader = null;
        this.program = null;
    }

    createShader(type, text) // TYPE is either string "VERTEX" or "FRAGMENT"
    {
        let shader;
        switch(type)
        {
            case "VERTEX":
                shader = this.gl.createShader(this.gl.VERTEX_SHADER);
                break;
            case "FRAGMENT":
                shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
                break;
        }

        this.gl.shaderSource(shader, text);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS))
        {
            alert("PROGRAM.createShader() Error Compiling " + this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return;
        }

        switch(type)
        {
            case "VERTEX":
                this.vertex_shader = shader;
                break;
            case "FRAGMENT":
                this.fragment_shader = shader;
                break;
        }
    }

    createProgram()
    {
        if (!this.vertex_shader || !this.fragment_shader)
        {
            alert("Missing vertex or fragment shader");
            return;
        }

        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, this.vertex_shader);
        this.gl.attachShader(this.program, this.fragment_shader);
        this.gl.linkProgram(this.program);

        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS))
        {
            alert("PROGRAM.createProgram() Error on creating shader program " + this.gl.getProgramInfoLog(this.program))
            this.program = null;
            return;
        }
    }

    getProgram()
    {
        if (!this.program)
        {
            alert("PROGRAM.getProgram() Error: No program created");
            return null;
        }
        return this.program;
    }
}