const { db } = require("../config/db.js");
const _createExpense = async (chatId, category, value) => {
  let user = await db("users").where("chat_id", chatId).first();
  let user_id = user.id;
  let categoryWhole = await db("categories").where("name", category).first();
  let category_id = categoryWhole.id;
  console.log({ user_id, category_id, amount: value });
  await db("expenses").insert({ user_id, category_id, amount: value });
};

const _getUserId = async (chatId) => {
  let user = await db("users").where("chat_id", chatId).first();
  let user_id = user.id;
  return user_id;
};

// const _readCategories = async () => {
//   const catList = await db.select('name').from('categories')}

module.exports = { _createExpense , _getUserId};
