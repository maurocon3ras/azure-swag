const https = require('https');
const unplashApi = 'https://source.unsplash.com/1600x900?dream';

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  async function getImage() {
    return new Promise((resolve, reject) => {
      https.get(unplashApi, (response) => {
        // API returns a HTTP 302 code, we only want the final image URL
        resolve(response.headers.location);
      }).on('error', (error) => {
        reject(error.message);
      });
    });
  }

  let image = await getImage();

  context.res = {
    body: {
      image
    }
  };
};
