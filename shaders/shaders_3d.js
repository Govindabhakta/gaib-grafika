const vertexShaderText_3d = 
`
precision mediump float;

attribute vec3 vertPosition;

void main()
{
    gl_Position = vec4(vertPosition, 1.0);
}
`

const fragmentShaderText_3d = 
`
precision mediump float;

void main()
{
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`