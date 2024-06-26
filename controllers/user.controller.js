const { _loginUser, _searchUser, _createUser, _createUserDetails } = require('../models/user.model.js');

const loginUser = (req, res) => {
    const { email, password } = req.body
    
    if (!email || !password) {
        return res.render('login', { error: 'Please fill out all fields' });
    }

    let nameOfUser;
    let user_details_completed;

    _searchUser(email)
    .then((user) => {
        nameOfUser = user[0].name;
        console.log(user[0])
        if(user[0].phone_number && user[0].country && user[0].monthly_income) {
            console.log(user[0])
            user_details_completed = true
        }
        return _loginUser(email, password)
    })
    .then((userId) => {
        if (userId) {
            req.session.userId = userId;
            req.session.message = `Welcome to Moses the Money Manager \n ${nameOfUser}!`;
            req.session.details = `Please add your details`;
            req.session.completed = user_details_completed
            res.redirect('/home');
        } else {
            res.render('login', { message: 'You are not registered or password is invalid', success: '', isLoggedIn: false });
        }
    })
    .catch((error) => { 
        console.log(error);
    });
}

const createUser = async (req, res) => {
    const {first_name, last_name, email, password} = req.body
    const name = `${first_name} ${last_name}`
    
    let user_exists = '';
    let error = '';
    let success = '';
    let isLoggedIn = ''

    if (!email || !password || !first_name || !last_name) {
        error = 'Please fill out all fields';
    }

    const existing_user = await _searchUser(email)

    if (existing_user.length !== 0) {
        user_exists = 'Username already exists';
    }

    if (error || user_exists) {
        return res.render('signup', { error, user_exists, success, isLoggedIn });
    }
    
    try {
        await _createUser(email, name, password);
        const success = 'User created successfully'
        return res.render('login', { success, message: '', isLoggedIn});
    } catch (e) {
        console.log(e);
        return res.status(500).send('Error creating user. Please try again later.');
    }
}

const createUserDetails = async (req, res) => {
    const { phone_number, country, monthly_income } = req.body 

    try {
        
        await _createUserDetails(req.session.userId, phone_number, country, monthly_income)
        const isLoggedIn = req.session.userId !== undefined;
        req.session.details = 'details created'
        return res.render('home', { success: '', message: '', isLoggedIn, details: req.session.details, user_details_completed: 'User details created'});
    } catch (e) {
        console.log(e)
        return res.status(500).send('Error creating user details.');
    }
}

module.exports = {
    loginUser,
    createUser,
    createUserDetails
}