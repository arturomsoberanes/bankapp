const admin = require('./admin')

function verifyToken( req, res, next ) {
  try {
    const idToken = req.headers.authorization;
    admin.auth().verifyIdToken(idToken)
      .then(function() {
        next()
      })
  } catch (error) {
    res.send('Authentication Fail!, Error: ' + error)
  }
}

exports.verifyToken = verifyToken

