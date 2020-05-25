// initialize firebase admin sdk
import "./services/firebase.js";

import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import cookieParser from "cookie-parser";

// middlewares
import setCookie from "./middleware/set-cookie.js";
import isAuthorized from "./middleware/is-authorized.js";
import { isAsset } from "./middleware/is-asset.js";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const loginURL = "/auth/login";
const publicURLs = ["/auth"];
const isAuthenticated = false;

polka() // You can also use Express
  .use(
    cookieParser(),
    setCookie,
    isAsset("static"),
    isAuthorized,
    authorization,
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  )
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });


  function authorization(req, res, next) {
    if (!req.isAuthorized) {

      if (isStaticFile(req.url) || isPublicURL(req.url)) {
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

  function isPublicURL(url) {
    return publicURLs.filter((_url) => url.startsWith(_url)).length > 0
  }