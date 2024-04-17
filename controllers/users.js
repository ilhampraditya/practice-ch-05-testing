let { createUser, getAuth } = require("../services/users")

module.exports = {
  create: async (req, res, next) => {
    try {
      let { name, email, password } = req.body
      try {
        let user = await createUser(name, email, password)
        return res.status(201).json({
          status: true,
          message: "OK",
          data: user,
        })
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err,
          data: null,
        })
      }
    } catch (err) {
      next(err)
    }
  },
 login: async (req, res, next) => {
    try {
        const { email, password } = req.body;
        try {
            let user = await getAuth(email, password);
            return res.status(200).json({
                status: 200,
                message: "OK",
                data: user
            });
        } catch (err) {
            return res.status(400).json({
                status: false,
                message: err,
                data: null
            });
        }
    } catch (err) {
        next(err);
    }
}
}
