---
tags:
  - Javascript
published: 2025-02-23
abbrlink: javascript-promiseall-in-cart
description: 作者透過 Promise.all 來解決購物車會遇到的實際場景，並且針對其缺點也有附上 Promise.allSettled 的解決方式，加上並行請求實實在在的可以改善使用者進入網頁後的體驗。
title: Promise.all 之購物車案例
---
## 閱讀範圍

[🛒 Promise.all 在購物車的魔法應用（從入門到進階）](https://uneven-tarantula-5e0.notion.site/Promise-all-19b48a1740bf800ba375f035dca42800)

## 作者的觀點 or 知識點

- Promise.all 一次並行執行多個非同步任務，等所有任務都完成後，再一次返回結果。

- Promise.all 透過並行處理無相依性的 request 請求，可以有效提升速度

| **方法**                    | **適用場景**            |
| --------------------------- | ----------------------- |
| `Promise.all`               | **小量請求（\<1000）**  |
| Promise.allSettled          | **允許部分請求失敗**    |
| **批次處理**                | **API 過載風險**        |
| **並發控制 (`p-limit`)**    | **保持穩定請求數**      |
| **延遲請求 (`setTimeout`)** | **API Rate Limit 限制** |

<!-- truncate -->

## 作者的舉例

### 加速購物車載入

```javascript
async function loadCart() {
  try {
    const [user, cartItems, coupons] = await Promise.all([fetchUser(), fetchCartItems(), fetchCoupons()])

    console.log('👤 使用者資料:', user)
    console.log('🛒 購物車商品:', cartItems)
    console.log('🎟️ 可用優惠券:', coupons)
  }
  catch (error) {
    console.error('❌ 載入失敗:', error)
  }
}
```

BUT!!!!!\
這種情況會可能會遇到其中一個 API 爆掉就直接整個網頁 crash, 所以可以考慮使用 Promise.allSettled

### 大量的資料請求

1. 批次處理

```javascript
async function batchRequests(items, batchSize = 100) {
  const results = []

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)
    console.log(`🚀 執行批次 ${i / batchSize + 1}`)

    const batchResults = await Promise.all(batch.map(item => fetchProductDetails(item.id)))
    results.push(...batchResults)
  }

  return results
}
```

2. 限制最大併發數量

```javascript
import pLimit from 'p-limit'

async function fetchAllProducts(items, concurrency = 100) {
  const limit = pLimit(concurrency)
  const tasks = items.map(item => limit(() => fetchProductDetails(item.id)))
  return Promise.all(tasks)
}
```

3. setTimeout 控制 API Rate Limit

```javascript
async function fetchWithDelay(items, delay = 100) {
  const results = []

  for (let i = 0; i < items.length; i++) {
    await new Promise(resolve => setTimeout(resolve, delay))

    try {
      const result = await fetchProductDetails(items[i].id)
      results.push(result)
      console.log(`✅ ${i + 1}/${items.length} 完成`)
    }
    catch (error) {
      console.error(`❌ 第 ${i + 1} 筆請求失敗:`, error)
    }
  }

  return results
}
```

## 試著用一段簡短文字描述此次閱讀的內容

作者透過 Promise.all 來解決購物車會遇到的實際場景，並且針對其缺點也有附上 Promise.allSettled 的解決方式，加上並行請求實實在在的可以改善使用者進入網頁後的體驗。
