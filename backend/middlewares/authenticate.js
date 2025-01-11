const unprotectedRoutes = ['login', 'register', '', 'queries'];

const isAuthenticated = (req, res, next) => {
    if (unprotectedRoutes.includes(req.path.split('/')[1])) {
        return next();
    }
    
    
    try {
        console.log('cookies are ', req.cookie);
        console.log('headers are ',req.headers.cookie);
        console.log('headers are ',req.headers.cookie.access_token);

        const token = req.headers.cookie.access_token
    
        if (!token) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set in .env
        req.user = decoded; // Attach user data to the request object
        next(); // User is authenticated
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};

module.exports = isAuthenticated;
