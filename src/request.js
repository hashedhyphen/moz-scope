import https from 'https';

export default class Request {
  static fetch(url) {
    const origin = `https://developer.mozilla.org`
        , suffix = `$history`;

    return new Promise((resolve) => {
      try {
        if (!url.startsWith(origin)) {
          console.error(`Error: URL's origin is invalid`);
          console.error(`URL: ${url}`);
          return resolve(null);
        }

        if (!url.endsWith(suffix)) { url += suffix; }
        console.log(`requesting... ${url}`);
        https.get(url, (res) => {
          if (res.statusCode !== 200) {
            console.error(`Error: non-200 status code: ${res.statusCode}`);
            console.error(`URL: ${url}`);
            return resolve(null);
          }

          let body = ``;
          res.setEncoding(`utf8`);
          res.on(`data`, (chunk) => body += chunk);
          res.on(`end`,  ()      => resolve(body));

        }).on(`error`, (err) => { throw err; });

      } catch (err) {
        console.error(err);
        console.error(`captured in request.js`);
        console.error(`URL: ${url}`);
        resolve(null);
      }
    });
  }
}
