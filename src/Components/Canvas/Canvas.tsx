import React, {useEffect, useRef, useState} from 'react';
import {colors, getBasicRenderInstance, getSettings} from "../../render/getBasicRenderData";
import {Mesh, MeshLambertMaterial} from "three";
import * as THREE from "three";
import { setup } from "../../render/setup";
import { animateIsland, createIsland } from "../../render/island";
import { animateDrop, animateParticles, createParticles } from "../../render/particles";
import { animateDet, animateDet2 } from "../../render/waterDetail";
import { createTree } from "../../render/tree";
import { createBush } from "../../render/bush";
import { createHouse } from "../../render/house";
import { animatePuff, createPuffs } from "../../render/puff";
import { createMailbox } from "../../render/mailbox";
import { animateBunny, animateBunnyEyes, createBunny } from "../../render/bunny";
import styled from "styled-components";
import { gsap } from "gsap";
import {IColors} from "../../model/model";

const StyledContainer = styled.div`
  	width: 100%;
  	border: 1px solid #E5E5E5;
  	border-radius: 16px;
  	margin-bottom: 16px;
	overflow: hidden;
`

const bunnies = [
	{
	pivot: new THREE.Group(),
	bunnyGroup: new THREE.Group(),
	position: {
		x: 0,
		y: 0.33,
		z: 0.2,
	},
	delay: 0,
}, {
	pivot: new THREE.Group(),
	bunnyGroup: new THREE.Group(),
	position: {
		x: -1,
		y: 0.33,
		z: -1,
	},
	delay: gsap.utils.random(0, 3, 0.4),
}, {
	pivot: new THREE.Group(),
	bunnyGroup: new THREE.Group(),
	position: {
		x: -0.2,
		y: 0.33,
		z: -1.4,
	},
	delay: gsap.utils.random(0, 3, 0.4),
}];

const trees = [
	{
	trunk: {
		x: 0,
		y: 0.5,
		z: -0.1,
	},
	leaves: {
		x: 0,
		y: 0.9,
		z: -0.1,
	},
}, {
	trunk: {
		x: -1.5,
		y: 0.5,
		z: -1,
	},
	leaves: {
		x: -1.5,
		y: 0.9,
		z: -1,
	},
}, {
	trunk: {
		x: -0.75,
		y: 0.5,
		z: -1.5,
	},
	leaves: {
		x: -0.75,
		y: 0.9,
		z: -1.5,
	},
}, {
	trunk: {
		x: 1.5,
		y: 0.5,
		z: -1.5,
	},
	leaves: {
		x: 1.5,
		y: 0.9,
		z: -1.5,
	},
}, {
	trunk: {
		x: 1.5,
		y: 0.5,
		z: 0.5,
	},
	leaves: {
		x: 1.5,
		y: 0.9,
		z: 0.5,
	},
}];

const bushes = [
	{
	x: -0.7,
	y: 0.28,
	z: -0.1,
},{
	x: -1.35,
	y: 0.28,
	z: -1.5,
}, {
	x: 1.5,
	y: 0.28,
	z: 1,
},{
	x: 1.5,
	y: 0.28,
	z: -1,
}];

interface CanvasProps {
	status: number;
	colors: IColors;
}

