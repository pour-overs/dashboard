import { auth } from "../../services/firebase.js";
// refererence
// https://firebase.google.com/docs/auth/admin/manage-cookies
//

export async function post(req, res, next) {

  let isValid = false;
  const { id_token } = req.query;
  const secure = req.url.startsWith("https://");

  if (!id_token) {
    return next();
  }

  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // To only allow session cookie setting on recent sign-in, auth_time in ID token
  // can be checked to ensure user was recently signed in before creating a session cookie.
  auth.createSessionCookie(id_token, { expiresIn })
    .then((sessionCookie) => {
      isValid = true;
      // Set cookie policy for session cookie.
      const options = {maxAge: expiresIn, httpOnly: true, secure, path:"/"};
      res.cookie('session', sessionCookie, options);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ isValid }));
    }, error => {
      console.log("Failed to create session cookie:", error)
      res.statusCode = 401;
      res.end(JSON.stringify({ isValid, }));
    });
}