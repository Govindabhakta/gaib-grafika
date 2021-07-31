function easyhard(program, vbo, ibo)
{
    let square = new GLObject(program, cube.vertexes, cube.indices, vbo, ibo);
    square.translate = {x: 10, y: 0, z: -200}

    let hollow_data = reorder_obj_data(hollow_square.vertexes, hollow_square.indices);
    let hollow = new GLObject(program, hollow_data.positions, hollow_data.indexes, vbo, ibo);
    hollow.translate = {x: 0, y: 0, z: -10}


    return [hollow];
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
//         final_vertexes.push(vertexes[(indices[i]-1) * 3 + 1]);
//         final_vertexes.push(vertexes[(indices[i]-1) * 3 + 2]);
//     }


//     return { final_vertexes, indices, texCoords, vNormals };
// }

