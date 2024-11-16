### 20241114 W10 - 個人作業 7

### 基本任務

1. **設定 AWS CloudWatch Metrics**
   - 進入 AWS CloudWatch，選擇 Tokyo 區域。
   - 確認可觀察的 EC2 instance metrics。

    => 觀察到有 80 個 metrics

   - 找到並監控目標 EC2 instance 的 **CPUUtilization**。

2. **建立 CloudWatch Alarm**
   - 前往 CloudWatch Alarms，為指定的 EC2 CPUUtilization 指標建立 alarm：
     - 條件：**Average CPUUtilization > 60%**
     - 設定當觸發 alarm 時，透過 SNS topic 發送通知到指定信箱。
    - 取得 **CloudWatch Alarm 圖表截圖**並儲存至 `/week-10/alarm-graph.png`。

   ![alarm-graph](https://github.com/user-attachments/assets/04e0b69e-b938-4479-8f05-ca427b414ffc)


3. **模擬 CPU 使用**
   - 登入 EC2 instance，使用 `stress-ng` 或其他工具，模擬 CPU 高使用率。

    ### Step 1: 連線到 EC2 Instance
    使用 SSH 連線到您的 EC2 instance。
    ```bash
    ssh -i /path/to/your-key.pem ec2-user@<your-ec2-instance-public-ip>
    ```

    ### Step 2: 安裝 `stress-ng`
    使用以下指令來安裝 `stress-ng`：
    ```bash
    # For Ubuntu
    sudo apt update
    sudo apt install -y stress-ng
    ```

    ### Step 3: 執行 `stress-ng` 模擬 CPU 高使用率
    使用 `stress-ng` 來模擬高 CPU 使用率。
    測試使用 t2-medium 兩個CPU、4G Memory
   
    ![螢幕擷取畫面 2024-11-16 160407](https://github.com/user-attachments/assets/a29fc810-dc3b-4890-82b2-70e7b17a50ac)


    ```bash
    sudo stress-ng --cpu 2 --cpu-load 90 --timeout 300s
    ```

   ![螢幕擷取畫面 2024-11-16 160659](https://github.com/user-attachments/assets/83c3c348-9c9f-41b2-ac35-e06284b16e25)


    - `--cpu 2`: 使用 2 個 CPU 工作執行緒。如果你的 instance 有更多 CPU 核心，可以相應增加數量。
    - `--cpu-load 90`: 將 CPU 使用率設為 90%。
    - `--timeout 300s`: 執行此負載 300 秒（5 分鐘），確保時間足夠來觸發 alarm。


    ### Step 4: 檢查 Alarm 狀態
    前往 AWS CloudWatch Console，檢查 EC2 instance 的 CPUUtilization 指標，並觀察是否觸發了設定的 Alarm。

    這樣就可以模擬高 CPU 使用率，並驗證 CloudWatch Alarm 是否能如期觸發並發送通知。

   - 確認 **CloudWatch Metrics** 中 CPUUtilization 指標的變化並截圖，儲存至 `/week-10/metrics.png`。

![metrics](https://github.com/user-attachments/assets/75b6e954-1074-4565-8fca-c045de97c620)



5. **確認信件通知**
   - 確認 alarm 被觸發後，是否有收到 SNS 發送的 email 通知，截圖並儲存至 `/week-10/alarm-email.png`。
     
![alarm-email](https://github.com/user-attachments/assets/e5709f2e-1b73-4a3c-a099-5a341405f4a1)



---

### 進階題：使用 Lambda 及 Discord 發送通知

1. **開發 Lambda Function**
   - 進入 Lambda Console，建立新的 Lambda function。
   - 配置此 Lambda 以監聽指定的 SNS topic 事件觸發。
   - 寫 Lambda 程式碼，使其能發送客製化訊息至 Discord Webhook。

2. **設定 CloudWatch Logs**
   - 設定 Lambda function 的 CloudWatch Logs，以觀察 Lambda 執行的 log。

3. **確認 Discord 通知**
   - 確認 Lambda 成功執行並將 alarm 訊息發送至 Discord。截圖並儲存至 `/week-10/lambda-discord.png`。

4. **觀察 Lambda 執行 log**
   - 進入 CloudWatch Logs，觀察並擷取 Lambda function 的執行 log，截圖並儲存至 `/week-10/lambda-logs.png`。

---

### Step 1: 建立 Lambda Function

1. 登入 AWS Console，進入 **Lambda Console**。
2. 點選 **Create function**，選擇 **Author from scratch**。
   - **Function name**：輸入自定義名稱，例如 `CloudHomework`
   - **Runtime**：選擇 `node.js.20.x`
3. 點擊 **Create function** 完成建立。

### Step 2: 配置 Lambda 觸發條件（SNS Topic）

1. 在 Lambda function 的頁面中，往下找到 **Triggers**，點選 **Add trigger**。

2. 選擇 **SNS** 作為觸發來源。
   - **SNS topic**：選擇已設定的 SNS topic（該 topic 應設定在 CloudWatch Alarm 中，以便在 Alarm 狀態下觸發 Lambda）。
3. 點擊 **Add**，完成觸發條件設定。

   ![image](https://github.com/user-attachments/assets/aae9bec1-e5f7-4ee3-8315-87e09ec072f1)


#### Discord webbook

![螢幕擷取畫面 2024-11-16 163937](https://github.com/user-attachments/assets/5198bdb0-fe09-43ad-a93a-8b931639ade4)

![螢幕擷取畫面 2024-11-16 163917](https://github.com/user-attachments/assets/25bf1509-92bd-49d9-8279-953317e4d51c)


### Step 3: 寫 Lambda 程式碼，將通知發送至 Discord

![image](https://github.com/user-attachments/assets/e3b97d7e-1b29-4dcf-a4f2-6ae25bccf9ec)


1. 在 **Function code** 區域
```javascript
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
```

2. 點擊 **Deploy** 儲存程式碼。

### Step 4: 設定 CloudWatch Logs 以觀察 Lambda 執行

Lambda 自動將執行紀錄儲存到 CloudWatch Logs。無需手動設定，執行後可以直接前往 **CloudWatch Logs Console**，檢視 Lambda function 的執行紀錄。

### Step 5: 測試並確認 Discord 通知

1. 確保設定的 CloudWatch Alarm 會觸發 SNS topic。

![image](https://github.com/user-attachments/assets/38ed2f0b-1a66-4c98-8fe0-518ae7be2dfe)

   
2. 模擬 CPU 使用率增加，讓 Alarm 進入 ALARM 狀態，觸發 Lambda。
3. 前往 Discord，檢查是否收到來自 Lambda 的通知訊息（如有成功，截圖儲存為 `/week-10/lambda-discord.png`）。

![lambda-discord](https://github.com/user-attachments/assets/16353777-729b-4aa8-b04f-b5d3b94124d5)


### Step 6: 檢視並截取 Lambda 執行的 CloudWatch Logs

1. 前往 **CloudWatch Logs Console**。

![image](https://github.com/user-attachments/assets/aa2217d6-8a78-40a3-b62e-69c0ff8aea42)

   
2. 找到 Lambda function 的 log group，進入並檢視執行紀錄。

![image](https://github.com/user-attachments/assets/87e515d1-8ad1-4266-b1f2-6bc07764efa5)

  
3. 截圖紀錄並儲存至 `/week-10/lambda-logs.png`。
   
![lambda-logs](https://github.com/user-attachments/assets/3c93207e-caa0-49c0-9643-04ccb1f6ed45)

