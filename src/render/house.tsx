import * as THREE from "three";
import {IColors, ICoord, IPos} from "../model/model";
import {Group} from "three";

const houseGroup = new THREE.Group();

interface CreateRoofWindowProps extends ICoord {
	color: string | number,
	radB: number,
	radT: number,
	height: number,
	segments: number,
}

interface CreateBoxShapeProps extends ICoord, IPos {
	color: string | number,
	rShadow: boolean,
	cShadow: boolean,
	group: Group,
}

interface createHouseProps {
	colors: IColors,
	mainGroup: Group,
}

export const createRoofWindow = ({x, y, z, color, radB, radT, height, segments}: CreateRoofWindowProps) => {
	const geo = new THREE.CylinderBufferGeometry(radB,radT,height,segments);
	const mat = new THREE.MeshLambertMaterial({ color: color });
	const window = new THREE.Mesh(geo, mat);
	window.rotation.z = THREE.MathUtils.degToRad(90);
	window.position.set(x,y,z);
	houseGroup.add(window);
}

export const createBoxShape =  ({x, y, z, posX, posY, posZ, color, rShadow, cShadow, group}: CreateBoxShapeProps) => {
	const geo = new THREE.BoxBufferGeometry(x,y,z);
	const mat = new THREE.MeshLambertMaterial({color:color});
	const mesh = new THREE.Mesh(geo,mat);
	mesh.position.set(posX, posY, posZ);
	mesh.receiveShadow = rShadow
	mesh.castShadow = cShadow
	group.add(mesh);
}

