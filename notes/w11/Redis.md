### 1. **Redis 簡介**

Redis 是一個開源的、高效能的鍵值儲存系統，它支援多種資料結構，例如字串（String）、雜湊（Hash）、列表（List）、集合（Set）、有序集合（Sorted Set）等。由於其極快的讀寫速度，Redis 經常被用來實現高效的快取系統、佇列系統、計數器等。

### 2. **安裝 Redis**

#### 在 Linux 上安裝 Redis：
1. 透過終端機安裝 Redis：
   ```bash
   sudo apt update
   sudo apt install redis-server
   ```

2. 啟動 Redis 伺服器：
   ```bash
   sudo systemctl start redis-server
   ```

3. 設定 Redis 開機自動啟動：
   ```bash
   sudo systemctl enable redis-server
   ```

4. 測試 Redis 是否安裝成功：
   ```bash
   redis-cli ping
   ```
   如果返回 `PONG`，則表示安裝成功。


### 3. **Redis 基本命令**

這裡介紹一些基本的 Redis 命令，你可以使用 `redis-cli` 工具來與 Redis 伺服器互動。

#### (1) 字串（String）
Redis 的字串資料結構是最基本的資料結構，支援簡單的鍵值對儲存。

- **SET**：設置鍵的值。
  ```bash
  SET key "value"
  ```
- **GET**：獲取鍵的值。
  ```bash
  GET key
  ```

#### (2) 雜湊（Hash）
雜湊是一組鍵值對的集合，類似於字典，適合用來儲存物件。

- **HSET**：設置雜湊表中的字段。
  ```bash
  HSET myhash field1 "value1"
  ```
- **HGET**：獲取雜湊表中的字段值。
  ```bash
  HGET myhash field1
  ```

#### (3) 列表（List）
列表是有序的元素集合，支援從兩端插入和移除元素。

- **LPUSH**：將元素插入列表的左端。
  ```bash
  LPUSH mylist "value1"
  ```
- **LRANGE**：範圍查詢列表的元素。
  ```bash
  LRANGE mylist 0 -1
  ```

#### (4) 集合（Set）
集合是無序的元素集合，元素是唯一的。

- **SADD**：將元素添加到集合中。
  ```bash
  SADD myset "value1"
  ```
- **SMEMBERS**：獲取集合中的所有元素。
  ```bash
  SMEMBERS myset
  ```

#### (5) 有序集合（Sorted Set）
有序集合是每個元素都有一個分數，用來進行排序。

- **ZADD**：將元素添加到有序集合中，並設置分數。
  ```bash
  ZADD myzset 1 "value1"
  ```
- **ZRANGE**：按分數範圍查詢有序集合的元素。
  ```bash
  ZRANGE myzset 0 -1
  ```

### 4. **實現 Fixed Window 算法**

Fixed Window 是一種用於流量控制的算法，可以限制在固定時間窗口內的請求數量。例如，假設在 1 分鐘內只能處理 100 個請求，超過 100 個請求會被拒絕。

#### 步驟：
- 使用 Redis 中的 **字串（String）** 或 **雜湊（Hash）** 來記錄時間窗口內的請求數量。
- 每次請求進來時，檢查該時間窗口內的請求數量。
- 如果數量未超過限制，則允許請求並更新計數；如果數量超過，則拒絕請求。

#### 例子：使用 Redis 字串實現 Fixed Window

1. **設置請求計數器**
   假設你設置了一個時間窗口為 1 分鐘，並且每個時間窗口最多可以有 100 次請求，這樣我們可以用一個字串來儲存該時間窗口內的請求次數。

2. **記錄請求**
   假設我們用 Redis 的 `INCR` 命令來增加請求次數：
   ```bash
   INCR requests:timestamp
   ```

3. **檢查請求次數**
   你可以設置一個過期時間（TTL）來確保每個時間窗口後，計數器會自動重置。例如：
   ```bash
   EXPIRE requests:timestamp 60  # 設置 1 分鐘後過期
   ```

4. **完整的 Python 範例（使用 Redis-py 客戶端）**

   ```python
   import redis
   import time

   # 連接到 Redis
   r = redis.Redis(host='localhost', port=6379, db=0)

   def check_request_rate(user_id):
       # 使用時間戳作為鍵
       timestamp = int(time.time() / 60)  # 以分鐘為單位作為時間窗口
       key = f"requests:{timestamp}:{user_id}"

       # 檢查該用戶在當前時間窗口內的請求次數
       current_requests = r.get(key)
       if current_requests and int(current_requests) >= 100:
           return "Rate limit exceeded"
       else:
           r.incr(key)  # 增加請求次數
           r.expire(key, 60)  # 設置 1 分鐘後過期
           return "Request accepted"

   # 測試
   print(check_request_rate('user123'))
   ```

### 5. **結論**
Redis 的資料結構非常多樣，可以用來解決許多不同的問題。在本例中，我們使用了 Redis 的 **字串（String）** 資料結構來實做 **Fixed Window** 限流算法。當你學會基本的資料結構操作後，還可以進一步探索其他進階的應用，如使用 **Sorted Set** 來實做 **Sliding Window** 演算法等。

