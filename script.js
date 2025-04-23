const square = document.getElementById('square');

let lastTouchX = 0;
let rotation = 0;

square.addEventListener('touchstart', (e) => {
  lastTouchX = e.touches[0].clientX;
});

square.addEventListener('touchmove', (e) => {
  const currentX = e.touches[0].clientX;
  const deltaX = currentX - lastTouchX;
  lastTouchX = currentX;

  rotation += deltaX; // drag right to increase, left to decrease
  square.style.transform = `rotate(${rotation}deg)`;
});