const Canvas = ({status, colors}: CanvasProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (canvasRef.current) {
			const { canvas, width, height } = getSettings(canvasRef.current);
			const { mainGroup, scene, camera, renderer, controls } = getBasicRenderInstance(canvas);

			// waterfall particles
			let dropCount = 2;
			let drops: Mesh[] = [];

			// water details
			let detailCount = 2;
			let dets: Mesh[] = [];

			let detailCount2 = 2;
			let dets2: Mesh[] = [];

			let treeGroup = new THREE.Group();
			let houseGroup = new THREE.Group();

			// chimney smoke
			const puffCount = 2;
			let puffs: Mesh[] = [];

			const grass = new THREE.MeshLambertMaterial({color: colors.green});
			const roofMat = new THREE.MeshLambertMaterial({ color: colors.red });
			const treesArr: MeshLambertMaterial[] = [];
			const bushesArr: MeshLambertMaterial[] = [];


			// render
			const render = () => {
				grass.setValues({color: colors.green})
				treesArr.forEach(el => el.setValues({color: colors.green2}))
				bushesArr.forEach(el => el.setValues({color: colors.green3}))
				controls.update()
				requestAnimationFrame(render);
				renderer.render(scene, camera);
			};

			// resize
			const resizeHandler = () => {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
			};

			window.addEventListener("resize", resizeHandler);

			setup({ scene, camera, renderer, width, height, controls, mainGroup });
			createIsland(grass, { colors, mainGroup });
			animateIsland({ mainGroup });

			createParticles({
				color: colors.blue,
				particleAmount: dropCount,
				particleArray: drops,
				scaleY: 0.1, scaleX: 0.1, scaleZ: 0.1,
				posX: 0.56, posX2: 0.95, posY: 0, posY2: -0.19, posZ: 1.95, posZ2: 1.95,
				opacity: 1,
				rotX: 0, rotY: 0, rotZ: 0,
			});

			animateParticles(animateDrop, drops);

			createParticles({
				color: "white",
				particleAmount: detailCount,
				particleArray: dets,
				scaleY: 0.025, scaleX: 0.025, scaleZ: 0.025,
				posX: 0.60, posX2: 0.92, posY: 0.25, posY2: 0.26, posZ: 1.8, posZ2: -1.8,
				opacity: 0,
				rotX: 0, rotY: 0, rotZ: 0
			});

			createParticles({
				color: "white",
				particleAmount: detailCount2,
				particleArray: dets2,
				scaleY: 0.025, scaleX: 0.025, scaleZ: 0.025,
				posX: 0.60, posX2: 0.92, posY: -0.2, posY2: 0.23, posZ: 2, posZ2: 2,
				opacity: 0,
				rotX: 0, rotY: 0, rotZ: 0,
			});
			// animate water details
			animateParticles(animateDet, dets);
			animateParticles(animateDet2, dets2);

			// trees
			for (let i = 0; i < trees.length; i++) {
				let mat2 = new THREE.MeshLambertMaterial({color: colors.green2});
				let tree = trees[i];
				treesArr.push(mat2);

				createTree(mat2, tree.trunk.x, tree.trunk.y, tree.trunk.z, tree.leaves.x, tree.leaves.y, tree.leaves.z, treeGroup, mainGroup);
			}
			// bushes
			for (let i = 0; i < bushes.length; i++) {
				let mat = new THREE.MeshLambertMaterial({color: colors.green3});
				let bush = bushes[i];
				bushesArr.push(mat);

				createBush(mat, treeGroup, { x: bush.x, y: bush.y, z: bush.z});
			}
			// house
			createHouse(roofMat,{ colors, mainGroup });
			// chimney smoke
			createPuffs(puffCount, puffs, houseGroup);
			// animate the smoke
			animateParticles(animatePuff, puffs);
			// mailbox
			createMailbox(mainGroup);
			// bunnies
			for (let i = 0; i < bunnies.length; i++) {
				let bunny = bunnies[i];
				createBunny(mainGroup, { group: bunny.bunnyGroup, pivotPositionX: bunny.position.x, pivotPositionY: bunny.position.y, pivotPositionZ: bunny.position.x, pivot: bunny.pivot });
				animateBunny(bunny.pivot, bunny.delay);
				animateBunnyEyes(bunny.bunnyGroup, bunny.delay);
			}

			render();
		}
	}, [canvasRef])


	return (
		<StyledContainer>
			<canvas ref={canvasRef} height={window.innerHeight * 0.6}/>
		</StyledContainer>
	);
};

export default Canvas;