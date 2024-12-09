let currentImage = null;
let filterSettings = {
  grayscale: 0,
  sepia: 0,
  invert: 0,
  contrast: 100
};

function loadImage(event) {
  const image = document.getElementById('image');
  image.src = URL.createObjectURL(event.target.files[0]);
  currentImage = image;
}

function updateFilter(filterType) {
  const value = document.getElementById(`${filterType}Range`).value;
  filterSettings[filterType] = value;
  applyFilters();
}

function applyFilters() {
  if (currentImage) {
    const { grayscale, sepia, invert, contrast } = filterSettings;
    currentImage.style.filter = `grayscale(${grayscale}%) sepia(${sepia}%) invert(${invert}%) contrast(${contrast}%)`;
  }
}

function applyFilter(filterType) {
  const filterValue = filterSettings[filterType];
  document.getElementById(`${filterType}Range`).value = filterValue;
  applyFilters();
}

function removeFilter() {
  if (currentImage) {
    currentImage.style.filter = 'none';
    resetFilterSettings();
  }
}

function resetFilterSettings() {
  filterSettings = {
    grayscale: 0,
    sepia: 0,
    invert: 0,
    contrast: 100
  };

  document.getElementById('grayscaleRange').value = 0;
  document.getElementById('sepiaRange').value = 0;
  document.getElementById('invertRange').value = 0;
  document.getElementById('contrastRange').value = 100;
}

