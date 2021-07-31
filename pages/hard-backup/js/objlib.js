class JSOBglObject extends glObject {
    constructor(json)
    {
        super();

        this.rotation = [0, 0, 0];
        this.translate = [0, 0, 0];

        this.vertices = json.meshes[0].vertices;
        this.indices = [].concat.apply([], json.meshes[0].faces);
        this.texCoord = json.meshes[0].texturecoords[0];
    }
}