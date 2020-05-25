import cookie from "cookie";

/** Adds the cookie function for setting the `set-cookie` header on the response
 * @middleware
 * @param {HttpRequest} req The request object
 * @param {HttpResponse} res The response object
 * @param {Function} next A function to be called to continue the middleware chain
 */
export const setCookie = (req, res, next) => {
  res.cookie = (key, value, options) => {
    const cookieOptions = Object.assign({
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 5 // 5 days
    }, options);
    const cookieDocument = cookie.serialize(key, value, cookieOptions);
    res.setHeader('Set-Cookie', cookieDocument);
  };

  next();
}