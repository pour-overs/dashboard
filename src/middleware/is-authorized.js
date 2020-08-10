import { auth } from "@services/firebase.js";

// https://firebase.google.com/docs/hosting/manage-cache#using_cookies
const SESSION_COOKIE_NAME = "__session";

export default () => (req, res, next) => {
  req.user = null;
  req.isAuthorized = false;

  const sessionCookie = req.cookies[SESSION_COOKIE_NAME];

  if (!sessionCookie || req.isAsset) {
    return next();
  }

  auth.verifySessionCookie(sessionCookie)
    .then( ({ uid, email, name, picture}) => {
      req.isAuthorized = true;
      req.user = { uid, email, name, picture };
    })
    .catch( error => {
      console.log("error verifying session cookie:", error.code);
      if (error.code === "auth/session-cookie-expired") {
        req.sessionExpired = true;
      }
    })
    .finally(() => next());

}