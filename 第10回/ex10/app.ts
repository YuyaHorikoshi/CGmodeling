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
        this.renderer.setClearColor(new THREE.Color(0x000000));
        document.getElementById("viewport").appendChild(this.renderer.domElement);




    }

    private createScene() {
        this.scene = new THREE.Scene();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        //this.scene.add(this.cube);
        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /
            this.screenHeight, 0.1, 1000);
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 100;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        var geo = new THREE.TorusGeometry(50,10,50,12);
        this.scene.add(this.createPoints(geo));

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

    public createPoints(geom: THREE.Geometry) {
        var material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 3,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            map: this.generateSprite()
        });
        return new THREE.Points(geom, material);
    }

    public generateSprite() {
        //新しいキャンバスの作成
        var canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;

        //円形のグラデーションの作成
        var context = canvas.getContext('2d');
        var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
        gradient.addColorStop(0.4, 'rgba(0, 0,64,1)');
        gradient.addColorStop(1, 'rgba(0,0,0,1)');

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        //テクスチャの生成
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;

    } 
}

class GuiControl {
    public rotationSpeed: number;
    constructor() {
        this.rotationSpeed = 0.01;
    }
}



window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};