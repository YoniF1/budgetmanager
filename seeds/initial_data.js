
require('dotenv').config()
const bcrypt = require('bcrypt')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const password = 1234
const hash = bcrypt.hashSync(password + "", 5)

exports.seed = async function(knex) {
  await knex('users').insert([
    {id: 1, chat_id: 1, name: 'Yonatan F', email: 'yoni@email.com', password: hash, phone_number: '0531234567', number_of_people: 1, country: 'Israel', monthly_income: 20000},
    {id: 2, chat_id: 2, name: 'Daniel H', email: 'daniel@email.com', password: hash, phone_number: '0531234568', number_of_people: 3, country: 'Israel', monthly_income: 22000},
    {id: 3, chat_id: 3, name: 'Kseniia T', email: 'kseniia@email.com', password: hash, phone_number: '0531234569', number_of_people: 4, country: 'Israel', monthly_income: 21000},
    {id: 4, chat_id: 5659255263, name: 'Steven Bloggs', email: 'steven@email.com', password: hash, phone_number: '0531234564', number_of_people: 4, country: 'Israel', monthly_income: 24000},
  ]);


  await knex('categories').insert([
    {id: 1, name: 'Housing'},
    {id: 2, name: 'Food'},
    {id: 3, name: 'Transportation'},
    {id: 4, name: 'Healthcare'},
    {id: 5, name: 'Entertainment'},
    {id: 6, name: 'Childcare/Education'},
    {id: 7, name: 'Debt Payments'},
    {id: 8, name: 'Personal Care'},
    {id: 9, name: 'Utilities'},
    {id: 10, name: 'Miscellaneous'},
    {id: 11, name: 'Taxes'},
    {id: 12, name: 'Insurance'},
    {id: 13, name: 'Gifts/Donations'},
    {id: 14, name: 'Clothing'},
    {id: 15, name: 'Savings/Investments'}
  ]);

  await knex('expenses').insert([
    {id: 1, user_id: 1, category_id: 2, amount: 30.5 },
    {id: 2, user_id: 1, category_id: 2, amount: 5.79 },
    {id: 3, user_id: 1, category_id: 2, amount: 4.50 },
    {id: 4, user_id: 1, category_id: 2, amount: 2.30 },
    {id: 5, user_id: 2, category_id: 2, amount: 3.40 },
    {id: 6, user_id: 2, category_id: 2, amount: 9.41 },
    {id: 7, user_id: 2, category_id: 2, amount: 10.31 },
    {id: 8, user_id: 2, category_id: 2, amount: 11.55 },
    {id: 9, user_id: 2, category_id: 2, amount: 4.80 },
    {id: 10, user_id: 3, category_id: 2, amount: 50.20 },
    {id: 11, user_id: 3, category_id: 2, amount: 100.99 },
    {id: 12, user_id: 3, category_id: 1, amount: 9.99 },
    {id: 13, user_id: 3, category_id: 1, amount: 3.70 },
    {id: 14, user_id: 3, category_id: 3, amount: 11.34 },
    {id: 15, user_id: 3, category_id: 4, amount: 98.43 },
    {id: 16, user_id: 3, category_id: 4, amount: 37.30 },
    {id: 17, user_id: 3, category_id: 5, amount: 52.49 },
    {id: 18, user_id: 3, category_id: 5, amount: 70.10 },
    {id: 19, user_id: 3, category_id: 7, amount: 81.00 },
    {id: 20, user_id: 3, category_id: 9, amount: 13.40 },
    {id: 21, user_id: 3, category_id: 8, amount: 44.30 },
    {id: 22, user_id: 3, category_id: 7, amount: 12.00 },
    {user_id: 3, category_id: 6, amount: 12.00 },
    {user_id: 3, category_id: 10, amount: 13.00 },
    {user_id: 3, category_id: 11, amount: 14.00 },
    {user_id: 3, category_id: 12, amount: 15.00 },
    {user_id: 3, category_id: 13, amount: 16.00 },
    {user_id: 3, category_id: 14, amount: 17.00 },
    {user_id: 3, category_id: 15, amount: 18.00 },
  ]);
}
