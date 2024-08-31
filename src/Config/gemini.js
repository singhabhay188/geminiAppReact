import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function getRes(prompt){
    const result = await model.generateContent(prompt);
    return result.response.text();
}

export default getRes;
//getRes(prompt);