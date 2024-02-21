// verifies user token to determine current user

const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];

    // special request type for displaying all posts on homepage 
    if (bearerToken == "HOME") {
      req.type = "HOME" // request type HOME for post.js
      next();
    } 

    // special request type for deleting post
    else if (bearerToken.substring(0,3) == "DEL"){
      req.type = "DEL" // request type DEL for post.js
      req.del_id = bearerToken.substring(3, bearerToken.length) // id of post to delete
      next();
    } 
    
    // normal route for determining current user
    else {
      jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => { // verify user token is valid
        if (err) {
          return res.status(403).json({ message: 'Token is not valid' });
        }
        req.user = decoded; // decode token and return user
        next();
      });
    }
  } 
  // error if token not provided
  else {
    res.status(403).json({ message: 'Authorization token must be provided' });
  }
}

module.exports = verifyToken;
