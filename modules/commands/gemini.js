module.exports.config = {  
  name: "gemini",  
  hasPermssion: 0,  
  credits: 'Deku',  
  description: "Talk to Gemini (conversational)",  
  usePrefix: false,  
  commandCategory: 'chatbots',  
  usages: 'Ai [prompt]',  
  cooldowns: 5
};

module.exports.start = async function ({ event, text, reply, react }) {  
  const axios = require("axios");  
  let prompt = text.join(" ");  
  let uid = event.senderID;  
  let url; 
  
  if (!prompt) return reply("Please enter a prompt."); 
  
  react('✨');
  
  try {  
    const api = "https://gemini-api.replit.app";   
    
    if (event.type == "message_reply") {  
      if (event.messageReply.attachments[0]?.type == "photo") {  
        url = encodeURIComponent(event.messageReply.attachments[0].url);  
        const res = await axios.get(`${api}/gemini?prompt=${prompt}`);  
      }  
    }  
  } catch (error) {  
    console.log(error);  
  }  
};
