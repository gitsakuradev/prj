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