function changeBackground(gradient) {
  switch (gradient) {
    case 'gradient1':
      document.body.style.background = 'linear-gradient(45deg, #ff6f61, #ff9a8b)';
      break;
    case 'gradient2':
      document.body.style.background = 'linear-gradient(45deg, #7b2ff7, #d500f9)';
      break;
    case 'gradient3':
      document.body.style.background = 'linear-gradient(45deg, #ff9800, #ff5722)';
      break;
    default:
      document.body.style.background = '#f0f4f8'; // Default color
      break;
  }
}
