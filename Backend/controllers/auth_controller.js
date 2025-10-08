import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js';
import jwt from "jsonwebtoken";
import User from '../models/user_model.js';



export const signup = async (req, res) => {
    const { name, email, password, profilePicture } = req.body;
    try {
        if (!email || !name || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //password must be of size greater than 6
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must of 6 characters" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        //email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "User already exists" })


        //for profile picture
        let profilePictureUrl;
        if (profilePicture) {
            const uploadResponse = await cloudinary.uploader.upload(profilePicture);
            profilePictureUrl = uploadResponse.secure_url;
        } else {
            const idx = Math.floor(Math.random() * 100) + 1; // generate a num between 1-100
            profilePictureUrl = `https://avatar.iran.liara.run/public/${idx}.png`;
        }


        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            profilePic: profilePictureUrl,
        })

        if (newUser) {
            //creating jwt token -- valid up to 7 days
            const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
                expiresIn: "7d",
            });

            res.cookie("jwt", token, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true, // prevent XSS attacks,
                sameSite: "strict", // prevent CSRF attacks
                secure: process.env.NODE_ENV === "production",
            });

            //saving user to db
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "User registration failed" });
        }
    } catch (error) {
        console.log("Error in signup controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });


        if (!user) return res.status(401).json({ message: "Invalid email or password" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid email or password" });

        //creating jwt token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d",
        });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, // prevent XSS attacks,
            sameSite: "strict", // prevent CSRF attacks
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
            token,
        });
    }catch (error) {
        console.log("error in login controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }

}

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
        console.log("error in logout controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};


//not checked yet
export const checkAuth = (req, res) => {
    try {
        if (req.user) {
            res.status(200).json({ isAuthenticated: true, user: req.user });
        } else {
            res.status(200).json({ isAuthenticated: false });
        }
    } catch (error) {
        console.log("error in checkAuth controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//do it later
export const updateProfile = async (req, res) => {
    
}
