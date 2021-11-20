import gsap from 'gsap';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const bunnyEyes = [{
	x: 0.02,
	y: 0.02,
	z: 0.02,
	color: "black",
	posX: 0.025,
	posY: 0.02,
	posZ: 0.25,
}, {
	x: 0.02,
	y: 0.02,
	z: 0.02,
	color: "black",
	posX: -0.025,
	posY: 0.02,
	posZ: 0.25,
}];

const bunnyEars = [{
	x: 0.025,
	y: 0.014,
	z: 0.025,
	posX: 0.025,
	posY: 0.05,
	posZ: 0.23,
}, {
	x: 0.025,
	y: 0.014,
	z: 0.025,
	posX: -0.025,
	posY: 0.05,
	posZ: 0.23,
}];

const bunnies = [{
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

const trees = [{
	trunk: {
		x: 0,
		y: 0.75,
		z: -0.1,
	},
	leaves: {
		x: 0,
		y: 1.2,
		z: -0.1,
	},
}, {
	trunk: {
		x: -0.75,
		y: 0.75,
		z: -0.5,
	},
	leaves: {
		x: -0.75,
		y: 1.2,
		z: -0.5,
	},
}, {
	trunk: {
		x: 0,
		y: 0.75,
		z: -1,
	},
	leaves: {
		x: 0,
		y: 1.2,
		z: -1,
	},
}, {
	trunk: {
		x: -1.5,
		y: 0.75,
		z: -1,
	},
	leaves: {
		x: -1.5,
		y: 1.2,
		z: -1,
	},
}, {
	trunk: {
		x: 1.5,
		y: 0.75,
		z: -1.5,
	},
	leaves: {
		x: 1.5,
		y: 1.2,
		z: -1.5,
	},
}, {
	trunk: {
		x: 1.5,
		y: 0.75,
		z: -0.5,
	},
	leaves: {
		x: 1.5,
		y: 1.2,
		z: -0.5,
	},
}, {
	trunk: {
		x: 1.5,
		y: 0.75,
		z: 0.5,
	},
	leaves: {
		x: 1.5,
		y: 1.2,
		z: 0.5,
	},
}];

const bushes = [{
	x: -0.7,
	y: 0.28,
	z: -0.1,
}, {
	x: -0.7,
	y: 0.28,
	z: -1,
}, {
	x: -1.55,
	y: 0.28,
	z: -0.6,
}, {
	x: -1.35,
	y: 0.28,
	z: -1.5,
}, {
	x: 1.5,
	y: 0.28,
	z: 1,
}, {
	x: 1.5,
	y: 0.28,
	z: 0,
}, {
	x: 1.5,
	y: 0.28,
	z: -1,
}];

const App = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);


	useEffect(() => {
		console.log('canvasRef', canvasRef)
		if (canvasRef.current) {
			// console.clear();
			// @ts-ignore
			let scene, camera, renderer, controls;
			let canvas = canvasRef.current;
			let width = window.innerWidth;
			let height = window.innerHeight;
			let fov = 75;
			let aspectRatio = width / height;
			let near = 0.001 * 100;
			let far = 1000;
			let mainGroup = new THREE.Group();
			let colors = {
				blue: 0x71b6f7,
				brown: 0x744436,
				brown2: 0xC88247,
				red: 0xfd4d50,
				green: 0xa4d740,
				green2: 0x66b888,
				green3: 0x2C9D3E,
				house: 0xfce3ad,
				purple: 0x6e5370,
				gold: 0xFFF09C,
				grey: 0xB7B398,
				greyBrown: 0xB7B398
			};

			const setup = () => {
				// scene
				scene = new THREE.Scene();
				scene.fog = new THREE.FogExp2(0x00c2fe, 0.14);
				// camera
				camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
				scene.add(camera);
				// renderer
				renderer = new THREE.WebGLRenderer({
					antialias: true,
					canvas: canvas
				});
				renderer.setSize(width, height);
				renderer.setPixelRatio(window.devicePixelRatio);
				renderer.setClearColor(0x9ac2fe);
				renderer.shadowMap.enabled = true;
				renderer.shadowMap.type = THREE.PCFSoftShadowMap;
				// @ts-ignore
				renderer.shadowMapSoft = true;
				// controls
				controls = new OrbitControls(camera, renderer.domElement);
				controls.autoRotate = true;
				controls.autoRotateSpeed = 1.6;
				camera.position.set(3.56, 2, 3.4);
				// lights
				let light = new THREE.HemisphereLight(0xffffff, 0x5c9cfe, 1.1);
				scene.add(light);
				//
				let spot = new THREE.SpotLight(0xF6FAFD, 0.06)
				spot.castShadow = true;
				// spot.shadow.camera.left = -1;
				// spot.shadow.camera.right = -1;
				// spot.shadow.camera.top = -1;
				// spot.shadow.camera.bottom = -1;
				spot.shadow.camera.near = 1;
				spot.shadow.camera.far = 100;
				spot.shadow.mapSize.width = 2048;
				spot.shadow.mapSize.height = 2048;
				spot.shadow.camera.fov = 100;
				spot.position.set(-3, 3, 0);
				camera.add(spot);
				// group for all other groups
				mainGroup = new THREE.Group();
				scene.add(mainGroup)
				camera.lookAt(0, 0, 0)
			}

			// objects
			let islandGroup = new THREE.Group();
			const createIsland = () => {
				// earth
				let coneGeo = new THREE.ConeBufferGeometry(2, 3, 8);
				let mat = new THREE.MeshLambertMaterial({
					color: colors.brown
				});
				let cone = new THREE.Mesh(coneGeo, mat);
				cone.rotation.x = THREE.MathUtils.degToRad(180)
				cone.position.set(0, -1.75, 0);
				islandGroup.add(cone);
				// grass
				let boxGeo = new THREE.BoxBufferGeometry();
				let mat2 = new THREE.MeshLambertMaterial({
					color: colors.green
				});
				let grass = new THREE.Mesh(boxGeo, mat2);
				grass.scale.set(4, 0.5, 4);
				grass.receiveShadow = true;
				islandGroup.add(grass);
				// water
				let mat3 = new THREE.MeshLambertMaterial({
					color: colors.blue
				});
				let water = new THREE.Mesh(boxGeo, mat3);
				water.receiveShadow = true;
				islandGroup.add(water);
				water.scale.set(0.1, 0.5, 4);
				water.position.set(0.75, 0.005, 0.005);
				mainGroup.add(islandGroup);
			}

			// waterfall particles
			let dropCount = 100;
			// @ts-ignore
			let drops = [];
			// water details
			let detailCount = 24;
			// @ts-ignore
			let dets = [];
			let detailCount2 = 8;
			// @ts-ignore
			let dets2 = [];

			// creating particles function
			let particleGeo, particleMat, particle;
			// @ts-ignore
			const createParticles = (color, particleAmount, particleArray, scaleX, scaleY, scaleZ, posX, posX2, posY, posY2, posZ, posZ2, opacity, rotX, rotY, rotZ) => {
				particleGeo = new THREE.BoxBufferGeometry();
				particleMat = new THREE.MeshLambertMaterial({
					color: color,
					transparent: true
				});
				for (let i = 0; i < particleAmount; i++) {
					particle = new THREE.Mesh(particleGeo, particleMat);
					islandGroup.add(particle);
					particleArray.push(particle);
					particle.scale.set(scaleX, scaleY, scaleZ);
					particle.position.set(THREE.MathUtils.randFloat(posX, posX2), THREE.MathUtils.randFloat(posY, posY2), THREE.MathUtils.randFloat(posZ, posZ2))
					particle.material.opacity = opacity;
					particle.rotation.set(rotX, THREE.MathUtils.degToRad(rotY), rotZ);
				}
			}

			// function to create various box like shapes of the house and the mailbox
			// @ts-ignore
			const createBoxShape = (x, y, z, xPos, yPos, zPos, color, rShadow, cShadow, group) => {
				let geo = new THREE.BoxBufferGeometry(x, y, z);
				let mat = new THREE.MeshLambertMaterial({ color: color });
				let mesh = new THREE.Mesh(geo, mat);
				mesh.position.set(xPos, yPos, zPos);
				mesh.receiveShadow = rShadow
				mesh.castShadow = cShadow
				group.add(mesh);
			}

			let treeGroup = new THREE.Group();
			// @ts-ignore
			const createTree = (trunkX, trunkY, trunkZ, leavesX, leavesY, leavesZ) => {
				// trunk
				let geo = new THREE.CylinderBufferGeometry(0.1, 0.1, 1, 10);
				let mat = new THREE.MeshLambertMaterial({
					color: colors.brown
				});
				let trunk = new THREE.Mesh(geo, mat);
				treeGroup.add(trunk);
				trunk.position.set(trunkX, trunkY, trunkZ);
				trunk.castShadow = true;
				trunk.receiveShadow = true;
				// leaves
				let geo2 = new THREE.SphereBufferGeometry(0.25, 12, 12);
				let mat2 = new THREE.MeshLambertMaterial({
					color: colors.green2
				});
				let treeLeaves = new THREE.Mesh(geo2, mat2);
				treeLeaves.position.set(leavesX, leavesY, leavesZ);
				treeLeaves.castShadow = true;
				treeLeaves.receiveShadow = true;
				treeGroup.add(treeLeaves);
				mainGroup.add(treeGroup);
			};

			// @ts-ignore
			const createBush = (x, y, z) => {
				let geo = new THREE.SphereBufferGeometry(0.15, 8, 8);
				let mat = new THREE.MeshLambertMaterial({ color: colors.green3 });
				let bush = new THREE.Mesh(geo, mat);
				bush.position.set(x, y, z);
				bush.receiveShadow = true;
				treeGroup.add(bush)
			}

			// house
			let houseGroup = new THREE.Group();

			// roof window function
			// @ts-ignore
			const createRoofWindow = (x, y, z, color, radB, radT, height, segments) => {
				let geo = new THREE.CylinderBufferGeometry(radB, radT, height, segments);
				let mat = new THREE.MeshLambertMaterial({ color: color });
				let window = new THREE.Mesh(geo, mat);
				window.rotation.z = THREE.MathUtils.degToRad(90);
				window.position.set(x, y, z);
				houseGroup.add(window);
			}

			const createHouse = () => {
				let boxGeo = new THREE.BoxBufferGeometry();
				// house
				let houseMat = new THREE.MeshLambertMaterial({ color: colors.house });
				let house = new THREE.Mesh(boxGeo, houseMat);
				house.position.set(-1, 0.75, 1);
				house.scale.set(1.2, 1, 1.5);
				house.receiveShadow = true;
				house.castShadow = true;
				houseGroup.add(house);
				// roof
				let roofGeo = new THREE.ConeBufferGeometry(1.1, 0.7, 4);
				let roofMat = new THREE.MeshLambertMaterial({ color: colors.red });
				let roof = new THREE.Mesh(roofGeo, roofMat);
				roof.position.set(-1, 1.6, 1);
				roof.rotation.y = THREE.MathUtils.degToRad(45);
				roof.castShadow = true;
				roof.receiveShadow = true
				houseGroup.add(roof);
				// roof chimney
				let chimneyMat = new THREE.MeshLambertMaterial({ color: colors.house });
				let chimney = new THREE.Mesh(boxGeo, chimneyMat);
				chimney.position.set(-1, 1.6, 0.6);
				chimney.scale.set(0.2, 0.3, 0.2)
				chimney.receiveShadow = true;
				houseGroup.add(chimney);
				// door
				let doorMat = new THREE.MeshLambertMaterial({ color: colors.purple });
				let door = new THREE.Mesh(boxGeo, doorMat);
				door.scale.set(0.2, 0.5, 0.35);
				door.position.set(-0.49, 0.545, 1);
				houseGroup.add(door);
				// doorknob
				let knobG = new THREE.SphereBufferGeometry(0.025, 8, 8)
				let knobMat = new THREE.MeshLambertMaterial({ color: colors.gold })
				let knob = new THREE.Mesh(knobG, knobMat);
				houseGroup.add(knob)
				knob.position.set(-0.39, 0.5, 1.14)
				// doorstep
				createBoxShape(0.05, 0.05, 0.35, -0.38, 0.27, 1, colors.grey, false, false, houseGroup);
				createBoxShape(0.05, 0.05, 0.35, -0.34, 0.25, 1, colors.grey, false, false, houseGroup);
				// windows
				createRoofWindow(-0.65, 1.6, 1, colors.blue, 0.1, 0.1, 0.2, 12);
				createRoofWindow(-0.67, 1.60, 1, colors.red, 0.12, 0.12, 0.22, 12);
				// roof window bars
				createBoxShape(0.02, 0.24, 0.025, -0.55, 1.6, 1, colors.red, false, false, houseGroup);
				createBoxShape(0.02, 0.02, 0.2, -0.55, 1.62, 1, colors.red, false, false, houseGroup);
				// left window
				createBoxShape(0.05, 0.3, 0.3, -0.41, 0.65, 1.45, colors.blue, false, false, houseGroup);
				// vertical bars
				createBoxShape(0.05, 0.3, 0.025, -0.40, 0.65, 1.45, colors.brown2, false, false, houseGroup);
				createBoxShape(0.05, 0.3, 0.025, -0.40, 0.65, 1.60, colors.brown2, false, false, houseGroup);
				createBoxShape(0.05, 0.3, 0.025, -0.40, 0.65, 1.30, colors.brown2, false, false, houseGroup);
				// horizontal bars
				createBoxShape(0.05, 0.025, 0.325, -0.40, 0.8, 1.45, colors.brown2, false, false, houseGroup);
				createBoxShape(0.05, 0.025, 0.325, -0.40, 0.65, 1.45, colors.brown2, false, false, houseGroup);
				createBoxShape(0.05, 0.025, 0.325, -0.40, 0.5, 1.45, colors.brown2, false, false, houseGroup);
				// right window
				createBoxShape(0.05, 0.3, 0.3, -0.41, 0.65, 0.55, colors.blue, false, false, houseGroup);
				// vertical bars
				createBoxShape(0.05, 0.3, 0.025, -0.40, 0.65, 0.55, colors.brown2, false, false, houseGroup);
				createBoxShape(0.05, 0.3, 0.025, -0.40, 0.65, 0.70, colors.brown2, false, false, houseGroup);
				createBoxShape(0.05, 0.3, 0.025, -0.40, 0.65, 0.40, colors.brown2, false, false, houseGroup);
				// horizontal bars
				createBoxShape(0.05, 0.025, 0.325, -0.40, 0.8, 0.55, colors.brown2, false, false, houseGroup);
				createBoxShape(0.05, 0.025, 0.325, -0.40, 0.65, 0.55, colors.brown2, false, false, houseGroup);
				createBoxShape(0.05, 0.025, 0.325, -0.40, 0.5, 0.55, colors.brown2, false, false, houseGroup);
				mainGroup.add(houseGroup);
			}

			// chimney smoke
			const puffCount = 2;
			// @ts-ignore
			let puffs = [];
			let puff;
			const createPuffs = () => {
				for (let i = 0; i < puffCount; i++) {
					const geo = new THREE.SphereBufferGeometry(0.1, 6, 6);
					const mat = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true });
					puff = new THREE.Mesh(geo, mat);
					puffs.push(puff);
					houseGroup.add(puff);
					puff.position.set(-1, 1.74, 0.6);
					puff.scale.set(0, 0, 0);
				}
			}

			// mailbox
			let mailBoxGroup = new THREE.Group();

			const createMailBoxRoof = () => {
				let mailRoofG = new THREE.ConeBufferGeometry(0.16, 0.1, 4);
				let mailRoofMat = new THREE.MeshLambertMaterial({ color: colors.brown2 });
				let mailRoofMesh = new THREE.Mesh(mailRoofG, mailRoofMat);
				mailRoofMesh.position.set(0, 0.34, 0)
				mailRoofMesh.rotation.y = THREE.MathUtils.degToRad(45);
				mailRoofMesh.receiveShadow = true;
				mailRoofMesh.castShadow = true;
				mailBoxGroup.add(mailRoofMesh);
			}

			const createMailbox = () => {
				createMailBoxRoof();
				// pole
				createBoxShape(0.05, 0.3, 0.05, 0, 0, 0, colors.brown2, true, true, mailBoxGroup);
				// box
				createBoxShape(0.2, 0.2, 0.2, 0, 0.2, 0, colors.brown2, true, true, mailBoxGroup);
				// hole
				createBoxShape(0.05, 0.05, 0.16, 0.085, 0.22, 0, 0x634326, false, false, mailBoxGroup);
				mainGroup.add(mailBoxGroup);
				mailBoxGroup.position.set(1.5, 0.4, 1.5);
			}

			// @ts-ignore
			const createBunnyShape = (group, x, y, z, color, xPos, yPos, zPos) => {
				let geo = new THREE.BoxBufferGeometry(x, y, z);
				let mat = new THREE.MeshLambertMaterial({ color: color, transparent: true });
				let mesh = new THREE.Mesh(geo, mat);
				mesh.position.set(xPos, yPos, zPos);
				mesh.receiveShadow = true;
				mesh.castShadow = true;
				group.add(mesh);
			}

			const bunnyColors = [0xFFFFFF, 0xEAEAEA, 0xCFAF8E];

			// @ts-ignore
			const createBunny = (group, pivotPositionX, pivotPositionY, pivotPositionZ, pivot) => {
				const bunnyColor = bunnyColors[Math.round(Math.random() * 2)]
				// head
				createBunnyShape(group, 0.1, 0.1, 0.1, bunnyColor, 0, 0, 0.2);
				// ears
				for (let i = 0; i < bunnyEars.length; i++) {
					let ear = bunnyEars[i];
					createBunnyShape(group, ear.x, ear.y, ear.z, bunnyColor, ear.posX, ear.posY, ear.posZ);
				}
				// eyes
				for (let i = 0; i < bunnyEyes.length; i++) {
					let eye = bunnyEyes[i];
					createBunnyShape(group, eye.x, eye.y, eye.z, eye.color, eye.posX, eye.posY, eye.posZ);
				}
				mainGroup.add(group);
				// https://stackoverflow.com/questions/28848863/threejs-how-to-rotate-around-objects-own-center-instead-of-world-center
				let box = new THREE.Box3().setFromObject(group);
				box.getCenter(group.position); // this re-sets the mesh position
				group.position.multiplyScalar(- 1);
				pivot.add(group);
				pivot.position.set(pivotPositionX, pivotPositionY, pivotPositionZ);
				mainGroup.add(pivot);

			}

			// GSAP ANIMATIONS
			// make island floaty
			const animateIsland = () => {
				gsap.to(mainGroup.position, { y: '+=0.065', repeat: -1, yoyo: true, ease: "sine.in", duration: 2, yoyoEase: "sine.inOut" })
			}
			// animate single fall particle
			// @ts-ignore
			const animateDrop = (drop) => {
				const tl = gsap.timeline({
					onStart: () => {
						gsap.set(drop.position, { y: gsap.utils.random(-0.17, 0, 0.01) })
						gsap.set(drop.scale, { x: 0.1, y: 0.1, z: 0.1 })
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
						gsap.to(drop.scale, { x: 0, y: 0, z: 0, delay: 0.14, duration: 0.86 })
					}
				});
				return tl;
			};
			// animate single water detail
			// @ts-ignore
			const animateDet = (det) => {
				const tl = gsap.timeline(
					{
						defaults: { duration: 1, ease: "sine.in" },
						onStart: () => {
							gsap.set(det.position, { x: gsap.utils.random(0.60, 0.92), z: gsap.utils.random(-4, 1.8) });
							gsap.set(det.rotation, { y: 0, z: 0 });
							gsap.set(det.material, { opacity: 0 });
						},
						// @ts-ignore
						onComplete: animateDet,
						onCompleteParams: [det]
					}
				)
				tl.to(det.material, { keyframes: [{ opacity: 0.7 }, { opacity: 0 }] }, 'in')
					.to(det.position, { keyframes: [{ z: "+=0.025" }, { z: "-=0.025" }] }, 'in')
					.to(det.rotation, { keyframes: [{ y: "-=0.2" }, { z: "+=0.2" }] }, 'in')

				return tl;
			}

			// @ts-ignore
			const animateDet2 = (det) => {
				const tl = gsap.timeline(
					{
						defaults: { duration: 1, ease: "sine.in" },
						onStart: () => {
							gsap.set(det.position, { x: gsap.utils.random(0.60, 0.92), y: gsap.utils.random(-0.18, 0.20) });
							gsap.set(det.rotation, { y: 0, z: 0 });
							gsap.set(det.material, { opacity: 0 });
						},
						// @ts-ignore
						onComplete: animateDet2,
						onCompleteParams: [det]
					}
				)
				tl.to(det.material, { keyframes: [{ opacity: 0.7 }, { opacity: 0 }] }, 'in')
					.to(det.position, { keyframes: [{ y: "-=0.025" }, { y: "+=0.025" }] }, 'in')
					.to(det.rotation, { keyframes: [{ y: "-=0.2" }, { z: "+=0.2" }] }, 'in')

				return tl;
			}


			// animate single puff
			// @ts-ignore
			const animatePuff = (puff) => {
				const tl = gsap.timeline({
					onComplete: animatePuff, onCompleteParams: [puff], onStart: () => {
						gsap.set(puff.material, { opacity: 1 })
						gsap.set(puff.scale, { x: 0, y: 0, z: 0 })
						gsap.set(puff.position, { y: 1.74 })
					}
				})
				tl.to(puff.position, {
					y: '+=0.6', duration: 2, delay: 0.6, ease: "sine.inOut", onStart: () => {
						gsap.to(puff.scale, { keyframes: [{ x: 1, y: 1.4, z: 1 }, { z: 1.4, duration: 0.24 }, { y: 0.8, delay: -0.44, duration: 0.24 }, { x: 1, y: 1 }] })
						gsap.to(puff.material, { opacity: 0, duration: 1.32, delay: 0.68 })
					}
				})
			}
			// function to loop over particles
			// @ts-ignore
			const animateParticles = (fn, array) => {
				for (let i = 0; i < array.length; i++) {
					fn(array[i])
				}
			}

			// animate the bunny
			// eye blink
			// @ts-ignore
			const animateBunnyEyes = (group, delay) => {
				const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, defaults: { duration: 0.2 }, delay: delay })
				const eyes = [group.children[3].material, group.children[4].material]
				tl.to(eyes, { keyframes: [{ opacity: 0 }, { opacity: 1 }] }, 'blink')
				return tl;
			}

			// hop and move
			// @ts-ignore
			const animateBunny = (pivot, delay) => {
				const tl = gsap.timeline({ repeat: -1, defaults: { duration: 0.32 }, delay: delay })
				tl.to(pivot.position, { keyframes: [{ y: '+=0.1', z: '+=0.1' }, { y: '-=0.1' }, { y: '+=0.1', z: '+=0.1' }, { y: '-=0.1' }] })
					.to(pivot.rotation, { y: 3, duration: 0.6, delay: 0.16 })
					.to(pivot.position, { keyframes: [{ y: '+=0.1', z: '-=0.1' }, { y: '-=0.1' }, { y: '+=0.1', z: '-=0.1' }, { y: '-=0.1' }] })
					.to(pivot.rotation, { y: 0, duration: 0.6, delay: 0.16 })
				return tl;
			}

			// render
			const render = () => {

				// @ts-ignore
				controls.update()
				requestAnimationFrame(render);
				// @ts-ignore
				renderer.render(scene, camera);
			};

			// resize
			const resizeHandler = () => {
				// @ts-ignore
				camera.aspect = window.innerWidth / window.innerHeight;
				// @ts-ignore
				camera.updateProjectionMatrix();
				// @ts-ignore
				renderer.setSize(window.innerWidth, window.innerHeight);
			};

			window.addEventListener("resize", () => {
				resizeHandler();
			});

			setup();
			createIsland();
			animateIsland();
			// waterfall particles creation
			createParticles(
				colors.blue,
				dropCount,
				// @ts-ignore
				drops,
				0.1, 0.1, 0.1,
				0.56, 0.95, 0, -0.19, 1.95, 1.95,
				1,
				0, 0, 0
			);
			// animate waterfall particles
			// @ts-ignore
			animateParticles(animateDrop, drops);
			// water details creation
			createParticles(
				"white",
				detailCount,
				// @ts-ignore
				dets,
				0.025, 0.025, 0.025,
				0.60, 0.92, 0.25, 0.26, 1.8, -1.8,
				0,
				0, 0, 0
			);
			createParticles(
				"white",
				detailCount2,
				// @ts-ignore
				dets2,
				0.025, 0.025, 0.025,
				0.60, 0.92, -0.2, 0.23, 2, 2,
				0,
				0, 0, 0
			);
			// animate water details
			// @ts-ignore
			animateParticles(animateDet, dets);
			// @ts-ignore
			animateParticles(animateDet2, dets2);
			// trees
			for (let i = 0; i < trees.length; i++) {
				let tree = trees[i];
				createTree(tree.trunk.x, tree.trunk.y, tree.trunk.z, tree.leaves.x, tree.leaves.y, tree.leaves.z);
			}
			// bushes
			for (let i = 0; i < bushes.length; i++) {
				let bush = bushes[i];
				createBush(bush.x, bush.y, bush.z);
			}
			// house
			createHouse();
			// chimney smoke
			createPuffs();
			// animate the smoke
			// @ts-ignore
			animateParticles(animatePuff, puffs);
			// mailbox
			createMailbox();

			// bunnies
			for (let i = 0; i < bunnies.length; i++) {
				let bunny = bunnies[i];
				createBunny(bunny.bunnyGroup, bunny.position.x, bunny.position.y, bunny.position.x, bunny.pivot);
				animateBunny(bunny.pivot, bunny.delay);
				animateBunnyEyes(bunny.bunnyGroup, bunny.delay);
			}
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