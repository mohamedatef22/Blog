module.exports = async function (req, res, next) {
  if (req.user.isAdmin) {next();return}
  res.status(401).send('Forbidden request, must be admin')
};
