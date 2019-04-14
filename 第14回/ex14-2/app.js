///<reference path="./node_modules/@types/three/index.d.ts"/>
///<reference path="./node_modules/@types/dat-gui/index.d.ts"/>
///<reference path="./node_modules/@types/physijs/index.d.ts"/>
var screenX;
var screenY;
var setX = 0;
var setY = 0;
var num = 0;
var flag;
var fix, fix1 = false;
var cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9;
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
        var frict = 0; // 摩擦係数
        var rest = 0.9; // 反発係数
        var gmaterial = Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: 0x55ff00, opacity: 0.5, transparent: true }), frict, rest);
        var ggeom = new THREE.BoxGeometry(2, 2, 2);
        var ground = new Physijs.BoxMesh(ggeom, gmaterial);
        ground.position.y = 70;
        this.scene.add(ground);
        //console.log(balls);
        console.log();
        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /
            this.screenHeight, 0.1, 1000);
        this.camera.position.x = 15;
        this.camera.position.y = 15;
        this.camera.position.z = 100;
        this.camera.lookAt(new THREE.Vector3(15, 15, 0));
        //this.orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        //ground.rotation.x=-Math.PI/2;
        ground.position.y = -4;
        //this.scene.add(ground);
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
        this.rotationFunc();
        //console.log(balls.getObjectByName("0").position.x + " " + balls.getObjectByName("0").position.y);
        //console.log(this.screenHeight+"bb");
        //        this.ball.rotation.x += 0.02;
        //        this.ball.rotation.y += 0.02;
        //this.orbitControl.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
        this.scene.simulate();
        //console.log(screenX+" "+screenY);
    }
    createCube() {
        var time = 2;
        var frict = 0;
        var rest = 0.6;
        var cgeom1 = new THREE.BoxGeometry(20, 3, 5);
        var cgeom2 = new THREE.BoxGeometry(50, 3, 5);
        var cgeom3 = new THREE.BoxGeometry(10, 3, 5);
        var cgeom4 = new THREE.BoxGeometry(12, 1, 5);
        var cmat = Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: 0xffffff, opacity: 1, transparent: true }), frict, rest);
        cube1 = new Physijs.BoxMesh(cgeom1, cmat, 0);
        var cmat = Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: 0xffffff, opacity: 1, transparent: true }), frict, rest);
        cube2 = new Physijs.BoxMesh(cgeom1, cmat, 0);
        var cmat = Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: 0xffffff, opacity: 1, transparent: true }), frict, rest);
        cube3 = new Physijs.BoxMesh(cgeom1, cmat, 0);
        var cmat = Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: 0xffffff, opacity: 1, transparent: true }), frict, rest);
        cube4 = new Physijs.BoxMesh(cgeom2, cmat, 0);
        var cmat = Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: 0xffffff, opacity: 1, transparent: true }), frict, rest);
        cube5 = new Physijs.BoxMesh(cgeom3, cmat, 0);
        var cmat = Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: 0xffffff, opacity: 1, transparent: true }), frict, rest);
        cube6 = new Physijs.BoxMesh(cgeom3, cmat, 0);
        var cmat = Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: 0xffffff, opacity: 1, transparent: true }), frict, rest);
        cube7 = new Physijs.BoxMesh(cgeom4, cmat, 0);
        var cmat = Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: 0xffffff, opacity: 1, transparent: true }), frict, rest);
        cube8 = new Physijs.BoxMesh(cgeom4, cmat, 0);
        var cmat = Physijs.createMaterial(new THREE.MeshPhongMaterial({ color: 0xffffff, opacity: 1, transparent: true }), frict, rest);
        cube9 = new Physijs.BoxMesh(cgeom4, cmat, 0);
        cube1.position.x = 0;
        cube1.position.y = 48;
        cube2.position.y = 48;
        cube2.position.x = 30;
        cube3.position.y = 50;
        cube3.position.x = 48;
        cube3.rotation.z = -Math.PI / 2;
        cube4.position.y = 0;
        cube4.position.x = 10;
        //cube4.rotation.z=0.5;
        cube5.position.y = 45;
        cube5.position.x = 15;
        cube6.position.y = -12;
        cube6.position.x = 4;
        cube7.position.y = -24;
        cube7.position.x = 10;
        cube8.position.y = -36;
        cube8.position.x = 10;
        cube9.position.y = -24;
        cube9.position.x = 22;
        this.scene.add(cube1);
        this.scene.add(cube2);
        this.scene.add(cube3);
        this.scene.add(cube4);
        this.scene.add(cube5);
        this.scene.add(cube6);
        this.scene.add(cube7);
        this.scene.add(cube8);
        this.scene.add(cube9);
    }
    rotationFunc() {
        cube1.rotation.z = screenX / 200;
    }
}
class GuiControl {
    constructor() {
        this.rotationSpeed = 0.00;
        this.number = 5;
    }
}
window.onload = function () {
    var threeJSTest = new ThreeJSTest();
    document.body.addEventListener("mousemove", function (e) {
        screenX = e.pageX;
        screenY = e.pageY;
        console.log(screenX - 320, screenY - 320);
    });
    threeJSTest.render();
};
//# sourceMappingURL=app.js.map