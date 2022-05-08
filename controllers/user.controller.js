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
            res.status(201).json({
              user: {
                email: user.email,
                full_name: user.full_name,
                username: user.username,
                profile_image_url: user.profile_image_url,
                age: user.age,
                phone_number: user.phone_number,
              },
            });
          })
          .catch((e) => {
            console.log(e);
            res.status(503).json(e.errors);
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

exports.loginUser = async (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;
  await User.findOne({
    where: {
      email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          name: "User Login Error",
          message: `User's with email "${email}" not found`,
        });
      }

      const isCorrect = comparePassword(password, user.password);

      if (!isCorrect) {
        return res.status(400).json({
          name: "User Login Error",
          message: `User's password with email "${email}" doesn't match`,
        });
      }
      let payload = {
        full_name: user.full_name,
        email: user.email,
        username: user.username,
        profile_image_url: user.profile_image_url,
        age: user.age,
        phone_number: user.phone_number,
      };
      const token = generateToken(payload);
      return res.status(200).json({ token });
    })
    .catch((err) => {
      return res.status(401).json(err);
    });
};
