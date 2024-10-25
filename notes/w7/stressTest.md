## 不同程式語言會有不同的設計哲學

上課時覺得老師示範的例子很有趣，我也想要自己測試一下!

1. NodeJS vs PHP
2. 準備兩台 AWS EC2 instance type
3. Web server: 安裝 apache2 + PHP 與 NodeJS
4. Tester: 測試機，安裝 Apach Bench (ab)
5. 透過 ab 進行壓測，透過 top 觀察 process、CPU 與 memory 的變化


實作NodeJS和PHP的效能比較並監測CPU、記憶體變化

### 1. 準備 AWS EC2 實例

- 透過AWS管理介面啟動兩個EC2實例，選擇 `t2.micro` 
- 為兩個實例安裝 Ubuntu 20.04 LTS（或更高版本）。

### 2. 安裝 Web Server

在第一台EC2實例（作為Web Server）中：

#### 安裝 Apache 和 PHP
1. 更新系統：
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```
2. 安裝 Apache 和 PHP：
   ```bash
   sudo apt install apache2 php libapache2-mod-php -y
   ```
3. 確認 Apache 和 PHP 安裝完成，並可在 `/var/www/html` 資料夾中放入測試的 PHP 檔案。例如：
   ```bash
   echo "<?php phpinfo(); ?>" | sudo tee /var/www/html/info.php
   ```
4. 重啟 Apache 確保變更生效：
   ```bash
   sudo systemctl restart apache2
   ```

#### 安裝 Node.js
1. 安裝 Node.js 的 LTS 版本：
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
   sudo apt install -y nodejs
   ```
2. 創建簡單的NodeJS測試服務。例如，在 `/home/ubuntu` 中建立 `server.js`：
   ```javascript
   const http = require('http');
   const server = http.createServer((req, res) => {
       res.writeHead(200, { 'Content-Type': 'text/plain' });
       res.end('Hello from NodeJS server\n');
   });
   server.listen(3000, () => console.log('NodeJS server is running on port 3000'));
   ```
3. 執行 Node.js 服務：
   ```bash
   node /home/ubuntu/server.js &
   ```

### 3. 設置測試環境 (第二台EC2實例)

- 在測試機上安裝 `Apache Bench`（ab 工具）：
  ```bash
  sudo apt install apache2-utils -y
  ```

### 4. 壓力測試

在測試機中使用 `ab` 工具對 Web 伺服器進行壓測並監控資源消耗。

#### 測試 PHP 伺服器

使用以下指令對 PHP 進行壓測：
```bash
ab -n 10000 -c 1000 http://<Web_Server_IP>/info.php
```
此命令會模擬 10000 個請求，並同時進行 1000 個連線。

#### 測試 Node.js 伺服器

```bash
ab -n 1000 -c 10 http://<Web_Server_IP>:3000/
```

### 5. 監控資源消耗

在 Web Server 上運行以下指令以實時觀察資源使用狀況：

```bash
htop
```

在 `htop` 的視窗中，查看 `CPU` 和 `Memory` 使用率，並特別關注 PHP 和 Node.js 的 process。


```bash
#!/bin/bash

# Web Server IP
server_ip="<Web_Server_IP>"

# 測試 PHP 和 Node.js
declare -a paths=("info.php" ":3000/")
declare -a servers=("PHP" "Node.js")

for i in "${!paths[@]}"; do
  for ((n=5000; n<=45000; n+=10000)); do
    echo "Testing ${servers[$i]} with $n requests and 1000 concurrency"
    
    ab_result=$(ab -n $n -c 1000 http://$server_ip/${paths[$i]} 2>&1)
    
    # 解析出關鍵資料
    failed_requests=$(echo "$ab_result" | grep "Failed requests" | awk '{print $3}')
    requests_per_sec=$(echo "$ab_result" | grep "Requests per second" | awk '{print $4}')

    
    # 保存資料到文件
    echo "$n,1000,$failed_requests,$requests_per_sec" >> "${servers[$i]}_results.csv"
  done
done
```

### 6. 實驗心得

1. 請求處理性能

Node.js 在每秒處理的請求數量上表現優異，尤其在 concurrent 請求數量較高的情況下，它的表現穩定且效率高。從測試結果中，Node.js 的每秒請求數在大多數請求量下明顯高於 PHP。

PHP 的每秒請求數在壓力測試中表現較為穩定，但隨著請求量增加，性能逐漸下降，這與 PHP 傳統的阻塞式架構有關。當 concurrent 請求數高於伺服器承受範圍時，處理效能明顯受到影響。

2. 失敗請求數量

PHP 在高 concurrent 請求下產生了較多的失敗請求。這顯示出 PHP 在高 concurrent 情況下的可擴展性有限，可能受限於伺服器的連接數配置和資源使用率。

Node.js 在同樣的負載下幾乎沒有失敗請求，顯示出其在高 concurrent 處理方面的穩定性和彈性。這得益於其非阻塞的I/O模型，可以在高 concurrent 情況下維持相對穩定的性能。

3. 資源管理與架構差異

PHP 為典型的同步、阻塞式架構，主要依賴 Apache 伺服器管理請求，容易在高負載情況下耗盡資源。
PHP 伺服器需要逐一處理請求，導致在處理大量同時進行的請求時容易出現瓶頸。

Node.js 基於事件驅動和非阻塞 I/O 的架構，允許伺服器在接收請求時不需等待處理完畢，可以有效管理大量並發請求。這種架構適合高流量應用，使其在高 concurrent 需求中有優勢。

4. 適用場景建議

PHP 更適合用於傳統的同步 Web 應用，適合不需大量 concurrent 處理的網站或應用。

Node.js 更適合高 concurrent 需求的應用，如即時通訊、聊天應用或資料流動性高的 API 服務。它的非阻塞模型和輕量級特性非常適合現代化的 Web 服務需求，如即時應用和微服務架構。






#### 參考資料

[小賴老師 20241024 簡報](https://docs.google.com/presentation/d/12D9R3R-SfpZtNKejVRGCp8EOiDJRIwk60uihUItebRs/edit#slide=id.g3057d3264ef_1_914)