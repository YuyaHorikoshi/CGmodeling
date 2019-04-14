///<reference path="./node_modules/@types/three/index.d.ts"/>
///<reference path="./node_modules/@types/dat-gui/index.d.ts"/>
///<reference path="./node_modules/@types/physijs/index.d.ts"/>
class ThreeJSTest {
    constructor() {
        this.screenWidth = 640;
        this.screenHeight = 480;
        this.createRenderer();
        this.createScene();
    }
    createRenderer() {
        // dat.GUI
        var gui = new dat.GUI({ autoPlace: false, width: 256 });
        var guielement = document.createElement("div");
        guielement.id = "dat-gui";
        guielement.appendChild(gui.domElement);
        document.getElementById("viewport").appendChild(guielement);
        this.controls = new GuiControl();
        //        var gui = new dat.GUI();
        gui.add(this.controls, 'rotationSpeed', 0, 0.5);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.setClearColor(new THREE.Color(0x000000));
        document.getElementById("viewport").appendChild(this.renderer.domElement);
        Physijs.scripts.worker = './physijs/physijs_worker.js';
        Physijs.scripts.ammo = './examples/js/ammo.js';
    }
    createScene() {
        //this.scene = new THREE.Scene();
        this.scene = new Physijs.Scene();
        var frict = 0.9;
        var rest = 0.6;
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: 0x55ff00, opacity: 0.5, transparent: true }), frict, rest);
        this.cube = new Physijs.BoxMesh(this.geometry, this.material);
        this.scene.add(this.cube);
        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /
            this.screenHeight, 0.1, 1000);
        this.camera.position.x = 3;
        this.camera.position.y = 3;
        this.camera.position.z = 3;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        this.scene.setGravity(new THREE.Vector3(0, -10, 0));
        var frict = 0; // 摩擦係数
        var rest = 0.6; // 反発係数
        var gmaterial = Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: 0x55ff00, opacity: 0.5, transparent: true }), frict, rest);
        var ggeom = new THREE.BoxGeometry(30, 3, 5);
        var ground = new Physijs.BoxMesh(ggeom, gmaterial, 0);
        ground.rotation.y = Math.PI / 2;
        ground.rotation.x = -Math.PI * 10 / 180;
        ground.position.y = -10;
        this.scene.add(ground);
    }
    render() {
        //        this.cube.rotation.x += 0.02;
        //        this.cube.rotation.y += 0.02;
        this.cube.rotation.x += this.controls.rotationSpeed;
        this.cube.rotation.y += this.controls.rotationSpeed;
        this.orbitControl.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
        this.scene.simulate();
    }
}
class GuiControl {
    constructor() {
        this.rotationSpeed = 0.00;
    }
}
window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};
//# sourceMappingURL=app.js.map