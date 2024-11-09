### 第六次個人作業 驗屍報告

### 作業內容

- 針對 troubleshooting lab 撰寫驗屍報告或 RAC (root cause analysis)
    - 簡易版即可，截圖描述你遇到/看到了什麼問題？做了哪些測試去確認？或是去看了哪些 log？
        - 提供完整步驟、指令、指令執行的結果、看到的 log，包括你怎麼解讀這個結果
    - 完成整份報告後的心得與想法，你的感想是什麼？你收穫了什麼？
- 自行檢查的準則: 其他人是否能透過你的報告，一步一步地完成問題排查與修復，且都能學習到每一步驟是在做什麼。
- 開放小組討論，作業的重點在於「你真的有去動手做過一遍、有去下過那些指令、查看那些 logs」，就算是同學告訴你有這個指令可以用、
- 有那些 log 或資訊可以看，也沒有關係，但希望你們親手做過與親眼看過。 → 但也要注意，為什麼同學知道？你不知道？
    - 真的不要取巧或走捷徑，在學習階段慢就是快，把經驗扎實地累積起來，將來工作上會遇到更多未知的問題，把「方法」跟「過程」學習起來比什麼都重要。

---
問題: 在 curl localhost 出現假的 server 不是我的 server 我該如何找到我的 server ?


