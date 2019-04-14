///<reference path="./node_modules/@types/three/index.d.ts"/>
///<reference path="./node_modules/@types/dat-gui/index.d.ts"/>
///<reference path="./node_modules/@types/physijs/index.d.ts"/>
var screenX;
var screenY;
var setX = 0;
var setY = 0;
var num = 0;
var balls;
var flag;
var fix, fix1 = false;
var ball;
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
        // gui.add(this.controls, 'number', 5, 10).onChange((e: number) => {
        //     for (var i = 0; i < this.controls.number; i++) {
        //         for (var j = 0; j <= i; j++) {
        //     this.scene.remove(this.cube);
        //         }
        //     }
        //     this.controls.number = Math.ceil(e);
        //     this.createCube();
        // });
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.setClearColor(new THREE.Color(0x000000));
        document.getElementById("viewport").appendChild(this.renderer.domElement);
        Physijs.scripts.worker = './physijs/physijs_worker.js';
        Physijs.scripts.ammo = './examples/js/ammo.js';
    }
    createScene() {
        //this.scene = new THREE.Scene();
        this.scene = new Physijs.Scene();
        this.scene.setGravity(new THREE.Vector3(0, -10, 0));
        this.geometry = new THREE.SphereGeometry(2, 20, 20);
        this.material = new THREE.MeshLambertMaterial({ color: 0xffffff, opacity: 1, transparent: true });
        //this.ball = new Physijs.BoxMesh(this.geometry, this.material);
        ball = new Physijs.SphereMesh(this.geometry, this.material, 1);
        //balls.push(i);
        ball.position.y = -3;
        //console.log(balls);
        console.log();
        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /
            this.screenHeight, 0.1, 1000);
        this.camera.position.x = 0;
        this.camera.position.y = 15;
        this.camera.position.z = -10;
        this.camera.lookAt(new THREE.Vector3(0, 0, 5));
        //this.orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        var ggeom = new THREE.BoxGeometry(200, 2, 200);
        var gmat = new THREE.MeshNormalMaterial;
        var ground = new Physijs.BoxMesh(ggeom, gmat, 0);
        //ground.rotation.x=-Math.PI/2;
        ground.position.y = -4;
        this.scene.add(ground);
        //this.setPosition();
        this.createCube();
    }
    render() {
        window.addEventListener('click', function (e) {
            setX = screenX;
            setY = screenY;
            num += 1;
            flag = true;
            fix = true;
            if (num >= 3) {
                num = 0;
            }
            //console.log(setX);
        }, false);
        if (flag) {
            ball.position.z += 1;
        }
        ;
        if (!fix) {
            ball.position.x = 15 - screenX * 20 / this.screenWidth;
            fix1 = true;
        }
        //console.log(balls.getObjectByName("0").position.x + " " + balls.getObjectByName("0").position.y);
        //console.log(this.screenHeight+"bb");
        this.scene.add(ball);
        //        this.ball.rotation.x += 0.02;
        //        this.ball.rotation.y += 0.02;
        //this.orbitControl.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
        this.scene.simulate();
        //console.log(screenX+" "+screenY);
    }
    createCube() {
        var cgeom = new THREE.BoxGeometry(1, 5, 1);
        var cmat = new THREE.MeshNormalMaterial;
        for (var i = 0; i < this.controls.number; i++) {
            for (var j = 0; j <= i; j++) {
                this.cube = new Physijs.BoxMesh(cgeom, cmat);
                this.cube.position.y = 1;
                this.cube.position.z = 20 + 2 * i;
                this.cube.position.x = -i * 1 + j * 2;
                this.scene.add(this.cube);
            }
        }
    }
}
class GuiControl {
    constructor() {
        this.rotationSpeed = 0.00;
        this.number = 20;
    }
}
window.onload = function () {
    var threeJSTest = new ThreeJSTest();
    document.body.addEventListener("mousemove", function (e) {
        screenX = e.pageX;
        screenY = e.pageY;
        //console.log(posX+" "+posY);
    });
    threeJSTest.render();
};
//# sourceMappingURL=app.js.map