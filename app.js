async function displayQuote() {
  let quote;
  let image;

  try {
    // Fetch quote object from API
    let randomNumber = Math.floor(Math.random() * (10 - 1) + 1);
    let response = await fetch('/api/quote?id='+randomNumber+"&partitionKeyValue="+randomNumber);
    quote = await response.json();

    // Preload image
    response = await fetch('/api/image');
    let jsonRsp = await response.json();
    image = await fetch(jsonRsp.image);
    const blob = await image.blob();
    image = URL.createObjectURL(blob);
  } catch (error) {
    quote = `Could not get quote: ${error.message}`;
  }

  // Update background image
  document.body.style.background = image ? `url(${image}) center / cover` : '#f43';

  // Update text
  const div = document.getElementById('quote');
  div.textContent = quote.message;
}

setInterval(() => {
  displayQuote();
}, 5000)
