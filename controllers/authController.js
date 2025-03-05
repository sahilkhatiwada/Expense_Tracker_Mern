import jwt from 'jsonwebtoken';
import User from '../models/User';



// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// register User
const registerUser = async (req, res) => {
 const { name, email, password, profileImageUrl } = req.body;

//  check if user already exists
if(!name || !email || !password){
  return res.status(400).json({message: 'Please fill in all fields'});
}
try {
    // Check if user already exists
    const userExists= await User.findOne({email});
    if(userExists){
        return res.status(400).json({message: 'User already exists'});
    }
    // Create new user
    const user = await User.create({name, email, password, profileImageUrl});
    res.status(201).json({
        _id: user._id,
       user,
        token: generateToken(user._id),
    });
} catch (error) {
    res.status(500).json({message: 'Error in registering user',error: error.message});
}
};  











// login User
const loginUser = async (req, res) => {
  res.send('login user');
}

// get user info
const getUserInfo = async (req, res) => {
  res.send('get user info');
}



export { registerUser, loginUser, getUserInfo };