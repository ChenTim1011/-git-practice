
# Week 04 - EC2 Web Server Deployment Checklist

### A. 建立 EC2 主機與部署 Web Server

- [x] 1. 建立 EC2 instance，規格如下：
    - [x] Instance type: t2.micro
    - [x] OS: Linux Ubuntu 22.04 或 Ubuntu 24.04
    - [x] Security Group: Inbound 22 & 80 port
    - [x] Public IP 分配
    - [x] launch instance 過程中下載並保管 key
- [x] 2. 用下載的 key 透過 SSH 連線至 EC2 instance
- [x] 3. 進入 Linux 後，更新作業系統與套件
    ```bash
    sudo apt update -y
    sudo apt upgrade -y
    ```
- [x] 4. 安裝 Nginx，並啟動 Nginx
    ```bash
    sudo apt install nginx -y
    sudo systemctl start nginx
    sudo systemctl enable nginx
    ```
- [x] 5. 可透過 instance 的 public IP 測試 Nginx 是否成功運行 (瀏覽器 or curl)
    ```bash
    curl http://52.194.253.186
    ```
- [x] 6. 安裝 Node.js 
    ```bash
    sudo apt install nodejs -y
    
    ```
- [x] 7. 設定主機，clone git-practice 專案
    ```bash
    git clone https://github.com/ChenTim1011/git-practice.git
    ```
- [x] 8. 透過 npm 安裝 pm2，並啟動 Express server
    - [x] 安裝 pm2
        ```bash
        npm install -g pm2
        ```
    - [x] 透過 pm2 啟動 Express Server
        ```bash
        pm2 start app.js --name app
        pm2 save
        pm2 startup
        ```
- [x] 9. 設定 Nginx，讓其 `proxy` 到 Express server
    - [x] 在 Nginx 配置檔 `/etc/nginx/sites-available/app` 中加入以下內容：
    ```nginx
    server {
        listen 80;
        server_name 52.194.253.186;

        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```
    - [x] 創建連結至 `sites-enabled`：
    ```bash
    sudo ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
    ```
- [x] 10. 透過 instance 的 public IP 測試是否成功 proxy 到 Express server
    ```bash
    curl http://52.194.253.186
    ```

- /etc 是什麼的縮寫？這裡通常都放哪些檔案？

      editable text configuration 的檔案，放一些安裝程式的設定檔，像是 nginx 設定檔就放在這裡，看到有 .conf結尾。

- /var 這裡通常都放哪些檔案？
    
    紀錄系統使用的狀態，像是有 logs 和　cache 。

- /boot 這裡通常都放哪些檔案？
    
    啟動系統需要相關檔案。

- $PATH 環境變數的作用是什麼？
    
    在連結所有不同檔案，讓我們可以在任何位置使用變數，一些重要的設定可以共同使用。


- `which` 指令的作用？

    可以找到檔案的位置在哪。



### B. Readme 文件問題回答

- [x] 1. 提供 instance 的 public IP  

        ```
            52.194.253.186
        ```

- [x] 2. 什麼是 instance type?

        建立 instance 時，會有不同的硬體規格，像是有 vCPUs 、 Architecture 、 Memory (GiB) 、 Storage (GB)等等選擇，越好的規格價格會比較貴。
     
	


- [x] 3. 什麼是 Nginx？有哪些用途與特性？
        
        Nginx 可以當作是 web server ,可以用來反向代理、負載平衡，反向代理好處是有很多台伺服器，但是使用者以為只有和一台伺服器互動。負載平衡是，如果有很多來自使用者的請求，如果這時候沒有 Nginx，會造成某一台伺服器一直受到請求，如果有 Nginx 幫忙把使用者請求分散到不同伺服器。 
