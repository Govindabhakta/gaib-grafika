const vertexShaderText = 
`
precision mediump float;

attribute vec3 vertPosition;
attribute vec2 vertTexCoordinate;

varying vec2 fragTexCoordinate;

uniform mat4 WorldTranslate;
uniform mat4 WorldRotate;
uniform mat4 View;
uniform mat4 Projection;

void main()
{
    fragTexCoordinate = vertTexCoordinate;
    gl_Position = Projection * View * WorldTranslate * WorldRotate * vec4(vertPosition, 1.0);
}
`;

const fragmentShaderText = 
`
    precision mediump float;

    varying vec2 fragTexCoordinate;
    uniform sampler2D sampler;

    void main()
    {
        gl_FragColor = texture2D(sampler, fragTexCoordinate);
    }
`;