function Init()
{
    console.log("Initializing canvas");
    let canvas = document.getElementById('canvas');
    let gl = canvas.getContext('webgl');

    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST);

    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);

    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
    
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);    

    let vertexBufferObject = gl.createBuffer();
    let indexBufferObject = gl.createBuffer();
    let textureCoordBufferObject = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
    let positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    gl.vertexAttribPointer(
        positionAttribLocation,
        3,
        gl.FLOAT,
        gl.FALSE,
        3 * Float32Array.BYTES_PER_ELEMENT,
        0
    )
    gl.enableVertexAttribArray(positionAttribLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBufferObject);
    let texCoordinateAttribLocation = gl.getAttribLocation(program, 'vertTexCoordinate');
    gl.vertexAttribPointer(
        texCoordinateAttribLocation,
        2,
        gl.FLOAT,
        gl.FALSE,
        2 * Float32Array.BYTES_PER_ELEMENT,
        0
    )
    gl.enableVertexAttribArray(texCoordinateAttribLocation);
    
    gl.useProgram(program);
    let wTranslateUniformLocation = gl.getUniformLocation(program, 'WorldTranslate');
    let wRotateUniformLocation = gl.getUniformLocation(program, 'WorldRotate');

    let viewUniformLocation = gl.getUniformLocation(program, 'View');
    let projectionUniformLocation = gl.getUniformLocation(program, 'Projection');

    let wTranslateMatrix = new Float32Array(16);
    let wRotateMatrix = new Float32Array(16);

    let viewMatrix = new Float32Array(16);
    let projMatrix = new Float32Array(16);

    wTranslateMatrix = identity();
    wRotateMatrix = identity();

    let camera =
    {
        eye: [0, 0, -8],
        center: [0, 0, 0],
        up: [0, 1, 0]
    };

    viewMatrix = lookAt(camera.eye, camera.center, camera.up);

    let projection = 
    {
        fov: toRadian(45),
        aspect: canvas.width / canvas.height,
        near: 0.1,
        far: 1000.0
    };

    projMatrix = perspective(projection.fov, projection.aspect, projection.near, projection.far);

    console.log(wTranslateMatrix, wRotateMatrix, viewMatrix, projMatrix);

    gl.uniformMatrix4fv(wTranslateUniformLocation, gl.FALSE, wTranslateMatrix);
    gl.uniformMatrix4fv(wRotateUniformLocation, gl.FALSE, wRotateMatrix);
    gl.uniformMatrix4fv(viewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(projectionUniformLocation, gl.FALSE, projMatrix);

    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        document.getElementById('tex1')
    )
    gl.bindTexture(gl.TEXTURE_2D, null);

    glob = new glObject();
    glob.setTexture(texture);

    glob2 = new JSOBglObject(test);
    glob2.setTexture(texture);
    glob2.setTranslation([3, 0, 2]);

    data = [];
    data.push(glob);
    data.push(glob2);

    /** MAIN RENDER LOOP */ 
    var angle = 0;
    function loop()
    {   
        angle = performance.now() / 1000 / 6 * 2 * Math.PI;

        for(let i = 0; i < data.length; i++)
        {
            data[i].setRotation([0, angle, 0]);
            data[i].render(gl, program, vertexBufferObject, indexBufferObject, textureCoordBufferObject);
        }
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}

function LoadVertexBuffer()
{
    let triangleVertices = 
    [
         0.0,  0.5, 0.0,          1.0, 1.0, 0.0,
        -0.5, -0.5, 0.0,          0.7, 0.0, 1.0,
         0.5, -0.5, 0.0,          0.1, 1.0, 0.6
    ];
    
    return triangleVertices;
}

