# 大綱

- 說明 blob、tree、commit、branch、HEAD 分別是什麼
- 紀錄在 Git repo 操作過程中，`.git` 資料夾裡的變化，看看可以觀察到什麼
- commit message 應該怎麼寫比較好？應該有什麼 `style` 嗎？

> 老師提到題目只是起點，不是簡答題。要會自己解釋，是AI會還是你真的會  

---

## 說明 blob、tree、commit、branch、HEAD 分別是什麼

### Blob

**Blob 物件（Binary Large Object）**

- **說明**：Git 將檔案內容轉成二進制，並產生 SHA-1 編號後儲存的物件。
- **產生時機**：執行 `git add` 加至暫存區時，在 `.git` 目錄裡產生一個 Blob 物件，並依照規則擺放在相應的目錄裡。
- **用途**：存放檔案的「內容」。

### Tree

**Tree 物件**

- **說明**：有了 Blob 物件可以存內容之後，Git 也提供了可以存檔名、資料夾名稱的物件，即「Tree 物件」。
- **特點**：
  - 儲存檔案的名稱、資料夾名稱、檔案權限等。
  - 透過 Tree，可以找到子目錄、子子目錄的檔案內容、名稱。
- **結構**：
  - Tree 物件與 Blob 物件相同，都是以 SHA-1 雜湊值作為檔名，儲存二進制內容。
  - Blob 物件主要儲存檔案「內容」，而 Tree 物件則儲存「檔名」和目錄結構。
  - Tree 物件可以包含 Blob 物件和其他 Tree 物件。

### Commit

**Commit 物件**

- **說明**：在 Git 中，commit（提交）是一個對整個 repo 當前狀態的快照。
- **產生時機**：每次執行 `git commit`，Git 會將工作目錄中被追蹤文件的當前狀態保存下來，並生成一個唯一的提交記錄。
- **內容**：
  - 提交的變更內容。
  - metadata（提交者、時間、訊息等）。
  - 指向一個 Tree 物件，代表當前專案的檔案結構。
  - 連結到上一個 Commit，形成提交歷史。

### Branch

**Branch（分支）**

- **說明**：在實務開發上，為了管理不同的開發版本，如「上線穩定版」、「測試版本」、「修改 BUG 版本」，Git 提供了分支功能。
- **特點**：
  - 分支是指向某個 Commit 的可移動指標。
  - 允許同時進行多項不同的開發工作，而不會相互干擾。

### HEAD

**HEAD 指標**

- **說明**：HEAD 是一個指標，指向目前所在的分支。
- **特點**：
  - 在 `.git` 目錄裡有一個名為 `HEAD` 的檔案，記錄著當前所在的分支。
