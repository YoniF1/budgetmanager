import OpenAI from "openai";
import dotenv from "dotenv";
import {
    getUserFinancialData,
    getUserPersonalData
} from '../controllers/hackcontrol.js'

dotenv.config();
const apiKey = process.env.api_key;

const openai = new OpenAI({apiKey});

async function doIt() {
  const openaiDiv = document.getElementById('openai-data');

  const id = 3;

  const user = await getUserPersonalData(id);
  const money = await getUserFinancialData(id);

  let userSituation = `
  User Financial Situation:
  - Monthly Income: ${user[0].monthly_income}
  - Size of the household: ${user[0].number_of_people}
  - Country of residence: ${user[0].country}
  `;

  money.forEach(v => {
      userSituation += `\n -${v.name}:${v.totalamount}`
  });
  
  const prompt = `
  You are a financial advisor. You will be given some information about the user's monthly expenditure and their income, as well as some personal details. Please give them some advice as to how they can improve their financial situation, specifically which categories would require more attention.Pay attention to the country of residence and give an answer using the local currency. Limit your response to 100 words.
  ${userSituation}`;

  const completion = await openai.chat.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-3.5-turbo"
  });
  
  const htmlContent = completion.choices[0].message.content;
  console.log(htmlContent);
  openaiDiv.innerHTML = htmlContent;
}
document.getElementById('report-button').addEventListener('click', doIt);