const UserModal = require("../Models/model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    registerUser: async (req, res) => {
        const userModel = new UserModal(req.body);
        userModel.password = await bcrypt.hash(req.body.password, 10);
        try {
            const response = await userModel.save();
            response.password = undefined;
            return res.status(201).json({
                message: 'success',
                data: response
            });
        } catch (error) {
            return res.status(404).json({
                message: 'error',
                error
            });
        }
    },

    LoginUser: async (req, res) => {
        try {
            // Find user by email
            const user = await UserModal.findOne({ email: req.body.email });
            
            // Check if user exists
            if (!user) {
                return res.status(401).json({ message: 'Chor Chor!! Auth failed, email not matched!!' });
            }

            // Compare the password
            const isPassequal = await bcrypt.compare(req.body.password, user.password);
            if (!isPassequal) {
                return res.status(401).json({ message: 'Chor Chor!! Auth failed, password not matched!!' });
            }

            // Create token object
            const tokenobj = {
                _id: user._id,
                Name: user.Name,
                email: user.email
            };

            // Generate JWT with correct 'expiresIn' option
            const jwtToken = jwt.sign(tokenobj, 'full-secret', { expiresIn: '4h' });

            // Return token and token object in the response
            return res.status(201).json({
                token: jwtToken,
                user: tokenobj
            });

        } catch (err) {
            // Handle any unexpected errors
            return res.status(500).json({ message: 'Authentication error', err });
        }
    },
    getUsers : async (req,res)=>{
        try{
            const users = await UserModal.find();
            return res.status(200).json({data:users})
        }catch(err){
            return res.status(500).json({message:'error',err})
        }
    }
};
