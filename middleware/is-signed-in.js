//check if req.session.user exists (if the user has signed into this session?)
//if yes, allow the request to continue on the normal chain using next()
//if no, redirect user to the sign in page

//why is this middleware?
const isSignedIn = (req, res, next) => {
    if (req.session.user) return next();
    res.redirect('/auth/sign-in');
};








module.exports = isSignedIn;