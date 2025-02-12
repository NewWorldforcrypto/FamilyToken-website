import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.139.0/build/three.module.js';

let scene, camera, renderer, stars = [];

function init() {
    // Scene Setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('heroCanvas'), alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create Stars
    let starGeometry = new THREE.SphereGeometry(0.2, 24, 24);
    let starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < 200; i++) {
        let star = new THREE.Mesh(starGeometry, starMaterial);
        star.position.set(
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50
        );
        scene.add(star);
        stars.push(star);
    }

    camera.position.z = 5;
    animate();
}

// Animate Stars
function animate() {
    requestAnimationFrame(animate);
    stars.forEach(star => star.position.z += 0.02);
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

init();