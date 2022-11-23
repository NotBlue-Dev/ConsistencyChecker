/* eslint-disable no-undef */

window.addEventListener('DOMContentLoaded', () => {
    api.on('echoArena.eventsLoaded', () => {
        console.log('eventsLoaded');
        api.send('echoArena.connect', {
            ip: "192.168.1.104",
            port: 6721
        });
    });
    
    api.on('echoArena.connected', () => {
        console.log('connected');
    });

    api.on('three.render', () => {
        console.log('render');
    });
    
    api.on('echoArena.connectionFailed', () => {
        console.log('connectionFailed');
    });
});

let scene = new THREE.Scene();
let aspectRatio = window.innerWidth / window.innerHeight;
let camera = new THREE.PerspectiveCamera(75, aspectRatio, 1, 10000);
camera.position.z = 450;
scene.add(camera);

let bigSphere = new THREE.SphereGeometry(100, 20, 20);
let cover = new THREE.MeshNormalMaterial();
let nucleus = new THREE.Mesh(bigSphere, cover);
scene.add(nucleus);

let renderer = new THREE.CanvasRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);
