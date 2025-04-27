---
title: Web API - Message Channel
abbrlink: web-api-message-channel
published: 2025-04-27
description: 在研究 React Fiber 的過程中看到了 Message Channel 這個名詞，於是做個簡單的學習並且記下筆記。
tags:
  - Browser
  - Web API
---

## 什麼是 Message Channel？
Message Channel 是一個 Web API，並且用 `new` 關鍵字來建立 instance，instance 下有 port1 以及 port2 作為通訊管道，往 port1 發送訊息會發送到 port2，反之亦然。

## 為什麼要用 Message Channel?
Message Channel 其目的在於對於不同的執行環境 (主執行緒, Web Worker, Service Worker, Iframe or Tabs ) 之間，建立一個直接且專屬專用的通訊管道，有幾個優點如下：

1. 讓不同 worker 之間直接通訊，不透過主執行緒（處理 UI 以及使用者互動），可以減少通訊延遲以及減少主執行緒的負擔來藉此提升應用的響應速度。
2. 設定專用的通訊通道，主執行緒與不同 worker 雖然可以透過 `postMessage`/`onmessage` 來傳輸，但是透過 message channel 設立多個 channel 來組織跟管理與不同的 worker 之間的溝通。
3. 可設計出更複雜的通訊模式，將任務分給多個 worker 同步處理，最後在收集結果。

## 範例
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width" />
    <title>Channel messaging demo</title>
    <style>
      iframe {
        border-radius: 1em;
      }
    </style>
  </head>
  <body>
    <h1>Channel messaging demo</h1>
    <p class="output">Index.html para (I will be overwritten)</p>
    <iframe src="page2.html" width="480" height="320"></iframe>
    <script>
      const channel = new MessageChannel();
      const output = document.querySelector(".output");
      const iframe = document.querySelector("iframe");

      // Wait for the iframe to load
      iframe.addEventListener("load", onLoad);

      function onLoad() {
        // Listen for messages on port1
        channel.port1.onmessage = onMessage;
        // Transfer port2 to the iframe
        iframe.contentWindow.postMessage(
          "A message from the index.html page!",
          "*",
          [channel.port2]
        );
      }

      // Handle messages received on port1
      function onMessage(e) {
        output.innerText = e.data;
      }
    </script>
  </body>
</html>

```

```html
<!-- page2.html -->
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width" />
    <title>Page 2</title>
    <style>
      body {
        background-color: aliceblue;
        font-family: monospace;
      }
    </style>
  </head>
  <body>
    <p class="output">page2.html (iframe body)</p>
    <script>
      const output = document.querySelector(".output");

      window.addEventListener("message", onMessage);

      function onMessage(e) {
        if (!e.ports.length) return;

        output.innerText = e.data;
        // Use the transferred port to post a message to the main frame
        e.ports[0].postMessage("A message from the iframe in page2.html");
      }
    </script>
  </body>
</html>

```

詳細可以看這個 [Sandbox](https://codesandbox.io/p/sandbox/8s8mzf)，是我從官方 Github 截取出來做測試用的。
