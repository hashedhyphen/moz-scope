import https from 'https';

export default class Request {
  static queryPage(url) {
    const origin = `https://developer.mozilla.org`;

    return new Promise((resolve, reject) => {
      try {
        if (!url.startsWith(origin)) { throw `URL's origin is invalid`; }

        https.get(url, (res) => {
          if (res.statusCode !== 200) {
            throw `Got non-200 status code: ${res.statusCode}`;
          }

          res.setEncoding(`utf8`);
          res.on(`data`, (chunk) => console.log(chunk));
          res.on(`end`, () => resolve());
        }).on(`error`, (err) => { throw err; });
      } catch (err) { reject(err); }
    });
  }
}
