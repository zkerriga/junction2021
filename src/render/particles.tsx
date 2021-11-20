import * as THREE from "three";
import { islandGroup } from "./island";
import {MathUtils, Mesh} from "three";
import gsap from "gsap";

interface particlesProps {
	color: number | string,
	particleAmount: number,
	particleArray: Mesh[],
	scaleX: number,
	scaleY: number,
	scaleZ: number,
	posX: number,
	posX2: number,
	posY: number,
	posY2: number,
	posZ: number,
	posZ2: number,
	opacity: number,
	rotX: number,
	rotY: number,
	rotZ: number,
}

export const createParticles = ({
									color,
									particleAmount,
									particleArray,
									scaleX,
									scaleY,
									scaleZ,
									posX,
									posX2,
									posY,
									posY2,
									posZ,
									posZ2,
									opacity,
									rotX,
									rotY,
									rotZ
								}: particlesProps) => {
	const particleGeo = new THREE.BoxBufferGeometry();
	const particleMat = new THREE.MeshLambertMaterial({
		color: color,
		transparent: true
	});

	for (let i = 0; i< particleAmount;i++) {
		const particle = new THREE.Mesh(particleGeo,particleMat);
		islandGroup.add(particle);
		particleArray.push(particle);
		particle.scale.set(scaleX, scaleY, scaleZ);
		particle.position.set(MathUtils.randFloat(posX,posX2), MathUtils.randFloat(posY,posY2), MathUtils.randFloat(posZ,posZ2))
		particle.material.opacity = opacity;
		particle.rotation.set(rotX,MathUtils.degToRad(rotY),rotZ);
	}
}

export const animateParticles = (fn: (elem: Mesh) => any, array: Mesh[]) => {
	for (let i =0; i < array.length; i++) {
		fn(array[i])
	}
}

// animate single fall particle
export const animateDrop = (drop: Mesh) => {
	const tl = gsap.timeline({
		onStart: () => {
			gsap.set(drop.position,{ y: gsap.utils.random(0.022, 0.021, 0.022) })
			gsap.set(drop.scale,{x:0.1,y:0.1,z:0.1})
		},
		// @ts-ignore
		onComplete: animateDrop,
		onCompleteParams: [drop]
	});

	tl.to(drop.position, {
		y: "-=1",
		ease: "linear",
		delay: gsap.utils.random(0, 2, 0.2),
		duration: 1,
		onStart: () => {
			gsap.to(drop.scale,{x: 0, y: 0, z: 0, delay: 0.14, duration: 0.86})
		}
	});

	return tl;
}