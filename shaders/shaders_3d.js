const vertexShaderText_3d = 
`
precision mediump float;

attribute vec3 vertPosition;

uniform mat4 projection;

void main()
{
    gl_Position = projection * vec4(vertPosition, 1.0);
}
`

const fragmentShaderText_3d = 
`
precision mediump float;

void main()
{
    gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
}
`