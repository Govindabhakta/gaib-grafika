const vertexShaderText_3d = 
`
precision mediump float;

attribute vec3 vertPosition;

uniform mat4 projection;
uniform mat4 worldMatrix;

uniform bool useColor;
uniform vec3 colorV;
varying vec3 color;

void main()
{
    if (useColor)
    {
        color = colorV;
    } else {
        color = vertPosition;
    }
    gl_Position = projection * worldMatrix * vec4(vertPosition, 1.0);
}
`

const fragmentShaderText_3d = 
`
uniform bool useColor;
precision mediump float;

varying vec3 color;

void main()
{
    gl_FragColor = vec4(color ,1.0);
}
`