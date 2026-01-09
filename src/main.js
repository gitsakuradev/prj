import './style.css';
import { createARScene } from './components/ARScene.js';
import { createMarkerCard } from './components/MarkerCard.js';

class ARNotebook {
  constructor() {
    this.isARActive = false;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadMarkers();
  }

  setupEventListeners() {
    const startBtn = document.getElementById('start-ar-btn');
    const closeBtn = document.getElementById('close-ar-btn');
    const showMarkersBtn = document.getElementById('show-markers-btn');

    startBtn?.addEventListener('click', () => this.startAR());
    closeBtn?.addEventListener('click', () => this.stopAR());
    showMarkersBtn?.addEventListener('click', () => this.toggleMarkers());
  }

  loadMarkers() {
    const container = document.getElementById('markers-container');
    if (!container) return;

    const markers = [
      {
        name: 'Hiro',
        description: 'Вращающийся куб с анимациями',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAACXBIWXMAAAsTAAALEwEAmpwYAAADMElEQVR4nO3dMW7bQBRFUXphb8Rb8R68lSxFmyLpUqRwETiAc05LARKn+PDx/5mZr7vb7Xa73W6329//v+12u91ut9vtdrvdbrfb7Xa73W6326/b39/uc7vdbrfb7Xa73f6/3W6v2e12u91ut9vtdnvNbrfb7Xa73W63vlv13W63f/Xeqk/tdrv9q/dWfWq32+1fvbfqU7vdbv/qvVWf2u12+1fvrfrUbrfbv3pv1ad2u93+1XurPrXb7fav3lv1qd1ut3/13qpP7Xa7/av3Vn1qt9vtX7236lO73W7/6r1Vn9rtdvtX76361G632796b9Wndrvd/tV7qz612+32r95b9andbrd/9d6qT+12u/2r91Z9arfb7V+9t+pTu91u/+q9VZ/a7Xb7V++t+tRut9u/em/Vp3a73f7Ve6s+tdvt9q/eW/Wp3W63f/Xeqk/tdrv9q/dWfWq32+1fvbfqU7vdbv/qvVWf2u12+1fvrfrUbrfbv3pv1ad2u93+1XurPrXb7fav3lv1qd1ut3/13qpP7Xa7/av3Vn1qt9vtX7236lO73W7/6r1Vn9rtdvtX76361G632796b9Wndrvd/tV7qz612+32r95b9andbrd/9d6qT+12u/2r91Z9arfb7V+9t+pTu91u/+q9VZ/a7Xb7V++t+tRut9u/em/Vp3a73f7Ve6s+tdvt9q/eW/Wp3W63f/Xeqk/tdrv9q/dWfWq32+1fvbfqU7vdbv/qvVWf2u12+1fvrfrUbrfbv3pv1ad2u93+1XurPrXb7fav3lv1qd1ut3/13qpP7Xa7/av3Vn1qt9vtX7236lO73W7/6r1Vn9rtdvtX76361G632796b9Wndrvd/tV7qz612+32r95b9andbrd/9d6qT+12u/2r91Z9arfb7V+9t+pTu91u/+q9VZ/a7Xb7V++t+tRut9u/em/Vp3a73f7Ve6s+tdvt9q/eW/Wp3W63f/Xeqk/tdrv9q/dWfWq32+1fvbfqU7vdbv/qvVWf2u12u91ut9vtdrvdbrfb7Xa73W6325/b39/uc7vdbrfb7Xa73W6329/Y39/uc7vdbrfb7Xa73W632+12u91ut9vtdrvdbrfb7Xa73W63r9k/q5vHX2qj4FgAAAAASUVORK5CYII='
      }
    ];

    markers.forEach(marker => {
      container.appendChild(createMarkerCard(marker));
    });
  }

  startAR() {
    if (this.isARActive) return;

    const mainContent = document.getElementById('main-content');
    const arContainer = document.getElementById('ar-scene-container');
    const arScene = document.getElementById('ar-scene');

    mainContent?.classList.add('hidden');
    arContainer?.classList.remove('hidden');

    if (!arScene?.hasChildNodes()) {
      arScene.appendChild(createARScene());
    }

    this.isARActive = true;
  }

  stopAR() {
    const mainContent = document.getElementById('main-content');
    const arContainer = document.getElementById('ar-scene-container');

    arContainer?.classList.add('hidden');
    mainContent?.classList.remove('hidden');

    // Останавливаем камеру
    const video = document.querySelector('video');
    if (video?.srcObject) {
      video.srcObject.getTracks().forEach(track => track.stop());
    }

    this.isARActive = false;
  }

  toggleMarkers() {
    const markerSection = document.getElementById('marker-section');
    markerSection?.classList.toggle('hidden');
    markerSection?.scrollIntoView({ behavior: 'smooth' });
  }
}

// Инициализация приложения
new ARNotebook();

// ============================================
// 📄 src/components/ARScene.js
// ============================================
export function createARScene() {
  const scene = document.createElement('a-scene');
  scene.setAttribute('embedded', '');
  scene.setAttribute('arjs', 'sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;');
  scene.setAttribute('vr-mode-ui', 'enabled: false');
  scene.setAttribute('renderer', 'logarithmicDepthBuffer: true; precision: medium;');

  scene.innerHTML = `
    <a-entity camera></a-entity>

    <a-marker preset="hiro">
      <a-entity position="0 0.5 0">
        <a-box 
          position="0 0 0" 
          rotation="0 45 0" 
          scale="0.8 0.8 0.8"
          color="#667eea"
          animation="property: rotation; to: 0 405 0; loop: true; dur: 4000; easing: linear"
          animation__scale="property: scale; to: 1 1 1; dur: 1000; dir: alternate; loop: true">
        </a-box>

        <a-sphere 
          position="1.5 0 0" 
          radius="0.1" 
          color="#f093fb"
          animation="property: position; to: -1.5 0 0; dur: 2000; dir: alternate; loop: true">
        </a-sphere>
        
        <a-sphere 
          position="0 0 1.5" 
          radius="0.1" 
          color="#f5576c"
          animation="property: position; to: 0 0 -1.5; dur: 2000; dir: alternate; loop: true; delay: 500">
        </a-sphere>

        <a-text 
          value="AR Works!" 
          align="center" 
          color="#ffffff" 
          position="0 1.5 0"
          scale="2 2 2"
          animation="property: position; to: 0 2 0; dur: 1500; dir: alternate; loop: true">
        </a-text>

        <a-torus 
          position="0 -0.8 0" 
          rotation="90 0 0"
          radius="1" 
          radius-tubular="0.05"
          color="#764ba2"
          animation="property: rotation; to: 90 360 0; loop: true; dur: 6000; easing: linear">
        </a-torus>
      </a-entity>

      <a-light type="point" intensity="2" position="0 2 0"></a-light>
    </a-marker>
  `;

  return scene;
}