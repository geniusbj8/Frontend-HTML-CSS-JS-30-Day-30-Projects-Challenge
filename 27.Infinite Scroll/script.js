let page = 1;
let isLoading = false;

const contentContainer = document.getElementById('content');
const loadingIndicator = document.getElementById('loading');
const scrollbar = document.getElementById('scrollbar');

// Function to fetch data from the API
function fetchData() {
  if (isLoading) return; // Prevent multiple fetch calls
  isLoading = true;

  loadingIndicator.style.display = 'block';

  // Fetching photos from the JSONPlaceholder API (replace with your real API endpoint)
  fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        loadingIndicator.textContent = "No more content!";
        return;
      }

      data.forEach(item => {
        const contentItem = document.createElement('div');
        contentItem.classList.add('item');

        // Render images with their titles
        contentItem.innerHTML = `
          <img src="${item.url}" alt="${item.title}" style="width: 100%; height: auto; border-radius: 8px;">
          <h3>${item.title}</h3>
        `;
        
        contentContainer.appendChild(contentItem);
      });

      page++;
      isLoading = false;
      loadingIndicator.style.display = 'none';
    })
    .catch(error => {
      loadingIndicator.textContent = "Failed to load content. Please try again.";
      console.error('Error fetching data:', error);
      isLoading = false;
      loadingIndicator.style.display = 'none';
    });
}

// Real-time data refresh every 30 seconds
setInterval(() => {
  fetchData();
}, 30000);

// Detect when the user scrolls near the bottom of the page
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // Trigger fetchData when scrolling close to the bottom
  if (scrollHeight - scrollTop <= clientHeight + 50 && !isLoading) {
    fetchData();
  }

  // Update custom scrollbar position
  updateScrollbar();
});

// Update custom scrollbar as user scrolls
function updateScrollbar() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
  scrollbar.style.height = `${scrollPercentage}%`;
}

// Initial data load
fetchData();
