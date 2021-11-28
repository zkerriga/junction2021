import * as THREE from "three";
import {Group, Mesh} from "three";
import gsap from "gsap";

export const createPuffs = (puffCount: number, puffs: Mesh[], houseGroup: Group) => {
	for (let i = 0; i < puffCount; i++) {
		const geo = new THREE.SphereBufferGeometry(0.1,6, 6);
		const mat = new THREE.MeshLambertMaterial({color:0x000000,transparent:true});
		const puff = new THREE.Mesh(geo,mat);
		puffs.push(puff);
		houseGroup.add(puff);
		puff.position.set(-1,1.74,0.6);
		puff.scale.set(0,0,0);
	}
}

// animate single puff
export const animatePuff = (puff: Mesh) => {
	const tl = gsap.timeline({onComplete:animatePuff,onCompleteParams:[puff],onStart:() => {
			gsap.set(puff.material,{opacity:1})
			gsap.set(puff.scale,{x:0,y:0,z:0})
			gsap.set(puff.position,{y:1.74})
		}})
	tl.to(puff.position,{y:'+=0.6',duration:2,delay:0.6,ease:"sine.inOut",onStart:() => {
			gsap.to(puff.scale,{keyframes:[{x:1,y:1.4,z:1},{z:1.4,duration:0.24},{y:0.8,delay:-0.44,duration:0.24},{x:1,y:1}]})
			gsap.to(puff.material,{opacity:0,duration:1.32,delay:0.68})
		}})
}