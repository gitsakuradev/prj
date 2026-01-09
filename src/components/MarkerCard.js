export function createMarkerCard(marker) {
  const card = document.createElement('div');
  card.className = 'marker-card';

  card.innerHTML = `
    <h3>Маркер "${marker.name}"</h3>
    <img src="${marker.image}" alt="${marker.name} Marker">
    <p><strong>Используется для:</strong> ${marker.description}</p>
    <button class="btn" onclick="window.print()">Печать</button>
  `;

  return card;
}