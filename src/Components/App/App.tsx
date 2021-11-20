import gsap from 'gsap';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { getBasicRenderInstance, getSettings } from "../../render/getBasicRenderData";
import { setup } from "../../render/setup";
import { createIsland, animateIsland } from "../../render/island";
import { createParticles, animateParticles, animateDrop } from "../../render/particles";
import { createHouse } from "../../render/house";
import {animateBunny, animateBunnyEyes, createBunny} from "../../render/bunny";
import {createMailbox} from "../../render/mailbox";
import { Mesh } from "three";
import {createTree} from "../../render/tree";
import {createBush} from "../../render/bush"
import {animatePuff, createPuffs} from "../../render/puff";
import {animateDet, animateDet2} from "../../render/waterDetail";
import {ActionType} from "../../store/reducer";


interface AppProps {
	dispatch:  React.Dispatch<ActionType>
}

const App = ({ dispatch }: AppProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);


	useEffect(() => {
		if (canvasRef.current) {
			const { canvas, colors, width, height} = getSettings(canvasRef.current);
			const { mainGroup, scene, camera, renderer, controls} = getBasicRenderInstance(canvas);

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

			// Bunny
			let pivot1 = new THREE.Group();
			let pivot2 = new THREE.Group();
			let pivot3 = new THREE.Group();
			let bunnyGroup1 = new THREE.Group();
			let bunnyGroup2 = new THREE.Group();
			let bunnyGroup3 = new THREE.Group();

			// render
			const render = () => {
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
			createIsland({ colors, mainGroup });
			animateIsland({ mainGroup });

			createParticles({
				color: colors.blue,
				particleAmount: dropCount,
				particleArray: drops,
				scaleY: 0.1, scaleX: 0.1, scaleZ: 0.1,
				posX: 0.56, posX2: 0.95, posY: 0, posY2: -0.19, posZ: 1.95, posZ2: 1.95,
				opacity: 1,
				rotX: 0, rotY:0, rotZ:0,
			});

			animateParticles(animateDrop, drops);

			createParticles({
				color: "white",
				particleAmount: detailCount,
				particleArray: dets,
				scaleY: 0.025, scaleX: 0.025, scaleZ: 0.025,
				posX: 0.60, posX2: 0.92, posY: 0.25, posY2: 0.26, posZ: 1.8,posZ2: -1.8,
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
			animateParticles(animateDet,dets);
			animateParticles(animateDet2,dets2);
			// trees
			// trees next to house
			// createTree(0, 0.75, -0.1, 0, 1.2, -0.1, treeGroup, mainGroup);
			// createTree(-1.50, 0.75, -0.1, -1.50, 1.2, -0.1, treeGroup, mainGroup);
			// createTree(-0.75, 0.75, -0.5, -0.75, 1.2, -0.5, treeGroup, mainGroup);
			// createTree(0, 0.75, -1, 0, 1.2, -1, treeGroup, mainGroup);
			// createTree(-1.50, 0.75, -1, -1.50, 1.2, -1, treeGroup, mainGroup);
			// createTree(-0.75, 0.75, -1.5, -0.75, 1.2, -1.5, treeGroup, mainGroup);
			createTree(0, 0.5, -0.1, 0, 0.9, -0.1, treeGroup, mainGroup);
			createTree(-1.50, 0.5, -1, -1.50, 0.9, -1, treeGroup, mainGroup);
			createTree(-0.75, 0.5, -1.5, -0.75, 0.9, -1.5, treeGroup, mainGroup);
			// other trees
			createTree(1.5, 0.5, -1.5, 1.5, 0.9, -1.5, treeGroup, mainGroup);
			createTree(1.5, 0.5, 0.5, 1.5, 0.9, 0.5, treeGroup, mainGroup);
			// bushes next to house
			createBush(treeGroup, { x: -0.7, y: 0.28, z: -0.1});
			// createBush(treeGroup, { x: -0.7, y: 0.28, z: -1});
			// createBush(treeGroup, { x: -1.55, y: 0.28, z: -0.6});
			createBush(treeGroup, { x: -1.35, y: 0.28, z: -1.5});
			//treeGroup,
			createBush(treeGroup, {x: 1.5, y: 0.28, z: 1});
			// createBush(treeGroup, {x: 1.5, y: 0.28, z: 0});
			createBush(treeGroup, {x: 1.5, y: 0.28, z: -1});
			// house
			createHouse({colors, mainGroup});
			// chimney smoke
			createPuffs(puffCount, puffs, houseGroup);
			// animate the smoke
			animateParticles(animatePuff, puffs);
			// mailbox
			createMailbox(mainGroup);
			// bunnies
			createBunny(mainGroup, {group: bunnyGroup2, pivotPositionX: -1,pivotPositionY:  0.33, pivotPositionZ: -1, pivot: pivot2});

			render();
		}
	}, [canvasRef])

	return (
		<div>
			<h1>Junction 21</h1>
			<canvas ref={canvasRef} />
		</div>
	);
};

export default App;