import { auth, firestore } from "../../services/firebase.js";

// refererences
// https://firebase.google.com/docs/auth/admin/manage-cookies
// https://firebase.google.com/docs/auth/admin/verify-id-tokens

const settingsRef = firestore.collection("dashboard-settings").doc("global")

function getUserFromToken(idToken) {
  // idToken comes from the client app
  return auth.verifyIdToken(idToken)
    .catch(function (error) {
      console.log("Unable to verify user's idToken");
      return Promise.resolve(null);
    });
}

async function isAllowedUser(emailAddress) {
  const errorMessage = "A problem occured when fetching /dashboard-settings/global";
  const settings = await settingsRef.get()
    .then((document) => {

      if (document.exists) {
        return Promise.resolve(document.data());
      }

      return Promise.resolve(null);
    })
    .catch(err => {
      console.log(err);
    })

  if (settings === null) {
    console.log(errorMessage);
    return false;
  }

  if (!settings.useWhitelist) {
    return true;
  }

  return settings.whitelist.includes(emailAddress.toLowerCase());
}

export async function post(req, res, next) {

  let isValid = false;
  const { id_token } = req.query;

  if (!id_token) {
    return next();
  }

  const user = await getUserFromToken(id_token);

  if (user !== null) {
    const userAllowed = await isAllowedUser(user.email);

    if (userAllowed) {
      const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
      const sessionCookie = await auth.createSessionCookie(id_token, { expiresIn })
        .catch(error => {
          console.log("Failed to create session cookie:", error)
          return Promise.resolve(null);
        });

      if (sessionCookie !== null) {
        isValid = true;

        const options = {
          maxAge: expiresIn,
          httpOnly: true,
          secure: req.url.startsWith("https://"),
          path: "/",
        };
        res.cookie('session', sessionCookie, options);

        return res.json({ isValid });
      }
    }
  }

  res.statusCode = 401;
  res.json({ isValid });
}

export async function del(req, res, next) {

  let isSignedOut = false;

  res.setHeader('Content-Type', 'application/json');

  if (req.user !== null) {
    const secure = req.url.startsWith("https://");
    const expiresIn = new Date(0);
    const options = { maxAge: expiresIn, httpOnly: true, secure, path: "/" };
    res.cookie("session", "", options);

    isSignedOut = true;
  }

  res.end(JSON.stringify({ isSignedOut }));
}