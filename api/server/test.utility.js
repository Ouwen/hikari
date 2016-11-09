exports.helper = function (done, execute, next) {
  return function (...args) {
    try {
      execute(...args);
    } catch (e) {
      return done(e);
    }

    if (next) return next();
  }
};
