const { db } = require("../config/db.js")
const bcrypt = require('bcrypt');

const _loginUser = async (email, password) => {
    try {
        const user = await db('users').select('id', 'password').where({email}).first()

        if (!user) {
            return null
        }
        
        const hashedPasswordFromDb = user.password;
        const match = bcrypt.compareSync(password + "", hashedPasswordFromDb);

        if (match) {
            return user.id;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
};

const _createUser = async (email, name, password) => {
    let trx;
    try {

        const hash = bcrypt.hashSync(password + "", 5)
        trx = await db.transaction();
    
        const user = await db('users')
        .insert({email, name, password: hash, chat_id: 5829079101}, ["*"])
        .transacting(trx);

        await trx.commit()

    } catch (error) {
        console.log(error)
        await trx.rollback()
    }
}

const _searchUser = (email) => {
    return db('users').select('id', 'email', 'name', 'phone_number', 'monthly_income', 'country').where({email})
}

const _createUserDetails = async (id, phone_number, country, monthly_income) => {
    try {
        trx = await db.transaction();

        const user = await db('users')
        .where({id})
        .update({phone_number, country, monthly_income}, ["*"])
        .transacting(trx);

        await trx.commit()
    } catch (error) {
        console.log(error)
        await trx.rollback()
    }
}

module.exports = {
    _loginUser,
    _createUser,
    _searchUser,
    _createUserDetails,
}