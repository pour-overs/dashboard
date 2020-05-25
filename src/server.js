// initialize firebase admin sdk
import "./services/firebase.js";

import sirv from 'sirv';
import polka from 'polka';
import helmet from 'helmet';
import compression from 'compression';
import * as sapper from '@sapper/server';
import cookieParser from "cookie-parser";

// middlewares
import setCookie from "./middleware/set-cookie.js";
import isAuthorized from "./middleware/is-authorized.js";
import { isAsset } from "./middleware/is-asset.js";
import loginGuard from "./middleware/is-asset.js";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const loginURL = "/auth/login";
const publicURLs = ["/auth"];

polka() // You can also use Express
  .use(
    helmet(),
    cookieParser(),
    setCookie(),
    isAsset("static"),
    isAuthorized(),
    loginGuard(loginURL, publicURLs),
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware()
  )
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });
