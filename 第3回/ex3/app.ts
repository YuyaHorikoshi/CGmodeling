
///<reference path="./node_modules/@types/three/index.d.ts"/>
class ThreeJSTest {
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private renderer: THREE.WebGLRenderer;
    private geometry: THREE.Geometry;
    private material: THREE.Material;
    private cube: THREE.Mesh;
    private light: THREE.Light;
    private screenWidth: number = 640;
    private screenHeight: number = 480;
    private planeGeometry: THREE.PlaneGeometry;
    private planeMaterial: THREE.Material;
    private plane: THREE.Mesh;

constructor() {
    this.createRenderer();
    this.createScene();
}

private createRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.screenWidth, this.screenHeight);
    this.renderer.setClearColor(new THREE.Color(0x495ed));
    this.renderer.shadowMap.enabled = true; 
    document.body.appendChild(this.renderer.domElement);
}

private createScene() {
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
for (var i: number = 0; i < 50; i++) {
   this.addRandomObject();
 }
}

public render() {
    this.cube.rotation.x += 0.02;
    this.cube.rotation.y += 0.02;
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
}

public addCube() {
    // Cubeのサイズを決める
    var cubeSize:number=Math.ceil(Math.random() * 3);
    // GeometryとMaterialを作成する。
    var cubeGeometry: THREE.Geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    var cubeMaterial: THREE.Material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
    // Cubeオブジェクトを生成する
    var cubeAdd: THREE.Mesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
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

public addSphere() {
    // Cubeのサイズを決める
    var sphereSize:number=Math.ceil(Math.random() * 3);
    // GeometryとMaterialを作成する。
    var sphereGeometry: THREE.Geometry = new THREE.SphereGeometry(sphereSize);
    var sphereMaterial: THREE.Material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
    // Cubeオブジェクトを生成する
    var sphereAdd: THREE.Mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
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

public addTorus() {
    // Cubeのサイズを決める
    var torusRadius:number=Math.ceil(Math.random() * 3);
    var torusTube:number=Math.ceil(Math.random() *5);
    var radialSegments=20;
    var tubelarSegments=20;
    // GeometryとMaterialを作成する。
    var torusGeometry: THREE.Geometry = new THREE.TorusGeometry(torusRadius, torusTube*0.4,radialSegments,tubelarSegments);
    var torusMaterial: THREE.Material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
    // Cubeオブジェクトを生成する
    var torusAdd: THREE.Mesh = new THREE.Mesh(torusGeometry, torusMaterial);
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

public addObject(){
    //Geometryの生成
    var addObjectGeometry: THREE.Geometry = new THREE.PlaneGeometry(100, 100, 10, 10);
    //Materialの生成
    　var meshMaterial: THREE.Material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
    var wireMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ wireframe: true });
    //オブジェクトの生成
    　var addObject: THREE.Object3D = THREE.SceneUtils.createMultiMaterialObject(addObjectGeometry, [meshMaterial, wireMaterial]);
    //オブジェクトのシーンへの追加
    //this.scene.add(addObject);
}

public addRandomObject(){
    var randomNumber=Math.round(Math.random()*2);
    switch(randomNumber){
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