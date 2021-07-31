class GLObjectArticulated extends GLObject
{
    constructor(program, vbo, ibo, tbo, gl)
    {
        super(program, positions, indices, vbo, ibo, gl);
        let positions = geodude.meshes[0].vertices;
        let indices = [].concat.apply([], geodude.meshes[0].faces);

        this.texCoord = geodude.meshes[0].texturecoords[0];
        this.children = [];

        this.tbo = tbo;
    }

    setMesh(mesh, pivot, pivotPoint)
    {
        this.pivot = pivot;
        this.pivotPoint = pivotPoint;
        this.rotation = {x: 0, y:0, z:0};
        this.translate = {x: 0, y:0, z:0};

        this.vertices = mesh.vertices;
        this.indices = [].concat.apply([], mesh.faces);
        this.texCoord = mesh.texturecoords[0];
    }

    setTexture()
    {
        this.texture = texture;
    }

    getTexture()
    {
        return this.texture;
    }

    loadChildren() {
        let leftArm = new GLObjectArticulated(this.program, vbo, ibo, gl);
        leftArm.setMesh(geodude.meshes[1], [0, 1, 0], [0, 1, 0]);
        leftArm.setTexture(this.texture);
    
        let leftHand =  new GLObjectArticulated(this.program, vbo, ibo, gl);
        leftHand.setMesh(geodude.meshes[2], [0, 3, 0], [0, 1, 0]);
        leftHand.setTexture(this.texture);
    
        let rightArm =  new GLObjectArticulated(this.program, vbo, ibo, gl);
        rightArm.setMesh(geodude.meshes[3], [0, -1, 0], [0, -1, 0]);
        rightArm.setTexture(this.texture);
    
        let rightHand =  new GLObjectArticulated(this.program, vbo, ibo, gl);
        rightHand.setMesh(geodude.meshes[4], [0, -3, 0], [0, -1, 0]);
        rightHand.setTexture(this.texture);
    
        // leftArm.addChild(leftHand);
        // rightArm.addChild(rightHand);

        // LCRS SYSTEM SMH
        leftArm.addChild(leftHand);
        leftArm.addChild(rightArm);
        rightArm.addChild(rightHand);
    
        this.addChild(leftArm);
        this.addChild(rightArm);
    }

    addChild(child) // FIRST ADD CHILD CALL IS KID, SECOND IS BROTHER
    {  
        this.children.push(child);
    }

    createTextureObject(gl, image)
    {
        let texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.bindTexture(gl.TEXTURE_2D, null);

        this.texture = texture;
    }

    draw(gl)
    {
        // base matrices
        this.program.setUniform("worldMatrix", this.getWorldMatrix());
        this.program.setUniform("ParentTranslate", identity());
        this.program.setUniform("ParentRotate", identity()); // Parent is itself compared to parent lel

        // translation of object relative to pivot point
        this.program.setUniform("PivotTranslate", this.getPivotPointTranslate([0, 0, 0]));
        this.program.setUniform("rPivotTranslate", this.getRPivotPointTranslate([0, 0, 0]));

        // the actual pivot point
        this.program.setUniform("PivotPointTranslate", this.getPivotPointTranslate(this.pivotPoint));
        this.program.setUniform("rPivotPointTranslate", this.getRPivotPointTranslate(this.pivotPoint));

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.tbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texCoord), gl.STATIC_DRAW);

        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.activeTexture(gl.TEXTURE0);

        gl.drawElements(this.renderType, this.vertexCount, gl.UNSIGNED_SHORT, 0);

        if (this.children[0] != null) // DAD HAS NO SIBLINGS BOO HOO
        {
            this.children[0].renderChild(gl, this.translate, this.rotation, this.pivot);
        }
    }

    renderChild(gl, pTranslate, pRotation, pPivot)
    {
        // base matrices
        this.program.setUniform("worldMatrix", this.getWorldMatrix());
        this.program.setUniform("ParentTranslate", translationMatrix(pTranslate));

        // Calculate new rotation
        let rot = new Float32Array(16);
        rot = identity();

        rot = rotate(rot, pRotation.x, [1, 0, 0]);
        rot = rotate(rot, pRotation.y, [0, 1, 0]);
        rot = rotate(rot, pRotation.z, [0, 0, 1]);

        this.program.setUniform("ParentRotate", rot); 

        // translation of object relative to pivot point
        this.program.setUniform("PivotTranslate", this.getPivotPointTranslate(pPivot));
        this.program.setUniform("rPivotTranslate", this.getRPivotPointTranslate(pPivot));

        // the actual pivot point
        this.program.setUniform("PivotPointTranslate", this.getPivotPointTranslate(this.pivotPoint));
        this.program.setUniform("rPivotPointTranslate", this.getRPivotPointTranslate(this.pivotPoint));

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.tbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texCoord), gl.STATIC_DRAW);

        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.activeTexture(gl.TEXTURE0);

        gl.drawElements(this.renderType, this.vertexCount, gl.UNSIGNED_SHORT, 0);

        // Render sibling
        if (this.children[1] != null)
        {
            this.children[1].renderChild(gl, pTranslate, pRotation, pPivot);
        }

        // Render child
        if (this.children[0] != null)
        {
            let newPTranslate = addVectors(this.translate, pTranslate);
            let newPRotate = addVectors(this.rotation, pRotation);
            this.children[0].renderChild(gl, newPTranslate, newPRotate, this.pivot);
        }
    }

    // PIVOT POINT TRANSLATION CALCULATIONS
    getPivotTranslation(parentPivot)
    {
        let rp = [parentPivot[0]+this.pivot[0], parentPivot[0]+this.pivot[1], parentPivot[0]+this.pivot[2]];
        let rpvt = translationMatrix(rp);
        return rpvt;
    }
    
    getRPivotTranslate(parentPivot)
    {
        let rp = [parentPivot[0]-this.pivot[0], parentPivot[0]-this.pivot[1], parentPivot[0]-this.pivot[2]];
        let rpvt = translationMatrix(rp);
        return rpvt;
    }

    getPivotPointTranslate()
    {
        let rp = [this.pivotPoint[0], this.pivotPoint[1], this.pivotPoint[2]];
        let rpvt = translationMatrix(rp);
        return rpvt;
    }

    getRPivotPointTranslate()
    {
        let rp = [-this.pivotPoint[0], -this.pivotPoint[1], -this.pivotPoint[2]];
        let rpvt = translationMatrix(rp);
        return rpvt;
    }
}