require("dotenv").config();
const { TOKEN } = process.env;
const TelegramBot = require("node-telegram-bot-api");
const { _createExpense, _getUserId } = require("./models/bot.models.js");
const { chatGptResponse } = require("./chatgpt.js");
const bot = new TelegramBot(TOKEN, { polling: true });
const categories = [
  "Housing",
  "Food",
  "Transportation",
  "Healthcare",
  "Childcare/Education",
  "Entertainment",
  "Debt Payments",
  "Personal Care",
  "Utilities",
  "Miscellaneous",
  "Taxes",
  "Insurance",
  "Gifts/Donations",
  "Clothing",
  "Savings/Investments",
  "Exit",
];
const sendCategorySelection = (chatId) => {
  const options = {
    reply_markup: JSON.stringify({
      inline_keyboard: categories.map((category) => [
        {
          text: category,
          callback_data: JSON.stringify({
            category: category,
            action: "log",
          }),
        },
      ]),
    }),
  };
  const userId = chatId;
  bot.sendMessage(chatId, "Select a category", options);
};
bot.onText(/\/start/, (message) => {
  bot.sendMessage(
    message.chat.id,
    "Welcome to Moses the Money Manager! Here you will record your daily expenses, and they will be recorded on your account. Choose /log to select spending categories, or /free to type in text which I will interpret! Once you've finished, type /analyse to get to your analysis."
  );
});
bot.onText(/\/log/, (message) => {
  sendCategorySelection(message.chat.id);
});
bot.onText(/\/free/, (message) => {
  bot
    .sendMessage(
      message.chat.id,
      "Please enter your expenses in free language (e.g. Rent $200, Visit to the zoo $15, Dentist $45.54):"
    )
    .then(() => {
      bot.once("message", async (message) => {
        let expensesText = message.text;
        const userId = message.chat.id;
        try {
          const response = await chatGptResponse(expensesText);
          const array = JSON.parse(response);
          console.log(typeof array);
          const newArray = array.map((object) => {
            return { ...object };
          });
          for (let index = 0; index < newArray.length; index++) {
            _createExpense(
              userId,
              newArray[index].category,
              newArray[index].value
            );
          }
        } catch (error) {
          console.error(error);
        }
      });
    });
});

bot.onText(/\/analyse/, async (message) => {
  const userId = await _getUserId(message.chat.id);
  const link = `http://localhost/3000/public?id=${userId}`;
  bot.sendMessage(message.chat.id, link);
});

bot.on("callback_query", (callbackQuery) => {
  const message = callbackQuery.message;
  const category = JSON.parse(callbackQuery.data).category;
  const action = JSON.parse(callbackQuery.data).action;
  if (action === "log") {
    if (category === "Exit") {
      bot.sendMessage(message.chat.id, "You have exited. Thank you!");
    } else {
      bot
        .sendMessage(
          message.chat.id,
          `You selected ${category}. Now, please enter the amount you spent:`
        )
        .then(() => {
          bot.once("message", (message) => {
            let expense = {
              chatId: message.chat.id,
              category: category,
              value: message.text,
            };
            console.log(expense);
            _createExpense(expense.chatId, expense.category, expense.value);
            sendCategorySelection(message.chat.id);
          });
        });
    }
  }
});
