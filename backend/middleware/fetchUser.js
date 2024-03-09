const jwt = require('jsonwebtoken');
const JWT_SECRET = "harryisagood$boy";

const fetchUser = (req, res, next) => {
    // Get the user from jwt token and add id to request object
    const token = req.header('auth-token');

    if (!token) {
        res.status(401).send({ error: "ePlease authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);         // check what it returns
        console.log(data);
        req.user = data.user;     // 'req.user' is a object of user data, going to use everywhere where we are using middleware(fetchUser)
        next();
    } catch (error) {
        res.status(401).send({ error: "bPlease authenticate using a valid token" });
    }
}

module.exports = fetchUser;