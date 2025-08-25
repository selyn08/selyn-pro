import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('digital-hub'); // Attach to a section
    if (!container) return;

    // Create a canvas and append it
    const canvas = document.createElement('canvas');
    container.style.position = 'relative';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.position.z = 5;

    const particles = new THREE.BufferGeometry();
    const count = 500;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0x013237,
        size: 0.05
    });

    const pointCloud = new THREE.Points(particles, material);
    scene.add(pointCloud);

    function animate() {
        requestAnimationFrame(animate);
        pointCloud.rotation.y += 0.001;
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
    });
});
