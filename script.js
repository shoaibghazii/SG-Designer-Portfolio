// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xff4d4d, 0.5);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Top Sphere (Upper Left)
const topSphereGeometry = new THREE.SphereGeometry(8, 32, 32); // Larger sphere, radius 8
const topSphereMaterial = new THREE.MeshPhongMaterial({
    color: 0xff4d4d,
    transparent: true,
    opacity: 0.3,
    wireframe: true,
    emissive: 0xff4d4d,
    emissiveIntensity: 0.4
});
const topSphere = new THREE.Mesh(topSphereGeometry, topSphereMaterial);
scene.add(topSphere);

// Bottom Sphere (Lower Right)
const bottomSphereGeometry = new THREE.SphereGeometry(8, 32, 32);
const bottomSphereMaterial = new THREE.MeshPhongMaterial({
    color: 0xff4d4d,
    transparent: true,
    opacity: 0.3,
    wireframe: true,
    emissive: 0xff4d4d,
    emissiveIntensity: 0.4
});
const bottomSphere = new THREE.Mesh(bottomSphereGeometry, bottomSphereMaterial);
scene.add(bottomSphere);

// Position the spheres
topSphere.position.set(-15, 15, -30); // Upper-left: x=-15 (left), y=15 (top), z=-30 (back)
bottomSphere.position.set(15, -15, -30); // Lower-right: x=15 (right), y=-15 (bottom), z=-30 (back)

// Camera position
camera.position.z = 30;

// Animation loop
let time = 0;
function animate() {
    requestAnimationFrame(animate);

    // Subtle rotation for both spheres
    topSphere.rotation.x += 0.003;
    topSphere.rotation.y += 0.003;
    bottomSphere.rotation.x += 0.003;
    bottomSphere.rotation.y += 0.003;

    // Subtle pulsing effect
    time += 0.03;
    const scale = 1 + 0.05 * Math.sin(time);
    topSphere.scale.set(scale, scale, scale);
    bottomSphere.scale.set(scale, scale, scale);

    // Fade opacity for a glowing effect
    topSphere.material.opacity = 0.3 + 0.05 * Math.sin(time);
    bottomSphere.material.opacity = 0.3 + 0.05 * Math.sin(time);

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});