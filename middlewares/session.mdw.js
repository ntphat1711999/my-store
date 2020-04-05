module.exports = (req, res, next) => {
  if (!req.signedCookies.sessionId) {
    res.cookie('sessionId', 'expString', {
      signed: true
    });
  }

  next();
}