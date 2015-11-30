import https from 'https';

export default class Request {
  static fetch(url) {
    const origin = `https://developer.mozilla.org`
        , suffix = `$history`;

    return new Promise((resolve, reject) => {
      try {
        if (!url.startsWith(origin)) {
          reject({
            url, msg: `URL's origin is invalid`
          });
        }

        if (!url.endsWith(suffix)) { url += suffix; }
        console.log(`requesting... ${url}`);
        https.get(url, (res) => {
          if (res.statusCode !== 200) {
            reject({
              url, msg: `Got a non-200 status code: ${res.statusCode}`
            });
          }

          let body = ``;
          res.setEncoding(`utf8`);
          res.on(`data`, (chunk) => body += chunk);
          res.on(`end`,  ()      => resolve(body));

        }).on(`error`, (err) => { reject(err); });

      } catch (err) {
        console.error(`error in request.js: ${url}`);
        reject(err);
      }
    });
  }
}
