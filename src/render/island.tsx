import * as THREE from "three";

import {Group} from "three";
import gsap from "gsap";
import {IColors} from "../model/model";

interface islandProps {
	colors: IColors,
	mainGroup: Group,
}

export const islandGroup = new THREE.Group();

export const createIsland = ({colors, mainGroup}: islandProps) => {
	// earth
	let coneGeo = new THREE.ConeBufferGeometry(2, 3, 8);
	let mat = new THREE.MeshLambertMaterial({
		color: colors.brown
	});
	let cone = new THREE.Mesh(coneGeo, mat);
	cone.rotation.x = THREE.MathUtils.degToRad(180)
	cone.position.set(0, -1.75, 0);
	islandGroup.add(cone);
	// grass
	let boxGeo = new THREE.BoxBufferGeometry();
	let mat2 = new THREE.MeshLambertMaterial({
		color: colors.green
	});
	let grass = new THREE.Mesh(boxGeo, mat2);
	grass.scale.set(4, 0.5, 4);
	grass.receiveShadow = true;
	islandGroup.add(grass);
	// water
	let mat3 = new THREE.MeshLambertMaterial({
		color: colors.blue
	});
	let water = new THREE.Mesh(boxGeo, mat3);
	water.receiveShadow = true;
	islandGroup.add(water);
	water.scale.set(0.1, 0.5, 4);
	water.position.set(0.75, 0.005, 0.005);
	mainGroup.add(islandGroup);
}

export const animateIsland = ({mainGroup}: Pick<islandProps, 'mainGroup'>) => {
	gsap.to(mainGroup.position,{
		y: '+=0.065',
		repeat: -1,
		yoyo: true,
		ease: "sine.in",
		duration: 2,
		yoyoEase: "sine.inOut"
	})
}