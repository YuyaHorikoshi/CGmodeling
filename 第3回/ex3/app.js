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
        this.camera.position.y = 40;
        this.camera.position.z = 30;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        //ライトの作成
        this.light = new THREE.SpotLight(0xffffff);
        this.light.position.set(-20, 30, -5);
        this.light.castShadow = true;
        // Cubeの作成
        this.geometry = new THREE.BoxGeometry(3, 3, 3);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.cube.position.y = 3;
        this.cube.castShadow = true;
        // 平面の作成
        this.planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
        this.planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
        this.plane.rotation.x = -Math.PI / 2;
        this.plane.position.y = 0;
        this.plane.receiveShadow = true; //影の追加
        this.scene.add(this.camera);
        //this.addObject();
        this.scene.add(this.light);
        this.scene.add(this.plane);
        // this.scene.add(this.cube);
        for (var i = 0; i < 50; i++) {
            this.addRandomObject();
        }
    }
    render() {
        this.cube.rotation.x += 0.02;
        this.cube.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
    addCube() {
        // Cubeのサイズを決める
        var cubeSize = Math.ceil(Math.random() * 3);
        // GeometryとMaterialを作成する。
        var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        var cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
        // Cubeオブジェクトを生成する
        var cubeAdd = new THREE.Mesh(cubeGeometry, cubeMaterial);
        // Cubeオブジェクトのプロパティを設定する
        cubeAdd.castShadow = true;
        cubeAdd.name = "cube-" + this.scene.children.length;
        // Cubeオブジェクトを移動する
        cubeAdd.position.x = -30 + Math.round((Math.random() * this.planeGeometry.parameters.width));
        cubeAdd.position.y = Math.round((Math.random() * 5));
        cubeAdd.position.z = -20 + Math.round((Math.random() * this.planeGeometry.parameters.height));
        //シーンに追加する
        this.scene.add(cubeAdd);
        console.log("Hello");
    }
    addSphere() {
        // Cubeのサイズを決める
        var sphereSize = Math.ceil(Math.random() * 3);
        // GeometryとMaterialを作成する。
        var sphereGeometry = new THREE.SphereGeometry(sphereSize);
        var sphereMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
        // Cubeオブジェクトを生成する
        var sphereAdd = new THREE.Mesh(sphereGeometry, sphereMaterial);
        // Cubeオブジェクトのプロパティを設定する
        sphereAdd.castShadow = true;
        sphereAdd.name = "sphere-" + this.scene.children.length;
        // Cubeオブジェクトを移動する
        sphereAdd.position.x = -30 + Math.round((Math.random() * this.planeGeometry.parameters.width));
        sphereAdd.position.y = Math.round((Math.random() * 5));
        sphereAdd.position.z = -20 + Math.round((Math.random() * this.planeGeometry.parameters.height));
        //シーンに追加する
        this.scene.add(sphereAdd);
        //console.log("Hello");
    }
    addTorus() {
        // Cubeのサイズを決める
        var torusRadius = Math.ceil(Math.random() * 3);
        var torusTube = Math.ceil(Math.random() * 5);
        var radialSegments = 20;
        var tubelarSegments = 20;
        // GeometryとMaterialを作成する。
        var torusGeometry = new THREE.TorusGeometry(torusRadius, torusTube * 0.4, radialSegments, tubelarSegments);
        var torusMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
        // Cubeオブジェクトを生成する
        var torusAdd = new THREE.Mesh(torusGeometry, torusMaterial);
        // Cubeオブジェクトのプロパティを設定する
        torusAdd.castShadow = true;
        torusAdd.name = "cube-" + this.scene.children.length;
        // Cubeオブジェクトを移動する
        torusAdd.position.x = -30 + Math.round((Math.random() * this.planeGeometry.parameters.width));
        torusAdd.position.y = Math.round((Math.random() * 5));
        torusAdd.position.z = -20 + Math.round((Math.random() * this.planeGeometry.parameters.height));
        //シーンに追加する
        this.scene.add(torusAdd);
        console.log("Hello");
    }
    addObject() {
        //Geometryの生成
        var addObjectGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
        //Materialの生成
        var meshMaterial = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
        var wireMaterial = new THREE.MeshBasicMaterial({ wireframe: true });
        //オブジェクトの生成
        var addObject = THREE.SceneUtils.createMultiMaterialObject(addObjectGeometry, [meshMaterial, wireMaterial]);
        //オブジェクトのシーンへの追加
        //this.scene.add(addObject);
    }
    addRandomObject() {
        var randomNumber = Math.round(Math.random() * 2);
        switch (randomNumber) {
            case 0:
                this.addCube();
                break;
            case 1:
                this.addSphere();
                break;
            case 2:
                this.addTorus();
                break;
        }
    }
}
window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};
//# sourceMappingURL=app.js.map