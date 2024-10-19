## 第五周

## 網域購買與憑證申請

- [x] 1. 選擇任一可以購買網域的服務商，購買自己想要的網域



- [x] 2. 設定 DNS A Record，將 www 指向自己在個人作業 4 建立的 AWS EC2 instance

![image](https://github.com/user-attachments/assets/f1205cf9-0d29-4b54-b592-88f5a59b51ea)


- [x] 3. 到 https://zerossl.com/ 申請 3 個月的免費憑證
 
![image](https://github.com/user-attachments/assets/bd98943e-75ac-4cea-a003-0a5a9524d798)



申請好後，下載憑證到自己電腦後，我是放在 WSL /home/ 裡，把憑證放到 EC2 的 虛擬機檔案夾裡

```bash
scp -i "your-key.pem" certificate.crt ca_bundle.crt private.key ubuntu@"your EC2 public IP":/home/ubuntu
```
![image](https://github.com/user-attachments/assets/c1e14400-230a-44ba-ac42-68c5db464fa2)


1. 建立目標資料夾  /etc/nginx/ssl 
首先，確認 /etc/nginx/ssl 資料夾已經存在。如果不存在，則需要建立它：
```bash
sudo mkdir -p /etc/nginx/ssl
```


2. 將檔案移動到 /etc/nginx/ssl
假設你現在的 certificate.crt、ca_bundle.crt 和 private.key 位於 /home/ubuntu 目錄中，使用以下命令將它們移動到 /etc/nginx/ssl 資料夾：
```bash
sudo mv /home/ubuntu/certificate.crt /etc/nginx/ssl/
sudo mv /home/ubuntu/ca_bundle.crt /etc/nginx/ssl/
sudo mv /home/ubuntu/private.key /etc/nginx/ssl/
```
3. 設置正確的檔案權限
確保 Nginx 可以讀取這些檔案，並且私鑰的權限正確。可以設置以下權限：
```bash
sudo chmod 600 /etc/nginx/ssl/private.key
sudo chmod 644 /etc/nginx/ssl/certificate.crt
sudo chmod 644 /etc/nginx/ssl/ca_bundle.crt
```
4. 修改 /etc/nginx/sites-available/app 的內容，設定 將憑證安裝至 AWS EC2 instance 的 Nginx 裡
```
# HTTP server -> HTTPS

server {
    listen 80;
    server_name www.gocloud.agency;

    # 將所有 HTTP 請求重定向到 HTTPS
    return 301 https://$host$request_uri;
}


# HTTPS 伺服器
server {
    listen 443 ssl;
    server_name gocloud.agency www.gocloud.agency;  # 你的域名

    # 設定 SSL 憑證
    ssl_certificate /etc/nginx/ssl/certificate.crt;
    ssl_certificate_key /etc/nginx/ssl/private.key;
    ssl_trusted_certificate /etc/nginx/ssl/ca_bundle.crt;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://localhost:3000;  # 將請求代理到本地的 Express 應用
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}


```

       
- [x] 4. 將憑證安裝至 AWS EC2 instance 的 Nginx 裡

確保 Express 可以正常開啟 ， EC2 inbounds 有正確設定 port ， nginx 狀態正常



## 在 /week-05/readme.md 中回答以下問題：

- [x] 1. 你的網址是什麼？應該是 https://www.xxx.xxx，點擊過去應該要可以看到個人作業 4 
      架設的 Express server （由 Nginx proxy 到 Express）
   
  https://www.gocloud.agency

![image](https://github.com/user-attachments/assets/6dd53e1a-e97f-4805-b46f-0cc6550fba24)


- [x] 2. 你在哪裡購買網域的？

  Godaddy

- [x] 3. DNS 的 A record 是什麼？
  
  A代表「位址」，這是最基礎的 DNS 記錄類型：表示給定網域的 IP 位址
  用於名稱解析的重要記錄，它將特定的主機名對映到對應主機的 IP 位址上。

- [x] 4. DNS 的 NS record 是什麼？

  NS 代表「名稱伺服器」，名稱伺服器記錄指示哪個DNS 伺服器對該網域具有權威性

- [x] 5. Domain Name vs FQDN vs URL 這三者分別為何？

 1. 網域名稱 (Domain Name): 僅指向網站的名稱，例如 google.com 用方便記憶的字取代實際的 IP 位置

 2. FQDN （Fully Qualified Domain Name）完整網域名稱，包含主機名，例如: www.google.com

 3. URL （ Uniform Resource Locator )俗稱網頁位址，簡稱網址，是網際網路上標準的資源的位址（Address）

- [x] 6. 為什麼應該要為網站加上憑證？而不是直接用 http 就好？
    
    確保資料完整性，HTTPS 可以保證資料在傳輸過程中未被篡改。SSL/TLS 憑證會檢查資料是否被修改，
    防止惡意攻擊者在不被察覺的情況下更改傳輸內容。


## 參考資料

[搞懂 IP、FQDN、DNS、Name Server](https://its-okay.medium.com/%E6%90%9E%E6%87%82-ip-fqdn-dns-name-server-%E9%BC%A0%E5%B9%B4%E5%85%A8%E9%A6%AC%E9%90%B5%E4%BA%BA%E6%8C%91%E6%88%B0-05-aa60f45496fb)
[NS record](https://www.cloudflare.com/zh-tw/learning/dns/dns-records/dns-ns-record/)



## 補充

1. **DNS CNAME 記錄是什麼？何時應使用它？**  
   
   CNAME 記錄將一個別名指向另一個域名的 A 記錄，避免為每個新別名配置 A 記錄。使用它可簡化管理，
   尤其當有多個子域名需要指向同一 IP 位址時。

2. **TTL（Time To Live）在 DNS 設定中的作用是什麼？**  
   
   TTL 定義 DNS 查詢結果的快取時間。正確的 TTL 設置可影響網站更新速度和流量分配，
   過短會增加伺服器負載，過長會導致變更延遲。

3. **CA（Certificate Authority，證書授權機構）是什麼？它如何保證憑證的安全性？**  
   CA 是可信的第三方機構，負責發行 SSL 憑證，驗證網站身份。使用 CA 簽發的憑證可增加信任，因為自簽憑證不被瀏覽器預設信任。

4. **Wildcard SSL 憑證和普通 SSL 憑證有什麼區別？**  
  Wildcard 憑證可以保護一個域名及其所有子域名（如 `*.example.com`），而普通 SSL 憑證只能保護單個域名。
  使用 Wildcard 憑證適合擁有多個子域名的情況。

5. **網站的 SSL/TLS 憑證失效會造成什麼後果？**  
  憑證失效將導致瀏覽器顯示安全警告，阻止使用者進入網站。提前設置提醒、使用自動更新工具（如 Certbot）更新憑證。

6. **憑證透明度（Certificate Transparency，CT）是什麼？為什麼它對網絡安全很重要？**  
  CT 是一個公開記錄所有已發行 SSL 憑證的系統，防止憑證被濫發，幫助網站檢查是否有惡意的偽造憑證，提升網站安全性。
