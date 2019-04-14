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
        gui.add(this.controls, 'amount', 0, 10).onChange((e) => {
            this.controls.amount = e;
            this.scene.remove(this.shapeMesh);
            this.drawExtrude();
        });
        gui.add(this.controls, 'bevelThickness', 0, 10).onChange((e) => {
            this.controls.bevelThickness = e;
            this.scene.remove(this.shapeMesh);
            this.drawExtrude();
        });
        gui.add(this.controls, 'bevelSize', 0, 10).onChange((e) => {
            this.controls.bevelSize = e;
            this.scene.remove(this.shapeMesh);
            this.drawExtrude();
        });
        gui.add(this.controls, 'bevelSegment', 0, 10).onChange((e) => {
            this.controls.bevelSegment = e;
            this.scene.remove(this.shapeMesh);
            this.drawExtrude();
        });
    }
    drawExtrude() {
        //プロパティの設定
        var options = {
            amount: this.controls.amount,
            bevelThickness: this.controls.bevelThickness,
            bevelSize: this.controls.bevelSize,
            bevelSegments: this.controls.bevelSegment,
            bevelEnabled: true,
            curveSegments: 12,
            steps: 1
        };
        //ジオメトリとマテリアルの生成
        var shapeGeometry = new THREE.ExtrudeGeometry(this.drawShape(), options);
        var shapeMaterial1 = new THREE.MeshBasicMaterial();
        var shapeMaterial2 = new THREE.MeshNormalMaterial();
        shapeMaterial1.wireframe = true;
        shapeMaterial2.side = THREE.DoubleSide;
        //3DObjectの作成
        this.shapeMesh = THREE.SceneUtils.createMultiMaterialObject(shapeGeometry, [shapeMaterial1, shapeMaterial2]);
        //シーンへの追加
        this.scene.add(this.shapeMesh);
    }
    createScene() {
        this.scene = new THREE.Scene();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        //this.scene.add(this.cube);
        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /
            this.screenHeight, 0.1, 1000);
        this.camera.position.x = 5;
        this.camera.position.y = 5;
        this.camera.position.z = 5;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        var options = {
            amount: 10,
            bevelThickness: 2,
            bevelSize: 1,
            bevelSegments: 3,
            bevelEnabled: true,
            curveSegments: 12,
            steps: 1
        };
        //var shapeGeometry = new THREE.ShapeGeometry(this.drawShape());
        var shapeGeometry = new THREE.ExtrudeGeometry(this.drawShape(), options);
        var shapeMaterial1 = new THREE.MeshBasicMaterial();
        var shapeMaterial2 = new THREE.MeshNormalMaterial();
        shapeMaterial1.wireframe = true;
        shapeMaterial2.side = THREE.DoubleSide;
        this.shapeMesh = THREE.SceneUtils.createMultiMaterialObject(shapeGeometry, [shapeMaterial1, shapeMaterial2]);
        this.scene.add(this.shapeMesh);
    }
    render() {
        //        this.cube.rotation.x += 0.02;
        //        this.cube.rotation.y += 0.02;
        this.cube.rotation.x += this.controls.rotationSpeed;
        this.cube.rotation.y += this.controls.rotationSpeed;
        this.orbitControl.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
    drawShape() {
        // THREE.Shapeを作成
        var shape = new THREE.Shape();
        // スタート地点へ移動
        shape.moveTo(10, 10);
        // 線を描く
        shape.lineTo(10, 40);
        //2次のカーブを描く
        shape.quadraticCurveTo(20, 50, 30, 40);
        //Spline曲線を描く
        shape.splineThru([new THREE.Vector2(32, 30), new THREE.Vector2(20, 20), new THREE.Vector2(25, 10)]);
        return shape;
    }
}
class GuiControl {
    constructor() {
        this.rotationSpeed = 0.01;
        this.amount = 1;
        this.bevelThickness = 1;
        this.bevelSize = 1;
        this.bevelSegment = 1;
    }
}
window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};
//# sourceMappingURL=app.js.map