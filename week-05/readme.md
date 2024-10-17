## B. 網域購買與憑證申請

- [ ] 1. 選擇任一可以購買網域的服務商，購買自己想要的網域
- [ ] 2. 設定 DNS A Record，將 www 指向自己在個人作業 4 建立的 AWS EC2 instance
- [ ] 3. 到 https://zerossl.com/ 申請 3 個月的免費憑證
 
- [ ] 4. 將憑證安裝至 AWS EC2 instance 的 Nginx 裡

## 在 /week-05/readme.md 中回答以下問題：

- [ ] 1. 你的網址是什麼？應該是 https://www.xxx.xxx，點擊過去應該要可以看到個人作業 4 架設的 Express server （由 Nginx proxy 到 Express）
- [ ] 2. 你在哪裡購買網域的？
- [ ] 3. DNS 的 A record 是什麼？
- [ ] 4. DNS 的 NS record 是什麼？
- [ ] 5. Domain Name vs FQDN vs URL 這三者分別為何？
- [ ] 6. 為什麼應該要為網站加上憑證？而不是直接用 http 就好？


## 補充

- [ ] 1. **DNS CNAME Record 是什麼？何時應使用它？**
  - 延伸討論如何選擇 A Record 和 CNAME Record 的適當應用情境。

- [ ] 2. **TTL（Time To Live）在 DNS 設定中的作用是什麼？**
  - 為什麼選擇正確的 TTL 會影響網站更新和流量分配？

- [ ] 3. **CA（Certificate Authority，證書授權機構）是什麼？它如何保證憑證的安全性？**
  - 為什麼需要通過 CA 來申請 SSL 憑證，而不是自己簽發？

- [ ] 4. **老師上課提到的 Wildcard SSL 憑證和普通 SSL 憑證有什麼區別？**
  - 探討何時需要使用 Wildcard 憑證來保護多個子域名。

- [ ] 5. **自動化憑證更新工具如 Let's Encrypt 的 Certbot 是如何工作的？**
  - 使用 Certbot 或其他工具自動更新 SSL 憑證時，需要考慮哪些潛在的挑戰？

- [ ] 6. **HTTP/3 協議帶來了哪些優勢？**
  - 為什麼現在越來越多的網站選擇使用 HTTP/3 協議？這對於性能有什麼提升？

- [ ] 7. **如何保證 Nginx 或 Apache 在處理 HTTPS 連線時的效能？**
  - 哪些 Nginx 配置優化可以提高 HTTPS 請求的效能？


- [ ] 8. **網站的 SSL/TLS 憑證失效會造成什麼後果？**
  - 使用者將如何察覺到網站憑證失效，網站營運方應如何提前防範？

- [ ] 9. **憑證透明度（Certificate Transparency，CT）是什麼？為什麼它對網絡安全很重要？**
  - 如何通過 CT 機制來防止憑證被濫發，進一步保障網站安全？
