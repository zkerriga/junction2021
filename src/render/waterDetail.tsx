import gsap from "gsap";
import {Mesh} from "three";

// animate single water detail
export const animateDet = (det: Mesh) => {
	const tl = gsap.timeline(
		{defaults:{duration:1,ease:"sine.in"},
			onStart:() => {
				gsap.set(det.position,{x:gsap.utils.random(0.72,0.74),z:gsap.utils.random(-1.8,1.8)});
				gsap.set(det.rotation,{y:0,z:0});
				gsap.set(det.material,{opacity:0});
			},
			// @ts-ignore
			onComplete: animateDet,
			onCompleteParams:[det]}
	)
	tl.to(det.material,{keyframes:[{opacity:0.7},{opacity:0}]},'in')
		.to(det.position,{keyframes:[{z:"+=0.025"},{z:"-=0.025"}]},'in')
		.to(det.rotation,{keyframes:[{y:"-=0.2"},{z:"+=0.2"}]},'in')

	return tl;
}

export const animateDet2 = (det: Mesh) => {
	const tl = gsap.timeline(
		{defaults:{duration:1,ease:"sine.in"},
			onStart:() => {
				gsap.set(det.position,{x:gsap.utils.random(0.72,0.74),y:gsap.utils.random(-0.18,0.20)});
				gsap.set(det.rotation,{y:0,z:0});
				gsap.set(det.material,{opacity:0});
			},
			// @ts-ignore
			onComplete: animateDet2,
			onCompleteParams:[det]}
	)
	tl.to(det.material,{keyframes:[{opacity:0.7},{opacity:0}]},'in')
		.to(det.position,{keyframes:[{y:"-=0.025"},{y:"+=0.025"}]},'in')
		.to(det.rotation,{keyframes:[{y:"-=0.2"},{z:"+=0.2"}]},'in')

	return tl;
}