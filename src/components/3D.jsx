import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function ArchitecturalMassing3D({ badge = 'RAWASI · 3D TOWER' }) {
  const mountRef = useRef(null);
  const isHoveredRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#EFE9DC');
    scene.fog = new THREE.Fog('#EFE9DC', 8, 18);

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 50);
    camera.position.set(3.4, 1.5, 4.4);
    camera.lookAt(0, 0.1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    container.replaceChildren(renderer.domElement);

    // أرضية فاتحة بلون الترافرتين
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 24),
      new THREE.MeshStandardMaterial({
        color: '#E6DEC9',
        roughness: 0.85,
        metalness: 0.05,
      })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.1;
    ground.receiveShadow = true;
    scene.add(ground);

    // إضاءات واضحة + إضاءة ذهبية دافئة
    scene.add(new THREE.AmbientLight('#FFF9EE', 0.9));

    const sunLight = new THREE.DirectionalLight('#FFF0D4', 2.0);
    sunLight.position.set(5, 7, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(1024, 1024);
    scene.add(sunLight);

    const goldLight = new THREE.PointLight('#E6B85C', 3.5, 9);
    goldLight.position.set(2.0, 1.5, 2.2);
    scene.add(goldLight);

    const fillLight = new THREE.DirectionalLight('#D8E4EE', 0.8);
    fillLight.position.set(-4, 3, -3);
    scene.add(fillLight);

    // بناء البرج
    const towerGroup = new THREE.Group();
    towerGroup.position.set(0, -0.25, 0);

    const stoneMat = new THREE.MeshStandardMaterial({
      color: '#FAF8F3',
      roughness: 0.55,
      metalness: 0.08,
    });

  // خامة بلور بنّي شفاف ولمّاع (Crystal / Tinted Glass)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: '#5C3A21', // لون بلوري برونزي/بني دافئ
      emissive: '#C5A059',
      emissiveIntensity: 0.14, // لمعة ذهبية خفيفة داخل البلور
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.55, // شفافية بلورية تسمح بمرور الضوء والعمق
      ior: 1.55, // معامل انكسار قريب من البلور/الزجاج
      thickness: 1.2, // سماكة تعطي عمقاً للبلور
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.78,
      depthWrite: false, // يمنع حجب الأجزاء الداخلية أو الذهبية خلف البلور
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: '#D4A84F',
      emissive: '#8A6728',
      emissiveIntensity: 0.5,
      roughness: 0.25,
      metalness: 0.85,
    });

    // قاعدة سفلية عريضة
    const podium = new THREE.Mesh(
      new THREE.BoxGeometry(1.85, 0.4, 1.85),
      stoneMat
    );
    podium.position.y = -1.6;
    podium.castShadow = true;
    podium.receiveShadow = true;
    towerGroup.add(podium);

    // شريط ذهبي مضيء فوق القاعدة
    const baseGold = new THREE.Mesh(
      new THREE.BoxGeometry(1.9, 0.05, 1.9),
      goldMat
    );
    baseGold.position.y = -1.38;
    towerGroup.add(baseGold);

    // جسم البرج
    const shaft = new THREE.Mesh(
      new THREE.BoxGeometry(1.18, 3.1, 1.18),
      glassMat
    );
    shaft.position.y = 0.22;
    shaft.castShadow = true;
    shaft.receiveShadow = true;
    towerGroup.add(shaft);

    // زعانف معمارية رأسية
    [-0.59, -0.2, 0.2, 0.59].forEach((xPos) => {
      const frontFin = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 3.08, 0.06),
        stoneMat
      );
      frontFin.position.set(xPos, 0.22, 0.6);
      frontFin.castShadow = true;
      towerGroup.add(frontFin);

      const backFin = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 3.08, 0.06),
        stoneMat
      );
      backFin.position.set(xPos, 0.22, -0.6);
      backFin.castShadow = true;
      towerGroup.add(backFin);
    });

    // فواصل أدوار ذهبية
    [-1.15, -0.8, -0.45, -0.1, 0.25, 0.6, 0.95, 1.3, 1.65].forEach((yVal) => {
      const band = new THREE.Mesh(
        new THREE.BoxGeometry(1.23, 0.025, 1.23),
        goldMat
      );
      band.position.y = yVal;
      towerGroup.add(band);
    });

    // تاج علوي وقمة ذهبية
    const crown = new THREE.Mesh(
      new THREE.BoxGeometry(1.28, 0.16, 1.28),
      stoneMat
    );
    crown.position.y = 1.85;
    crown.castShadow = true;
    towerGroup.add(crown);

    const topGold = new THREE.Mesh(
      new THREE.BoxGeometry(0.98, 0.09, 0.98),
      goldMat
    );
    topGold.position.y = 1.98;
    towerGroup.add(topGold);

    scene.add(towerGroup);

    let frameId;
    let lastTime = performance.now();

    const animate = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const speed = isHoveredRef.current ? 0.14 : 0.32;
      towerGroup.rotation.y += dt * speed;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || width;
      const h = container.clientHeight || height;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      ground.geometry.dispose();
      ground.material.dispose();
      stoneMat.dispose();
      glassMat.dispose();
      goldMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      onMouseEnter={() => {
        isHoveredRef.current = true;
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        setIsHovered(false);
      }}
      className="relative w-full h-[380px] sm:h-[430px] rounded-none bg-[#EFE9DC] border border-[#C5A059]/55 overflow-hidden select-none"
    >
      <span
        style={{ fontFamily: "'Cinzel', serif" }}
        className="absolute top-3.5 start-3.5 z-20 rounded-none bg-[#FAF8F3]/95 border border-[#C5A059]/60 px-2.5 py-1 text-[10px] font-bold tracking-widest text-[#8A6728]"
      >
        {badge}
      </span>

      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}

export default ArchitecturalMassing3D;