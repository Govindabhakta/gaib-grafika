function Initialize()
{
    console.log("Initializing canvas");
    let canvas = document.getElementById("canvas");
    let gl = canvas.getContext('webgl');
    
    gl.clearColor(0.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    
    
    function loop() // Main render loop
    {

        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
}