async function displayQuote() {
  let quote;
  let image;

  try {
    // Fetch quote object from API
    let randomNumber = Math.floor(Math.random() * (10 - 1) + 1);
    let quoteResponse = await fetch('/api/quote?id='+randomNumber+"&partitionKeyValue="+randomNumber);
    quote = await quoteResponse.json();

    // Fetch image object from API
    image = await fetch('/api/image');
    // Preload image
    image = URL.createObjectURL(image);
  } catch (error) {
    quote = { text: `Could not get quote: ${error.message}` };
  }

  // Update background image
  document.body.style.background = image ? `url(${image}) center / cover` : '#f43';

  // Update text
  const div = document.getElementById('quote');
  div.textContent = quote.message;
}