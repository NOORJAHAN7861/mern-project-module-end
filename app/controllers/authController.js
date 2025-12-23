const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { signToken } = require('../services/tokenService');

// Register new user
const register = async (req, res, next) => {
    const { username, password, role } = req.body;

    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ id: user._id, username: user.username, role: user.role });
 
  };

// Login user
const login = async (req, res, next) => {

    const { username, password,role } = req.body;
    const user = await User.findOne({ username,password,role });

 if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
  { sub: user._id, username: user.username, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

    res.json({ message: 'Login successful', token: token });
};


const profile = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing token" });

  const token = authHeader.split(" ")[1]; // ✅ extract token

  try {
    const userVer = jwt.verify(token, JWT_SECRET); // ✅ verify raw token
    const user = await User.findById(userVer.id).select("-password");
    res.json({ message: "Profile endpoint", user });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

 


module.exports = { register, login, profile };