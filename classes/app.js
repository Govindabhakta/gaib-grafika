class App 
{
    constructor(gl, dsp) // dsp is temporary, later change it with an array of programs instead.
    {
        this.gl = gl;
        this.mode = "NONE";
        this.objects = [];

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

        let glob = new GLObject(gl, dsp, pos, indices);
        let glob2 = new GLObject(gl, dsp, pos2, indices);
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
}