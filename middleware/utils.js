const session = require('express-session');

const sessionMiddleware = session({
    secret: 'your-secret-key', // Replace with a secure secret key
    resave: false,
    saveUninitialized: true
});

const excludeFromAuth = (excludedPaths) => (req, res, next) => {
    const isExcludedPath = excludedPaths.some((path) => req.path.startsWith(path));
    if (isExcludedPath) {
      next();
    } else {
      requireAuth(req, res, next);
    }
  };

const requireAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};

  
module.exports = { excludeFromAuth, sessionMiddleware };
