const roleAuthorization = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ success: false, message: `Access denied. Requires ${role} role.` });
        }
        next();
    };
};

module.exports = { roleAuthorization };