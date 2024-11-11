### Nginx 的應用場景

1. 靜態內容服務：Nginx 可高效提供靜態資源，如圖片、CSS、JavaScript 等。

2. 反向代理：Nginx 可作為反向代理，將用戶端請求轉發至後端伺服器，並回傳回應給用戶端。

3. 負載均衡：Nginx 可將請求分配至多個後端伺服器，實現負載均衡，提升系統的可用性和擴展性。

4. HTTP 快取：Nginx 可作為 HTTP 快取，加速內容傳遞，減少後端伺服器的負載。

5. 安全控制：Nginx 支援 SSL/TLS，加強網站的安全性，並可進行存取控制和限制。

### Nginx 的工作原理

當用戶端發送請求至 Nginx 伺服器時，Nginx 的處理流程如下：

1. Accept Connections：主程式監聽指定的 port ，接受用戶端的連線請求。

2. Assign Worker Processes：主程式將新連線分配給空閒的工作程式，或根據負載均衡策略進行分配。

3. Process Request ：工作程式接收連線後，讀取請求並傳遞給相應的處理模組。
根據設定，Nginx 可處理靜態檔案、代理請求、負載平衡等任務。

4. Generate Response：處理模組根據請求生成相應的回應，並將其發送回用戶端。

5. Close Connection：請求完成後，連線可保持活動狀態以便重用，或被關閉以釋放資源。


 




### Nginx 運行過程
- **Master 和 Worker Processes**：NGINX 在運行時啟動一個 main process 和多個 worker processes 。main process 負責加載和管理設定文件、維護工作 process，而 worker processes 實際處理請求。
worker processes 的數量可在 `nginx.conf` 中設置，可以固定或隨 CPU 核心數自動調整。

### 控制 Nginx
- **使用訊號控制**：可以通過 `nginx -s <SIGNAL>` 來控制 main process，其中 `<SIGNAL>` 可選擇：
  - `quit`
  - `reload`
  - `reopen`
  - `stop`


### 建立 Nginx Plus 和 Nginx 設定檔

Nginx 和 Nginx Plus 使用純文字的設定檔，格式與其他服務相似。預設檔案名稱為 `nginx.conf`，在 Nginx Plus 中位於 `/etc/nginx` 

#### 指令（Directives）
設定檔由指令及其參數組成。簡單的（單行）指令結尾需加上分號（`;`）。
其他指令可作為「容器」來組合相關的指令，並用大括號（ `{}` ）包圍，這些通常稱為「區塊」。

```nginx
user             nobody;
error_log        logs/error.log notice;
worker_processes 1;
```

#### 功能專屬設定檔
為了讓設定更容易維護，建議將其分割成多個功能專屬檔案，存放於 `/etc/nginx/conf.d` 目錄中，
並在主要的 `nginx.conf` 檔案中使用 `include` 指令來引用這些功能檔案的內容。

```nginx
include conf.d/http;
include conf.d/stream;
include conf.d/exchange-enhanced;
```

#### Context
用於組合不同流量類型的指令：

- **events** – 一般連線處理
- **http** – HTTP 流量
- **mail** – 郵件流量
- **stream** – TCP 和 UDP 流量

在這些 contexts 之外的指令稱為 main context。

#### 虛擬伺服器（Virtual Servers）
在每個流量處理的 context 中，可以包含一個或多個 `server` 區塊來定義虛擬伺服器，控制請求的處理方式
包含在 `server` context 中的指令會依據流量類型而異。

- **HTTP 流量（http context）**：每個 `server` 指令控制特定網域或 IP 位址的資源請求處理。 
`server` context 中的一個或多個 `location` context 定義了如何處理特定的 URI 集合。

- **郵件和 TCP/UDP 流量（mail 和 stream context）**：`server` 指令控制進入特定 TCP port 或 UNIX socket 的流量處理。

#### 多 context 設定檔範例

```nginx
user nobody; # 'main' context 中的指令

events {
    # 連線處理的設定
}

http {
    # 針對所有 HTTP 虛擬伺服器的 HTTP 特定設定

    server {
        # HTTP 虛擬伺服器 1 的設定
        location /one {
            # 處理 URI 以 '/one' 開頭的設定
        }
        location /two {
            # 處理 URI 以 '/two' 開頭的設定
        }
    }

    server {
        # HTTP 虛擬伺服器 2 的設定
    }
}

stream {
    # 針對所有 TCP/UDP 虛擬伺服器的 TCP/UDP 特定設定
    server {
        # TCP 虛擬伺服器 1 的設定
    }
}
```

#### 繼承（Inheritance）
一般而言，子 context（包含在其他 context 內）會繼承父層中的指令設定。某些指令可在多層 context 中出現，
子 context 可以透過覆蓋父層中的設置來修改該指令的值，例如 `proxy_set_header` 指令。

#### 重新載入設定
若需使設定檔的變更生效，必須重新載入設定檔。可以重啟 nginx 進程，或發送 `reload` 更新設定。


#####


### 參考資料
[Controlling Nginx Processes at Runtime](https://docs.nginx.com/nginx/admin-guide/basic-functionality/runtime-control/)
[Creating Nginx Plus and Nginx Configuration Files](https://docs.nginx.com/nginx/admin-guide/basic-functionality/managing-configuration-files/)