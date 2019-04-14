///<reference path="./node_modules/@types/three/index.d.ts"/>
///<reference path="./node_modules/@types/dat-gui/index.d.ts"/>
///<reference path="./node_modules/@types/stats.js/index.d.ts"/>
class ThreeJSTest {
    constructor() {
        this.screenWidth = 640;
        this.screenHeight = 480;
        this.opa = 1;
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
        gui.add(this.controls, 'transparent').onChange((e) => {
            this.material.transparent = e;
        });
        gui.add(this.controls, 'opacity', 0, 1).onChange((e) => {
            this.material.opacity = e;
        });
        gui.add(this.controls, 'particleNum', 0, 50000).onChange((e) => {
            this.controls.particleNum = e;
            if (this.controls.isMerge = true) {
                this.scene.remove(this.mergeMesh);
                this.scene.remove(this.group);
                this.merge0();
            }
            else if (this.controls.isMerge != true) {
                this.scene.remove(this.mergeMesh);
                this.scene.remove(this.group);
                this.group0();
            }
        });
        gui.add(this.controls, 'isMerge').onChange((e) => {
            this.controls.isMerge = e;
            if (this.controls.isMerge = true) {
                this.scene.remove(this.mergeMesh);
                this.scene.remove(this.group);
                this.merge0();
            }
            else if (this.controls.isMerge != true) {
                this.scene.remove(this.mergeMesh);
                this.scene.remove(this.group);
                this.group0();
            }
        });
        // stats
        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms
        // 位置決め
        this.stats.dom.style.position = 'absolute';
        this.stats.dom.style.left = '0px';
        this.stats.dom.style.top = '0px';
        //追加
        document.getElementById("viewport").appendChild(this.stats.dom);
    }
    createScene() {
        this.scene = new THREE.Scene();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        //this.scene.add(this.cube);
        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /
            this.screenHeight, 0.1, 1000);
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 50;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        //this.createParticles();
        this.merge0();
    }
    render() {
        //        this.cube.rotation.x += 0.02;
        //        this.cube.rotation.y += 0.02;
        //this.cube.rotation.x += this.controls.rotationSpeed;
        //this.cube.rotation.y += this.controls.rotationSpeed;
        //this.cloud.rotation.x += this.controls.rotationSpeed;
        this.orbitControl.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
        this.stats.update();
    }
    group0() {
        //ジオメトリの作成
        var geom = new THREE.BoxGeometry(1, 1, 1);
        //マテリアルの作成
        this.material = new THREE.MeshNormalMaterial();
        this.groupMesh = new THREE.Mesh(geom, this.material);
        this.group = new THREE.Group;
        //particleの作成
        for (var i = 0; i < this.controls.particleNum; i++) {
            this.groupMesh.position.x = 10 * Math.random();
            this.groupMesh.position.y = 10 * Math.random();
            this.groupMesh.position.z = 10 * Math.random();
            this.group.add(this.groupMesh);
        }
        //THREE.Pointsの作成
        //シーンへの追加
        this.scene.add(this.group);
    }
    merge0() {
        //ジオメトリの作成
        var geometry = new THREE.Geometry();
        var geom = new THREE.BoxGeometry(1, 1, 1);
        //マテリアルの作成
        this.material = new THREE.MeshNormalMaterial();
        var mesh = new THREE.Mesh(geom, this.material);
        //particleの作成
        for (var i = 0; i < this.controls.particleNum; i++) {
            mesh.position.x = 10 * Math.random();
            mesh.position.y = 10 * Math.random();
            mesh.position.z = 10 * Math.random();
            mesh.updateMatrix();
            //THREE.Pointsの作成
            //this.cloud = new THREE.Points(geom, this.pointMaterial);
            geometry.merge(mesh.geometry, mesh.matrix);
        }
        //シーンへの追加
        //this.scene.add(this.cloud);
        this.mergeMesh = new THREE.Mesh(geometry, this.material);
        this.scene.add(this.mergeMesh);
    }
}
class GuiControl {
    constructor() {
        this.rotationSpeed = 0.01;
        this.transparent = false;
        this.opacity = 1;
        this.particleNum = 1;
        this.isMerge = true;
    }
}
window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};
//# sourceMappingURL=app.js.map