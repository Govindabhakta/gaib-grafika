class App 
{
    constructor(gl, programs) // dsp is temporary, later change it with an array of programs instead.
    {
        /*
        PROGRAMS
        0 - DSP
        1 - D2
        2 - D3
        3 - D3T
        */
        this.gl = gl;
        this.mode = "NONE";
        this.objects = [];
        this.programs = programs;

        // TESTING
        let pos = [
        -0.5,  0.5, -5.0,
        -0.5, -0.5, -5.0,
         0.5, -0.5, -5.0,
         0.5,  0.5, -5.0
        ]

        let indices = [
            0, 1, 3, 3, 1, 2
        ]

        let pos2 = [
             0.5,  1.5, -2.0,
             0.5,  0.5, -2.0,
             1.5,  0.5, -2.0,
             1.5,  1.5, -2.0
            ]
        
        

        this.gl.useProgram(this.programs[2].getProgram())

        let projection = {
            fov: toRadian(45),
            aspect: canvas.width / canvas.height,
            near: 0.1,
            far: 1000.0
        };
        let projMatrix = perspective(projection.fov, projection.aspect, projection.near, projection.far);
    
        console.log(projMatrix);
    
        this.programs[2].setUniform("projection", projMatrix);
        let glob = new GLObject(gl, this.programs[2].getProgram(), pos, indices);
        let glob2 = new GLObject(gl, this.programs[2].getProgram(), pos2, indices);
        this.objects.push(glob);
        this.objects.push(glob2);
    }

    update()
    {
        // Update what's supposed to be on screen and stuff
    }

    render(gl)
    {
        // Draw what's on screen and stuff
        for(let i = 0; i < this.objects.length; i++)
        {
            this.objects[i].draw(gl);
        }
    }

    changeMode(mode)
    {
        switch(mode)
        {
            case "3D": // Soal 3 + 4

            case "Demo": // Soal 1
                
                break;
            case "2D": // Soal 2
                break;
        }
    }
}