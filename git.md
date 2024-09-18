## 大綱

- 說明 blob, tree, commit, branch, head 分別是什麼
- 紀錄在 git repo 操作過程中，.git 檔案夾裡的變化，看看你可以觀察到什麼
- commit message 應該怎麼寫比較好？應該有什麼 `style` 嗎？

## 說明 blob, tree, commit, branch, head 分別是什麼

### blob
Blob 物件（Binary large object）
說明：Git 將檔案內容轉成二進制，並產生 SHA-1 編號後儲存的物件。

產生時機：git add 加至暫存區時，在 .git 目錄裡產生一個 Blob 物件，並依照規則擺放在它的目錄裡。

用途：存放檔案的「內容」。
### tree
Tree
有了 Blob 物件可以存內容之後，Git 也提供了可以存檔名、資料夾名稱的物件，此物件及為「Tree 物件」。

關於 Tree 物件的說明：

儲存檔案的名稱、資料夾名稱、檔案權限等
透過 Tree，找到子目錄、子子目錄的檔案內容、名稱
Tree 物件與 Blob 物件相同，都是以 SHA-1 雜湊值作為檔名，儲存二進制內容。但兩著的差異在於，Blob 物件主要是儲存我們的檔案「內容」，而 Tree 物件則是儲存「檔名」，而 Tree 物件裡不一定只有包著 Blob 物件，同時也可以包含另一個 Tree 物件。

了解 Tree 物件的內容後，我們大致可以了解 Tree 可以幫助我們儲存檔案的名稱、目錄的名稱、檔案權限，也因為 Tree 物件同時可以紀錄 Tree 物件與 Blob 物件之間的關聯性，因此我們可以透過 Tree 物件來找到子目錄以下的一些檔案內容或檔名。

### commit
Commit
擁有 SHA1 檔名，儲存在 .git/objects 目錄下
Commit 只能紀錄 Tree，不能紀錄 Blob

### HEAD
HEAD 是一個指標，指向某一個分支，通常你可以把 HEAD 當做「目前所在分支」看待。在 .git 目錄裡有一個檔名為 HEAD 的檔案，就是記錄著 HEAD 的內容，來看一下這東西長什麼樣子：
![alt text](image.png)
再深入看一下 refs/heads/main 的內容就會發現，其實所謂的 Main 分支其實是一個 40 個字元的檔案
![alt text](image-1.png)

### 小結：
Git 四種物件的關係與執行指令時的關係：

git add：建立 Tree、Blob 物件。為提交時做準備。
將檔案內容轉成 Blob 物件。目錄、檔名以 Tree 物件儲存。
Tree 物件指向 Blob 物件或是其他的 Tree 物件。
git commit：建立一個 Commit 的檔案儲存在 .git/objects。
Commit 會指向一個 Tree 物件
除了第一個新增的 Commit 外，其餘 Commit 都會指向前一個 Commit 。
git tag：建立 Tag 檔案（Snnotated Tag），紀錄某個 Commit 的 SHA-1 值，並儲存在 .git/refs。
Tag 物件指向某個 Commit 物件

## 紀錄在 git repo 操作過程中，.git 檔案夾裡的變化，看看你可以觀察到什麼

我在git add 時觀察到了Blob 物件 的產生

1: 首先尚未把git.md 加入暫存區
![alt text](image-3.png)

2: 輸入 git add git.md

3: 出現了5b的資料夾
![alt text](image-4.png)

4: 查看5b的檔案內容 資料夾的 2 個字元與檔案的 38 個字元合起來代表這個 Blob 物件的 SHA-1 值。
目錄規則：
子目錄 - 前 2 個字元
檔名 - 剩餘的 38 字元
> 使用 2 個字元作為子目錄，是避免讓 .git/objects 目錄因為檔案過多而降低效能。

![alt text](image-5.png)

5: 檔案內容因為已經被壓縮過，所以沒辦法看直接查看
使用 git cat-file -t 5b636 查看物件  -t 參數，代表要查看的是內容的物件型態，可以看到結果是 blob 物件
![alt text](image-6.png)


## commit message 應該怎麼寫比較好？應該有什麼 `style` 嗎？
二、為什麼要固定格式
留言
一個好的格式與規範，能夠讓人一目了然，迅速看出該Commit的重點。
而且，在多人協作或專案交接時，不易造成各自為政的情形。

三、Message的格式

    TYPE: SUBJECT

    BODY

    FOOTER

一個完整的Commit訊息必須包含以上三大區塊，且都由空行區隔。
第一行標題列，必須包含類型與主旨。

3-1 TYPE 類型
類型必須包含在標題中，且符合下列類型。

![alt text](image-2.png)

3-2 SUBJECT 主旨
主旨不應超過50個字元，若用英文書寫則需大寫開頭，中英文都不用句號結尾。
盡量以祈使句書寫，言簡意賅的簡述此Commit的改動。

3-3 BODY 本文
不是每個Commit都一定需要本文。
撰寫本文時，請務必將改了什麼與為什麼而改寫清楚。
每行不超過72個字。

3-4 FOOTER 頁尾
一般來說FOOTER不一定要寫。
通常用來標註對應的issue編號 (issue tracker IDs)。



## 參考資料

[Git 貫徹底層](https://hackmd.io/@25077667/rJOnjhSbj)

[Git Commit Message 到底怎麼寫才優美？](https://medium.com/@1chooo/git-commit-message-%E5%88%B0%E5%BA%95%E6%80%8E%E9%BA%BC%E5%AF%AB%E6%89%8D%E5%84%AA%E7%BE%8E-5b789157b549)

[Day17｜【Git】存在 .git 目錄裡的東西 - Blob 物件與 Tree 物件（上）](https://ithelp.ithome.com.tw/articles/10275828)
[Day18｜【Git】存在 .git 目錄裡的東西 - Commit 與 Tag（下）](https://ithelp.ithome.com.tw/articles/10276087)


[【冷知識】HEAD 是什麼東西？](https://gitbook.tw/chapters/using-git/what-is-head)

[Git Commit Message 格式與規範整理](https://hackmd.io/@dh46tw/S1NPMsy5L)