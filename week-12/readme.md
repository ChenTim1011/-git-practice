# 20241128 W12 - 個人作業 8

## 參考資料
[個人作業 8](https://lightda-tw.notion.site/20241128-W12-8-14b2ceabc70c80c1879df943e4fa7d0a)


## Docker 練習


### 基本觀念

- **Docker的優勢**

- **輕量級**：比傳統虛擬機更輕量，啟動更快
- **一致性**：開發、測試、生產環境保持一致
- **隔離性**：容器之間相互隔離，不會互相影響
- **可移植性**：可以在任何支持 Docker 的平台上運行
- **擴展性**：易於擴展和縮減應用規模


- **Dockerfile**：
一個包含建立 Docker image 的所有指令的文件。
告訴Docker如何一步一步建立一個 image 。比如安裝什麼軟體、複製什麼文件、設置什麼環境變量等。

- **Image（image）**：
image是一個唯讀的模板，包含了運行應用程式所需的所有文件和設定。

- **Container（容器）**：
容器是 image 的運行實體。一個 image 可以建立多個容器，每個容器都是相互隔離的運行環境。

1. **Docker的重要概念**

- **Docker Hub**：
這是 Docker 官方的image repo，類似於GitHub。你可以在這裡找到大量現成的 image，也可以把自己的 image push上去分享給其他人。

- **Volume**：
用來持久化資料。因為容器本身是無狀態的，當容器被刪除時，裡面的資料也會消失。透過 mount volume，可以將資料保存在主機上。

- **Docker Network**：
允許容器之間進行通訊。容器可以通過網路相互存取，也可以與外部網路進行連接。



2. **Docker 指令的基本格式**
   
```bash
docker [物件] [指令] [參數]
```
物件: container, image, network, volume,…

指令: run, rm, ls, inspect,… → 想要對「物件」做的動作

### 動手做 1: Container 的建立、列表與移除，指定名字與查看

#### docker container run [參數] {image 名稱} [CMD]

#### 觀察以下指令的執行過程與結果
```bash
docker container run --name {your name} alpine echo "hello world"


# 練習基本指令
docker container ls # 為什麼看不到上一行指令建立的 container?
docker container ls -a


# 停止 container
docker container stop {container id or id}

# 移除 container
docker container rm {container name or id}

# 移除所有停止運行的 container
docker container prune

# 啟動時指定名字
docker container run --name {your-name} alpine

# 查看一個 container
docker container inspect my-container

# 觀察以下兩個指令執行後的差異
docker container run alpine echo "hello world"
docker container run --rm alpine echo "hello world"
```
![螢幕擷取畫面 2024-12-13 103415](https://github.com/user-attachments/assets/3686d4b6-15ad-4c9c-a8e2-97e0da58ebdc)

![螢幕擷取畫面 2024-12-13 103558](https://github.com/user-attachments/assets/9ac4ac90-a8ea-47bd-86c2-f6b2d301a683)


- Q1: 為什麼 docker container ls 看不到容器？

因為 docker container ls 只顯示正在運行的容器
echo "hello world" 命令執行完就結束了，容器也隨之停止
使用 docker container ls -a 可以看到所有容器，包括已停止的容器


![螢幕擷取畫面 2024-12-13 104239](https://github.com/user-attachments/assets/08ed22bd-2c06-42ba-b33e-8d82ff3753c3)

- Q2: --rm 區別：

第一個指令：容器停止後會保留，需要手動清理
第二個指令：加入 --rm 參數，容器停止後會自動刪除
--rm 參數適用於臨時性的任務，避免容器堆積



### 動手做 2: 前景與背景模式

```bash
## 前景執行
## run 的時候沒有指定 COMMAND (CMD)，那就是用預設的 COMMAND
docker container run -it nginx bash
## -i interactive 啟動互動模式，保持標準輸入的開放
## -t tty 讓 Docker 分配一個虛擬終端機(pseudo-TTY)，並且綁定到容器的標準輸出上。
## 此時會建立一個虛擬終端機，並且啟動互動模式，也就是你現在「在 container 裡」
## 離開的話，要下什麼指令？ => exit

# detach 模式 (背景模式)
## run 的時候沒有指定 COMMAND，那就是用預設的 COMMAND
docker container run -d nginx
## 觀察執行後的結果
docker container ls 

# detach 模式看不到程式輸出的結果？
## 觀察 container 裡 processes 的 stdout 與 stderr
docker container logs {container id or name}

# 「進入」這個 container
docker container exec -it {container id or name} bash

# 實驗:
## ubuntu 這個 image 如果用 detach 模式啟動會怎麼樣？ 啟動失敗
docker container run -d ubuntu
## 你觀察到什麼？container 有被成功啟動嗎？ 沒有QQ

```

❓為什麼 ubuntu 這個 image 用 detach 模式啟動，會不成功？

這是因為 Docker 容器的一個基本原則：**容器必須有一個前台行程在運行，否則容器會立即停止**。

具體分析：
- Nginx 容器成功的原因：
  - Nginx image 的預設命令是啟動 Nginx 服務器
  - Nginx 服務器是一個持續運行的前台行程
  - 所以容器能夠保持運行

- Ubuntu 容器失敗的原因：
  - Ubuntu image 沒有預設的前台行程
  - 當你用 `-d` 啟動時，容器啟動後立即找不到需要運行的前台行程
  - 因此容器立即停止

要讓 Ubuntu 容器在背景持續運行，你需要指定一個持續運行的行程，例如：

```
   docker container run -d ubuntu tail -f /dev/null
   或者使用互動模式：
   docker container run -it ubuntu bash
```

4. **最佳實踐建議**：
- 對於服務類應用（如 Nginx、MySQL 等），使用 `-d` 背景模式
- 對於需要互動的容器（如開發環境），使用 `-it` 前景模式

![螢幕擷取畫面 2024-12-13 105142](https://github.com/user-attachments/assets/52c382b3-ace4-4337-84a4-72b2288b9ed1)

![螢幕擷取畫面 2024-12-13 105457](https://github.com/user-attachments/assets/00633f9b-7d74-4702-8526-4268a0f30ffc)

![螢幕擷取畫面 2024-12-13 105704](https://github.com/user-attachments/assets/921bba89-8bc4-4fba-a8b9-018f066848e0)

![螢幕擷取畫面 2024-12-13 105848](https://github.com/user-attachments/assets/4369c9e5-ac24-4533-a2e9-d59fd5795382)


### 動手做 3: 環境變數

```bash
# 透過參數 -e 在啟動 container 時，注入環境變數
docker container run -it --rm -e DB_HOST=1.2.3.4 -e DB_USERNAME=tester -e DB_PASSWORD=1234 alpine 

> env
# env 可以印出目前有哪些環境變數，觀察看看是否有 DB_HOST, DB_USERNAME 跟 DB_PASSWORD
```

![螢幕擷取畫面 2024-12-13 111411](https://github.com/user-attachments/assets/7031366a-a034-4542-b2c6-318dd47c84b4)

## Docker Image

### 動手做 1: image 的列表與刪除
```bash
# 列出 image
docker image ls

# docker image tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
docker image tag nginx mytest
docker image tag nginx nginx:v1234
## 觀察一下:
docker image ls
## 應該會發現，雖然 repository 或是 tag 不一樣，但 ID 是一樣的
```

![螢幕擷取畫面 2024-12-13 111702](https://github.com/user-attachments/assets/ecdf7dd3-d894-44f6-b072-e5acaa77fb14)

### 動手做 2: image 與 container 的關係

```bash
# 啟動 container 並且保持在 container 中
# 可以在這個 container 裡建立一些檔案
docker container run -it alpine ash
> touch a.txt


# 在另外一個 terminal，用同一個 image 啟動另外一個 container 後，
# 觀察新的 container 是否有剛剛做出來的檔案? 
docker container run -it alpine ash
> ls 
```

![螢幕擷取畫面 2024-12-13 112047](https://github.com/user-attachments/assets/2ed48c95-3332-49d1-9324-1495e5558e96)


![螢幕擷取畫面 2024-12-13 112051](https://github.com/user-attachments/assets/27d3bc66-713c-4523-97cc-c12c36dd2e33)
7ab14f4)


#### 實驗結果：

在第一個容器中建立的 a.txt 文件，在第二個容器中是看不到的。
第二個容器執行 ls 命令時，只會看到 Alpine image 中原本就存在的文件。

#### 這個實驗說明了幾個重要的 Docker 概念：

1. 容器隔離性

每個容器都是完全獨立的
容器間的文件系統是互相隔離的
每個容器都從相同的 image 開始，但有自己的寫入層（writable layer）


2. Docker 的分層結構

Copy容器 A: [寫入層 A] <- [Alpine image 層（唯讀）]
容器 B: [寫入層 B] <- [Alpine image 層（唯讀）]

底層的 image 層是唯讀的，多個容器共享
每個容器都有自己的寫入層
在容器中建立的文件只存在於該容器的寫入層

### 動手做 3: commit to image

1. **Container Commit 操作**
```bash
docker container commit {container hash id} {new image name}
```
這個操作會：
- 將容器當前的狀態保存為新的 image
- 包含容器中所有的修改（如新建的文件）
- 建立一個新的image層

1. **使用新image啟動容器**
```bash
docker container run -it {new image name} ash
```
- 新容器會包含之前建立的文件（如 a.txt）
- 因為這些改動已經被保存在新的image中

1. **查看 image 歷史**
```bash
docker image history {image id}
```
這會顯示：
- image 的所有層
- 每層的建立命令
- 層的大小
- 建立時間等資訊

1. **image 的導出和導入**
```bash
# 導出 image 到文件
docker image save alpine -o alpine.tar

# 刪除本地 image
docker image rm alpine

# 從文件載入 image
docker image load -i alpine.tar
```
這些操作的用途：
- 備份 image
- 在沒有網路的環境中遷移 image
- 離線部署或分發 image

實際應用範例：
```bash
# 建立一個容器並修改
docker container run -it alpine ash
touch a.txt
exit

# 提交修改為新 image
docker container commit abc123 my-alpine-with-file

# 查看新 image 的歷史
docker image history my-alpine-with-file

# 導出新 image
docker image save my-alpine-with-file -o my-alpine.tar

# 在其他機器上導入
docker image load -i my-alpine.tar
```

重要注意事項：
1. `commit` 操作會增加 image 大小
2. 不建議在生產環境大量使用 `commit`
3. 最佳實踐是使用 Dockerfile 管理 image 建構
4. `save` 和 `load` 主要用於特殊情況（如離線環境）


### 動手做 4: pull image 的觀察 - image layers

```bash

docker image rm nginx

# 觀察以下指令的執行過程與結果
docker container run --rm nginx echo "hello world"
# 加上 --rm 是當這個 container stop 時，自動移除 (rm: remove)

# 再執行一次
docker container run --rm nginx echo "hello world"

# 兩次執行的結果有何差異? =>
```
![螢幕擷取畫面 2024-12-13 114212](https://github.com/user-attachments/assets/446835fe-6996-4a89-9973-adb8307ee0b1)


第一次執行較慢（需要下載 image ）

第二次執行很快（直接使用本地 image ）


### 動手做 5: 試著刪除 container 仍存在的 image

container 仍存在的 image 不能刪除，為什麼？

```bash
docker container run -dit --name lab alpine

docker image rm alpine
# 可以刪除嗎？會看到什麼？

docker container stop lab
docker image rm alpine
# 可以刪除嗎？會看到什麼？

# 確保有刪除所有使用 alpine 建立出來的 container
docker container rm lab
docker image rm alpine
# 可以刪除嗎？會看到什麼？
```

![螢幕擷取畫面 2024-12-13 115126](https://github.com/user-attachments/assets/1f2009ae-6427-4e8b-bd8f-a24e1998fb61)

❓為什麼前兩次不能刪除？最後一次卻可以了？

1. 容器 'lab' 正在運行中且使用這個 image
錯誤訊息會提示 image 正在被使用中

2. 雖然容器已停止，但容器仍然存在
停止的容器仍然保留了對 image 的引用

3. 容器被完全移除，沒有任何引用指向這個 image => 成功刪除

這涉及到 Docker 的幾個重要概念：

 image 引用機制：

- Docker 使用引用計數來追蹤 image 的使用情況
- 只要有容器（無論運行中還是已停止）使用 image ，該 image 就不能被刪除
- 這是為了維護資料完整性和系統一致性


容器生命週期：

- 容器啟動（run）：建立對 image 的引用
- 容器停止（stop）：保持引用
- 容器刪除（rm）：移除引用

安全機制：

- 防止刪除正在使用的 image 
- 避免破壞運行中或已停止的容器
- 確保系統穩定性

```bash
# 如果確實需要刪除 image ，應該按照以下順序：
1. 停止相關容器：docker container stop <container_id>
2. 刪除相關容器：docker container rm <container_id>
3. 刪除 image ：docker image rm <image_name>

# 或者使用強制刪除（不推薦）：
docker image rm -f <image_name>
```

## Docker Network

1. **Docker Network 三種基本類型**：

- **none**：
  - 完全隔離的網路環境
  - 容器沒有網路介面
  - 適用於不需要網路的應用

- **bridge**（預設模式）：
  - 建立虛擬網橋 docker0
  - 容器可以通過此橋接口相互通訊
  - 支援 Port 映射到主機

- **host**：
  - 直接使用主機網路堆疊
  - 沒有網路隔離
  - 性能最好但安全性較低

2. **圖中網路架構解析**：

```plaintext
Host (主機)
├── eth0 (主機網卡，端口5566)
└── docker0 (172.17.0.1, 橋接網路)
    ├── Container 1 (172.17.0.2)
    │   └── eth0 <-> veth111111
    └── Container 2 (172.17.0.3)
        └── eth0 <-> veth222222
```

3. **網路通訊流程**：

- **容器間通訊**：
  - 通過 docker0 橋接網路
  - 使用虛擬網卡對（veth pair）
  - 直接使用 172.17.x.x 內部 IP 通訊

- **對外通訊**：
  - 通過 Port 映射（-p 5566:3000）
  - 外部通過主機IP:5566 存取容器的3000端口

4. **重要概念**：

- **veth pair**：
  - 虛擬網卡對
  - 一端連接容器，一端連接 docker0
  - 實現網路資料傳輸

- **端口映射**：
  ```bash
  docker run -p 5566:3000 myapp
  ```
  - 5566：主機端口
  - 3000：容器內部端口

5. **最佳實踐**：

- 使用自定義橋接網路而不是預設網路
- 合理規劃網段和 Port 映射
- 對安全敏感的應用使用隔離網路
- 使用 Docker Compose 管理複雜網路設置


### 動手作 1: mapping port number

```bash
docker container run -d -p 3000:80 {custom image name}
docker container run -d -p 3001:80 {custom image name}

# 從 host 測試
curl localhost:3000
curl localhost:3001
```
![螢幕擷取畫面 2024-12-13 131135](https://github.com/user-attachments/assets/43dede8c-c5ce-4e05-be27-97fe1fee036c)

### 動手做 2: 觀察網路的變化

```bash
# 在 host 觀察一下
ip addr
# 會看到有一張 docker0 的網卡

# 列出目前的 docker network
docker network list
# 查看一下 birdge 這個網路
docker network inspect bridge
# 可以看到 Subnet 是 172.17.0.0/16

docker container run -dit --name alpine1 alpine ash
docker container run -dit --name alpine2 alpine ash
# 在 host 觀察一下，可以看到多了兩張虛擬網卡
ip addr
# 進入 alpine1
docker container exec -it alpine1 ash
# 觀察 container 的 ip
> ip addr
# 試試看能不能 ping 到另外一個 container
> ping 172.17.0.3
```


![image](https://github.com/user-attachments/assets/f6be37cc-9e9b-49ac-91c5-08c8f3a8f625)


- `docker0` 橋接網卡
- IP 地址範圍通常是 172.17.0.1
- 這是 Docker 預設的橋接網路介面


![image](https://github.com/user-attachments/assets/ca033a66-f725-4538-abc2-6146f8fc6d5a)



- `bridge`：預設橋接網路
- `host`：主機網路
- `none`：無網路

![image](https://github.com/user-attachments/assets/674b2ca2-200f-4e5c-b568-6d20b343ac65)

- Subnet 設置：172.17.0.0/16
- Gateway ：172.17.0.1
- IPAM 設置
- 已連接的容器資訊


- 每個容器都會：
  - 獲得一個虛擬網卡（veth）
  - 分配一個 IP 地址
  - 連接到 docker0 橋接網路

1. **觀察新的虛擬網卡**：
```bash
ip addr
```
會看到：
- 新增的 veth 對
- 一端連接到 docker0
- 另一端連接到容器內部

1. **容器內部網路**：
```bash
docker container exec -it alpine1 ash
ip addr
```
顯示：
- eth0 介面
- IP 地址（如 172.17.0.2）

![螢幕擷取畫面 2024-12-13 131517](https://github.com/user-attachments/assets/d7d2ae50-d4dd-4675-a4c6-d01a343cb0a2)

1. **容器間通訊測試**：
```bash
ping 172.17.0.3
```
- 可以成功 ping 通
- 證明容器間可以通過 docker0 橋接網路互相通訊

![螢幕擷取畫面 2024-12-13 131559](https://github.com/user-attachments/assets/096b1324-4472-427d-bbee-4cbeacef3fab)


重要觀察：

1. **網路隔離**：
- 每個容器有自己的網路命名空間
- 擁有獨立的 IP 地址
- 通過虛擬網卡連接到主機

2. **自動設定**：
- Docker 自動處理 IP 分配
- 自動建立虛擬網卡對
- 自動設定路由

3. **通訊機制**：
- 容器間可直接通訊
- 通過 docker0 橋接
- 使用內部 IP 地址

### 動手做 3: 建立自己的網路

1. **建立自定義網路**:
```bash
docker network create --driver bridge my-net
```
- 建立了一個新的橋接網路
- 使用不同的網段（172.18.0.0/16）
- 有別於預設橋接網路（172.17.0.0/16）

1. **查看網路資訊**:
```bash
docker network list
docker network inspect my-net
```
顯示：
- 新建網路的詳細設定
- IP 地址範圍
- 已連接的容器

![螢幕擷取畫面 2024-12-13 135828](https://github.com/user-attachments/assets/ec0bbb1c-a39e-4943-8de7-53e858231756)


1. **使用自定義網路建立容器**:
```bash
docker container run -dit --network my-net --name alpine3 alpine ash
docker container run -dit --network my-net --name alpine4 alpine ash
```
- 容器直接連接到自定義網路
- 會獲得新網段的 IP 地址

![螢幕擷取畫面 2024-12-13 140239](https://github.com/user-attachments/assets/9d2be8bf-1dac-47dd-83ef-7ea62484172f)


1. **重要區別**:

預設橋接網路 vs 自定義橋接網路：

|特性|預設橋接網路|自定義橋接網路|
|---|---|---|
|DNS 解析|❌ 不支持容器名稱解析|✅ 支持容器名稱解析|
|網路隔離|所有容器共享|可以建立多個隔離網路|
|自動DNS|無|內建 DNS 服務|
|容器互聯|需要使用 IP|可以使用容器名稱|

5. **容器間通訊測試**:
```bash
# 在 alpine3 中
ping alpine4  # 在自定義網路中可以工作
ping 172.18.0.3  # IP 地址也可以
```

6. **最佳實踐建議**:

- 盡量使用自定義網路而不是預設橋接網路
- 利用自動 DNS 解析功能，用容器名稱而不是 IP
- 使用網路隔離來增強安全性
- 合理規劃網段，避免網路衝突

