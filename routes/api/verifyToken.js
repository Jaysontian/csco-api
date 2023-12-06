const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    if (bearerToken == "HOME") {
      req.type = "HOME"
      next();
    } else if (bearerToken.substring(0,3) == "DEL"){
      req.type = "DEL"
      req.del_id = bearerToken.substring(3, bearerToken.length)
      next();
    } else {

      jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Token is not valid' });
        }
        req.user = decoded;
        next();
      });
    }
  } else {
    res.status(403).json({ message: 'Authorization token must be provided' });
  }
}

module.exports = verifyToken;
