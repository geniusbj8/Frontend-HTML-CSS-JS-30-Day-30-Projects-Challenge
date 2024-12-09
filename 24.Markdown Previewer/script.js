// Select elements
const markdownInput = document.getElementById('markdownInput');
const markdownPreview = document.getElementById('markdownPreview');

// Render Markdown function
function renderMarkdown() {
  const markdownText = markdownInput.value;
  
  // Use markdown.toHTML to convert Markdown text to HTML
  const html = markdown.toHTML(markdownText);
  
  // Set the HTML content to the preview container
  markdownPreview.innerHTML = html;
}

// Add input event listener for live updates
markdownInput.addEventListener('input', renderMarkdown);

// Initialize with a default value (optional)
markdownInput.value = "# Hello, Markdown!\n\nType your markdown here.";
renderMarkdown();
