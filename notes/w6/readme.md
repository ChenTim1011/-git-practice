### 第五周

今天上台報告缺失，對於技術掌握不太熟悉，還有對於技術說明過少。
其他組的架構圖和技術說明非常清楚，很值得我學習。

1. 寫作業可以貼心一點，換位思考方便老師改。

- 例如: IP 可以直接貼連結，方便老師改。

2. 使用 fork 的好處 ，面試時直接看你 github repo 有什麼東西。 

- 如何同步 fork 的 repo ?


1. **Upstream 定義**：Upstream 是指你 fork 的原始 repo ，而 origin 則通常指你自己帳戶下的 repo。
   
2. **設置 Upstream**：使用以下命令將上游 repo 設置為遠端：
   ```bash
   git remote add upstream <upstream-repo-url>
   ```
3. **同步更新**：
   - 先 fetch 上游的變更，不會自動合併：
     ```bash
     git fetch upstream
     ```
   - 切換到你要同步的分支：
     ```bash
     git checkout main
     ```
   - 合併上游變更：
     ```bash
     git merge upstream/main
     ```
   - 推送更新到自己的儲存庫：
     ```bash
     git push origin main
     ```

其他人也要在 repo 裡面設定是 contributor 才可以 code review，這我就忘記設定了。

3. 原來 Node 20.6 後內建支援 .env， 我還在裝 dotenv ， 然後寫作業沒有發現到我的 dotenv 沒裝好花了額外時間 debug。
    
    ```bash
        node --env-file=.env server.js
    ```

4. .env 不可以放進 github 上， 放在 .gitignore 裡面
 
   怎麼讓團隊成員知道有哪些環境變數要設定，不要用文件，因為怕文件脫鉤，而是用 .env.example 之類的範例檔，讓文件跟程式碼靠近一點。

   另外環境變數有兩種分類，
   1. 不同環境不同設定，例如:測試環境、實際運行環境，
   2. 機密資訊，不可以外洩。
   小組專案有哪些 key 要設也是要去考慮。

5. 在 Linux，1024 以下的 port number 只有 root 才能用，Why?

    1024 以下的 port 被稱為 privileged ports ，只有 root 或具備等同權限的用戶才能開啟這些 port 。這樣的設計是出於安全考量，因為許多系統服務和網路應用（如 HTTP、FTP、SSH 等）會使用低於 1024 的端口，限制只有 root 能使用這些 port 有助於避免惡意程式影響這些關鍵服務。

    做一個小實驗

    
    

    

    1. 開發一個 api 可以修改 root 權限檔案
    
    建立一個新目錄並初始化 Node.js 專案：
    
    ```bash
        mkdir root-file-api
        cd root-file-api
        npm init -y
    ```
    2. 安裝必要的套件（如果需要 Express 作為 API 框架）：
    
    ```bash
        npm install express
    ```

    建立 app.js
    
    ```javascript
    const express = require('express');
    const fs = require('fs');
    const path = require('path');

    const app = express();
    const port = 3000;

    // 修改 root 權限檔案的 API
    app.post('/modify-file', (req, res) => {
    const filePath = '/root/testfile.txt';  // 這是需要 root 權限才能修改的文件路徑

    fs.writeFile(filePath, '這是修改過的內容', (err) => {
        if (err) {
        console.error('修改失敗:', err);
        return res.status(500).send('修改文件失敗');
        }
        res.send('文件修改成功');
    });
    });

    // 啟動服務
    app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    });
    ```

    3. 用 root 啟動 server，是否可以成功修改？

    ``` bash
        sudo node app.js
    ```
   ![sudo node app.js](https://github.com/user-attachments/assets/e1002f6b-9bf2-4132-8777-92e0d866a81d)

   

    測試 API

    ```bash
        curl -X POST http://localhost:3000/modify-file
    ```

   ![測試 API sudo](https://github.com/user-attachments/assets/8424b14a-e59e-4d6c-a439-a9357376cdf2)



    4. 用 non-root 啟動 server，是否可以修改成功？


    ```bash
        node app.js
    ```
   ![node app.js](https://github.com/user-attachments/assets/d6a88eda-e1c4-4b1a-8e5d-3eff9beae388)

    測試 API- 修改失敗，權限不足

    ```bash
        curl -X POST http://localhost:3000/modify-file
    ```
   ![測試 API ](https://github.com/user-attachments/assets/4a04d44d-8b51-493b-bf88-4aa627d1d5b9)

    結論

    1. 用 root 身份啟動 server 時，可以成功修改具有 root 權限的檔案。
    2. 不是 root 身份啟動 server 時，由於權限不足，無法修改 root 權限檔案。

    老師也提到在開發中，應考慮安全性，避免讓應用程式擁有不必要的 root 權限。



5. 專案的方向，原來有 To Developer 的方向，我想到比較多都是 To C 的方向。
    - To C
    - To B
    - To Developer 例如: Mailgun 

6.  可能的擴展
    - 為了解決某一個功能、增加效能而採用某個技術
    - 是否會有大流量、大資料要處理
    - 流量是否會有變化

    - Gamification 遊戲化 ⇒ 如何提升使用者黏著度，還蠻有趣的機制，很值得我們思考。

    我們現在用的社群軟體就是大公司請心理學家，研究如何讓我們沉癮在他們的應用程式上面，真的效果顯著，浪費我很多時間QQ

#### 參考

[20241017](https://docs.google.com/presentation/d/1-dRCgfhlEBhWTD2m8BhPX8M8KJJg5BMo4EQPqexbDlA/edit#slide=id.g2fc53bae9df_2_148)
