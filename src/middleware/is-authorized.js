import { auth } from "../services/firebase.js";


export default () => (req, res, next) => {
  req.user = null;
  req.isAuthorized = false;

  const sessionCookie = req.cookies.session;

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