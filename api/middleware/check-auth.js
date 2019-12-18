const jwt = require('jsonwebtoken');
const key = require('../../setup/myurl').secret;
module.exports = (req,res,next) =>{

    const tokens = req.header('Authorization');
    if (!tokens)
     return res.status(401).json({
       message:'Access denied. No token provided'
      });
  try {
     const decoded =  jwt.verify(tokens, key);
     req.customerData = decoded;
     next();
  } catch (error) {
      res.status(401).json({
          message: 'Access denied'
    });
  }
};