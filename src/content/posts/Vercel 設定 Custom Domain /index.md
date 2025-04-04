---
published: 2024-06-11
abbrlink: vercel-custom-domain
tags:
  - Vercel
  - Website
description: 這篇文章紀錄了 Vercel 設定 Custom Domain 的過程
title: 設定 Vercel Custom Domain
---

# Vercel 設定 Custom Domain

需要先準備好自己的 Domain， 在這邊我是使用 Godaddy

<!-- truncate -->

## Vercel 設定

我這邊使用的是 Next.js 的專案，當專案在 Vercel 成功後找到設定 Domain 的地方，會有個欄位可以輸入你的 Domain

![Untitled](Vercel%20%E8%A8%AD%E5%AE%9A%20Custom%20Domain%203824aa289867432e91611f808774984e/Untitled.png)

接著就直接輸入你的 Domain，我這邊使用的是 subdomain，並且我使用 CNAME 做後續的驗證

![Untitled](Vercel%20%E8%A8%AD%E5%AE%9A%20Custom%20Domain%203824aa289867432e91611f808774984e/Untitled%201.png)

## Godaddy 設定

設定完 Vercel 後就到 Godaddy 設定 DNS 驗證

![Untitled](Vercel%20%E8%A8%AD%E5%AE%9A%20Custom%20Domain%203824aa289867432e91611f808774984e/Untitled%202.png)

![Untitled](Vercel%20%E8%A8%AD%E5%AE%9A%20Custom%20Domain%203824aa289867432e91611f808774984e/Untitled%203.png)

把剛剛 Vercel 提供的 CNAME 貼過來就可以
