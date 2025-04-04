---
published: 2024-10-28
abbrlink: what-is-restful-api
tags:
  - Backend
description: API（應用程式介面）是後端伺服器提供的接口，允許前端或其他後端進行互動。REST（表現層狀態轉換）是一種軟體架構，具有統一介面、無狀態、分層系統、可快取性和隨需編碼等原則。RESTful API 利用 REST 架構，具備可擴展性、靈活性和獨立性。請求通常使用統一的 URL 和 HTTP 方法（如 GET、POST、PUT、PATCH、DELETE），並包含 HTTP 標頭和狀態碼以反映請求的結果。
title: RESTful API | 前進後端計畫
---

## What Is API

API (Application Programming Interface), 如同字面上解釋即為 `介面` ，那什麼是介面？手機充電用的 Type-C 是介面，電燈的燈座是介面，火車的鐵軌也是介面，簡單的來說就是 A 方提供了一個接口，只要任何人提供符合這個接口的要求那就可以正常地使用。

回到 API 亦是如此，後端伺服器提供所謂的 API，讓不管是前端或是其他想要與這個伺服器溝通的後端，只要照著 API 的格式進行實作，那麼就可以與提供 API 的伺服器進行互動。

## What Is REST

REST 全名為 Representational State Transfer，是一種軟體架構，REST 架構需要包含幾個原則：

1. 統一介面：將操作的細節作抽象，並提供統一的操作方式和規格。
2. 無狀態：無狀態意旨伺服器獨立於所有之前的請求，所以用戶端可以按任何順序去請求資源。
3. 分層系統：用戶端不清楚伺服器端有幾層，甚至伺服器端可以再向其他伺服器端請求資源。
4. 可快取性：用戶端在獲得第一次回應後快取一些資訊，然後後續會直接使用快取中獲得資訊。（例如：網站中每個頁首、頁尾、LOGO 等）
5. 隨需編碼（code on demand）：Server 可以隨時擴充功能，因應 Client 的即時需求。

## What Is RESTful API

使用 REST 架構來實現 Web API 架構，其優點包含了：

1. 可擴展：系統無需保留 Client 狀態，因此可以提高擴展效能。
2. 靈活：Client 與 Server 完全分離，因此分層的應用程式功能可以提供靈活性。
3. 獨立：可利用任一語言開發

## RESTful API 請求

- **唯一資源識別符**： 伺服器通常使用統一的 URL 來執行資源識別。
  ```
  GET /USER
  DELETE /USER?id=1
  ```
- **方法**：通常用 HTTP 來實作，因此需要告訴 Server 用什麼樣的方法操作
  - GET：獲得資源
  - POST：新增資源
  - PUT：修改資源（若原本無資料則新增）
  - PATCH：修改資源（只修改部分資源）
  - DELETE：刪除資源
- **HTTP 標頭**：Client 與 Server 之間的中繼資料，當中包含所需參數（路徑參數、Cookie 參數等）

## HTTP Status Code

- _1xx 資訊性回應_ – 請求已接收，正在繼續處理
- _2xx 成功_ – 請求已成功接收、理解並接受
- _3xx 重新導向_ – 需要採取進一步的措施以完成請求
- _4xx 客戶端錯誤_ – 請求包含語法錯誤或無法完成
- _5xx 伺服器錯誤_ – 伺服器未能完成明顯有效的請求

## Ref

- [什麼是 RESTful API？](https://www.explainthis.io/zh-hant/swe/restful-api)
- [HTTP 狀態碼](https://zh.wikipedia.org/zh-tw/HTTP%E7%8A%B6%E6%80%81%E7%A0%81)
- [什麼是 API？](https://youtu.be/zvKadd9Cflc)
