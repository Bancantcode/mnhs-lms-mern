import User from '../models/User.js';
import createSecretToken from './token.js'

const loginAuth = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        if(!email || !password ){
            return res.json({message:'All fields are required'})
        }

        const user = await User.findOne({ 
            where: {
                email: email
            }
        });

        if(!user){
            return res.status(401).json({message:'Incorrect password or email' }) 
        }

        if (password !== user.password) {
            return res.status(401).json({message:'Incorrect password or email' }) 
        }

        const token = createSecretToken(user.UID);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true,
        });

        res.status(201).json({ message: "User logged in successfully", success: true });
        next()
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default loginAuth;