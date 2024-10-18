## 第五周

## 網域購買與憑證申請

- [x] 1. 選擇任一可以購買網域的服務商，購買自己想要的網域

- [x] 2. 設定 DNS A Record，將 www 指向自己在個人作業 4 建立的 AWS EC2 instance

- [x] 3. 到 https://zerossl.com/ 申請 3 個月的免費憑證
 
- [x] 4. 將憑證安裝至 AWS EC2 instance 的 Nginx 裡

## 在 /week-05/readme.md 中回答以下問題：

- [x] 1. 你的網址是什麼？應該是 https://www.xxx.xxx，點擊過去應該要可以看到個人作業 4 
      架設的 Express server （由 Nginx proxy 到 Express）
   
  https://www.gocloud.agency

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