export const createHouse = ({mainGroup, colors}: createHouseProps) => {
	const boxGeo = new THREE.BoxBufferGeometry();
	// house
	const houseMat = new THREE.MeshLambertMaterial({ color: colors.house });
	const house = new THREE.Mesh(boxGeo, houseMat);
	house.position.set(-1, 0.75, 1);
	house.scale.set(1.2,1,1.5);
	house.receiveShadow = true;
	house.castShadow = true;
	houseGroup.add(house);
	// roof
	const roofGeo = new THREE.ConeBufferGeometry(1.1, 0.7, 4);
	const roofMat = new THREE.MeshLambertMaterial({ color: colors.red });
	const roof = new THREE.Mesh(roofGeo, roofMat);
	roof.position.set(-1, 1.6, 1);
	roof.rotation.y = THREE.MathUtils.degToRad(45);
	roof.castShadow = true;
	roof.receiveShadow = true
	houseGroup.add(roof);
	// roof chimney
	const chimneyMat = new THREE.MeshLambertMaterial({ color:colors.house });
	const chimney = new THREE.Mesh(boxGeo,chimneyMat);
	chimney.position.set(-1,1.6,0.6);
	chimney.scale.set(0.2,0.3,0.2)
	chimney.receiveShadow = true;
	houseGroup.add(chimney);
	// door
	const doorMat = new THREE.MeshLambertMaterial({ color: colors.purple });
	const door = new THREE.Mesh(boxGeo, doorMat);
	door.scale.set(0.2,0.5,0.35);
	door.position.set(-0.49, 0.545, 1);
	houseGroup.add(door);
	// doorknob
	const knobG = new THREE.SphereBufferGeometry(0.025,8,8)
	const knobMat = new THREE.MeshLambertMaterial({color:colors.gold})
	const knob = new THREE.Mesh(knobG,knobMat);
	houseGroup.add(knob)
	knob.position.set(-0.39,0.5,1.14)
	// doorstep
	createBoxShape({x: 0.05, y: 0.05, z: 0.35, posX: -0.38, posY: 0.27, posZ: 1, color: colors.grey, rShadow: false, cShadow: false, group: houseGroup});
	createBoxShape({x: 0.05, y: 0.05, z: 0.35, posX: -0.34, posY: 0.25, posZ: 1, color: colors.grey, rShadow: false, cShadow: false,  group: houseGroup});
	// windows
	createRoofWindow({ x: -0.65, y: 1.6, z: 1, color: colors.blue, radB: 0.1, radT: 0.1, height: 0.2, segments: 12});
	createRoofWindow({ x: -0.67, y: 1.6, z: 1, color: colors.red, radB: 0.12, radT: 0.12, height: 0.22, segments: 12});
	// roof window bars
	createBoxShape({x: 0.02, y: 0.24, z: 0.025, posX: -0.55, posY: 1.6, posZ: 1, color: colors.red, rShadow: false, cShadow: false, group: houseGroup});
	createBoxShape({x: 0.02, y: 0.02, z: 0.2, posX: -0.55, posY: 1.62, posZ: 1, color: colors.red, rShadow: false, cShadow: false, group: houseGroup});
	// left window
	createBoxShape({x: 0.05, y: 0.3, z: 0.3, posX: -0.41, posY: 0.65, posZ: 1.45, color: colors.blue, rShadow: false, cShadow: false, group: houseGroup});
	// vertical bars
	createBoxShape({x: 0.05, y: 0.3, z: 0.025, posX: -0.40, posY: 0.65, posZ: 1.45, color: colors.brown2, rShadow: false, cShadow: false, group: houseGroup});
	createBoxShape({x: 0.05, y: 0.3, z: 0.025, posX: -0.40, posY: 0.65, posZ: 1.60, color: colors.brown2, rShadow: false, cShadow: false, group: houseGroup});
	createBoxShape({x: 0.05, y: 0.3, z: 0.025, posX: -0.40, posY: 0.65, posZ: 1.30, color: colors.brown2, rShadow: false, cShadow: false, group: houseGroup});
	// horizontal bars
	createBoxShape({x: 0.05, y: 0.025, z: 0.325, posX: -0.40, posY: 0.8, posZ: 1.45, color: colors.brown2, rShadow: false, cShadow: false, group: houseGroup});
	createBoxShape({x: 0.05, y: 0.025, z: 0.325, posX: -0.40, posY: 0.65, posZ: 1.45, color: colors.brown2, rShadow: false, cShadow: false, group: houseGroup});
	createBoxShape({x: 0.05, y: 0.025, z: 0.325, posX: -0.40, posY: 0.5, posZ: 1.45, color: colors.brown2, rShadow: false, cShadow: false, group: houseGroup});
	// right window
	createBoxShape({x: 0.05, y: 0.3, z: 0.3, posX: -0.41, posY: 0.65, posZ: 0.55, color: colors.blue, rShadow: false, cShadow: false, group: houseGroup});
	// vertical bars
	createBoxShape({x: 0.05, y: 0.3, z: 0.025, posX: -0.40, posY: 0.65, posZ: 0.55, color: colors.brown2, rShadow: false, cShadow: false, group: houseGroup});
	createBoxShape({x: 0.05, y: 0.3, z: 0.025, posX: -0.40, posY: 0.65, posZ: 0.70, color: colors.brown2, rShadow: false, cShadow: false, group: houseGroup});
	createBoxShape({x: 0.05, y: 0.3, z: 0.025, posX: -0.40, posY: 0.65, posZ: 0.40, color: colors.brown2, rShadow: false, cShadow: false, group: houseGroup});
	// horizontal bars
	createBoxShape({x: 0.05, y: 0.025, z: 0.325, posX: -0.40, posY: 0.8, posZ: 0.55, color: colors.brown2, rShadow: false, cShadow: false, group: houseGroup});
	createBoxShape({x: 0.05, y: 0.025, z: 0.325, posX: -0.40, posY: 0.65, posZ: 0.55, color: colors.brown2, rShadow: false, cShadow: false, group: houseGroup});
	createBoxShape({x: 0.05, y: 0.025, z: 0.325, posX: -0.40, posY: 0.5, posZ: 0.55, color: colors.brown2, rShadow: false, cShadow: false, group: houseGroup});
	mainGroup.add(houseGroup);
}