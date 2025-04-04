---
published: 2024-06-19
abbrlink: typescript-dont-enums
tags:
  - Typescript
description: 在使用 Typescript Enum 之前或許你有更好的選擇，在我接觸現在公司的專案時，此專案已經大量使用 Enum，讓我覺得這是之前沒有的經驗，一直覺得有些微妙，後來看到這篇[文章](https://thoughtbot.com/blog/the-trouble-with-typescript-enums)後，想起來先前我大部分也都使用 `as const` 來解決，藉此記錄一下筆記。
title: The trouble with TypeScript enums - 讀後筆記
---

![https://media2.giphy.com/media/l0HlPKlyXMFev9rqw/giphy.gif?cid=7941fdc6b171z7t5llgazxc9mv39kb1bq6wc2u0sued1uxw2&ep=v1_gifs_search&rid=giphy.gif&ct=g](https://media2.giphy.com/media/l0HlPKlyXMFev9rqw/giphy.gif?cid=7941fdc6b171z7t5llgazxc9mv39kb1bq6wc2u0sued1uxw2&ep=v1_gifs_search&rid=giphy.gif&ct=g)

在使用 Typescript Enum 之前或許你有更好的選擇，在我接觸現在公司的專案時，此專案已經大量使用 Enum，讓我覺得這是之前沒有的經驗，一直覺得有些微妙，後來看到這篇[文章](https://thoughtbot.com/blog/the-trouble-with-typescript-enums)後，想起來先前我大部分也都使用 `as const` 來解決，藉此記錄一下筆記。

## 當我使用 Enum

```tsx
enum Fruits {
  Apple = 'APPLE',
  Pomegranate = 'POMEGRANATE',
  Persimmon = 'PERSIMMON',
}

function onFruitChanged(value: Fruits): void {
  const fruit = Fruits[value]
  console.log(fruit)
}
```

這邊會得到錯誤

![Untitled](The%20trouble%20with%20TypeScript%20enums%20-%20%E8%AE%80%E5%BE%8C%E7%AD%86%E8%A8%98%20a98c818f12e748f4bb83d1bfd2d52310/Untitled.png)

這時候通常會在這個 function 先處理好 type 像是下面這樣，在使用時再透過 `as` 解決

```tsx
enum Fruits {
  Apple = 'APPLE',
  Pomegranate = 'POMEGRANATE',
  Persimmon = 'PERSIMMON',
}

function onFruitChanged(value: keyof typeof Fruits): void {
  const fruit = Fruits[value]
  console.log(fruit)
}
```

[Playground](https://www.typescriptlang.org/play/?ssl=11&ssc=1&pln=1&pc=1#code/KYOwrgtgBAYgTmAlgFwM5QN4Cgq6gQQAdCAbYKAXigHJ8AFOgGQFFqAaHPOgewmAHM4AQxBDk5KtToB5ALLMA4gCV8AOXwAVVhzxQ6wOKkQQI3EJRp1mSgMoBJWbOmrqWAL5YsAYzOpkUM3gkZABhAAsRfmAAEwsACgA3IRIwYAAuKABrYABPbgAzKGQcwmAC2AQUVABKDITuRFiKAD5MKE5cHxA-KHzK-yogqoBtJJTgAF0Abg6oLtRuMgA6Em5+OL7g6pmPTyA)

## 使用 `as const`

```tsx
const fruits = ['APPLE', 'POMEGRANATE', 'PERSIMMON'] as const
type Fruits = (typeof fruits)[number]

function onFruitChanged(value: string): void {
  const fruit: string | undefined = fruits.find(fruit => fruit === value)

  console.log(fruit)
}
```

[Playground](https://www.typescriptlang.org/play/?#code/MYewdgzgLgBAZgJwK4EsoRgXhgbQOQCCACkQDICieANDHkQPICy5A4gEoEByBAKpTXXJsAygElGjepzwBdGAEMMoSFADcAKCgBPAA4BTGADFkaDNm36QceCfQ4wSALYAjPQhkb1y6DHDHUUADCABbyYADmegAmWDAAFABu8gA2SHoAXDDQCCgRAJSZCSAoMZgAfDAA3jDqMHUw3rCIAZnZueEwAD4wSGBRenC50bHNpgB0g31xo7DlNgFYmNhJqXp5nvUN4BAgyXpjySDh07br6gC+QA)

這樣可以確保 `fruits` 不變且不用透過 `Object.values` 取值，又可以靈活的使用 type `Fruits`

type hint 也是沒有問題

![Untitled](The%20trouble%20with%20TypeScript%20enums%20-%20%E8%AE%80%E5%BE%8C%E7%AD%86%E8%A8%98%20a98c818f12e748f4bb83d1bfd2d52310/Untitled%201.png)
