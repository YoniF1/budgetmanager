const { _loginUser, _searchUser, _createUser } = require('../models/user.model.js');

const loginUser = (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.render('login', { error: 'Please fill out all fields' });
    }

    _loginUser(email, password)
    .then((userId) => {
        if (userId) {
            req.session.userId = userId;
            req.session.message = `Welcome back again ${email}!`;

            res.redirect('/home')
        } else {
            res.render('login', { message: 'You are not registered or password is invalid', success: '' });
        }
    })
    .catch((error) => { 
        console.log(error)
    })
}

const createUser = async (req, res) => {
    const {first_name, last_name, email, password} = req.body
    const name = `${first_name + last_name}`
    
    let user_exists = '';
    let error = '';
    let success = '';

    if (!email || !password || !first_name || !last_name) {
        error = 'Please fill out all fields';
    }

    const existing_user = await _searchUser(email)

    if (existing_user.length !== 0) {
        user_exists = 'Username already exists';
    }

    if (error || user_exists) {
        return res.render('signup', { error, user_exists, success });
    }
    
    try {
        await _createUser(email, name, password);
        const success = 'User created successfully'
        return res.render('login', { success, message: ''});
    } catch (e) {
        console.log(e);
        return res.status(500).send('Error creating user. Please try again later.');
    }
}

module.exports = {
    loginUser,
    createUser
}