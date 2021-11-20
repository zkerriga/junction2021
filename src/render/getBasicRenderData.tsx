import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {IColors} from "../model/model";

const width = window.innerWidth;
const height = window.innerHeight;
const fov = 75;
const aspectRatio = width / height;
const near = 0.001;
const far = 10;
export const colors: IColors = {
	blue: 0x71b6f7,
	brown: 0x744436,
	brown2: 0xC88247,
	red: 0xfd4d50,
	green: 0xa4d740,
	green2: 0x66b888,
	green3: 0x2C9D3E,
	house: 0xfce3ad,
	purple: 0x6e5370,
	gold: 0xFFF09C,
	grey: 0xB7B398,
	greyBrown: 0xB7B398
};

export const getSettings = (canvasEl: HTMLCanvasElement) => {
	return {
		canvas: canvasEl,
		width,
		height,
		fov,
		aspectRatio,
		near,
		far,
		colors,
	}
};


export const getBasicRenderInstance = (canvasEl: HTMLCanvasElement) => {
	const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
	const renderer = new THREE.WebGLRenderer({
		antialias: true,
		canvas: canvasEl
	});

	return ({
		mainGroup: new THREE.Group(),
		scene: new THREE.Scene(),
		camera,
		renderer,
		controls: new OrbitControls(camera, renderer.domElement),
	});
}