const { db } = require("../config/db.js");
const _createExpense = async (chatId, category, value) => {
  let user = await db("users").where("chat_id", chatId).first();
  let user_id = user.id;
  let categoryWhole = await db("categories").where("name", category).first();
  let category_id = categoryWhole.id;
  console.log({ user_id, category_id, amount: value });
  await db("expenses").insert({ user_id, category_id, amount: value });
};
module.exports = { _createExpense };