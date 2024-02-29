const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  AuthenticationError: new GraphQLError('could not authenticate', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({req}) {
    // Check if the request is a GraphQL request
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
      // Extract token from the request body
      token = token.split(' ').pop().trim();
    } 
  
      // ["Bearer", "<tokenvalue>"]
      
        
      
  
      if (!token) {
        return req
      }
  
      // verify token and get user data out of it
      try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
      } catch {
        console.log('Invalid token');        
      }
    
  
    // send to next endpoint
  return req 
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};