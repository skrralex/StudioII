const square = document.getElementById('square');

let center = { x: 0, y: 0 };
let initialAngle = 0;
let currentRotation = 0;

square.addEventListener('touchstart', (e) => {
  const rect = square.getBoundingClientRect();
  center = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };

  const touch = e.touches[0];
  initialAngle = Math.atan2(touch.clientY - center.y, touch.clientX - center.x);
});

square.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  const newAngle = Math.atan2(touch.clientY - center.y, touch.clientX - center.x);
  const angleDiff = newAngle - initialAngle;

  // Convert radians to degrees and add to total rotation
  currentRotation += angleDiff * (180 / Math.PI);

  square.style.transform = `rotate(${currentRotation}deg)`;

  // Update initialAngle for smooth continuous rotation
  initialAngle = newAngle;
});
