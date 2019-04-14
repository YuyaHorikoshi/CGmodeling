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
    private shapeMesh: THREE.Object3D;

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
        gui.add(this.controls, 'rotationSpeed', 0, 0.5);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.setClearColor(new THREE.Color(0x495ed));
        document.getElementById("viewport").appendChild(this.renderer.domElement);

        gui.add(this.controls, 'segments', 1, 100).step(1).onChange((e: number) => {
            this.controls.segments = e;
            this.scene.remove(this.shapeMesh);
            this.drawExtrude();
        })
        gui.add(this.controls, 'radius', 1, 100).onChange((e: number) => {
            this.controls.radius = e;
            this.scene.remove(this.shapeMesh);
            this.drawExtrude();
        })
        gui.add(this.controls, 'radiusSegments', 1, 30).step(1).onChange((e: number) => {
            this.controls.radiusSegments = e;
            this.scene.remove(this.shapeMesh);
            this.drawExtrude();
        })

    }

    public drawExtrude() {
        //プロパティの設定
        var points = [];
        points.push(new THREE.Vector3(10 * Math.random(), 10 * Math.random(), 10 * Math.random()));
        points.push(new THREE.Vector3(-20 * Math.random(), 0 * Math.random(), -20 * Math.random()));
        points.push(new THREE.Vector3(5 * Math.random(), -20 * Math.random(), 5 * Math.random()));
        points.push(new THREE.Vector3(15 * Math.random(), 5 * Math.random(), -15 * Math.random()));
        points.push(new THREE.Vector3(10 * Math.random(), 20 * Math.random(), 20 * Math.random()));

        var closed = false
        //ジオメトリとマテリアルの生成
        var tubeGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), this.controls.segments, this.controls.radius, this.controls.radiusSegments,closed);
        var shapeMaterial1 = new THREE.MeshBasicMaterial();
        var shapeMaterial2 = new THREE.MeshNormalMaterial();
        shapeMaterial1.wireframe = true;
        shapeMaterial2.side = THREE.DoubleSide;
        //3DObjectの作成
        this.shapeMesh = THREE.SceneUtils.createMultiMaterialObject(tubeGeometry, [shapeMaterial1, shapeMaterial2]);
        //シーンへの追加
        this.scene.add(this.shapeMesh);
    }

    private createScene() {
        this.scene = new THREE.Scene();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        //this.scene.add(this.cube);
        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /
            this.screenHeight, 0.1, 1000);
        this.camera.position.x = 10;
        this.camera.position.y = 10;
        this.camera.position.z = 10;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light)

        var points = [];
        points.push(new THREE.Vector3(10, 10, 10));
        points.push(new THREE.Vector3(-20, 0, -20));
        points.push(new THREE.Vector3(5, -20, 5));
        points.push(new THREE.Vector3(15, 5, -15));
        points.push(new THREE.Vector3(10, 20, 20));
        //var shapeGeometry = new THREE.ShapeGeometry(this.drawShape());
        //var shapeGeometry = new THREE.ExtrudeGeometry(this.drawShape(), options);
        var segments = 100;
        var radius = 1.5;
        var radiusSegments = 20;
        var closed = false;
        var tubeGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segments, radius, radiusSegments, closed);
        var shapeMaterial1 = new THREE.MeshBasicMaterial();
        var shapeMaterial2 = new THREE.MeshNormalMaterial();
        shapeMaterial1.wireframe = true;
        shapeMaterial2.side = THREE.DoubleSide;
        this.shapeMesh = THREE.SceneUtils.createMultiMaterialObject(tubeGeometry, [shapeMaterial1, shapeMaterial2]);

        this.scene.add(this.shapeMesh);

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

    public drawShape() {
        // THREE.Shapeを作成
        var shape = new THREE.Shape();
        // スタート地点へ移動
        shape.moveTo(10, 10);
        // 線を描く
        shape.lineTo(10, 40);
        //2次のカーブを描く
        shape.quadraticCurveTo(20, 50, 30, 40);
        //Spline曲線を描く
        var points = [];
        points.push(new THREE.Vector3(10, 10, 10));
        points.push(new THREE.Vector3(-20, 0, -20));
        points.push(new THREE.Vector3(5, -20, 5));
        points.push(new THREE.Vector3(15, 5, -15));
        points.push(new THREE.Vector3(10, 20, 20));
        shape.splineThru(points);
        return shape;
    }

}

class GuiControl {
    public rotationSpeed: number;
    public segments: number;
    public radius: number;
    public radiusSegments: number;
    constructor() {
        this.rotationSpeed = 0.01;
        this.segments = 100;
        this.radius = 1.5;
        this.radiusSegments = 20;
    }
}



window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};