const {asyncHandler} = require("../utils/asyncHandler.js");
const jwt = require('jsonwebtoken');
const User = require("../models/user.js");
const apiError = require("../utils/apiError.js").apiError;

const jwtVerify = asyncHandler(function(req, res, next) {
    try {
        // console.log(req);
        
        const token = req.cookies && req.cookies.accessToken || req.header("Authorization") && req.header("Authorization").replace("Bearer ", "");
        
        if (!token) {
            throw new apiError(400, "token not found");
        }
        
        
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        
        User.findById(decodedToken ? decodedToken._id : null).select("-password -refreshToken")
            .then(function(user) {
                if (!user) {
                    throw new apiError(401, "invalid access token");
                }
                req.user = user;
                next();
            })
            .catch(function(err) {
                next(err);
            });
    } catch (error) {
      
        
        next(new apiError(404, "token is unauthorized"));
    }
});

module.exports = { jwtVerify };
