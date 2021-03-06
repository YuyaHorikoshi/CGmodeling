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
        this.renderer.setClearColor(new THREE.Color(0x495ed));
        document.getElementById("viewport").appendChild(this.renderer.domElement);
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
        this.orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        this.createParticles();
    }
    render() {
        //        this.cube.rotation.x += 0.02;
        //        this.cube.rotation.y += 0.02;
        //this.cube.rotation.x += this.controls.rotationSpeed;
        //this.cube.rotation.y += this.controls.rotationSpeed;
        this.cloud.rotation.x += this.controls.rotationSpeed;
        this.orbitControl.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
    createParticles() {
        //ジオメトリの作成
        var geom = new THREE.Geometry();
        //マテリアルの作成
        var material = new THREE.PointsMaterial({ size: 4, vertexColors: THREE.VertexColors });
        //particleの作成
        for (var x = 0; x < 10; x++) {
            for (var y = 0; y < 10; y++) {
                var particle = new THREE.Vector3(x * 10, y * 10, 0);
                geom.vertices.push(particle);
                geom.colors.push(new THREE.Color(Math.random() * 0x00ffff)); //色を設定
            }
        }
        //THREE.Pointsの作成
        this.cloud = new THREE.Points(geom, material);
        //シーンへの追加
        this.scene.add(this.cloud);
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