const { User } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../middlewares/auth");

exports.registerUser = async (req, res) => {
  const body = req.body;
  const fullName = body.full_name;
  const email = body.email;
  const username = body.username;
  const password = body.password;
  const profileImageUrl = body.profile_image_url;
  const age = body.age;
  const phoneNumber = body.phone_number;
  await User.findOne({
    where: {
      email,
    },
  })
    .then((user) => {
      if (user) {
        return res.status(400).send({
          message: "Email already exists",
        });
      } else {
        User.create({
          full_name: fullName,
          email: email,
          username: username,
          password: hashPassword(password),
          profile_image_url: profileImageUrl,
          age: age,
          phone_number: phoneNumber,
        })
          .then((user) => {
            const token = generateToken({
              full_name: user.full_name,
              email: user.email,
              username: user.username,
              profile_image_url: user.profile_image_url,
              age: user.age,
              phone_number: user.phone_number,
            });
            res.status(200).send({
              status: "SUCCESS",
              message: "User Berhasil Dibuat",
              data: user,
              token: token,
            });
          })
          .catch((e) => {
            res.status(503).send({
              status: "FAIL",
              message: "Gagal membuat user",
            });
          });
      }
    })
    .catch((e) => {
      res.status(500).send({
        status: "FAIL",
        message: "Gagal membuat user",
      });
    });
};
