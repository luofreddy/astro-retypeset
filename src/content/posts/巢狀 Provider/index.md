---
title: 巢狀 Provider
abbrlink: nested-provider
# pin: 99
published: 2025-06-23
description: 介紹了 React 應用程式中「巢狀 Provider」的概念，解釋了其功能與結構，並提供了兩種常見的優化方式：使用 combineComponents 函數進行組裝，以及利用 pipe 函數建立 Provider 管道。這些方法旨在簡化程式碼結構，提高可讀性和維護性。
tags:
  - react
---
> 本文內容參考此[討論串](https://www.threads.com/@this.web/post/DKR8FwVsNGM?xmt=AQF0xhPMwTqa01cwV1db14I7qlxo5wdyZwVDt4J_aP-UVw)做整理後產出。

## 什麼是「巢狀 Provider」？
想像一下你在玩疊疊樂，一塊一塊的積木疊起來，形成一個高塔。在寫程式的時候，特別是在一個叫做「React」的網頁程式框架中，我們也會遇到類似的情況。有時候，我們的程式會需要一些「提供者」（Provider），它們就像是不同功能的積木，用來提供特定的功能或資料給其他程式部分使用。

```tsx
function Providers({ children }: Props) {
  return (
    <SWRConfig value={{ errorRetryInterval: 2000 }}>
      <ChakraProvider theme={theme}>
        <ContainerProvider>
          <PermissionHandler>
            <SidebarProvider>{children}</SidebarProvider>
          </PermissionHandler>
        </ContainerProvider>
      </ChakraProvider>
    </SWRConfig>
  )
}

export default Providers
```

你看到 `<SWRConfig>`、`<ChakraProvider>`、`<NavigationStatesProvider>` 這些東西了嗎？ 它們就是一個個不同功能的「提供者」。它們一個疊著一個，層層包住最裡面的 `children`。這個 `children` 代表的是你的主要應用程式內容，它會使用到外面這些提供者所提供的功能。

這樣一層一層包起來的好處是，我們可以確保你的應用程式內容能夠使用到所有它需要的特殊功能。但缺點是，如果有很多層，程式碼看起來就會像一個很大的俄羅斯娃娃，密密麻麻的，不太容易看懂，而且如果需要調整順序或增加減少提供者，就會有點麻煩。

## 優化方法
為了讓這些「提供者」疊得更漂亮、更容易管理這邊有兩個方法，概念上都差不多，但在實踐上有一點小區別。

### 1. 像組裝線一樣組合起來
```ts
function combineComponents(...components) {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) =>
      ({ children }) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      },
    ({ children }) => <>{children}</>,
  );
}

// 將原本巢狀的 Provider 們，依序放入陣列中
const providersList = [
  SWRConfig,
  ChakraProvider,
  ContainerProvider,
  PermissionHandler,
  SidebarProvider,
];

// 使用 combineComponents 將它們組合成一個 Provider
const CombinedProviders = combineComponents(...providersList);

// 最後在應用程式中使用這個組合好的 Provider
const Providers = ({ children }: Props) => {
  return (
    <CombinedProviders>
      {children}
    </CombinedProviders>
  );
};

export default Providers;
```
這段程式碼做的事情是，它把所有的 Provider 放進一個叫做 providersList 的清單裡。 然後 combineComponents 這個函數會把這些 Provider 按照順序一個一個地組合起來，最後變成一個大的 CombinedProviders。這樣一來，我們就不用自己手動一層一層地疊積木了，但是這個方法如果在 Provider 要另外帶 props 時可能就要稍加處理。

### 1. 參考 FP 的概念建立 pipe
```ts
const pipe =
  (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value);

const createProvider =
  (Provider, props = {}) =>
  (children) => <Provider {...props}>{children}</Provider>;

// 創建 Provider 的管道
const ProviderPipeline = pipe(
  createProvider(SWRConfig, { value: { errorRetryInterval: 2000 } }),
  createProvider(ChakraProvider, { theme: theme }), // 假設 theme 是已經定義好的
  createProvider(ContainerProvider),
  createProvider(PermissionHandler),
  createProvider(SidebarProvider),
);

// 最後在應用程式中使用這個管道
const Providers = ({ children }: Props) => {
  return ProviderPipeline(children);
};

export default Providers;
```

這種方法的好處是，它非常靈活，你可以很容易地調整每個 Provider 的順序，或者給它們設定不同的屬性，就像你可以在水管上隨時更換水龍頭一樣。

## 結語
大量的巢狀 Provider 會導致難以閱讀以及維護上的困擾，透過簡單的方法可以大幅降低閱讀以及維護的困難，個人比較喜歡 FP 的方式，另外再討論串裡面也有提到狀態管理工具 `Zustand` ， 也是一個好方法，希望這篇文章有幫助到想要解決類似問題的你。
