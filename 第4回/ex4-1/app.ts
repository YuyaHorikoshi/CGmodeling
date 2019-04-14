///<reference path="./node_modules/@types/three/index.d.ts"/>

class ThreeJSTest {
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private renderer: THREE.WebGLRenderer;
    private cube: THREE.Mesh;
    private light: THREE.Light;
    private screenWidth: number = 640;
    private screenHeight: number = 480;
    private plane: THREE.Mesh;
    private group:THREE.Group;
    private angle:number=0;
 
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
       this.group=new THREE.Group();
   
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
       var cubesGeometry = new THREE.BoxGeometry(2.9,2.9,2.9);
       //var geometry=new THREE.MeshBasicMaterial();
       // Materialの設定をここに記述
       //var material=new THREE.MeshStandardMaterial({color:0x55ff00});
       
       //material.wireframe=true;
       //material.opacity=0.1;
       //material.transparent=true;
       //material.visible=false;

       //material.specular=new THREE.Color(0x55ff00);

       //material.flatShading = true;

       //material.metalness=1;

       var matArray = [];
       var mat1=new THREE.MeshBasicMaterial({ color: 0x0051ba });
       mat1.wireframe=true;

       var mat2=new THREE.MeshLambertMaterial({ color: 0xffd500 });

       var mat3=new THREE.MeshPhongMaterial({ color: 0xff5800 });
       mat3.specular=new THREE.Color(0x55ff00);
       mat3.shininess=60;

       var mat4=new THREE.MeshStandardMaterial({ color: 0xc41e3a });
       mat4.metalness=1;

matArray.push(new THREE.MeshBasicMaterial({ color: 0x009e60 }));
matArray.push(mat1);
matArray.push(mat2);
matArray.push(mat3);
matArray.push(mat4);
matArray.push(new THREE.MeshBasicMaterial({ color: 0xffffff }));
var material = new THREE.MultiMaterial(matArray);
       
for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
        for (var z = 0; z < 3; z++) {
        //ここでMeshを作成する。
        var cubes = new THREE.Mesh(cubesGeometry, material);
             //ここで個々のcubeの位置を少しずつ変える
   cubes.position.set(x*3-3,y*3,z*3-3);
             //グループに追加する。
             this.group.add(cubes);
         }
    }
}
       //this.cube = new THREE.Mesh(cubesGeometry, material);
       this.group.position.y = 0;
       //this.cube.castShadow = true; 
   
       // 平面の作成
       var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
       // Materialの設定をここに記述
       var planeMaterial=new THREE.MeshBasicMaterial({color:0x000fff});
   
       this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
       this.plane.rotation.x = -Math.PI / 2;
       this.plane.position.y = -10;
       this.plane.receiveShadow = true; //影の追加
   
       //シーンへの追加
       this.scene.add(this.camera);
       this.scene.add(this.light);
       //this.scene.add(this.cube);
       this.scene.add(this.group);
       this.scene.add(this.plane);
   }
   
   public render() {
    this.camera.position.x = 30 * Math.cos(Math.PI * this.angle / 1);
    this.camera.position.z = 30 * Math.sin(Math.PI * this.angle / 1);
    this.angle += 0.001;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
       this.group.rotation.x += 0.02;
       this.group.rotation.y += 0.02;
       this.renderer.render(this.scene, this.camera);
       requestAnimationFrame(this.render.bind(this));
   }

}
window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};