class App 
{
    constructor(gl, programs, scene, canvas) // dsp is temporary, later change it with an array of programs instead.
    {
        /*
        PROGRAMS
        0 - DSP
        1 - D3T
        2 - D3
        */
        this.gl = gl;
        this.objects = [];
        this.programs = programs;
        this.canvas = canvas;

        this.vbo = gl.createBuffer(); // Vertex buffer object
        this.ibo = gl.createBuffer(); // Index buffer object
        // this.tbo = gl.createBuffer(); // Texture buffer objects later

        this.setupScene(scene, gl);

        this.easyAngle = 0;
    }

    update()
    {
        // Update what's supposed to be on screen and stuff
        switch(this.scene)
        {
            case "easy": 
                this.easyAngle = performance.now() / 25 / 6 * 2 * Math.PI;
                this.objects[0].rotation.y = this.easyAngle;
                this.objects[0].rotation.x = this.easyAngle * 0.1;
                console.log("ROTATING");
                break;


            case "medium": 
                let temp = this.editor.getObject();
                if (temp)
                {
                    this.objects.push(temp);
                }
                break;

            case "bonus":

                break;
            default:

                break;
        }
    }

    render(gl)
    {
        // Draw what's on screen and stuff
        for(let i = 0; i < this.objects.length; i++)
        {
            this.objects[i].draw(gl);
        }
    }

    setupScene(scene, gl)
    {
        this.scene = scene;
        let posAttribLocation;
        let projection;
        let projMatrix;
        switch(scene)
        {
            case "easy": 
                this.gl.useProgram(this.programs[2].getProgram())
                gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
                posAttribLocation = gl.getAttribLocation(this.programs[2].getProgram(), "vertPosition");
                gl.vertexAttribPointer(
                    posAttribLocation,
                    3,
                    gl.FLOAT,
                    gl.FALSE,
                    3 * Float32Array.BYTES_PER_ELEMENT,
                    0
                )
                gl.enableVertexAttribArray(posAttribLocation);
        
                projection = {
                    fov: toRadian(45),
                    aspect: canvas.width / canvas.height,
                    near: 0.1,
                    far: 1000.0
                };
                projMatrix = perspective(projection.fov, projection.aspect, projection.near, projection.far);
                this.programs[2].setUniform("projection", projMatrix);

                this.objects = easyhard(this.programs[2], this.vbo, this.ibo, gl);
                easy_controls(this.objects[1]);
                break;


            case "medium": 
                this.gl.useProgram(this.programs[2].getProgram())
                gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
                posAttribLocation = gl.getAttribLocation(this.programs[2].getProgram(), "vertPosition");
                gl.vertexAttribPointer(
                    posAttribLocation,
                    3,
                    gl.FLOAT,
                    gl.FALSE,
                    3 * Float32Array.BYTES_PER_ELEMENT,
                    0
                )
                gl.enableVertexAttribArray(posAttribLocation);
    
                projMatrix = identity();
                this.programs[2].setUniform("projection", projMatrix);

                    let pos = [
                    -0.5,  0.5, 0.0,
                    -0.5, -0.5, 0.0,
                        0.5, -0.5, 0.0,
                        0.5,  0.5, 0.0
                    ]

                    let indices = [
                        0, 1, 3, 3, 1, 2
                    ]

                    let pos2 = [
                            0.5,  1.5, 0.0,
                            0.5,  0.5, 0.0,
                            1.5,  0.5, 0.0,
                            1.5,  1.5, 0.0
                        ]

                    let glob = new GLObject(this.programs[2], pos, indices, this.vbo, this.ibo, gl);
                    let glob2 = new GLObject(this.programs[2], pos2, indices, this.vbo, this.ibo, gl);
                    this.objects.push(glob);
                    this.objects.push(glob2);
                
                this.editor = new Editor(this.programs[2], gl, this.vbo, this.ibo, this.canvas);
                this.editor.track();
                // setup_medium(this.editor);
                break;


            // case "hard": 
            //     this.gl.useProgram(this.programs[2].getProgram())
            //     gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
            //     posAttribLocation = gl.getAttribLocation(this.programs[2].getProgram(), "vertPosition");
            //     gl.vertexAttribPointer(
            //         posAttribLocation,
            //         3,
            //         gl.FLOAT,
            //         gl.FALSE,
            //         3 * Float32Array.BYTES_PER_ELEMENT,
            //         0
            //     )
            //     gl.enableVertexAttribArray(posAttribLocation);
        
            //     projection = {
            //         fov: toRadian(45),
            //         aspect: canvas.width / canvas.height,
            //         near: 0.1,
            //         far: 1000.0
            //     };
            //     projMatrix = perspective(projection.fov, projection.aspect, projection.near, projection.far);
            //     this.programs[2].setUniform("projection", projMatrix);
            //     break;


            case "bonus":
                this.gl.useProgram(this.programs[2].getProgram())
                gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
                posAttribLocation = gl.getAttribLocation(this.programs[2].getProgram(), "vertPosition");
                gl.vertexAttribPointer(
                    posAttribLocation,
                    3,
                    gl.FLOAT,
                    gl.FALSE,
                    3 * Float32Array.BYTES_PER_ELEMENT,
                    0
                )
                gl.enableVertexAttribArray(posAttribLocation);
        
                projection = {
                    fov: toRadian(45),
                    aspect: canvas.width / canvas.height,
                    near: 0.1,
                    far: 1000.0
                };
                projMatrix = perspective(projection.fov, projection.aspect, projection.near, projection.far);
                this.programs[2].setUniform("projection", projMatrix);
                break;
            default:
                this.gl.useProgram(this.programs[2].getProgram())
                gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
                posAttribLocation = gl.getAttribLocation(this.programs[2].getProgram(), "vertPosition");
                gl.vertexAttribPointer(
                    posAttribLocation,
                    3,
                    gl.FLOAT,
                    gl.FALSE,
                    3 * Float32Array.BYTES_PER_ELEMENT,
                    0
                )
                gl.enableVertexAttribArray(posAttribLocation);
        
                projection = {
                    fov: toRadian(45),
                    aspect: canvas.width / canvas.height,
                    near: 0.1,
                    far: 1000.0
                };
                projMatrix = perspective(projection.fov, projection.aspect, projection.near, projection.far);
                this.programs[2].setUniform("projection", projMatrix);
                break;
        }
    }
}


// // TESTING
// let pos = [
//     -0.5,  0.5, -5.0,
//     -0.5, -0.5, -5.0,
//         0.5, -0.5, -5.0,
//         0.5,  0.5, -5.0
//     ]

//     let indices = [
//         0, 1, 3, 3, 1, 2
//     ]

//     let pos2 = [
//             0.5,  1.5, -2.0,
//             0.5,  0.5, -2.0,
//             1.5,  0.5, -2.0,
//             1.5,  1.5, -2.0
//         ]
    
//     // console.log(projMatrix);

//     // this.programs[2].setUniform("projection", projMatrix);
//     let glob = new GLObject(this.programs[2], pos, indices, this.vbo, this.ibo);
//     let glob2 = new GLObject(this.programs[2], pos2, indices, this.vbo, this.ibo);
//     this.objects.push(glob);
//     this.objects.push(glob2);