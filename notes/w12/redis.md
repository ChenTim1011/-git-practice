
     ```1. **啟動 Redis 服務**
   ```bash
   sudo systemctl start redis
   sudo systemctl enable redis  # 設定開機自動啟動
   ```

2. **檢查 Redis 是否安裝成功**
   ```bash
   redis-cli ping
   ```
   若顯示 `PONG`，代表 Redis 安裝成功。

---

## 2. **練習操作 Redis 中不同的資料結構**
Redis 提供五大基本資料結構：String、List、Set、Hash 和 Sorted Set。

### **2.1 資料結構介紹與操作指令**
#### **String (字串)**
```bash
# 設定一個 key-value
set key1 "Hello Redis"

# 取得 key1 的值
get key1
```
![螢幕擷取畫面 2024-12-15 225222](https://github.com/user-attachments/assets/cefc308c-e815-4817-92ce-495f49f3674e)


#### **List (列表)**
```bash
# 新增元素到 List 中 (左邊)
lpush list1 "A"
lpush list1 "B"
lpush list1 "C"

# 從 List 取出所有元素
lrange list1 0 -1
```

![螢幕擷取畫面 2024-12-15 225227](https://github.com/user-attachments/assets/6ca8760d-c77b-42af-a6f9-c513b802b4cd)


#### **Set (集合)**
```bash
# 新增元素到 Set
sadd set1 "Apple"
sadd set1 "Banana"
sadd set1 "Orange"

# 顯示所有 Set 元素
smembers set1
```


![螢幕擷取畫面 2024-12-15 225234](https://github.com/user-attachments/assets/0baa5de8-ce55-4eba-8ed5-476987b31e31)

#### **Hash (哈希)**
```bash
# 設定一個 Hash
hset user:1 name "John" age "25" city "Taipei"

# 取得 Hash 中的所有值
hgetall user:1
```

![螢幕擷取畫面 2024-12-15 225239](https://github.com/user-attachments/assets/d88695c4-e52b-4386-84a7-d84c0b24f3e2)


#### **Sorted Set (有序集合)**
```bash
# 新增元素與分數到 Sorted Set
zadd scores 100 "Tom" 95 "Jerry" 80 "Spike"
# 取得所有有序元素
zrange scores 0 -1 WITHSCORES
```

![螢幕擷取畫面 2024-12-15 225245](https://github.com/user-attachments/assets/de281d28-d89d-409b-bfd7-c6c212d7c627)
