let hue = 0;
let brightness = 50; // range: 0 to 100

// Click sound if you still want it
const clickSound = new Audio('click.wav');

function updateBackground() {
  // Limit values to sane ranges
  hue = (hue + 360) % 360;
  brightness = Math.min(100, Math.max(0, brightness));
  
  document.body.style.backgroundColor = `hsl(${hue}, 70%, ${brightness}%)`;
}

function enableRotation(square, onRotate) {
  let center = { x: 0, y: 0 };
  let initialAngle = 0;
  let currentRotation = 0;
  let lastClickAngle = 0;

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

    const angleDeg = angleDiff * (180 / Math.PI);
    currentRotation += angleDeg;
    square.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;

    if (Math.abs(currentRotation - lastClickAngle) >= 15) {
      clickSound.currentTime = 0;
      clickSound.play();
      lastClickAngle = currentRotation;
    }

    // Call the external handler
    onRotate(angleDeg);

    updateBackground();
    initialAngle = newAngle;
  });
}

// Hook up the outer square to brightness control
enableRotation(document.getElementById('square-big'), (angleDelta) => {
  brightness += angleDelta * 0.1; // tweak this sensitivity as needed
});

// Hook up the inner square to hue control
enableRotation(document.getElementById('square-small'), (angleDelta) => {
  hue += angleDelta * 0.5; // tweak this sensitivity too
});
