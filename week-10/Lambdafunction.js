//Lambda 以 ES 模組（.mjs）格式運行，而不支援 require 語法
import https from "https";

export const handler = async (event) => {
  // Discord Webhook URL 貼上你的 Webhook URL
  const discordWebhookUrl =
    "https://discord.com/api/webhooks/1307263612548681738/FrmugCW8D5ODKtatiIsHhLRLINJqRMvgQvZyME1arcni0IETDjMLjhe8Rh778mfiGxcm";

  // 解析 SNS 傳送的訊息
  const snsMessage = JSON.parse(event.Records[0].Sns.Message);

  // 建立 Discord 要顯示的訊息
  const discordMessage = JSON.stringify({
    content:
      `**AWS Alert:** ${snsMessage.AlarmName}\n` +
      `**Description:** ${snsMessage.AlarmDescription}\n` +
      `**Status:** ${snsMessage.NewStateValue}\n` +
      `**Reason:** ${snsMessage.NewStateReason}`,
  });

  // 發送通知至 Discord
  const options = {
    hostname: "discord.com",
    path: `/api/webhooks/1307263612548681738/FrmugCW8D5ODKtatiIsHhLRLINJqRMvgQvZyME1arcni0IETDjMLjhe8Rh778mfiGxcm`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(discordMessage),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        if (res.statusCode === 204) {
          resolve({
            statusCode: 200,
            body: JSON.stringify("Notification sent to Discord successfully."),
          });
        } else {
          reject({
            statusCode: res.statusCode,
            body: JSON.stringify("Failed to send notification to Discord."),
          });
        }
      });
    });

    req.on("error", (error) => {
      reject({
        statusCode: 500,
        body: JSON.stringify(
          "Error sending notification to Discord: " + error.message
        ),
      });
    });

    req.write(discordMessage);
    req.end();
  });
};
