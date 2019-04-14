///<reference path="./node_modules/@types/three/index.d.ts"/>
///<reference path="./node_modules/@types/dat-gui/index.d.ts"/>

class ThreeJSTest {
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private renderer: THREE.WebGLRenderer;
    private geometry: THREE.Geometry;
    private material: THREE.Material;
    private balls: THREE.Mesh;
    private light: THREE.Light;
    private screenWidth: number = 640;
    private screenHeight: number = 480;
    private controls: GuiControl;
    private orbitControl: THREE.OrbitControls;
    private cloud1: THREE.Points;
    private cloud2: THREE.Points;
    private cloud3: THREE.Points;
    private group: THREE.Group;
    private group2: THREE.Group;
    private group3: THREE.Group;
    private group4: THREE.Group;
    private group5: THREE.Group;

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
        this.balls = new THREE.Mesh(this.geometry, this.material);
        //this.scene.add(this.balls);
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
        var geo = new THREE.TorusGeometry(50, 10, 50, 12);
        this.cloud1 = new THREE.Points;
        this.cloud2 = new THREE.Points;
        this.cloud3 = new THREE.Points;
        this.group = new THREE.Group;
        this.cloud1 = this.createPoints(geo, 0);
        this.cloud1.rotation.z = 0;
        this.cloud1.name = "B";
        this.group.add(this.cloud1);
        this.cloud2 = this.createPoints(geo, 1);
        this.cloud2.rotation.z = 0.1
        this.cloud2.name = "R";
        this.group.add(this.cloud2);
        this.cloud3 = this.createPoints(geo, 2);
        this.cloud3.rotation.z = 0.2;
        this.cloud3.name = "G";
        this.group.add(this.cloud3);

        this.group2=this.group.clone();
        this.group2.position.z=-100;
        this.group3=this.group.clone();
        this.group3.position.z=-200;
        this.group4=this.group.clone();
        this.group4.position.z=-300;
        this.group5=this.group.clone();
        this.group5.position.z=-400;
        this.scene.add(this.group);
        this.scene.add(this.group2);
        this.scene.add(this.group3);
        this.scene.add(this.group4);
        this.scene.add(this.group5);
    }

    public render() {
        //        this.balls.rotation.x += 0.02;
        //        this.balls.rotation.y += 0.02;
        this.balls.rotation.x += this.controls.rotationSpeed;
        this.balls.rotation.y += this.controls.rotationSpeed;

        this.orbitControl.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
        this.cloud1.rotation.z -= 0.01;
        this.cloud2.rotation.z += 0.01;
        this.cloud3.rotation.z += 0.01;
        this.group2.getObjectByName("B").rotation.z-=0.01;
        this.group2.getObjectByName("R").rotation.z+=0.01;
        this.group2.getObjectByName("G").rotation.z+=0.01;
        this.group3.getObjectByName("B").rotation.z-=0.01;
        this.group3.getObjectByName("R").rotation.z+=0.01;
        this.group3.getObjectByName("G").rotation.z+=0.01;
        this.group4.getObjectByName("B").rotation.z-=0.01;
        this.group4.getObjectByName("R").rotation.z+=0.01;
        this.group4.getObjectByName("G").rotation.z+=0.01;
        this.group5.getObjectByName("B").rotation.z-=0.01;
        this.group5.getObjectByName("R").rotation.z+=0.01;
        this.group5.getObjectByName("G").rotation.z+=0.01;
        this.group.position.z+=0.5;
        this.group2.position.z+=0.5;
        this.group3.position.z+=0.5;
        this.group4.position.z+=0.5;
        this.group5.position.z+=0.5;
        if(this.group.position.z>100){
            this.group.position.z=-400;
        }
        if(this.group2.position.z>100){
            this.group2.position.z=-400;
        }
        if(this.group3.position.z>100){
            this.group3.position.z=-400;
        }
        if(this.group4.position.z>100){
            this.group4.position.z=-400;
        }
        if(this.group5.position.z>100){
            this.group5.position.z=-400;
        }
    }

    public createPoints(geom: THREE.Geometry, index: Number) {
        var material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 3,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            map: this.generateSprite(index)
        });
        return new THREE.Points(geom, material);
    }

    public generateSprite(index: Number) {
        //新しいキャンバスの作成
        var canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;

        //円形のグラデーションの作成
        var context = canvas.getContext('2d');
        var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
        switch (index) {
            case 0:
                gradient.addColorStop(0, 'rgba(255,255,255,1)');
                gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
                gradient.addColorStop(0.4, 'rgba(0, 0,64,1)');
                gradient.addColorStop(1, 'rgba(0,0,0,1)');
                break;
            case 1:
                gradient.addColorStop(0, 'rgba(255,255,255,1)');
                gradient.addColorStop(0.2, 'rgba(255,0,255,1)');
                gradient.addColorStop(0.4, 'rgba(64, 0,0,1)');
                gradient.addColorStop(1, 'rgba(0,0,0,1)');
                break;
            case 2:
                gradient.addColorStop(0, 'rgba(255,255,255,1)');
                gradient.addColorStop(0.2, 'rgba(255,255,0,1)');
                gradient.addColorStop(0.4, 'rgba(0, 64,0,1)');
                gradient.addColorStop(1, 'rgba(0,0,0,1)');
                break;

        }

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