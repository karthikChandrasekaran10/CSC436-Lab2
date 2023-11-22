//auth.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAkzN1PG1FPWNEKDUI9conSDTeHrMq4HDaxbOiuip8RZKmkZsh
vnS5K2960oOddEHrMw0IEC7zfNARfCieZyLgg9xO/ecffiw+FQHLYj/NGD6jgQek
fxYIA5+dhNe0aTHAxC1PWue3O8jNgWGNooKpAH38WeDugk8Hchl3nrIg6CzRXRb5
QF/0mQPUrPrK31uJaTGQy5Veq7N7z5ynOYQzsxF36oGDL/xKD+0KSauSaVh4xLZz
/q2LnkRJ67ULQWkTB4pJ83srkkyB1+yVQjS/nz75nwp7TW1EEydASVpz2ad58tlA
NxOnm/HDdkUzeffIr987BRXHH+vZj+fDGMlJoQIDAQABAoIBAHOEAE6JWbrQ+Z2r
8PohyC3r/xuMcutq5OQdEmiSCq/2Y+0EFrkFlIK3m2U0kA255T9MzLUWg1HBXtdW
cOhzAEm6S+sIwzgatCV8IQVbGDIchect/jMVMPjW+6BSPmwG9UV+YTXvfWXXMR6F
VcbgTovqUmyeDc4JAsjRn4PUOeq4f+yRAgqalrECwp4bOgqVflAtfKTN5ibIDjo1
3tCHqy6x1mXZdpyiPHvSfBerZPX3TJRhOLa/7yWpyWPqLvDDM/k9xC8hWqhf1ggL
5OFaEvIW0L6rKW+YZ8QEEVoY+WKLTuYkzE/bOFcbQ9ESzSnWGrAh51n/qOi772F3
pJFZKSECgYEAzaj0bIDhFnNvH4Dcfoj3s0BKTpb6xTMEHr+Ieez9C6C7vlUWnz+t
6hpjHUfQDciiiTV3TKdWbCtxj+nKHwiFx9+OV13+i0we1xJylNr/XIylKWi+gfo9
1WsSexWP/lxBP3SSAqxgOmJ4JwROGcCLDchiBxVs3rPDu0RwT6y2Op0CgYEAtzta
Vg4/p75B/btnzBq9gl4qQ3VZr7K7s/skct/YATlsljbQLtyUnR03N8AvYNJi4Ey5
/IYOpiAj0So6jP7Jw7t5EYKxjKTH7A8Gy2KVpKMnFaSNTMlGjTUMeIQWqMMNj0FX
8W4w+MGOQ4NS/I1bOeH2ALd8sSYY4t1gQ80XCdUCgYBV35d3+vSBsF+VEvR+rWho
Y47jc+1wDBZLVISDDK64fTwHhHX2tttCphP+tO6t4rnjevy+eB0A+77mbaNlA+UA
iVthJbFUrsst2NkZSLxaA6wvNzpdAYVyKMxFssI2XoUsHtuc3CcuGdG70PNfk2M8
tRAhjxOvhfZTqocO7boFjQKBgQC0v8bwRyQCDAu7CYht7h7toIhefT+Ys164P9EH
xMqnAoeccrvQzmWHy08yHtJd14wUKXv6oB+JPwE2D0ss1RYhkCjw3hTZYZ+ZvIT+
UuS9QPiIQAfnLFH9b8w6gkp79dXFcDcZgZKrgPwem0hcu/C227E5qcdGVQeNm8Wf
fIvydQKBgQCPSuFfuJezQ9Jefob+BpthVvGPbqIkSdCvhuLj/wZm3OAN1WmEKEa3
99AWvTkWFLKXUwuYf8dUamfZ9md4heiQPzXNHefEOj2QJleBiw/s6fDU5ClBJYM0
wLhWWtAnaNj4KJNwm+bUp/IR5jSVpe1M+Xi99jTu5fRumRWeYPiTvA==
-----END RSA PRIVATE KEY-----
`;
const saltRounds = 10;

router.use(function (req, res, next) {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      req.hashedPassword = hash;
      next();
    });
  });
});

//register
router.post("/register", async function (req, res, next) {
  if (req.body.username && req.body.password && req.body.passwordConfirmation) {
    if (req.body.password === req.body.passwordConfirmation) {
      const user = new User({
        username: req.body.username,
        password: req.hashedPassword,
      });
      return await user
        .save()
        .then((savedUser) => {
          return res.status(201).json({
            id: savedUser._id,
            username: savedUser.username,
          });
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    }
    res.status(400).json({ error: "Passwords not matching" });
  } else {
    res.status(400).json({ error: "Username or Password Missing" });
  }
});

//login
router.post("/login", async function (req, res, next) {
  if (req.body.username && req.body.password) {
    const user = await User.findOne()
      .where("username")
      .equals(req.body.username)
      .exec();
    if (user) {
      return bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
          if (result === true) {
            const token = jwt.sign({ id: user._id }, privateKey, {
              algorithm: "RS256",
            });
            return res.status(200).json({ access_token: token });
          } else {
            return res.status(401).json({ error: "Invalid credentials." });
          }
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    }
    return res.status(401).json({ error: "Invalid credentials." });
  } else {
    res.status(400).json({ error: "Username or Password Missing" });
  }
});

module.exports = router;
