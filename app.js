async function displayQuote() {
  let quote;
  let image;

  try {
    // Fetch quote object from API
    let response = await fetch('/api/quote');
    quote = await response.json();

    // Fetch image from API
    let imgrsp = await fetch('/api/image');
    image = await imgrsp.json();

    // Preload image
    response = await fetch(image.image);
    const imag = await response.blob()
    image.image = URL.createObjectURL(imag);
  } catch (error) {
    quote = { text: `Could not get quote: ${error.message}` };
  }

  // Update background image
  document.body.style.background = image.image ? `url(${image.image}) center / cover` : '#f43';

  // Update text
  const div = document.getElementById('quote');
  div.textContent = quote.text;
}
