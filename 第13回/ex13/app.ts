///<reference path="./node_modules/@types/three/index.d.ts"/>
///<reference path="./node_modules/@types/dat-gui/index.d.ts"/>
///<reference path="./node_modules/@types/physijs/index.d.ts"/>

class ThreeJSTest {
    //private scene: THREE.Scene;
    private scene: Physijs.Scene;
    private camera: THREE.Camera;
    private renderer: THREE.WebGLRenderer;
    private geometry: THREE.Geometry;
    private material: THREE.Material;
    //private cube: THREE.Mesh;
    private cube: Physijs.BoxMesh;
    private light: THREE.Light;
    private screenWidth: number = 640;
    private screenHeight: number = 480;
    private controls: GuiControl;
    private orbitControl: THREE.OrbitControls;

    private frConstraint: Physijs.DOFConstraint;
    private flConstraint: Physijs.DOFConstraint;
    private rrConstraint: Physijs.DOFConstraint;
    private rlConstraint: Physijs.DOFConstraint;

    constructor() {
        this.createRenderer();
        this.createScene();
    }

    private createRenderer() {
        // dat.GUI
        var gui = new dat.GUI({ autoPlace: false, width: 256 });
        var guielement = document.createElement("div");
        guielement.id = "dat-gui";
        guielement.appendChild(gui.domElement);
        document.getElementById("viewport").appendChild(guielement);

        Physijs.scripts.worker = './physijs/physijs_worker.js';
        Physijs.scripts.ammo = './examples/js/ammo.js';

        this.controls = new GuiControl();
        //        var gui = new dat.GUI();
        gui.add(this.controls, 'rotationSpeed', 0, 0.5);

        gui.add(this.controls, 'wheelAngle', -0.5, 0.5).onChange((e: number) => {
            this.controls.wheelAngle = e;
            this.rrConstraint.setAngularLowerLimit(new THREE.Vector3(0, this.controls.wheelAngle, 0.1));
            this.rrConstraint.setAngularUpperLimit(new THREE.Vector3(0, this.controls.wheelAngle, 0));
            this.rlConstraint.setAngularLowerLimit(new THREE.Vector3(0, this.controls.wheelAngle, 0.1));
            this.rlConstraint.setAngularUpperLimit(new THREE.Vector3(0, this.controls.wheelAngle, 0));
            //console.log(e);
        });

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.setClearColor(new THREE.Color(0x495ed));
        document.getElementById("viewport").appendChild(this.renderer.domElement);


    }

    private createScene() {
        //this.scene = new THREE.Scene();
        this.scene = new Physijs.Scene();
        this.geometry = new THREE.BoxGeometry(500, 1, 500);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        //this.cube = new THREE.Mesh(this.geometry, this.material);
        this.cube = new Physijs.BoxMesh(this.geometry, this.material, 0);
        this.cube.position.y = -5;
        this.cube.position.x = 0;
        this.cube.position.z = 0;
        this.scene.add(this.cube);

        this.scene.setGravity(new THREE.Vector3(0, -10, 0));

        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /
            this.screenHeight, 0.1, 1000);
        this.camera.position.x = 3;
        this.camera.position.y = 100;
        this.camera.position.z = 3;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);

        this.createCar();
    }

    public render() {
        this.scene.simulate();

        this.orbitControl.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));


    }

    public createWheel(position: THREE.Vector3) {
        //マテリアルの作成
        var wheelMaterial = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ color: 0x444444, opacity: 0.9, transparent: true }), 1.0, 0.5);
        //ジオメトリの作成 
        var wheel_geometry = new THREE.CylinderGeometry(4, 4, 2, 10);
        //ホイールの作成
        var wheel = new Physijs.CylinderMesh(wheel_geometry, wheelMaterial, 100);
        //位置の設定
        wheel.rotation.x = Math.PI / 2;
        wheel.castShadow = true;
        wheel.position.copy(position);
        //作成したオブジェクトを返り値として返す 
        return wheel;
    }

    public createCar() {
        //マテリアルの設定
        var car_material = Physijs.createMaterial(new THREE.MeshLambertMaterial({ color: 0x000000, opacity: 1, transparent: true }), 0.5, 0.5);
        //ジオメトリの設定 
        var geom = new THREE.BoxGeometry(15, 4, 4);
        //車のボディを作成
        var body = new Physijs.BoxMesh(geom, car_material, 500);
        //位置を調整して、シーンに追加
        body.position.set(5, 5, 5);
        body.castShadow = true;
        this.scene.add(body);

        //ホイールの作成
        var fr = this.createWheel(new THREE.Vector3(0, 4, 10));
        this.scene.add(fr);
        var fl = this.createWheel(new THREE.Vector3(0, 4, 0));
        this.scene.add(fl);
        var rr = this.createWheel(new THREE.Vector3(10, 4, 10));
        this.scene.add(rr);
        var rl = this.createWheel(new THREE.Vector3(10, 4, 0));
        this.scene.add(rl);
        //ホイールとボディに制約を与える初期設定
        this.frConstraint = new Physijs.DOFConstraint(fr, body, new THREE.Vector3(0, 4, 8));
        this.scene.addConstraint(this.frConstraint);
        this.flConstraint = new Physijs.DOFConstraint(fl, body, new THREE.Vector3(0, 4, 2));
        this.scene.addConstraint(this.flConstraint);
        this.rrConstraint = new Physijs.DOFConstraint(rr, body, new THREE.Vector3(10, 4, 8));
        this.scene.addConstraint(this.rrConstraint);
        this.rlConstraint = new Physijs.DOFConstraint(rl, body, new THREE.Vector3(10, 4, 2));
        this.scene.addConstraint(this.rlConstraint);
        // 制御側のタイヤの動きの制約
        this.rrConstraint.setAngularLowerLimit(new THREE.Vector3(0, 0, 0.1));//下限値を設定
        this.rrConstraint.setAngularUpperLimit(new THREE.Vector3(0, 0, 0));//上限値を設定
        this.rlConstraint.setAngularLowerLimit(new THREE.Vector3(0, 0, 0.1));//下限値を設定
        this.rlConstraint.setAngularUpperLimit(new THREE.Vector3(0, 0, 0));//上限値を設定
        // モーターで駆動するタイヤの動きの制約
        this.frConstraint.setAngularLowerLimit(new THREE.Vector3(0, 0, 0));
        this.frConstraint.setAngularUpperLimit(new THREE.Vector3(0, 0, 0));
        this.flConstraint.setAngularLowerLimit(new THREE.Vector3(0, 0, 0));
        this.flConstraint.setAngularUpperLimit(new THREE.Vector3(0, 0, 0));
        //モーターの設定
        this.flConstraint.configureAngularMotor(2, 1, 0, -2, 1500);//モーター設定
        this.frConstraint.configureAngularMotor(2, 1, 0, -2, 1500);//モーター 設定
        this.flConstraint.enableAngularMotor(2);//有効化
        this.frConstraint.enableAngularMotor(2);//有効化


    }

}

class GuiControl {
    public rotationSpeed: number;
    public wheelAngle: number;
    constructor() {
        this.rotationSpeed = 0.01;
        this.wheelAngle = 0.1;
    }
}



window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};