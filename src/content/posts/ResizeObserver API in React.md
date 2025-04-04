---
published: 2024-07-23
abbrlink: resizeobserver-react
tags:
  - React
  - webAPI
keywords:
  - React
  - webAPI
  - ResizeObserver
description: 在有些需要在 RWD 時計算的場合，我們可以利用 window 的 resize event 來偵測視窗改變的大小，但是當我們只想要偵測某個 dom 的大小因為內容而變化時就可以使用 ResizeObserver
title: ResizeObserver API in React
---

在有些需要在 RWD 時計算的場合，我們可以利用 window 的 resize event 來偵測視窗改變的大小，但是當我們只想要偵測某個 dom 的大小因為內容而變化時就可以使用 `ResizeObserver`。

```tsx
useEffect(() => {
  if (!dom.current) {
    return
  }

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      // ... do something
    }
  })

  resizeObserver.observe(dom.current)

  return () => {
    resizeObserver.disconnect()
  }
}, [])
```

## 推薦閱讀

[那些被忽略但很好用的 Web API / ResizeObserver](https://ithelp.ithome.com.tw/articles/10278080)
