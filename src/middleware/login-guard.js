

export default (redirectURL, publicURLs) => {

  const isPublicURL = (url) => {
    return publicURLs.filter((_url) => url.startsWith(_url)).length > 0;
  }

  return (req, res, next) => {

    if (req.isAsset || isPublicURL(req.url)) {
      return next();
    }

    if (!req.isAuthorized) {
      return redirect(redirectURL, res);
    }

    next();
  };
}


/**
 * Helper for redirecting to a url ― particularly for not-authorized responses
 * @param {Response} res
 * @param {string} location
 */
const redirect = (redirectURL, res) => {
  const str = `Redirecting to ${redirectURL}`;
  res.writeHead(302, {
      Location: redirectURL,
      'Content-Type': 'text/plain',
      'Content-Length': str.length,
  });
  res.end(str);
}