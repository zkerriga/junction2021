import * as THREE from "three";
import {ICoord} from "../model/model";
import {Group} from "three";
import {colors} from "./getBasicRenderData";


export const createBush = (group: Group, {x, y, z}: ICoord) => {
	let geo = new THREE.SphereBufferGeometry(0.12,8,8);
	let mat = new THREE.MeshLambertMaterial({color: colors.green3});
	let bush = new THREE.Mesh(geo,mat);
	bush.position.set(x,y,z);
	bush.receiveShadow = true;
	group.add(bush)
}