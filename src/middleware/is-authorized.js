import { auth } from "../services/firebase.js";


export default (req, res, next) => {
  req.user = null;
  req.isAuthorized = false;

  const sessionCookie = req.cookies.session;

  if (!sessionCookie) {
    return next();
  }

  auth.verifySessionCookie(sessionCookie)
    .then( decoded => {
      decoded;
      //console.log(decoded);
    })
    .catch( error => {
      console.log("error verifying session cookie:", error);
    })
    .finally(() => next());

}