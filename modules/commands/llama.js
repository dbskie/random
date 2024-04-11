const moment = require("moment-timezone");
const axios = require('axios');

module.exports.config = {
    name: "llama",
    version: "1.0.0",
    hasPermission: 0,
    credits: "api by jerome",//api by jerome
    description: "Gpt architecture",
    usePrefix: false,
    commandCategory: "chatbots",
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const { messageID, messageReply } = event;
        let prompt = args.join(' ');

        if (messageReply) {
            const repliedMessage = messageReply.body;
            prompt = `${repliedMessage} ${prompt}`;
        }

        if (!prompt) {
            return api.sendMessage('How may I assist you today?', event.threadID, messageID);
        }
        api.sendMessage('Naghahanap pa...', event.threadID);

        // Delay
        await new Promise((resolve => setTimeout(resolve, 2000)); // Adjust the delay time as needed

        const gpt4_api = `https://deku-rest-api.onrender.com/llama-70b?prompt=${encodeURIComponent(prompt)}`;
        const manilaTime = moment.tz('Asia/Manila');
        const formattedDateTime = manilaTime.format('MMMM D, YYYY h:mm A');

        const response = await axios.get(gpt4_api);

        if (response.data && response.data.message) {
            const generatedText = response.data.message;

            // Ai Answer Here
            api.sendMessage(`𝗔𝗻𝘀𝘄𝗲𝗿: ${generatedText}\n\n🗓️ | ⏰ 𝙳𝚊𝚝𝚎 & 𝚃𝚒𝚖𝚎:\n.⋅ ۵ ${formattedDateTime}, event.threadID, messageID);
        } else {
            console.error('API response did not contain expected data:', response.data);
            api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Response data: ${JSON.stringify(response.data)}`, event.threadID, messageID);
        }
    } catch (error) {
        console.error('Error:', error);
        api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Error details: ${error.message}`, event.threadID, event.messageID);
    }
};
