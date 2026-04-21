module.exports = (schema) => (req, res, next) => {

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).render(req.path.includes("signup") ? "users/signup.ejs" : "users/login.ejs", {
        error: error.details[0].message
        });
    }

    next();
};