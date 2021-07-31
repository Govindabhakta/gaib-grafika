const vertexShaderText_3d_withTexture = 
`
precision mediump float;

attribute vec3 vertPosition;

uniform mat4 projection;
uniform mat4 worldMatrix;

void main()
{
    gl_Position = vec4(vertPosition, 1.0);
}
`

const fragmentShaderText_3d_withTexture = 
`
precision mediump float;

void main()
{
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

const vertexShaderText_wT = 
`
precision mediump float;

attribute vec3 vertPosition;
attribute vec2 vertTexCoordinate;

varying vec2 fragTexCoordinate;

uniform mat4 rPivotTranslate;
uniform mat4 PivotTranslate;

uniform mat4 rPivotPointTranslate;
uniform mat4 PivotPointTranslate;

uniform mat4 ParentRotate;
uniform mat4 ParentTranslate;

uniform mat4 worldMatrix;
uniform mat4 View;
uniform mat4 projection;


void main()
{
    mat4 modelView = PivotPointTranslate * ParentTranslate * ParentRotate * rPivotPointTranslate *  PivotTranslate * worldMatrix * rPivotTranslate;
    fragTexCoordinate = vertTexCoordinate;
    gl_Position = projection * modelView * vec4(vertPosition, 1.0);
}
`;

const fragmentShaderText_wT = 
`
    precision mediump float;

    varying vec2 fragTexCoordinate;
    uniform sampler2D sampler;

    void main()
    {
        gl_FragColor = texture2D(sampler, fragTexCoordinate);
    }
`;