![image](https://github.com/user-attachments/assets/1abf88cb-13a6-4839-9c2c-7cbd3e80003d)


我的想法: 去找 nginx !，那先來開啟 nginx 好了

```bash

sudo systemctl start nginx

```

![image](https://github.com/user-attachments/assets/7d577c68-8d41-4861-8fb5-45ec2cb0c206)

悲劇開不起來，那來看一下狀態結果是 failed

![image](https://github.com/user-attachments/assets/0728bb59-b13c-4ab1-9ed5-93d3936dd4a0)


我的直覺是先去看 nginx 的設定，檢查設定是否正確，之前寫老師作業有 nginx 設定相關經驗。

這個指令可以幫助我們判斷有沒有nginx.cof 設置錯誤


```bash

    sudo nginx -t

```

發現 nginx.conf: 8 第八行分號出錯了，那我們就來改吧 

![image](https://github.com/user-attachments/assets/1fef403f-3269-468d-96b0-1a56a80ab64e)



使用以下指令編輯，把多餘的分號去掉

```bash

  sudo vim /etc/nginx/nginx.conf

```
修改前
![image](https://github.com/user-attachments/assets/57fc1661-af51-4230-8b13-f9cd7b9e5227)

修改後
![image](https://github.com/user-attachments/assets/4bf9145e-fe90-417b-9ed7-fcc95849596a)


改完後記得使用以下指令，讓 nginx 重新執行

```bash

  sudo systemctl restart nginx

```
![image](https://github.com/user-attachments/assets/18876fb4-5355-4078-9cab-075eb865877f)

改完設定後重新執行發現還是不行，這時我沒有什麼想法，那這時來看一下 error.log 找有什麼線索好了

```bash

  cat /var/log/nginx/error.log

```
![image](https://github.com/user-attachments/assets/34d17a8b-5708-4695-a044-038c6b84dfaa)

重要線索出現 port 80 已經被占用了，那我們要如何知道佔領 80 port 是誰

```bash

  sudo lsof -i :80

```
![image](https://github.com/user-attachments/assets/b3535d33-e62a-4bd0-844a-8f469f20a114)

發現佔領 80 port 的兇手 srv，而且 PID 是 576，使用  sudo kill 576  這裡換成 PID 就好了

```bash

    sudo kill 576

```

刪除完後重新跑發現可以執行了!

![image](https://github.com/user-attachments/assets/05127b57-6914-4627-a212-0625f7083d3d)

但這時 curl localhost:80

![image](https://github.com/user-attachments/assets/bbc3e9d8-03d5-4b08-93bd-7b0fca50680f)

我們來改 nginx 的 port 來測試是否系統對 80 port 的限制，可以嘗試讓 Nginx 監聽其他 port ，例如 1234，

因為可能是系統層面的端口限制

某些系統或伺服器可能會對 80 port 進行限制或阻擋。在一些情況下，低於 1024 的端口（如 80 和 443）可能需要特殊權限。

```bash

  sudo vim /etc/nginx/sites-enabled/default

```

修改前

![image](https://github.com/user-attachments/assets/6ae23b94-5015-4060-83b8-f5c2ec8cfd29)

改成 `listen 1234 default_server;` ：


修改後

![image](https://github.com/user-attachments/assets/4737bf31-a76a-4d7f-8304-7c75f0c0c585)



重啟後，再試一次 curl localhost:1234，但這時發現錯誤 403 Forbidden

```bash

  sudo systemctl restart nginx
  curl localhost:1234

```


![image](https://github.com/user-attachments/assets/1fb3bbb7-5130-480b-a7bc-3ea5ac1460a5)


這時卡住了腦中沒有想法，幸好老師提示 Disk 應該是滿的

- 怎麼看到硬碟是滿的？
- 我有故意做幾個大檔案佔滿硬碟，怎麼找到這幾個檔案？

1. 檢查硬碟使用情況

使用 `df` 指令可以檢查所有硬碟的使用狀況：

```bash

df -h

```

![image](https://github.com/user-attachments/assets/d80aef0f-6d97-4b3c-af18-a0af8a07624d)

發現有使用率 100% 原來被硬碟被塞爆了 /dev/root       6.8G  6.7G  5.9M 100% /
那是哪一些檔案塞爆呢?

2. 找出佔用空間大的檔案

```bash

  sudo find / -type f -size +100M -exec ls -lh {} \; | awk '{ print $NF ": " $5 }'

```

![image](https://github.com/user-attachments/assets/310d861c-8086-4f85-8aeb-3ba82b688387)

發現四個奇怪的大檔案
```bash
  cd /var/log/system/
  ls
```

![image](https://github.com/user-attachments/assets/01113164-bb97-4e68-b2af-be164fb51ffe)

刪除檔案

```bash

  sudo rm largefile*

```

![image](https://github.com/user-attachments/assets/ea3f2b81-4092-462e-ad78-c6fa1579850a)

刪完後硬碟沒有爆掉了，但問題還是沒有解決

![image](https://github.com/user-attachments/assets/0f4dee00-5f00-4f74-8f18-6fa468bec07c)

![image](https://github.com/user-attachments/assets/f8530c0c-f23f-4749-b2a3-88ad6da53877)

這時來仔細看一下我的 nginx 網頁的設定好了，有可能是權限問題

```bash
  sudo vim /etc/nginx/sites-enabled/default

```
出現關鍵的部分  root /var/myweb;
root /var/myweb; 是用來指定 Nginx 將用於提供靜態文件的根目錄

![image](https://github.com/user-attachments/assets/2d96a29e-6e14-4b84-b7db-c7a427df5826)


突然想到之前在 EC2 架設前後端 在 Nginx 也有遇到權限問題， Nginx 需要足夠的權限來存取 /var/myweb 目錄及其中的文件。
Nginx 預設角色是  `www-data`
我們要確保 `/var/myweb` 目錄和 `index.html` 文件對 `www-data` 使用者有讀取權限

如果 `/var/myweb` 或 `index.html` 文件的擁有者不是 `www-data`，可以通過以下指令更改擁有者，
讓 Nginx 可以讀取該目錄和文件：

```bash

sudo chown -R www-data:www-data /var/myweb

```

```bash

sudo chmod -R 777 /var/myweb

```

這樣，`www-data` 用戶應該可以存取並讀取 `/var/myweb/index.html`。


完成權限修改後，重啟 Nginx 以應用更改：

```bash
sudo systemctl restart nginx

```

可喜可賀 終於完成了!

![image](https://github.com/user-attachments/assets/a9055d68-c47e-4313-acc5-5a2d9006dae1)



進階題: 可以看到 Congragulations 後，reboot 機器後，還是好的嗎？

```bash
  sudo reboot
```

我的還是好的，可能是我用 1234 port 
![image](https://github.com/user-attachments/assets/179f29b4-0569-497a-8524-9bbccf393aa4)



但仔細發現 重新 reboot 後，發現 srv 重新出現了? 那如果我的 port 改成 80 就會有錯誤

```bash
  sudo lsof -i :80
```
![image](https://github.com/user-attachments/assets/e5bd2682-e98b-4b17-90ea-6c4eea60d94e)


每次重啟都會失效，刪除後的 srv 又會重新出現佔領80 port 我該去哪裡更改?
- **確認 `srv` 是哪個服務**：
首先，需要確定 `srv` 代表的服務，以便禁用它。可以使用以下指令查看該行程的詳細資訊：
    
    ```bash
    ps -p 521 -o cmd=
    
    ```
    
    這會顯示行程 `srv` 的完整執行命令路徑，有助於識別是哪個服務。

 ![image](https://github.com/user-attachments/assets/97654e63-eb51-4e82-8665-2a3a3424e347)
     
- **禁用自動啟動服務**：
一旦確認是哪個服務後，使用以下指令來禁用它的自動啟動：
    
    ```bash
    
    sudo systemctl disable srv
    
    ```
    
![image](https://github.com/user-attachments/assets/82098174-c9ce-4e12-b003-3a36c7f3d8dd)


重啟後發現 srv 不會再重新出現了



### 心得與想法，你的感想是什麼？你收穫了什麼？

心得是我的實力還是太弱了，原本想說不查資料能不能解決，結果我只到第二關 檢查 80 端口是否被其他行程佔用，
把 srv 刪掉之後就想不到要做什麼。 看到其他同學都好厲害，我距離他們還非常遙遠，還看不到他們的車尾燈，我還要繼續加油!
後來陸續方法是有 AI 輔助才知道，如果沒有 AI 我真的超弱，讓我想到電馭叛客：邊緣行者這部作品，裡面電馭叛客在自己身上
加裝各種人工裝備來提升自己武力，讓自己戰鬥力更強，但副作用是這些裝備會侵蝕人體神經，如果身體承受不住就會產生幻覺，最後
爆走走向死亡之路，這叫做神機錯亂，我覺得我現在在用 AI 就是加裝各種裝備來提升自己武力，但是這些都是假象，一切都是我的幻覺，
事實上我超弱。我覺得我正走向神機錯亂的道路，我該如何用 AI 而不是被 AI 用是我這次作業最大的收穫。
其他收穫像是我從來沒有想到問題會出在硬碟大小等等，該如何才能成為像是麻倉葉的通靈王呢?
還有這次作業對於 nginx 設定和如何看 log 也更加熟悉，這次作業我覺得真的超好玩，很像在玩解謎遊戲，謝謝小賴老師的巧思。

---

### 總結排查步驟與解決方案

1. **nginx.conf 設置錯誤**
   - 使用 `sudo nginx -t` 檢查 `nginx.conf` 文件，發現設置文件第八行出錯。
   - 修改後重新加載 `Nginx`，但問題依舊存在。

2. **檢查 80 port 是否被其他行程佔用**
   - 使用 `var/log/nginx/error.log` 查看更多錯誤訊息。
   - 使用 `lsof` 指令確認 80 port 的佔用情況。
   - 發現有其他服務（行程 `srv`）佔用了 80 port，阻止了 `Nginx` 的正常啟動。
   - 使用 `sudo kill <PID>` 終止該行程後，`Nginx` 成功啟動，但每次重啟伺服器後，該服務會自動佔用 80 port 。

3. **禁用自動啟動服務**
   - 使用 `systemctl disable <service_name>` 禁用佔用 80 port 的自動啟動服務，防止其在每次重啟後佔用 port 。

4. **檢查硬碟空間**
   - 確認磁碟空間沒有滿，避免影響 `Nginx` 服務。
   - 使用 `df -h` 指令找出佔用空間較大的目錄和文件，清理硬碟空間以確保正常運行。
   - 找出佔用空間大的文件，使用 `sudo find / -type f -size +100M -exec ls -lh {} \; | awk '{ print $NF ": " $5 }'`。

5. **解決文件權限問題**
   - 在 `error.log` 中發現 `Permission denied` 錯誤，顯示 `Nginx` 無法存取 `/var/myweb/index.html` 文件。
   - 使用 `chown` 和 `chmod` 修改目錄和文件的擁有者和權限，使 `www-data` 用戶可以訪問該目錄和文件。

6. **使用其他端口測試 Nginx**
   - 為了確認是否是系統對 80 端口的限制，將 `Nginx` 配置文件中的監聽端口改為 `1234`。
   - 這樣做後，使用 `curl localhost:1234` 成功顯示頁面內容，說明 Nginx 配置正常。

7. **重啟伺服器測試最終效果**
   - 重啟伺服器後，確認 Nginx 在 `1234` 端口能夠正常運行，並且被 `srv` 佔用的 80 端口問題不再發生。
