import * as THREE from "three";
import {Group} from "three";
import {colors} from "./getBasicRenderData";
import {createBoxShape} from "./house";

const mailBoxGroup = new THREE.Group();

export const createMailBoxRoof = () => {
	let mailRoofG = new THREE.ConeBufferGeometry(0.16, 0.1, 4);
	let mailRoofMat = new THREE.MeshLambertMaterial({color: colors.brown2});
	let mailRoofMesh = new THREE.Mesh(mailRoofG, mailRoofMat);
	mailRoofMesh.position.set(0,0.34,0)
	mailRoofMesh.rotation.y = THREE.MathUtils.degToRad(45);
	mailRoofMesh.receiveShadow = true;
	mailRoofMesh.castShadow = true;
	mailBoxGroup.add(mailRoofMesh);
}

export const createMailbox = (mainGroup: Group) => {
	createMailBoxRoof();
	// pole
	createBoxShape({x: 0.05, y: 0.3, z: 0.05, posX: 0, posY: 0, posZ: 0, color: colors.brown2, rShadow: true, cShadow: true, group: mailBoxGroup});
	// box
	createBoxShape({x: 0.2, y: 0.2, z: 0.2, posX: 0, posY: 0.2, posZ: 0, color: colors.brown2, rShadow: true, cShadow: true, group: mailBoxGroup});
	// hole
	createBoxShape({x: 0.05, y: 0.05, z: 0.16, posX: 0.085, posY: 0.22, posZ: 0, color: 0x634326, rShadow: false, cShadow: false, group: mailBoxGroup});
	mainGroup.add(mailBoxGroup);
	mailBoxGroup.position.set(1.5,0.4,1.5);
}