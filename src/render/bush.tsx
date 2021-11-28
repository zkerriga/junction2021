import * as THREE from "three";
import {ICoord} from "../model/model";
import {Group, MeshLambertMaterial} from "three";

export const createBush = (mat: MeshLambertMaterial, group: Group, {x, y, z}: ICoord) => {
	let geo = new THREE.SphereBufferGeometry(0.12,8,8);
	let bush = new THREE.Mesh(geo,mat);
	bush.position.set(x,y,z);
	bush.receiveShadow = true;
	group.add(bush)
}