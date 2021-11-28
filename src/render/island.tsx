import * as THREE from "three";

import {Group, Mesh, MeshLambertMaterial} from "three";
import gsap from "gsap";
import {IColors} from "../model/model";

interface islandProps {
	colors: IColors,
	mainGroup: Group,
}

export const islandGroup = new THREE.Group();

export const createIsland = (mat2: MeshLambertMaterial, {colors, mainGroup}: islandProps) => {
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
	let grass = new THREE.Mesh(boxGeo, mat2);
	grass.scale.set(4, 0.5, 4);
	grass.receiveShadow = true;
	islandGroup.add(grass);
	// water
	let mat3 = new THREE.MeshLambertMaterial({
		color: colors.blue
	});
	let matDirt = new THREE.MeshLambertMaterial({
		color: colors.brown
	});
	let water = new THREE.Mesh(boxGeo, mat3);
	let dirt = new THREE.Mesh(boxGeo, matDirt);
	water.receiveShadow = true;
	islandGroup.add(water);
	islandGroup.add(dirt);
	dirt.scale.set(0.5, 0.5, 4);
	dirt.position.set(0.75, 0.005, 0.005);
	water.scale.set(0.1, 0.51, 4.01);
	water.position.set(0.75, 0.009, 0.007);
	mainGroup.add(islandGroup);

	return water;
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