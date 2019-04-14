///<reference path="./node_modules/@types/three/index.d.ts"/>
///<reference path="./node_modules/@types/dat-gui/index.d.ts"/>

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
    private controls: GuiControl;
    private orbitControl: THREE.OrbitControls;
    private curveObject: THREE.Line;
    private ctrl_sph1: THREE.Mesh;
    private ctrl_sph2: THREE.Mesh;
    private ctrl_sph3: THREE.Mesh;
    private ctrl_sph4: THREE.Mesh;

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


        this.controls = new GuiControl();
        //        var gui = new dat.GUI();
        //gui.add(this.controls, 'rotationSpeed', 0, 0.5);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.setClearColor(new THREE.Color(0x495ed));
        document.getElementById("viewport").appendChild(this.renderer.domElement);

        gui.add(this.controls, 'ctrl1x', -5, 5).onChange((e:number)=>{
            this.controls.ctrl1x = e;
            //ここに値が変わったときの動作を追記
            this.renewGeo();
        });
        gui.add(this.controls, 'ctrl1y', -5, 5).onChange((e:number)=>{
            this.controls.ctrl1y = e;
            //ここに値が変わったときの動作を追記
            this.renewGeo();
        }); gui.add(this.controls, 'ctrl1z', -5, 5).onChange((e:number)=>{
            this.controls.ctrl1z = e;
            //ここに値が変わったときの動作を追記
            this.renewGeo();
        });
        gui.add(this.controls, 'ctrl2x', -5, 5).onChange((e:number)=>{
            this.controls.ctrl2x = e;
            //ここに値が変わったときの動作を追記
            this.renewGeo();
        });
        gui.add(this.controls, 'ctrl2y', -5, 5).onChange((e:number)=>{
            this.controls.ctrl2y = e;
            //ここに値が変わったときの動作を追記
            this.renewGeo();
        }); gui.add(this.controls, 'ctrl2z', -5, 5).onChange((e:number)=>{
            this.controls.ctrl2z = e;
            //ここに値が変わったときの動作を追記
            this.renewGeo();
        });
    }

    private renewGeo(){
        this.curveObject.geometry.dispose();//現在のGeometryを破棄
        //制御点の座標を準備
        var start_p = new THREE.Vector3(-10, 0, 0);
        var end_p = new THREE.Vector3(10, 0, 0);
        var second_p = new THREE.Vector3(this.controls.ctrl1x, this.controls.ctrl1y, this.controls.ctrl1z);
        var third_p = new THREE.Vector3(this.controls.ctrl2x, this.controls.ctrl2y, this.controls.ctrl2z);
        //ベジエ曲線を設定
        var curve = new THREE.CubicBezierCurve3(start_p, second_p, third_p, end_p);
        //ベジエ曲線上の点を取得
        var points = curve.getPoints(50);
        //点からGeometryを作成
        this.ctrl_sph1.position.copy(start_p);
        this.ctrl_sph2.position.copy(second_p);
        this.ctrl_sph3.position.copy(third_p);
        this.ctrl_sph4.position.copy(end_p);
        
        this.curveObject.geometry = new THREE.BufferGeometry().setFromPoints( points );
    }

    private createScene() {
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
        this.createCubicBezierCurve();
        this.scene.add(this.curveObject);
        this.scene.add(this.ctrl_sph1);
        this.scene.add(this.ctrl_sph2);
        this.scene.add(this.ctrl_sph3);
        this.scene.add(this.ctrl_sph4);
    }

    private createCubicBezierCurve() {
        var start_p = new THREE.Vector3(-10, 0, 0);
        var end_p = new THREE.Vector3(10, 0, 0);
        var second_p = new THREE.Vector3(-5, 15, 0);
        var third_p = new THREE.Vector3(20, 15, 0);

        var curve = new THREE.CubicBezierCurve3(start_p, second_p, third_p, end_p);
        var points = curve.getPoints(50);
        var geometry = new THREE.BufferGeometry().setFromPoints(points);
        var material = new THREE.LineBasicMaterial({ color: 0xff0000 });
        this.curveObject = new THREE.Line(geometry, material);

        var sph_geo = new THREE.SphereGeometry(1, 30, 30);
        var sph_mat = new THREE.MeshBasicMaterial();

        this.ctrl_sph1 = new THREE.Mesh(sph_geo, sph_mat);
        this.ctrl_sph2 = new THREE.Mesh(sph_geo, sph_mat);
        this.ctrl_sph3 = new THREE.Mesh(sph_geo, sph_mat);
        this.ctrl_sph4 = new THREE.Mesh(sph_geo, sph_mat);
        this.ctrl_sph1.position.copy(start_p);
        this.ctrl_sph2.position.copy(second_p);
        this.ctrl_sph3.position.copy(third_p);
        this.ctrl_sph4.position.copy(end_p);
    }

    public render() {
        //        this.cube.rotation.x += 0.02;
        //        this.cube.rotation.y += 0.02;
        this.cube.rotation.x += this.controls.rotationSpeed;
        this.cube.rotation.y += this.controls.rotationSpeed;

        this.orbitControl.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));


    }

}

class GuiControl {
    public rotationSpeed: number;
    public ctrl1x: number;
    public ctrl1y: number;
    public ctrl1z: number;
    public ctrl2x: number;
    public ctrl2y: number;
    public ctrl2z: number;
    constructor() {
        this.rotationSpeed = 0.01;
        this.ctrl1x = -5;
        this.ctrl1y = -5;
        this.ctrl1z = -5;
        this.ctrl2x = -5;
        this.ctrl2y = -5;
        this.ctrl2z = -5;
    }
}



window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};