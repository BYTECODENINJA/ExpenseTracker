const User = require('../models/User');
const jwt = require('jsonwebtoken');

//Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

//register user
exports.registerUser = async (req, res) => {

    const { fullName, email, password, profileImageUrl } = req.body;

    //check for missing fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    try {
        //check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //create user if email does not exists
        const newUser = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        // Send success response with token
        res.status(201).json({
            message: "User registered successfully",
            token: generateToken(newUser._id),
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email
            }
        });

    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message })
    }
};

//login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter email and password' });
    } try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({
            token: generateToken(user._id),
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in user', error: err.message });
    }
};

//getUserInfo
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user info', error: err.message });
    }
};