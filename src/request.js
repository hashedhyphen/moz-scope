import https from 'https';

export default class Request {
  static fetch(url) {
    const origin = `https://developer.mozilla.org`
        , suffix = `$history`;

    return new Promise((resolve, reject) => {
      try {
        if (!url.startsWith(origin)) {
          throw `URL's origin is invalid: ${url}`;
        }

        if (!url.endsWith(suffix)) { url += suffix; }
        https.get(url, (res) => {
          if (res.statusCode !== 200) {
            throw `Got a non-200 status code: ${res.statusCode}`;
          }

          let body = ``;
          res.setEncoding(`utf8`);
          res.on(`data`, (chunk) => body += chunk);
          res.on(`end`,  ()      => resolve(body));

        }).on(`error`, (err) => { throw err; });

      } catch (err) { reject(err); }
    });
  }
}
