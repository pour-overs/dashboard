import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

// initialize firebase admin sdk
import "./services/firebase.js";


const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const loginURL = "/auth/login";
const isAuthenticated = false;

polka() // You can also use Express
  .use(
    authorization,
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware()
  )
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });


  function authorization(req, res, next) {
    if (!isAuthenticated) {

      if (isStaticFile(req.url) || req.url.startsWith(loginURL)) {
        next();
      }
      else {
        redirectToLogin(res);
      }

      return;
    }

    next();

  };

  function isStaticFile(url) {
    return url.includes(".js") ||
           url.includes(".css") ||
           url.includes(".json") ||
           url.includes(".png");
  }

  /**
   * Helper for redirecting to a url ― particularly for not-authorized
   * @param {Response} res
   * @param {string} location
   */
  function redirectToLogin(res) {
    const str = `Redirecting to ${loginURL}`;
    res.writeHead(302, {
        Location: loginURL,
        'Content-Type': 'text/plain',
        'Content-Length': str.length,
    });
    res.end(str);
  }