- [x] 4. pm2 套件是什麼？有什麼用處？

        過去我們可能手動打開我們的後端伺服器，當我們關掉終端機程式就結束，但是 pm2 就可以解決這個問題， pm2 是 nodejs 的 程序管理套件， 好處是能夠在背景執行我們的程式，
        當程式出問題也可以重啟程式，而且可以監控程式的狀態。

    
- [x] 5. 什麼是 `proxy`？為什麼要透過 Nginx 來 `proxy` 到 Express Web Server？

        假設還沒有 proxy ，分成客戶端和伺服器端，客戶端發送請求到伺服器端，伺服器接收訊息回傳給客戶端，中間沒有人。 proxy 就像是中間代理人的角色。
        透過 Nginx 來 `proxy` 到 Express Web Server 好處是 Nginx 可以幫忙把使用者請求分散到不同伺服器。

    - [x] 解釋 `Reverse proxy` vs `Forward Proxy`
- [x] 6. 提供步驟 9 的 Nginx 設定檔
    ```bash
            server {
            listen 80;
            server_name 52.194.253.186;

            location / {
                proxy_pass <http://localhost:3000>;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
                }
            }
    ```

- [x] 7. Security Group 是什麼？有什麼用途？設定原則是什麼？

        Security Group 可以當成是 可以用來控制網路流量要到哪一個 port上的虛擬防火牆。它有定義 
        允許哪些inbound 和 outbound 網路流量能夠進入或離開 EC2 instance。

        Security Group 主要用途是保護 EC2 instance，防止未經授權的網路存取，並允許合法的流量進入和離開。
        
        Security Group 根據 IP 地址、 port number 、和 protocol，如 TCP、UDP 等，來設定允許或拒絕的網路流量。
        有個原則是 Principle of Least Privilege , 只允許 EC2 instance 實際需要的網路流量，盡量限制開放的端口和來源 IP 範圍。
        
        
- [x] 8. 什麼是 sudo？為什麼有時候需要加上 sudo，有時候不用？

         sudo 是 superuser do 的意思，因為不同的目錄或檔案會有不同的權限，權限不夠的話沒有加上　sudo 會沒有辦法編輯， 

- [x] 9. Nginx 的 Log 檔案在哪裡？你是怎麼找到的？如何查看？
    
    ```bash  
        cd /var/log/nginx
    ```

    
        就可以看到有 access.log 和 error.log
        原本沒有找到後來是參考 Configure NGINX logging and monitoring 這篇文章才知道。

    如果要查看可以使用以下指令
    ```bash
        vim access.log 
    ``` 


- [x] 10. 過程中遭遇的問題與解答

    1. 問題1: 
            
            使用 curl 連接 Instance public IP 會 502 Bad GatWay



       解答1: 
            
            這個問題我的經驗是需要注意主程式的設定、 nginx 執行狀態、 nginx 設定檔設定 、 pm2 的執行狀態。
             主程式的部分我原本是想要用環境變數，我在 .env PORT=3000 ， 但是我的主程式 忘了引用 dotenv ， 導致 process.env 的時候我的 port 是 undefine.
             nginx的部分 可以用 sudo systemctl status nginx 查看狀態是否正常， 設定檔是參考文章和進入設定檔的註解。確保內容正確放在正確位置。
             pm2 start app.js --name app 開啟後，可以用 pm2 list 看狀態是否正常，我是注意了以上事情最後才連接成功。
             其實我不知道這個問題核心在哪，我只知道可能和nginx、pm2、主程式有關。

- [x] 11. 列出完成作業時參考的資料

    #### 參考資料
        1. [PM2: The Ultimate Tool for Managing Your Node.js Applications](https://www.youtube.com/watch?v=4bS7KS_s8Go&ab_channel=Koding101)
        2. [Configure NGINX logging and monitoring](https://docs.splunk.com/Documentation/AddOns/released/NGINX/Setupv2)
        3. [[基礎觀念系列] Web Server & Nginx — (2)](https://medium.com/starbugs/web-server-nginx-2-bc41c6268646)