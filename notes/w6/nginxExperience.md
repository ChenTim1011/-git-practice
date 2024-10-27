### 透過 nginx 存取外部網站圖片

紀錄一下想要存取外部網站的圖片，踩到雷的紀錄
 

我在 EC2 上面已經架設一個前後端的網站，但我現在我外部網站圖片存取失敗!

在本地端可以直接連外部網站的網址得到圖片，但是我在 EC2 上因為我用 Nginx 取得圖片，所以不能夠直接連外部網站的網址。

所以我的需求是**想要存取外部網站的圖片**，我不可能把商品 10000 多張照片下載起來放在 EC2 裡面。


我前端使用 nextjs + typescript + react 

1. nextjs.config.mjs 的設定

```
images: {

  remotePatterns: [
    {
      protocol: 'https', 
      hostname: 'online.carrefour.com.tw', 
      port: '', // 可選，若有特定的端口號（通常為空）
      pathname: '/**', // 路徑匹配，可以使用 ** 符來匹配所有路徑
    },
  ],
},

```

1. nginx 的設定

我們需要替 Nginx  設定一個 DNS 解析器，讓它可以解析外部域名。

原本我沒加 nginx error log 會有 no resolver defined to resolve [online.carrefour.com.tw](http://online.carrefour.com.tw/)

```
http {

    # Nginx 設定一個 DNS 解析器，讓它可以解析外部域名。
    resolver 8.8.8.8 8.8.4.4 valid=300s;
		# 其他設定
}
```

在 Nginx 中設置一個反向代理，將指定圖片的請求轉發到外部網站。

1. 在 Nginx 配置中添加一個新的 `location` 來處理外部圖片的請求：

加上 proxy_ssl 那幾個是為了防止 SSL_do_handshake() failed 的錯誤 

```

location /external-image/ {
        rewrite ^/external-image/(.*) /$1 break;
        proxy_pass https://online.carrefour.com.tw;
        proxy_ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
        proxy_ssl_ciphers HIGH:!aNULL:!MD5;
        proxy_ssl_server_name on;
        proxy_ssl_verify off;
        proxy_set_header Host online.carrefour.com.tw;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        add_header Access-Control-Allow-Origin "*";
    }
```

1. 我把商品放在 `data.json` 中修改圖片的 URL，讓它通過 Nginx 代理：
    
    ```json
    
    {
        "category": "泡麵",
        "img": "/external-image/dw/image/v2/BFHC_PRD/on/demandware.static/-/Sites-carrefour-tw-m-inner/default/dwe9ca5776/images/large/0112166_109g.jpeg?sw=300&bgcolor=FFFFFF",
        "id": "1450190500103",
        "name": "雙響泡爆香牛肉湯麵(桶)109g",
        "price": "90.0"
    }
    
    ```
    

可以先測試直接輸入完整 URL 能不能找到圖片，如果可以 nginx 這裡就沒有問題。

但我後來還是失敗，網頁 F12 network 狀態，路徑找不到發生 404 錯誤。

1. 原來是我用 next js Image ，使用 Image 它會預設圖片在 .next\image ， 但我圖片並沒有存在這裡就會發生錯誤， 改成 img 後，刪掉 .next ，重新 npm run bulid 然後重啟程式就成功了。

```jsx
     <Image 
	      src={`https://www.cloudtribe.online${product.img}`}
              alt={product.name} 
              width={250} 
              height={250} 
              className="object-cover"
              style={{ objectFit: 'contain' }}
            />
```

```tsx
            <img 
	      src={`https://www.cloudtribe.online${product.img}`}
              alt={product.name} 
              width={250} 
              height={250} 
              className="object-cover"
              style={{ objectFit: 'contain' }}
            />
```

```bash
 rm .next
 npm run bulid 
 pm2 restart nextjs-app
```


除錯經驗:  錯誤發生看網頁 F12 network 狀態 和  nginx 的 error log 很有用!