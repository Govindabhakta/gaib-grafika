function identity()
{
    let input =
    [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];

    return input;
}

function translationMatrix(t) {
    // prettier-ignore
    result = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      t[0], t[1], t[2], 1
    ];
  
    return result;
  }

function multiply(result, a, b)
{
    let 
    a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    let 
    a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7];
    let 
    a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11];
    let 
    a30 = a[12],
    a31 = a[13],
    a32 = a[14],
    a33 = a[15];

    let 
    b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b3 = b[3];

    result[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    result[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    result[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    result[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    result[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    result[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    result[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    result[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    result[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    result[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    result[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    result[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    result[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    result[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    result[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    result[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return result;
}

function multiplyScalar(result, input, s)
{
    result =
    [
        input[0]  * s, input[1]  * s, input[2]  * s, input[3]  * s,
        input[4]  * s, input[5]  * s, input[6]  * s, input[7]  * s,
        input[8]  * s, input[9]  * s, input[10] * s, input[11] * s,
        input[12],     input[13],     input[14],     input[15]
    ]

    return result;
}

function translationMatrix(t)
{
    result =
    [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        t[0] , t[1], t[2], 1
    ]

    return result;
}

function addVectors(a, b)
{
    let res = [
        a[0] + b[0],
        a[1] + b[1],
        a[2] + b[2]
    ]

    return res;
}

function scale(input, scale)
{
    let x = scale[0];
    let y = scale[1];
    let z = scale[2];

    result =
    [
        input[0]  * x, input[1]  * x, input[2]  * x, input[3]  * x,
        input[4]  * y, input[5]  * y, input[6]  * y, input[7]  * y,
        input[8]  * z, input[9]  * z, input[10] * z, input[11] * z,
        input[12] ,    input[13],     input[14],     input[15]
    ]

    return result;
}

function rotate(input, radians, axis)
{
    let result = new Float32Array(16);

    let 
        x = axis[0],
        y = axis[1],
        z = axis[2];

    let len = Math.hypot(x, y, z);
    let s, c, t;
    let a00, a01, a02, a03;
    let a10, a11, a12, a13;
    let a20, a21, a22, a23;
    let b00, b01, b02;
    let b10, b11, b12;
    let b20, b21, b22;

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(radians);
    c = Math.cos(radians);
    t = 1 - c;

    a00 = input[0];
    a01 = input[1];
    a02 = input[2];
    a03 = input[3];
    a10 = input[4];
    a11 = input[5];
    a12 = input[6];
    a13 = input[7];
    a20 = input[8];
    a21 = input[9];
    a22 = input[10];
    a23 = input[11];

    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c;

    result[0] = a00 * b00 + a10 * b01 + a20 * b02;
    result[1] = a01 * b00 + a11 * b01 + a21 * b02;
    result[2] = a02 * b00 + a12 * b01 + a22 * b02;
    result[3] = a03 * b00 + a13 * b01 + a23 * b02;
    result[4] = a00 * b10 + a10 * b11 + a20 * b12;
    result[5] = a01 * b10 + a11 * b11 + a21 * b12;
    result[6] = a02 * b10 + a12 * b11 + a22 * b12;
    result[7] = a03 * b10 + a13 * b11 + a23 * b12;
    result[8] = a00 * b20 + a10 * b21 + a20 * b22;
    result[9] = a01 * b20 + a11 * b21 + a21 * b22;
    result[10] = a02 * b20 + a12 * b21 + a22 * b22;
    result[11] = a03 * b20 + a13 * b21 + a23 * b22;
    result[12] = input[12];
    result[13] = input[13];
    result[14] = input[14];
    result[15] = input[15];
    return result;
}

function perspective(fovy, aspect, near, far) 
{
    const f = 1.0 / Math.tan(fovy / 2);

    let result = new Float32Array(16);
    result[0] = f / aspect;
    result[1] = 0;
    result[2] = 0;
    result[3] = 0;
    result[4] = 0;
    result[5] = f;
    result[6] = 0;
    result[7] = 0;
    result[8] = 0;
    result[9] = 0;
    result[11] = -1;
    result[12] = 0;
    result[13] = 0;
    result[15] = 0;
    if (far != null && far !== Infinity) {
      const nf = 1 / (near - far);
      result[10] = (far + near) * nf;
      result[14] = 2 * far * near * nf;
    } else {
      result[10] = -1;
      result[14] = -2 * near;
    }
    return result;
}

function lookAt(eye, center, up)
{
    let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
    let eyex = eye[0];
    let eyey = eye[1];
    let eyez = eye[2];
    let upx = up[0];
    let upy = up[1];
    let upz = up[2];
    let centerx = center[0];
    let centery = center[1];
    let centerz = center[2];

    if (
        Math.abs(eyex - centerx) < 0.000001 &&
        Math.abs(eyey - centery) < 0.000001 &&
        Math.abs(eyez - centerz) < 0.000001
    ) {
        return identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.hypot(z0, z1, z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.hypot(x0, x1, x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.hypot(y0, y1, y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    let result = new Float32Array(16);
    result[0] = x0;
    result[1] = y0;
    result[2] = z0;
    result[3] = 0;
    result[4] = x1;
    result[5] = y1;
    result[6] = z1;
    result[7] = 0;
    result[8] = x2;
    result[9] = y2;
    result[10] = z2;
    result[11] = 0;
    result[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    result[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    result[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    result[15] = 1;

    return result;
}

function toRadian(degree)
{
    return degree * Math.PI / 180;
}
