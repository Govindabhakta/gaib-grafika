class Editor
{
    constructor(program, gl, vbo, ibo, canvas)
    {
        this.canvas = canvas;
        this.program = program;
        this.vbo = vbo;
        this.ibo = ibo;

        console.log(canvas);

        this.pos1 = null;
        this.pos2 = null;

        this.type = "pen";
        this.red = null;

        // document.getElementById("canvas").onmouseout = function() {
        //     this.pos1 = null;
        //     this.pos2 = null;
        //     this.object = null;
        // }

        this.gl = gl;

        this.setup_medium();
    }

    setType(type)
    {
        this.type = type;

    }

    makeSquare(pos1, pos2)
    {
        let data = generateSquare(pos1, pos2);
        let newObj = new GLObject(this.program, data.vertexes, data.indices, this.vbo, this.ibo);
        return newObj;
    }

    makeLine(pos1, pos2)
    {
        vertexes = [
            pos1.x, pos1.y, 0.0,
            pos2.x, pos2.y, 0.0
        ]

        indices = [
            0, 1
        ]

        let newObj = new GLObject(this.program, vertexes, indices, this.vbo, this.ibo);
        return newObj;
    }

    makeRectangle(pos1, pos2)
    {
        let data = generateRect(pos1, pos2);
        let newObj = new GLObject(this.program, data.vertexes, data.indices, this.vbo, this.ibo);
        // console.log("something is wrong");
        return newObj;
    }

    track()
    {
        this.canvas.onmousedown = function(e)
        {
            this.type = "pen";
            if (this.type != null)
            {
                // console.log(e);
                this.pos1 = getMouseCoordinates(e, document.getElementById("canvas"), this.gl);
                console.log("POS! IS ASSIGNED", this.pos1);
                // console.log(this.pos1, "THIS IS POS 1");
                // if (this.type == "pen")
                // {
                //     this.canvas.onmousemove = function ()
                //     {
                //         this.object = new GLObject(this.program, basic_square.vertexes, basic_square.indices, this.vbo, this.ibo);
                //         this.object.scale = {x: 0.1, y: 0.1, z: 1}
                //         this.object.translate = { x: e.x, y: e.y, z: 1.0}
                //         this.pos1 = null;
                //     }
                // }
            }
            console.log(this.type);
        }

        this.canvas.onmouseup = function(e)
        {
            if (this.type != null)
            {
                this.pos2 = getMouseCoordinates(e, this.canvas, this.gl);
                console.log("POS 2 IS ASSIGNED", this.pos2);
                
            }
        }

        
    }

    getObject()
    {
        console.log(this.pos1, this.pos2);
        if (this.pos1 != null & this.pos2 != null)
        {
            // console.log("HELLO", this.pos1, this.pos2);
            console.log("THIS IS BEFORE", this.pos1, this.pos2);
                // switch(this.type)
                // {
                //     case "pen":
                //         this.object = null;
                //         break;
                //     case "square":
                //         this.object = this.makeSquare(this.pos1, this.pos2);
  
                //         break;
                //     case "line":
                //         this.object = this.makeLine(this.pos1, this.pos2);
   
                //         break;       
                //     case "rect":
                //         this.object = this.makeRectangle(this.pos1, this.pos2);
                //         break;
                // }
                // makeRectangle(this.pos1, this.pos2);
                // this.pos1 = null;
                // this.pos2 = null;
                console.log("THIS IS AFTER", this.pos1, this.pos2);
        }

        console.log(this.type);
        console.log(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);
        if (this.object != null)
        {
            console.log("HAHA", this.pos1, this.pos2, this.object);
            let temp = this.object;
            this.object = null;
            this.track();
            return temp;
        }
    }

    setup_medium()
    {
        this.setup_button_controls("type-pen");
        this.setup_button_controls("type-line");
        this.setup_button_controls("type-square");
        this.setup_button_controls("type-rect");
    }

    setup_button_controls(buttonID)
    {
        let button = document.getElementById(buttonID);
        button.onclick = () => {
            switch(buttonID)
            {
                case 'type-pen':
                    this.setType("pen");
                    // console.log("PENN");
                    break;
                case 'type-line':
                    this.setType("line");
                    // console.log("LINE");
                    break;
                case 'type-square':
                    this.setType("square");
                    // console.log("SQUARE");
                    break;
                case 'type-rect':
                    this.setType("rect");
                    // console.log("RECT");
                    break;
            }
        }
    }
}

const getMouseCoordinates = (e, canvas, gl) => 
{
    // console.log(e.target);
    var bound = e.target.getBoundingClientRect();

    console.log(e.clientX, bound.left);
    let x = (e.clientX - bound.left) / 800 * 2 - 1;
    let y = (e.clientY - bound.top) / 600 * -2 + 1;

    console.log("RESULTS", x, y);

    return { x: x, y: y }
}

function getPosDelta(pos1, pos2)
{
    const delta = {
        x: pos2.x - pos1.x,
        y: pos2.y - pos1.y
    }

    return delta;
}
