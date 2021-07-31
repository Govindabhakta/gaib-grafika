/**
 * EASY / HARD SCENE CONTROLS
 * 
 */

function easyhard(program, vbo, ibo, gl)
{
    let square = new GLObject(program, cube.vertexes, cube.indices, vbo, ibo, gl);
    square.translate = {x: 1, y: 0, z: -5}


    let hollow_data = reorder_obj_data(hollow_square.vertexes, hollow_square.indices);
    let hollow = new GLObject(program, hollow_data.positions, hollow_data.indexes, vbo, ibo, gl);
    hollow.translate = {x: -1, y: 0, z: -5}
    hollow.useColor = true;
    hollow.colorV = [1.0, 0.0, 0.0];

    return [square, hollow];
}

function easy_controls(obj)
{
    setup_slider_controls(obj, "translateX", "tx");
    setup_slider_controls(obj, "translateY", "ty");
    setup_slider_controls(obj, "translateZ", "tz");

    setup_slider_controls(obj, "rotateX", "rx");
    setup_slider_controls(obj, "rotateY", "ry");
    setup_slider_controls(obj, "rotateZ", "rz");

    setup_slider_controls(obj, "colorX", "cx");
    setup_slider_controls(obj, "colorY", "cy");
    setup_slider_controls(obj, "colorZ", "cz");
}

function reorder_obj_data(vertexes, indices)
{
    console.log("DATA:" , vertexes, indices)
    let positions = vertexes;
    let indexes = [];
    for (let i = 0; i < indices.length; i++) { 
        indexes.push(indices[i] - 1);
    }
    // let colors = i_colors;
    // let normals = i_normals;
    // let normal_indexes = normal_indices;

    return { positions, indexes }
}

function setup_slider_controls(obj, sliderID, axis)
{
    let slider = document.getElementById(sliderID);
    slider.oninput = (e) => {
        switch(axis)
        {
            case 'rx':
                obj.rotation.x = e.target.value;
                break;
            case 'ry':
                obj.rotation.y = e.target.value;
                break;
            case 'rz':
                obj.rotation.z = e.target.value;
                break;
            case 'tx':
                obj.translate.x = e.target.value / 10;
                break;
            case 'ty':
                obj.translate.y = e.target.value / 10;
                break;
            case 'tz':
                obj.translate.z = e.target.value / 10;
                break;
            case 'cx':
                obj.colorV[0] = e.target.value / 255;
                break;
            case 'cy':
                obj.colorV[1] = e.target.value / 255;
                break;
            case 'cz':
                obj.colorV[2] = e.target.value / 255;
                break;
        }
    }
}
// function obj_reader(obj) // OBJ is read as string // not used since JSON converted OBJ is availabe.
// { // probably doesn't work?
//     let lines = obj.split("\n");
    
//     console.log(lines);

//     let vertexes = [];
//     let faces = [];
//     let tCoords = [];
//     let vNormals = [];


//     let indices = [];
//     let texCoords = [];
//     let normals = [];

//     lines.forEach(element => {
//         let values = element.split(" ");
//         switch(values[0])
//         {
//             case "v":
//                 vertexes.push(parseInt(values[1]));
//                 vertexes.push(parseInt(values[2]));
//                 vertexes.push(parseInt(values[3]));
//                 break;
//             case "vt":
//                 tCoords.push(parseInt(values[1]));
//                 tCoords.push(parseInt(values[2]));
//             case "vn": // probably not used? spec doesn't specify lighting. Will add if time allows huhi.
//                 vNormals.push(parseInt(values[1]));
//                 vNormals.push(parseInt(values[2]));
//                 vNormals.push(parseInt(values[3]));
//                 break;
//             case "f":
//                 faces.push(values[1]);
//                 faces.push(values[2]);
//                 faces.push(values[3]);
//                 break;
//             default:
//                 break;
//         }   
//     });

//     faces.forEach(element => {
//         let values = element.split("/");
        
//         indices.push(values[0]);
//         texCoords.push(values[1]);
//         normals.push(values[2]);
//     });

//     console.log(vertexes, indices);

//     let final_vertexes = [];
//     let final_normals;

//     for(let i = 0; i < indices.length; i++)
//     {
//         final_vertexes.push(vertexes[(indices[i]-1) * 3 + 0]);
//         final_vertexes.push(vertexes[(indices[i]-1) * 3 + 1]);s
//         final_vertexes.push(vertexes[(indices[i]-1) * 3 + 2]);
//     }


//     return { final_vertexes, indices, texCoords, vNormals };
// }

// function setup_medium(editor)
// {
//     setup_button_controls("type-pen", editor);
//     setup_button_controls("type-line", editor);
//     setup_button_controls("type-square", editor);
//     setup_button_controls("type-rect", editor);
// }

// function setup_button_controls(buttonID, editor)
// {
//     let button = document.getElementById(buttonID);
//     button.onclick = () => {
//         switch(buttonID)
//         {
//             case 'type-pen':
//                 editor.setType("pen");
//                 console.log("PENN");
//                 break;
//             case 'type-line':
//                 editor.setType("line");
//                 console.log("LINE");
//                 break;
//             case 'type-square':
//                 editor.setType("square");
//                 console.log("SQUARE");
//                 break;
//             case 'type-rect':
//                 editor.setType("rect");
//                 console.log("RECT");
//                 break;
//         }
//     }
// }