import * as THREE from "three";
import {IColors, ICoord, IPivotPos, IPos} from "../model/model";
import {Group} from "three";
import gsap from "gsap";

const bunnyColors = [0xFFFFFF,0xEAEAEA,0xCFAF8E];

const bunnyEyes = [{
	x: 0.02,
	y: 0.02,
	z: 0.02,
	color: "black",
	posX: 0.025,
	posY: 0.02,
	posZ: 0.25,
}, {
	x: 0.02,
	y: 0.02,
	z: 0.02,
	color: "black",
	posX: -0.025,
	posY: 0.02,
	posZ: 0.25,
}];

const bunnyEars = [{
	x: 0.025,
	y: 0.14,
	z: 0.025,
	posX: 0.025,
	posY: 0.05,
	posZ: 0.23,
}, {
	x: 0.025,
	y: 0.14,
	z: 0.025,
	posX: -0.025,
	posY: 0.05,
	posZ: 0.23,
}];

interface CreateBunnyShapeProps extends ICoord, IPos {
	group: Group,
	color: string | number,
}

interface CreateBunnyProps extends IPivotPos {
	group: Group,
	pivot: Group,
}

export const createBunnyShape = ({group, x, y, z, color, posX, posY, posZ}: CreateBunnyShapeProps) => {
	let geo = new THREE.BoxBufferGeometry(x,y,z);
	let mat = new THREE.MeshLambertMaterial({color: color, transparent:true});
	let mesh = new THREE.Mesh(geo, mat);
	mesh.position.set(posX, posY, posZ);
	mesh.receiveShadow = true;
	mesh.castShadow = true;
	group.add(mesh);
}

export const createBunny = (mainGroup: Group, {group, pivotPositionX, pivotPositionY, pivotPositionZ, pivot}: CreateBunnyProps) => {
	const bunnyColor = bunnyColors[Math.round(Math.random() * 2)]
	// head
	createBunnyShape({group, x: 0.1, y: 0.1, z: 0.1, color: bunnyColor, posX: 0, posY: 0, posZ: 0.2});
	// ears
	for (let i = 0; i < bunnyEars.length; i++) {
		let ear = bunnyEars[i];
		createBunnyShape({group, x: ear.x, y: ear.y, z: ear.z, color: bunnyColor, posX: ear.posX, posY: ear.posY, posZ: ear.posZ});
	}
	// eyes
	for (let i = 0; i < bunnyEyes.length; i++) {
		let eye = bunnyEyes[i];
		createBunnyShape({group, x: eye.x, y: eye.y, z: eye.z, color: eye.color, posX: eye.posX, posY: eye.posY, posZ: eye.posZ});
	}

	mainGroup.add(group);
	const box = new THREE.Box3().setFromObject( group );
	box.getCenter( group.position ); // this re-sets the mesh position
	group.position.multiplyScalar( - 1 );
	pivot.add( group );
	pivot.position.set(pivotPositionX,pivotPositionY,pivotPositionZ);
	mainGroup.add(pivot);
}

export const animateBunnyEyes = (group: Group, delay: number) => {
	const tl = gsap.timeline({repeat:-1,repeatDelay:1,defaults:{duration:0.2},delay:delay})
	// @ts-ignore
	const eyes = [group.children[3].material, group.children[4].material]
	tl.to(eyes,{keyframes:[{opacity:0},{opacity:1}]},'blink')
	return tl;
}

export const animateBunny = (pivot: Group, delay: number) => {
	const tl = gsap.timeline({repeat:-1,defaults:{duration:0.32},delay:delay});

	tl.to(pivot.position,{keyframes:[{y:'+=0.1',z:'+=0.1'},{y:'-=0.1'},{y:'+=0.1',z:'+=0.1'},{y:'-=0.1'}]})
		.to(pivot.rotation,{y:3,duration:0.6,delay:0.16})
		.to(pivot.position,{keyframes:[{y:'+=0.1',z:'-=0.1'},{y:'-=0.1'},{y:'+=0.1',z:'-=0.1'},{y:'-=0.1'}]})
		.to(pivot.rotation,{y:0,duration:0.6,delay:0.16})

	return tl;
}