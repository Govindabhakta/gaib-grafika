function Main()
{
    console.log("Initializing canvas");
    let canvas = document.getElementById("canvas");
    let gl = canvas.getContext('webgl');
    
    gl.clearColor(0.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    // Load default shader program (dsp)
    let dsp = new ShaderProgram(gl);
    dsp.createShader(gl.VERTEX_SHADER, vertexShaderText_default);
    dsp.createShader(gl.FRAGMENT_SHADER, fragmentShaderText_default);
    dsp.createProgram();

    gl.useProgram(dsp.getProgram());

    const app = new App();
    function render() // Main render loop
    {
        app.update();
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}