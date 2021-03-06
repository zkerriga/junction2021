import * as THREE from "three";
import {Group, MeshLambertMaterial} from "three";
import {colors} from './getBasicRenderData'

export const createTree = (
	mat2: MeshLambertMaterial,
	trunkX: number,
	trunkY: number,
	trunkZ: number,
	leavesX: number,
	leavesY: number,
	leavesZ: number,
	treeGroup: Group,
	mainGroup: Group) => {
	// trunk
	let geo = new THREE.CylinderBufferGeometry(0.05, 0.05, 1, 10);
	let mat = new THREE.MeshLambertMaterial({
		color: colors.brown
	});
	let trunk = new THREE.Mesh(geo, mat);
	treeGroup.add(trunk);
	trunk.position.set(trunkX, trunkY, trunkZ);
	trunk.castShadow = true;
	trunk.receiveShadow = true;

	// leaves
	let geo2 = new THREE.SphereBufferGeometry(0.2, 12, 12);
	let treeLeaves = new THREE.Mesh(geo2, mat2);
	treeLeaves.position.set(leavesX, leavesY, leavesZ);
	treeLeaves.castShadow = true;
	treeLeaves.receiveShadow = true;
	treeGroup.add(treeLeaves);
	mainGroup.add(treeGroup);
}