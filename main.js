function Main()
{
    console.log("Initializing canvas");
    let canvas = document.getElementById("canvas");
    let gl = canvas.getContext('webgl');
    
    gl.clearColor(0.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    let shaderprograms = [];

    // Load default shader program (dsp)
    let dsp = new ShaderProgram(gl);
    dsp.createShader("VERTEX", vertexShaderText_default);
    dsp.createShader("FRAGMENT", fragmentShaderText_default);
    dsp.createProgram();

    // Load other shader programs
    let d3 = new ShaderProgram(gl);
    d3.createShader("VERTEX", vertexShaderText_3d);
    d3.createShader("FRAGMENT", fragmentShaderText_3d);
    d3.createProgram();

    let d2 = new ShaderProgram(gl);
    d2.createShader("VERTEX", vertexShaderText_2d);
    d2.createShader("FRAGMENT", fragmentShaderText_2d);
    d2.createProgram();

    gl.useProgram(dsp.getProgram());

    shaderprograms.push(dsp);
    shaderprograms.push(d2);
    shaderprograms.push(d3);

    const app = new App(gl, shaderprograms);
    function loop() // Main render loop
    {
        app.update();
        app.render(gl);
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
}