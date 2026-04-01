const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// REGISTER
exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password, role } = req.body;

    // simple validation
    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      role
    });

    res.status(201).json({
  message: "User registered",
  user: {
    id: user.id,
    username: user.username,
    role: user.role
  }
});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // create token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      "secret",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};