///<reference path="./node_modules/@types/three/index.d.ts"/>
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
        this.renderer.shadowMap.enabled = true;
        document.body.appendChild(this.renderer.domElement);
    }
    createScene() {
        //シーンの作成
        this.scene = new THREE.Scene();
        //カメラの作成
        this.camera = new THREE.PerspectiveCamera(45, this.screenWidth / this.screenHeight, 0.1, 1000);
        this.camera.position.x = -30;
        this.camera.position.y = 50;
        this.camera.position.z = 30;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        //ライトの作成
        this.light = new THREE.SpotLight(0xffffff);
        this.light.position.set(-20, 30, -5);
        this.light.castShadow = true;
        // 正八面体の作成
        var octaGeometry = new THREE.OctahedronGeometry(8, 0);
        var octaMaterial1 = new THREE.MeshBasicMaterial();
        var octaMaterial2 = new THREE.MeshNormalMaterial();
        octaMaterial1.wireframe = true;
        this.octa = THREE.SceneUtils.createMultiMaterialObject(octaGeometry, [octaMaterial1, octaMaterial2]);
        var points = [];
        var count = 20;
        var height = 1;
        var width = 20;
        for (var i = 0; i < count; i++) {
            points.push(new THREE.Vector2(Math.exp(0.1 * i) * height + height / 2, (i / count - 1 / 2) * width));
        }
        var latheGeometry = new THREE.LatheGeometry(points);
        var latheMaterial1 = new THREE.MeshBasicMaterial();
        var latheMaterial2 = new THREE.MeshNormalMaterial();
        latheMaterial1.wireframe = true;
        latheMaterial2.side = THREE.DoubleSide;
        this.lathe = THREE.SceneUtils.createMultiMaterialObject(latheGeometry, [latheMaterial1, latheMaterial2]);
        this.lathe.position.x = 20;
        var tetraGeometry = new THREE.TetrahedronGeometry(8, 0);
        var tetraMaterial1 = new THREE.MeshBasicMaterial();
        var tetraMaterial2 = new THREE.MeshNormalMaterial();
        tetraMaterial1.wireframe = true;
        this.tetra = THREE.SceneUtils.createMultiMaterialObject(tetraGeometry, [tetraMaterial1, tetraMaterial2]);
        this.tetra.position.x = -20;
        var icosaGeometry = new THREE.IcosahedronGeometry(8, 0);
        var icosaMaterial1 = new THREE.MeshBasicMaterial();
        var icosaMaterial2 = new THREE.MeshNormalMaterial();
        icosaMaterial1.wireframe = true;
        this.icosa = THREE.SceneUtils.createMultiMaterialObject(icosaGeometry, [icosaMaterial1, icosaMaterial2]);
        this.icosa.position.x = 40;
        // 平面の作成
        var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
        // Materialの設定をここに記述
        var planeMaterial = new THREE.MeshBasicMaterial({ color: 0x000fff });
        this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
        this.plane.rotation.x = -Math.PI / 2;
        this.plane.position.y = -10;
        this.plane.receiveShadow = true; //影の追加
        //シーンへの追加
        this.scene.add(this.camera);
        this.scene.add(this.light);
        this.scene.add(this.plane);
        this.scene.add(this.octa);
        this.scene.add(this.lathe);
        this.scene.add(this.tetra);
        this.scene.add(this.icosa);
    }
    render() {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
        this.octa.rotation.x += 0.01;
        this.octa.rotation.y += 0.01;
        this.lathe.rotation.x += 0.01;
        this.lathe.rotation.y += 0.01;
        this.tetra.rotation.x += 0.01;
        this.tetra.rotation.y += 0.01;
        this.icosa.rotation.x += 0.01;
        this.icosa.rotation.y += 0.01;
    }
}
window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};
//# sourceMappingURL=app.js.map