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
        this.controls = new GuiControl();
        gui.add(this.controls, 'rotationSpeed', 0, 0.5);
    }
    createScene() {
        this.scene = new THREE.Scene();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.cube);
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
        var paramGeometry = new THREE.ParametricGeometry(this.myPlane, 120, 120);
        var paramMaterial1 = new THREE.MeshBasicMaterial();
        paramMaterial1.wireframe = true;
        var paramMaterial2 = new THREE.MeshNormalMaterial();
        paramMaterial2.side = THREE.DoubleSide;
        this.paramMesh = THREE.SceneUtils.createMultiMaterialObject(paramGeometry, [paramMaterial1, paramMaterial2]);
        this.scene.add(this.paramMesh);
    }
    render() {
        // this.cube.rotation.x += this.controls.rotationSpeed;
        // this.cube.rotation.y += this.controls.rotationSpeed;
        // this.renderer.render(this.scene, this.camera);
        // requestAnimationFrame(this.render.bind(this));
        this.orbitControl.update(); // ここが追記！
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
    myPlane(u, v, optTarget = new THREE.Vector3()) {
        var r = 50;
        var x = u * r - r / 2;
        var y = Math.sin(x / r * 8 * 2 * Math.PI);
        ;
        var z = v * r - r / 2;
        return optTarget.set(x, y, z);
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