//assigns req.session.user to res.locals.user to make available in views
//REQ.session.user => RES.locals.user
//if no user found, set to null
//then allow request to continue with next()

const passUserToView = (req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null;
    // or: 
    // if (req.session.user) {
    //     res.locals.user = req.session.user;
    //   } else {
    //     res.locals.user = null;
    //   }
    next();
};






module.exports = passUserToView;