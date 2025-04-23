const square = document.getElementById('square');

let lastTouchX = 0;
let currentRotation = 0;

square.addEventListener('touchstart', (e) => {
  lastTouchX = e.touches[0].clientX;
});

square.addEventListener('touchmove', (e) => {
  const touchX = e.touches[0].clientX;
  const deltaX = touchX - lastTouchX;
  lastTouchX = touchX;

  // Add the movement delta to the current rotation
  currentRotation += deltaX;
  
  // Apply rotation
  square.style.transform = `rotate(${currentRotation}deg)`;
});
