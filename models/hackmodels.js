import {db} from '../config/data.js';

export const _getCategories = () => {
    return db("categories").select ("name");
};

export const _getUserFinancialData = (id) => {
    return db("expenses")
        .select("categories.name", db.raw("SUM(expenses.amount) as totalamount"))
        .innerJoin("categories", "categories.id", "expenses.category_id")
        .where("expenses.user_id", id)
        .groupBy("categories.name");
};

export const _getUserPersonalData = (id) => {
    return db("users").select("number_of_people","country","monthly_income").where({id:id});
};