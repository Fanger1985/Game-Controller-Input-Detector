document.addEventListener("DOMContentLoaded", function() {
  const buttonsContainer = document.getElementById('buttons');
  const axesContainer = document.getElementById('axes');

  function createInputDisplay(type, index) {
    const elem = document.createElement('div');
    elem.classList.add(type);
    elem.id = `${type}-${index}`;
    elem.textContent = `${type.toUpperCase()} ${index}`;
    return elem;
  }

  function updateVisualizer() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (let i = 0; i < gamepads.length; i++) {
      const gp = gamepads[i];
      if (gp) {
        gp.buttons.forEach((button, index) => {
          const buttonElem = document.getElementById(`button-${index}`) || buttonsContainer.appendChild(createInputDisplay('button', index));
          buttonElem.classList.toggle('active', button.pressed);
        });

        gp.axes.forEach((axis, index) => {
          const axisElem = document.getElementById(`axis-${index}`) || axesContainer.appendChild(createInputDisplay('axis', index));
          // Use a threshold to determine if the axis is "active"
          axisElem.classList.toggle('active', Math.abs(axis) > 0.1);
        });
      }
    }
    requestAnimationFrame(updateVisualizer); // Keep the loop going
  }

  window.addEventListener("gamepadconnected", function() {
    updateVisualizer(); // Start updating when a gamepad connects
  });
});