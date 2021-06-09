const permit = (...permittedRoles) => {
  return (req, res, next) => {
    if (permittedRoles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).send({ error: 'Forbidden access' });
    }
  };
};

export default permit;