- **示意圖**：

  ![HEAD 指標示意圖](https://github.com/user-attachments/assets/fbb58614-b198-40f0-9122-e8bcf0dfabeb)


- **深入解析**：
  - `HEAD` 檔案內容通常是指向 `refs/heads/main`（或其他分支）。
  - `refs/heads/main` 的內容是一個 40 個字元的 SHA-1 值，指向最新的 Commit。

---

### 結論

Git 四種物件的關係與執行指令時的關係：

- **`git add`**：建立 Tree、Blob 物件，為提交時做準備。
  - 將檔案內容轉成 Blob 物件。
  - 目錄、檔名以 Tree 物件儲存。
  - Tree 物件指向 Blob 物件或其他 Tree 物件。
- **`git commit`**：建立一個 Commit 物件，儲存在 `.git/objects`。
  - Commit 指向一個 Tree 物件。
  - 除了第一個 Commit，其他 Commit 都會指向前一個 Commit。
- **`git tag`**：建立 Tag 物件（Annotated Tag），紀錄某個 Commit 的 SHA-1 值，儲存在 `.git/refs`。
  - Tag 物件指向某個 Commit 物件。

---

### 心理的疑惑

1. 為什麼 Git 要這樣設計物件？

- 效率和儲存空間優化：

Blob 物件：只要內容相同，Git 就不會重複儲存=> 大幅減少了重複檔案內容的存取，提升儲存效率。
Tree 物件：Tree 物件記錄的是目錄結構和檔案名稱，這讓 Git 在版本控制中可以有效追蹤變更，當目錄或檔案移動時，只需修改 Tree 物件，而不會影響實際的檔案內容。
Commit 物件：每次提交只存取變更的部分，而不是整個專案的複製一份。這使得 Git 可以快速進行版本切換。

- 快照式版本控制：

Git 使用快照模型，每次提交都會保存整個專案的快照。但由於 Blob 物件儲存的是內容，而不是檔案的複製，所以即使是保存快照，也只儲存改變的部分，提升版本控制的效率。

- 資料完整性與變更追蹤：

在 Git 中每個物件都用 SHA-1 雜湊值來唯一標識，確保每一個物件都是不可變的。當物件的內容被改變時， SHA-1 值也會隨之變更，這使得 Git 可以輕易追蹤所有的變更。

2. 為什麼要使用 SHA-1？

- 唯一性與衝突避免：

SHA-1 產生 40 個十六進位的數字，能夠保證每個物件的唯一性。而且SHA-1 的哈希碰撞發生機率非常低。

- 安全性與資料完整性：

因為任何微小的資料變動都會導致完全不同的雜湊值，這使得 Git 可以檢測到任何形式的資料損毀或篡改，從而保證版本歷史的可靠性。

- 效能與計算速度：

SHA-1 相較於其他更為複雜的雜湊演算法（例如 SHA-256），其計算速度較快，能夠在短時間內處理大量檔案內容。

3. 老師上課提到為什麼 Git 使用 SHA-1 前 2 個字元當作目錄分組，不是按照 01、02、03、04來分組?

- 雜湊值分散性良好，均勻分佈 
採用 01、02、03、04 這樣的分組方式，則很難保證物件分布的均勻性，可能會導致部分目錄中檔案過多，進而影響效能。

- 方便物件搜尋

開發者在需要檢查某個物件時，只需根據 SHA-1 值就能迅速定位到該物件的存放位置，無需額外的索引或搜尋機制

## 紀錄在 Git repo 操作過程中，`.git` 資料夾裡的變化，看看可以觀察到什麼

### 我在 `git add` 時觀察到了 Blob 物件的產生

**步驟 1：尚未把 `git.md` 加入暫存區**

![未加入暫存區](https://github.com/user-attachments/assets/7b79bde3-edaf-4e99-b821-7961d5befe7a)


**步驟 2：輸入 `git add git.md`**

**步驟 3：在 `.git/objects` 可以發現目錄下出現了 `5b` 的資料夾**

![出現 5b 資料夾](https://github.com/user-attachments/assets/a5a475ce-b2f7-405d-9a59-bff25cfd5e88)

**步驟 4：查看 `5b` 資料夾的檔案內容**

- 資料夾的 2 個字元與檔案的 38 個字元合起來代表這個 Blob 物件的 SHA-1 值。
- **目錄規則**：
  - 子目錄：前 2 個字元。
  - 檔名：剩餘的 38 個字元。

> 使用 2 個字元作為子目錄，是為了避免 `.git/objects` 目錄因為檔案過多而降低效能。

![查看檔案內容](https://github.com/user-attachments/assets/05df77d2-6e77-405f-b000-97a4b4bd2fcd)


**步驟 5：檔案內容因為已經被壓縮過，所以無法直接查看**

- 使用 `git cat-file -t 5b636` 查看物件類型。
  - `-t` 參數代表查看物件的類型，可以看到結果是 Blob 物件。
![查看物件類型](https://github.com/user-attachments/assets/9300bf9e-70e2-451f-8bf4-3dc85c77af24)



### 總結

- git add 產生 Blob 物件：

每次執行 **git add** 時，Git 會為加入暫存區的檔案生成一個 Blob 物件。
這個 Blob 物件是以檔案內容為基礎的 SHA-1 雜湊值來命名，並存放在 .git/objects 目錄下。
目錄分組方式：物件的前兩個字元用來作為子目錄名稱，剩下的 38 個字元則作為檔案名稱。
**這樣的設計避免了單一目錄中檔案數量過多，從而提高了檔案系統的效能**。


---

## commit message 應該怎麼寫比較好？應該有什麼 `style` 嗎？

### 一、為什麼要固定格式

- **重要性**：一個好的格式與規範，能夠讓人一目了然，迅速看出該 Commit 的重點。

### 二、Message 的格式

```
    TYPE: SUBJECT

    BODY

    FOOTER
```

- **完整的 Commit 訊息**必須包含以上三大區塊，並由空行區隔。
- **第一行標題列**，必須包含類型與主旨。

#### 2-1 TYPE 類型

- **類型必須包含在標題中，且符合下列類型**：

  | 類型     | 說明                   |
  | -------- | ---------------------- |
  | `feat`   | 新功能（feature）      |
  | `fix`    | 修補 bug               |
  | `docs`   | 文件（documentation）  |
  | `style`  | 格式（不影響程式碼運行）|
  | `refactor` | 重構（即不是新增功能，也不是修改 bug 的程式碼變動） |
  | `test`   | 增加測試               |
  | `chore`  | 建構程式或輔助工具的變動 |

#### 2-2 SUBJECT 主旨

- **注意事項**：
  - 主旨不應超過 50 個字元。
  - 若用英文書寫，需大寫開頭。
  - 中英文都不用句號結尾。
  - 盡量以祈使句書寫，簡述此 Commit 的改動。

#### 2-3 BODY 本文

- **特點**：
  - 不是每個 Commit 都一定需要本文。
  - 撰寫本文時，請務必將「改了什麼( What )」與「為什麼而改( Why )」寫清楚。
  - 每行不超過 72 個字。

#### 2-4 FOOTER 頁尾

- **用途**：
  - 一般來說 FOOTER 不一定要寫。
  - 通常用來標註對應的 issue 編號（issue tracker IDs）。

>  先從 Subject 開始遵守，目前我 Body 的部分通常都沒寫，或是沒有很認真寫。

#### 
---

## 參考資料

- [Git 貫徹底層](https://hackmd.io/@25077667/rJOnjhSbj)
- [Git Commit Message 到底怎麼寫才優美？](https://medium.com/@1chooo/git-commit-message-%E5%88%B0%E5%BA%95%E6%80%8E%E9%BA%BC%E5%AF%AB%E6%89%8D%E5%84%AA%E7%BE%8E-5b789157b549)
- [Day17｜【Git】存在 .git 目錄裡的東西 - Blob 物件與 Tree 物件（上）](https://ithelp.ithome.com.tw/articles/10275828)
- [Day18｜【Git】存在 .git 目錄裡的東西 - Commit 與 Tag（下）](https://ithelp.ithome.com.tw/articles/10276087)
- [【冷知識】HEAD 是什麼東西？](https://gitbook.tw/chapters/using-git/what-is-head)
- [【冷知識】那個長得很像亂碼 SHA-1 是怎麼算出來的？ ](https://gitbook.tw/chapters/using-git/how-to-calculate-the-sha1-value)
- [Git Commit Message 格式與規範整理](https://hackmd.io/@dh46tw/S1NPMsy5L)
- [分支建立（git branch）](https://w3c.hexschool.com/git/a8ee6eee)

---
