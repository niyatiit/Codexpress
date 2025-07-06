const roleAuthorization = (role) => {
    return (req, res, next) => {
        if (req.user.role !== "student") {
            return res.status(403).json({ success: false, message: `Access denied. Requires student role.` });
        }
        next();
    };
};

module.exports = { roleAuthorization };