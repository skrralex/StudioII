function enableRotation(square) {
  let center = { x: 0, y: 0 };
  let initialAngle = 0;
  let currentRotation = 0;
  let lastClickAngle = 0;

  // Load sound
  const clickSound = new Audio('click.wav');

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

    currentRotation += angleDiff * (180 / Math.PI);
    square.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;

    // Play click every 15 degrees of rotation
    if (Math.abs(currentRotation - lastClickAngle) >= 15) {
      clickSound.currentTime = 0;
      clickSound.play();
      lastClickAngle = currentRotation;
    }

    initialAngle = newAngle;
  });
}
