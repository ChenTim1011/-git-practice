
# Week 04 - EC2 Web Server Deployment Checklist

### A. 建立 EC2 主機與部署 Web Server

- [x] 1. 建立 EC2 instance，規格如下：

    - [x] Instance type: t2.micro
    - [x] OS: Linux Ubuntu 22.04 或 Ubuntu 24.04
    - [x] Security Group: Inbound 22 & 80 port
    - [x] Public IP 分配
    - [x] launch instance 過程中下載並保管 key
        
<br>
 
- [x] 2. 用下載的 key 透過 SSH 連線至 EC2 instance

![用下載的 key 透過 SSH 連線至 EC2 instance](https://github.com/user-attachments/assets/9c24f989-d1c6-4a19-a8f3-c8ba09946fd3)

<br>

- [x] 3. 進入 Linux 後，更新作業系統與套件
      
    ```bash
    sudo apt update -y
    sudo apt upgrade -y
    ```
<br>

- [x] 4. 安裝 Nginx，並啟動 Nginx
      
    ```bash
    sudo apt install nginx -y
    sudo systemctl start nginx
    sudo systemctl enable nginx
    ```
<br>
    
- [x] 5. 可透過 instance 的 public IP 測試 Nginx 是否成功運行 (瀏覽器 or curl)
    
    ![可透過 instance 的 public IP 測試 Nginx 是否成功運行](https://github.com/user-attachments/assets/8428ec10-9e69-413a-bcc1-bab9b411f823)

<br>

- [x] 6. 安裝 Node.js
      
    ```bash
    sudo apt install nodejs -y
    
    ```
<br>
    
- [x] 7. 設定主機，clone git-practice 專案
      
    ```bash
    git clone https://github.com/ChenTim1011/git-practice.git
    ```
<br>
    
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
<br>
	
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
<br>
    
- [x] 10. 透過 instance 的 public IP 測試是否成功 proxy 到 Express server
      
    ```bash
    curl http://52.194.253.186
    ```

    ![螢幕擷取畫面 2024-10-06 205506](https://github.com/user-attachments/assets/497a635b-d6d3-4c42-b6d6-34fc3a868041)

<br>

Linux 檔案目錄結構，觀看影片 Linux Directories Explained in 100 Seconds  或其他資料，試著回答:

- /etc 是什麼的縮寫？這裡通常都放哪些檔案？
  
etc 是 Editable Text Configuration 的縮寫，通常用來存放系統和應用程式的設定檔案。例如:像是 Nginx 的設定檔（通常是 .conf 結尾）就會放在這裡。

![etc](https://github.com/user-attachments/assets/7a085898-c550-476b-a450-65e785ce42e4)

  

- /var 這裡通常都放哪些檔案？
  
通常儲存系統運作時產生的變動資料，像是有 logs、cache 等等，比較有趣是 www 這是 Web 伺服器像是 Nginx 所使用的目錄，存放網站檔案。
 
 
![/var](https://github.com/user-attachments/assets/30fc40de-1e7a-4846-9d44-482e248607d7)


我們進去一下 www 資料夾發現有 html，再進去發現有 nginx.html 檔案。
 
 ![www](https://github.com/user-attachments/assets/aab839e2-ee9c-4a72-9b7e-21f4c5f57805)
 
打開發現內容就是我們上面成功開啟 nginx 的預設畫面，我覺得還蠻有趣的。
 
 ![nginx.html](https://github.com/user-attachments/assets/e4964d8e-bccd-4695-b980-e1bacccfae15)

- /boot 這裡通常都放哪些檔案？

  	放啟動系統所需的檔案，還會發現有 aws 結尾的檔案，那是為 aws 執行虛擬機所提供的特殊版本的 Linux 核心和相關設定檔案。
  
  ![/boot](https://github.com/user-attachments/assets/0b967d08-bec0-4099-8f93-4e153fbe3486)
    
- $PATH 環境變數的作用是什麼？
    
用來定義系統搜尋可執行檔案的目錄，好處是方便我們可以在其他目錄執行檔案，不用每次執行都輸入完整的位置。
    
例如:我們使用 echo $PATH會出現以下路徑，這些路徑表示系統在你輸入命令時，會按照這些目錄順序來搜尋對應的可執行檔案。
  
  ![echo $PATH](https://github.com/user-attachments/assets/32869829-e8d0-4bca-93d6-b90974a442b1)

例如:這裡 /usr/local/bin 中有 pm2 ， 那我想要執行 pm2 我就只要在任何的目錄輸入 pm2 start 就可以執行，
不用輸入 /usr/local/bin/pm2 start
  
  ![pm2](https://github.com/user-attachments/assets/68d09ccb-30ab-43b6-ba3d-94e9c572d4a3)

- `which` 指令的作用？

可以顯示命令或可執行檔的位置。
  
  ![image](https://github.com/user-attachments/assets/92ca2b52-6c0a-41f6-910a-828cc0673573)




### B. Readme 文件問題回答

- [x] 1. 提供 instance 的 public IP  

        
            52.194.253.186
     
<br>

- [x] 2. 什麼是 instance type?

建立 instance 時，會有不同的硬體規格，像是有 vCPUs 、 Architecture 、 Memory (GiB) 、 Storage (GB)等等選擇，越好的規格價格會比較貴。
     
<br>

- [x] 3. 什麼是 Nginx？有哪些用途與特性？
        
Nginx 可以當作是 web server ,可以用來反向代理、負載平衡，反向代理好處是有很多台伺服器，但是使用者以為只有和一台伺服器互動。
負載平衡是，如果有很多來自使用者的請求，如果這時候沒有 Nginx，會造成某一台伺服器一直受到請求，如果有 Nginx 幫忙把使用者請求分散到不同伺服器。 

<br>

- [x] 4. pm2 套件是什麼？有什麼用處？

過去我們手動打開我們的後端伺服器，當我們關掉終端機程式就結束，但是 pm2 就可以解決這個問題， pm2 是 nodejs 的 程序管理套件， 好處是能夠在背景執行我們的程式，
當程式出問題也可以重啟程式，而且可以監控程式的狀態。

<br>

- [x] 5. 什麼是 `proxy`？為什麼要透過 Nginx 來 `proxy` 到 Express Web Server？

假設還沒有 proxy ，分成客戶端和伺服器端，客戶端發送請求到伺服器端，伺服器接收訊息回傳給客戶端，中間沒有人。 proxy 就像是中間代理人的角色。
透過 Nginx 來 `proxy` 到 Express Web Server 好處是 Nginx 可以幫忙把使用者請求分散到不同伺服器。

<br>

- [x] 解釋 `Reverse proxy` vs `Forward Proxy`
      
  主要差別是在代理的對象和用途

  Forward Proxy: 代理客戶端的請求，可幫助客戶端存取伺服器，可以繞過防火牆或網路限制、隱藏客戶端的 IP。

  Reverse proxy: 代理伺服器的請求，可幫助伺服器處理和分發客戶端的請求，常用於分配流量、隱藏內部伺服器。

<br>

- [x] 6. 提供步驟 9 的 Nginx 設定檔

<br>
      
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
<br>

- [x] 7. Security Group 是什麼？有什麼用途？設定原則是什麼？

Security Group 可以當成是 可以用來控制網路流量要到哪一個 port 上的虛擬防火牆。它有
允許哪些 inbound 和 outbound 網路流量能夠進入或離開 EC2 instance。

Security Group 主要用途是保護 EC2 instance，防止沒有授權的網路存取，並允許合法的流量進入和離開。

Security Group 根據 IP 地址、 port number 、和 protocol，如 TCP、UDP 等，來設定允許或拒絕的網路流量。
有個原則是 Principle of Least Privilege , 只允許 EC2 instance 實際需要的網路流量，盡量限制開放的端口和來源 IP 範圍。
就像我們舉辦一個活動，要求需要具備某些特殊身分才可以入場，這樣可以確保不會有其他不相關人士進入。
        
<br>
     
- [x] 8. 什麼是 sudo？為什麼有時候需要加上 sudo，有時候不用？

 sudo 是 superuser do 的意思，因為不同的目錄或檔案會有不同的權限，權限不夠的話沒有加上 sudo 會沒有辦法編輯， 

<br>

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

<br>

- [x] 10. 過程中遭遇的問題與解答

  	問題1:  使用 curl 連接 Instance public IP 會 502 Bad GatWay

	解答: 
	    
	這個問題我的經驗是需要注意主程式的設定、 nginx 執行狀態、 nginx 設定檔設定 、 pm2 的執行狀態。
	主程式的部分我原本是想要用環境變數，我在 .env PORT=3000 ， 但是我的主程式 忘了引用 dotenv ， 導致 process.env 的時候我的 port 是 undefine.
	nginx的部分 可以用 sudo systemctl status nginx 查看狀態是否正常， 設定檔是參考文章和進入設定檔的註解。確保內容正確放在正確位置。
	pm2 start app.js --name app 開啟後，可以用 pm2 list 看狀態是否正常，我是注意了以上事情最後才連接成功。
	其實我不知道這個問題核心在哪，我只知道可能和nginx、pm2、主程式有關。
<br>

- [x] 11. 列出完成作業時參考的資料

    #### 參考資料

	1. [PM2: The Ultimate Tool for Managing Your Node.js Applications](https://www.youtube.com/watch?v=4bS7KS_s8Go&ab_channel=Koding101)

	2. [Configure NGINX logging and monitoring](https://docs.splunk.com/Documentation/AddOns/released/NGINX/Setupv2)

	3. [Web Server & Nginx — (2)](https://medium.com/starbugs/web-server-nginx-2-bc41c6268646)
