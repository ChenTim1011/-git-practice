---

# 大綱

- 說明 blob、tree、commit、branch、HEAD 分別是什麼
- 紀錄在 Git repo 操作過程中，`.git` 資料夾裡的變化，看看可以觀察到什麼
- commit message 應該怎麼寫比較好？應該有什麼 `style` 嗎？

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

  ![HEAD 指標示意圖](git-practice/image/image.png)

- **深入解析**：
  - `HEAD` 檔案內容通常是指向 `refs/heads/main`（或其他分支）。
  - `refs/heads/main` 的內容是一個 40 個字元的 SHA-1 值，指向最新的 Commit。

---

### 小結

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

## 紀錄在 Git repo 操作過程中，`.git` 資料夾裡的變化，看看可以觀察到什麼

### 我在 `git add` 時觀察到了 Blob 物件的產生

**步驟 1：尚未把 `git.md` 加入暫存區**

![未加入暫存區](git-practice/image/image-3.png)

**步驟 2：輸入 `git add git.md`**

**步驟 3：在 `.git/objects` 目錄下出現了 `5b` 的資料夾**

![出現 5b 資料夾](git-practice/image/image-4.png)

**步驟 4：查看 `5b` 資料夾的檔案內容**

- 資料夾的 2 個字元與檔案的 38 個字元合起來代表這個 Blob 物件的 SHA-1 值。
- **目錄規則**：
  - 子目錄：前 2 個字元。
  - 檔名：剩餘的 38 個字元。

> 使用 2 個字元作為子目錄，是為了避免 `.git/objects` 目錄因為檔案過多而降低效能。

![查看檔案內容](git-practice/image/image-5.png)

**步驟 5：檔案內容因為已經被壓縮過，所以無法直接查看**

- 使用 `git cat-file -t 5b636` 查看物件類型。
  - `-t` 參數代表查看物件的類型，可以看到結果是 Blob 物件。

![查看物件類型](git-practice/image/image-6.png)

---

## commit message 應該怎麼寫比較好？應該有什麼 `style` 嗎？

### 二、為什麼要固定格式

- **重要性**：一個好的格式與規範，能夠讓人一目了然，迅速看出該 Commit 的重點。
- **好處**：在多人協作或專案交接時，避免各自為政的情形。

### 三、Message 的格式

```
TYPE: SUBJECT

BODY

FOOTER
```

- **完整的 Commit 訊息**必須包含以上三大區塊，並由空行區隔。
- **第一行標題列**，必須包含類型與主旨。

#### 3-1 TYPE 類型

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

#### 3-2 SUBJECT 主旨

- **注意事項**：
  - 主旨不應超過 50 個字元。
  - 若用英文書寫，需大寫開頭。
  - 中英文都不用句號結尾。
  - 盡量以祈使句書寫，言簡意賅地簡述此 Commit 的改動。

#### 3-3 BODY 本文

- **特點**：
  - 不是每個 Commit 都一定需要本文。
  - 撰寫本文時，請務必將「改了什麼」與「為什麼而改」寫清楚。
  - 每行不超過 72 個字。

#### 3-4 FOOTER 頁尾

- **用途**：
  - 一般來說 FOOTER 不一定要寫。
  - 通常用來標註對應的 issue 編號（issue tracker IDs）。

---

## 參考資料

- [Git 貫徹底層](https://hackmd.io/@25077667/rJOnjhSbj)
- [Git Commit Message 到底怎麼寫才優美？](https://medium.com/@1chooo/git-commit-message-%E5%88%B0%E5%BA%95%E6%80%8E%E9%BA%BC%E5%AF%AB%E6%89%8D%E5%84%AA%E7%BE%8E-5b789157b549)
- [Day17｜【Git】存在 .git 目錄裡的東西 - Blob 物件與 Tree 物件（上）](https://ithelp.ithome.com.tw/articles/10275828)
- [Day18｜【Git】存在 .git 目錄裡的東西 - Commit 與 Tag（下）](https://ithelp.ithome.com.tw/articles/10276087)
- [【冷知識】HEAD 是什麼東西？](https://gitbook.tw/chapters/using-git/what-is-head)
- [Git Commit Message 格式與規範整理](https://hackmd.io/@dh46tw/S1NPMsy5L)
- [分支建立（git branch）](https://w3c.hexschool.com/git/a8ee6eee)

---
