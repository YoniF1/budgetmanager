const OpenAI = require('openai')
require("dotenv").config();
const {OPENAI_API_KEY} = process.env
const openai = new OpenAI({
    apiKey:OPENAI_API_KEY
})
const chatGptResponse = async(textContent) => {
const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-2024-04-09",
    messages: [
        {
            "role":"system",
            "content":"You will be provided with some items or services and the amount of money spent on them. Your job is to put each expenditure into one of Housing,Food,Transportation,Healthcare,Childcare/Education,Entertainment,Debt Payments,Personal Care,Utilities,Miscellaneous,Taxes,Insurance,Gifts/Donations,Clothing,Savings/Investments. Give the answer as an array of JS objects with keys of category and value. Please try not to hallucinate."
        },
        {
            "role":"user",
            "content": textContent
        }
    ],
    temperature:0.7,
    max_tokens:256,
    top_p:1,
})
return response.choices[0].message.content}
module.exports = {chatGptResponse}