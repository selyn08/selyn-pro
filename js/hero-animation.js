// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Ensure Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js has not been loaded.');
        return;
    }

    const container = document.getElementById('hero-canvas');

    // Only run the script if the container element exists on the page
    if (container) {
        // 1. Scene Setup
        const scene = new THREE.Scene();

        // 2. Camera
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 20;

        // 3. Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // 4. Lighting
        const pointLight = new THREE.PointLight(0x4CA771, 500, 100); // Primary green light
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        const ambientLight = new THREE.AmbientLight(0xEAF9E7, 0.5); // Soft background light
        scene.add(ambientLight);

        // 5. Objects
        const objectsGroup = new THREE.Group();
        const geometry = new THREE.IcosahedronGeometry(6, 1); // A more detailed shape
        const material = new THREE.MeshStandardMaterial({
            color: 0xC0E6BA, // Soft secondary color
            wireframe: true,
            roughness: 0.5,
            metalness: 0.1,
            transparent: true,
            opacity: 0.7
        });

        const mainObject = new THREE.Mesh(geometry, material);
        objectsGroup.add(mainObject);

        // Add smaller floating particles for a "starfield" effect
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCnt = 500;
        const posArray = new Float32Array(particlesCnt * 3);

        for(let i = 0; i < particlesCnt * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 50;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.025,
            color: 0xEAF9E7
        });
        const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particleMesh);


        scene.add(objectsGroup);

        // 6. Mouse Interaction
        let mouse = new THREE.Vector2();
        document.addEventListener('mousemove', (event) => {
            // Normalize mouse position from -1 to 1
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }, false);

        // 7. Animation Loop
        const clock = new THREE.Clock();
        const animate = () => {
            const elapsedTime = clock.getElapsedTime();

            requestAnimationFrame(animate);

            // Animate objects
            mainObject.rotation.y = .2 * elapsedTime;
            mainObject.rotation.x = .1 * elapsedTime;

            // Animate particles
            particleMesh.rotation.y = -.05 * elapsedTime;

            // Subtle mouse-based camera movement
            camera.position.x += (mouse.x * 5 - camera.position.x) * .05;
            camera.position.y += (mouse.y * 5 - camera.position.y) * .05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        // 8. Handle Window Resize
        const onWindowResize = () => {
            if (container.clientWidth > 0 && container.clientHeight > 0) {
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.clientWidth, container.clientHeight);
            }
        };

        window.addEventListener('resize', onWindowResize);

        // Start animation
        animate();
    }
});
