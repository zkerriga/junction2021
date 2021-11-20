import * as THREE from "three";
import {Group, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

interface ISetup {
	scene: Scene,
	camera: PerspectiveCamera,
	renderer: WebGLRenderer,
	width: number,
	height: number,
	controls: OrbitControls,
	mainGroup: Group,
}

export const setup = ({scene, camera, renderer, width, height, controls, mainGroup}: ISetup) => {
	// scene
	scene.fog = new THREE.FogExp2(0x867c79, 0.14);
	// camera
	scene.add( camera );
	renderer.setSize(width, height);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setClearColor(0xFFFFFF);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	// @ts-ignore
	renderer.shadowMapSoft = true;
	// controls
	controls.autoRotate = true;
	controls.autoRotateSpeed = 1.6;
	camera.position.set(3.56, 2, 3.4);
	// lights
	let light = new THREE.HemisphereLight(0xffffff, 0x5c9cfe, 1.1);
	scene.add(light);
	//
	let spot = new THREE.SpotLight(0xF6FAFD,0.06)
	spot.castShadow = true;
	// spot.shadow.camera.left = -1;
	// spot.shadow.camera.right = -1;
	// spot.shadow.camera.top = -1;
	// spot.shadow.camera.bottom = -1;
	spot.shadow.camera.near = 1;
	spot.shadow.camera.far = 100;
	spot.shadow.mapSize.width = 2048;
	spot.shadow.mapSize.height = 2048;
	spot.shadow.camera.fov = 100;
	spot.position.set(-3,3,0);
	camera.add(spot);
	// group for all other groups
	scene.add(mainGroup)
	camera.lookAt(0,0,0)
}