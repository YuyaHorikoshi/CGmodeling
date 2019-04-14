///<reference path="./node_modules/@types/three/index.d.ts"/>
///<reference path="./node_modules/@types/dat-gui/index.d.ts"/>
class ThreeJSTest {
    constructor() {
        this.screenWidth = 640;
        this.screenHeight = 480;
        this.createRenderer();
        this.createScene();
    }
    createRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.setClearColor(new THREE.Color(0x495ed));
        document.getElementById("viewport").appendChild(this.renderer.domElement);
        // dat.GUI
        var gui = new dat.GUI({ autoPlace: false, width: 256 });
        document.getElementById("dat-gui").appendChild(gui.domElement);
        this.controls1 = new GuiControl();
        this.controls2 = new GuiControl();
        gui.add(this.controls1, 'rotationSpeed', 0, 0.5);
        gui.add(this.controls2, 'rotationSpeed', 0, 0.5);
    }
    createScene() {
        this.scene = new THREE.Scene();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        //this.scene.add(this.cube);
        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /
            this.screenHeight, 0.1, 1000);
        this.camera.position.x = 3;
        this.camera.position.y = 3;
        this.camera.position.z = 3;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        this.orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        var paramGeometryM = new THREE.ParametricGeometry(this.myMevius, 100, 100);
        //メビウスの輪は、縮小しているためワイヤフレームのせいで白くみえてますが、拡大するとしっかり色がついてます。
        var paramGeometryK = new THREE.ParametricGeometry(this.myKlein, 100, 100);
        var paramMaterial1 = new THREE.MeshBasicMaterial();
        paramMaterial1.wireframe = true;
        var paramMaterial2 = new THREE.MeshNormalMaterial();
        paramMaterial2.side = THREE.DoubleSide;
        this.paramMeshM = THREE.SceneUtils.createMultiMaterialObject(paramGeometryM, [paramMaterial1, paramMaterial2]);
        this.paramMeshK = THREE.SceneUtils.createMultiMaterialObject(paramGeometryK, [paramMaterial1, paramMaterial2]);
        this.scene.add(this.paramMeshM);
        this.scene.add(this.paramMeshK);
    }
    render() {
        this.paramMeshK.position.z = -5;
        this.paramMeshM.rotation.x += this.controls1.rotationSpeed;
        this.paramMeshM.rotation.y += this.controls1.rotationSpeed;
        this.paramMeshK.rotation.x += this.controls2.rotationSpeed;
        this.paramMeshK.rotation.y += this.controls2.rotationSpeed;
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
        // this.orbitControl.update(); // ここが追記！
        // this.renderer.render(this.scene, this.camera);
        // // requestAnimationFrame(this.render.bind(this));
    }
    myMevius(u, v, optTarget = new THREE.Vector3()) {
        var x = Math.cos(2 * Math.PI * v) * (3 + (-0.5 + u) * Math.cos(2 * v * Math.PI / 2));
        var y = Math.sin(2 * Math.PI * v) * (3 + (-0.5 + u) * Math.cos(2 * v * Math.PI / 2));
        var z = (-0.5 + u) * Math.sin(2 * v * Math.PI / 2);
        return optTarget.set(0.5 * x, 0.5 * y, 0.5 * z);
    }
    myKlein(u, v, optTarget = new THREE.Vector3()) {
        var r = 4 * (1 - (Math.cos(2 * u * Math.PI)) / 2);
        var x, y, z;
        if (0 <= 2 * u * Math.PI && 2 * u * Math.PI < Math.PI) {
            x = 6 * Math.cos(2 * u * Math.PI) * (1 + Math.sin(2 * u * Math.PI)) + r * Math.cos(2 * u * Math.PI) * Math.cos(2 * v * Math.PI);
        }
        if (Math.PI <= 2 * u * Math.PI && 2 * u * Math.PI <= 2 * Math.PI) {
            x = 6 * Math.cos(2 * u * Math.PI) * (1 + Math.sin(2 * u * Math.PI)) + r * Math.cos(2 * v * Math.PI + Math.PI);
        }
        if (0 <= 2 * u * Math.PI && 2 * u * Math.PI < Math.PI) {
            y = 16 * Math.sin(2 * u * Math.PI) + r * Math.sin(2 * u * Math.PI) * Math.cos(2 * v * Math.PI);
        }
        if (Math.PI <= 2 * u * Math.PI && 2 * u * Math.PI <= 2 * Math.PI) {
            y = 16 * Math.sin(2 * u * Math.PI);
        }
        z = r * Math.sin(2 * v * Math.PI);
        return optTarget.set(0.1 * x, 0.1 * y, 0.1 * z);
    }
}
class GuiControl {
    constructor() {
        this.rotationSpeed = 0.01;
    }
}
window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};
//# sourceMappingURL=app.js.map