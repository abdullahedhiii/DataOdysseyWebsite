const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config(); 

module.exports.loginUser = (req, res) => {
    
    try{
        const q = 'SELECT * FROM Participants WHERE email = ?';

        db.query(q, [req.body.email], (err, data) => {
            if (err) return res.status(500).json({message : err.message});

            if (data.length == 0) {            
                return res.status(400).json({message : 'Invalid email address'});
            }
            
            const user = data[0];
            const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
            
            if (!isPasswordValid) {
                // Return an error for invalid password
                return res.status(400).json({message : 'Incorrect Password,Try again'});
            }

            const { password, ...other } = user;
            console.log('login ',user);
            

            const token = jwt.sign(
                { id: user.email }, 
                process.env.JWT_SECRET, 
                { expiresIn: 6000 }
            );
            
            res.status(200).cookie("access_token", token, {
                httpOnly: true
            }).json({...other});
        });
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
};


module.exports.logoutUser = (req,res) =>{
    console.log('log out hitt');
    try{
        res.cookie('access_token',{ 
          httpOnly: true, 
          secure: true,
          sameSite: 'strict', 
          expires: new Date(0)
        });

        return res.status(200).send({ message: 'Logged out successfully' });
    }
    catch(err){
        return res.status(500).send({ message: err.message });
    }
}

module.exports.registerUser = (req,res) => {

    try{
        const {email,password,username} = req.body; 
        
        const q = 'SELECT * FROM Participants WHERE email = ?';   
        db.query(q, [email], (err, data) => {
            if (err) return res.status(500).json({message : err.message});
            if (data.length) return res.status(409).json({message : "A participant with this email already exists"});
            
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            
            const qInsert = "INSERT INTO Participants (teamName,email,password) VALUES (?,?,?)";
            const values = [username,email, hash];
            
            db.query(qInsert, values, (err, data) => {
                if (err){ 
                    console.log('error inserting',err.message);
                    return res.status(500).json({message : err.message});}
                return res.status(200).json({message : 'Participant registered successfully'});
            });
        });
    
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}


module.exports.retrieveCookie = (req, res) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token expired or invalid' });
        }

        const account_query = 'SELECT * FROM Participants WHERE email = ?';
        
        db.query(account_query, [decoded.id], (err, result) => {
            if (err) {
                console.log('error here',err);
                return res.status(400).json({ message: 'Error retrieving user data' });
            }
            const { password, ...other } = result[0];
            return res.json(other);  
        });
    });
};
