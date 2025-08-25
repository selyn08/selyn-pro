import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('hero-canvas');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: container, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);

    const geometry = new THREE.PlaneGeometry(20, 20, 50, 50);
    const material = new THREE.MeshStandardMaterial({
        color: 0x4CA771, // SELYN green
        wireframe: true
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    camera.position.z = 5;

    const light = new THREE.PointLight(0xC0E6BA, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    let clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        // Animate vertices to create a wave effect
        const t = clock.getElapsedTime();
        const positions = plane.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const y = positions.getY(i);
            const x = positions.getX(i);
            const waveX = Math.sin(x * 0.5 + t) * 0.5;
            const waveY = Math.sin(y * 0.5 + t) * 0.5;
            positions.setZ(i, waveX + waveY);
        }
        positions.needsUpdate = true;

        plane.rotation.x += 0.001;
        plane.rotation.y += 0.001;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
});
