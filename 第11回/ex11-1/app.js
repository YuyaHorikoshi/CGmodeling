///<reference path="./node_modules/@types/three/index.d.ts"/>
///<reference path="./node_modules/@types/dat-gui/index.d.ts"/>
///<reference path="./node_modules/@types/tween.js/index.d.ts"/>
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
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.setClearColor(new THREE.Color(0x000000));
        document.getElementById("viewport").appendChild(this.renderer.domElement);
    }
    createScene() {
        this.scene = new THREE.Scene();
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshLambertMaterial({ color: 0x55ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        //this.scene.add(this.cube);
        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /
            this.screenHeight, 0.1, 1000);
        this.camera.position.x = -50;
        this.camera.position.y = 50;
        this.camera.position.z = -50;
        this.camera.lookAt(new THREE.Vector3(0, 50, 0));
        this.orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        this.createParticle();
        // var tween = new TWEEN.Tween({ scale: 1 ,item:this}).to({ scale: 3 }, 10000).easing(TWEEN.Easing.Bounce.Out).onUpdate(function () {
        //     this.item.cube.scale.x = this.scale;
        // });
        var tween = [];
        var tweenBack = [];
        for (var ax = 0; ax < 8000; ax++) {
            var tweenconfig = { x: 1, y: 1, z: 1, index: ax, item: this };
            tween.push(new TWEEN.Tween(tweenconfig).to({ x: Math.random() * 50 - 25, y: Math.random() * 50 - 25, z: Math.random() * 50 - 25 }, 2000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                var geom = this.item.cloud.geometry;
                var vertices = geom.vertices;
                geom.verticesNeedUpdate = true;
                vertices[this.index].x = this.x;
                vertices[this.index].y = this.y;
                vertices[this.index].z = this.z;
            }));
            var rad1 = Math.random() * 2 * Math.PI;
            var rad2 = Math.random() * 2 * Math.PI;
            tweenBack.push(new TWEEN.Tween(tweenconfig).to({ x: Math.cos(rad1) * Math.cos(rad2) * 25, y: Math.cos(rad1) * Math.sin(rad2) * 25, z: Math.sin(rad1) * 25 }, 2000).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                var geom = this.item.cloud.geometry;
                var vertices = geom.vertices;
                geom.verticesNeedUpdate = true;
                vertices[this.index].x = this.x;
                vertices[this.index].y = this.y;
                vertices[this.index].z = this.z;
            }));
            tween[ax].chain(tweenBack[ax]);
            tweenBack[ax].chain(tween[ax]);
            tween[ax].start();
        }
        //for(var i=0;i<1000;i++){
        //tween[i].chain(tweenBack);
        //tweenBack.chain(tween);
        //tween[i].start();
        //}
    }
    render() {
        //        this.cube.rotation.x += 0.02;
        //        this.cube.rotation.y += 0.02;
        // this.cube.rotation.x += this.controls.rotationSpeed;
        // this.cube.rotation.y += this.controls.rotationSpeed;
        this.orbitControl.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
        TWEEN.update();
        var geom = this.cloud.geometry;
        var vertices = geom.vertices;
        //   for (var i = 0; i < 1000; i++) {
        //     vertices[i].x = this.pvelocity[i].x;
        //   vertices[i].y = this.pvelocity[i].y;
        //  vertices[i].z = this.pvelocity[i].z;
        // }
        //geom.verticesNeedUpdate = true;
    }
    createParticle() {
        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load('raindrop.png');
        var geom = new THREE.Geometry();
        this.pointMaterial = new THREE.PointsMaterial({ size: 2, map: texture, blending: THREE.AdditiveBlending, color: 0xffffff, depthWrite: false, transparent: true, opacity: 0.5 });
        this.pvelocity = [];
        for (var x = 0; x < 20; x++) {
            for (var y = 0; y < 20; y++) {
                for (var z = 0; z < 20; z++) {
                    this.pvelocity.push(new THREE.Vector3(0, 0, 0));
                    var particle = new THREE.Vector3(x * 10, y * 10, z * 10);
                    geom.vertices.push(particle);
                    //geom.colors.push(new THREE.Color(Math.random() * 0x00ffff));//色を設定
                }
            }
        }
        this.cloud = new THREE.Points(geom, this.pointMaterial);
        this.scene.add(this.cloud);
    }
}
class GuiControl {
    constructor() {
        this.rotationSpeed = 0.00;
    }
}
window.onload = () => {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
};
//# sourceMappingURL=app.js.map