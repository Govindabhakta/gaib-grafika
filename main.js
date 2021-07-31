function Main(scene)
{
    console.log("Initializing canvas " + scene);
    let canvas = document.getElementById("canvas");
    let gl = canvas.getContext('webgl');

    console.log("THIS IS CANVAS", canvas);
    
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    let shaderprograms = [];

    // Load default shader program (dsp)
    let dsp = new ShaderProgram(gl);
    dsp.createShader("VERTEX", vertexShaderText_default);
    dsp.createShader("FRAGMENT", fragmentShaderText_default);
    dsp.createProgram();

    // Load other shader programs
    let d2 = new ShaderProgram(gl);
    d2.createShader("VERTEX", vertexShaderText_3d_withTexture);
    d2.createShader("FRAGMENT", fragmentShaderText_3d_withTexture);
    d2.createProgram();

    let d3 = new ShaderProgram(gl);
    d3.createShader("VERTEX", vertexShaderText_3d);
    d3.createShader("FRAGMENT", fragmentShaderText_3d);
    d3.createProgram();


    gl.useProgram(dsp.getProgram());

    shaderprograms.push(dsp);
    shaderprograms.push(d2);
    shaderprograms.push(d3);

    const app = new App(gl, shaderprograms, scene, canvas);
    function loop() // Main render loop
    {
        app.update();
        app.render(gl);
        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
}