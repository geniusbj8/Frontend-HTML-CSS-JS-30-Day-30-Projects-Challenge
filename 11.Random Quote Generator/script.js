const quoteText = document.getElementById("quote-text");
const newQuoteBtn = document.getElementById("new-quote-btn");

// Function to get a random quote from the API
async function getRandomQuote() {
  try {
    const response = await fetch('http://api.quotable.io/random');
    const data = await response.json();
    quoteText.innerText = `"${data.content}" — ${data.author}`;
  } catch (error) {
    quoteText.innerText = "Oops! Something went wrong.";
  }
}

// Event listener for the button
newQuoteBtn.addEventListener("click", getRandomQuote);

// Initialize with a random quote
getRandomQuote();
