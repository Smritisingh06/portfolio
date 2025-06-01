const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Contact = require('../models/Contact'); // Assuming you have a Contact model
// Sign Up Controller
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Login Controller
// ...existing code...

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
};
//logout
// ...existing code...

exports.logout = (req, res) => {
    // For stateless JWT, just respond with success.
    // If you use token blacklisting, add logic here.
    res.status(200).json({ message: 'Logout successful' });
};
// ...existing code...


// Submit Contact Form Controller
exports.submitContactForm = async (req, res) => {
    const {  firstName, lastName, phone, email, message } = req.body;

    if (!firstName || !email || !message || !lastName || !phone) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    try {
        const newContact = new Contact({ firstName, lastName, phone, email, message });
        await newContact.save();
        res.status(200).json({ message: 'Contact form submitted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};