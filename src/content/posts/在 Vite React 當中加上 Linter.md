---
published: 2023-03-05
abbrlink: vite-react-linter
tags:
  - Linter
  - React
description: 在 Vite React 當中加上 Linter
title: 在 Vite React 當中加上 Linter
---

## 建立專案

首先建立一個 vite react 的專案。

```bash
npm create vite@latest vite-react

```

<!-- truncate -->

接著依照指示，並且選了 React 跟 JavaScript。

![https://raw.githubusercontent.com/luofreddy/images/main/uPic/2022/11/14/create-vite.png](https://raw.githubusercontent.com/luofreddy/images/main/uPic/2022/11/14/create-vite.png)

最後進到資料夾內。

```bash
npm i

```

這樣就完成 vite react 的建置，可以試著跑 `npm run dev` 後打開 [http://127.0.0.1:5173/](http://127.0.0.1:5173/) 看看。

## 安裝 Linter & Prettier

首先先從 ESLint 開始。

```bash
npm i -D eslint eslint-config-google eslint-config-prettier eslint-import-resolver-alias eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react

```

接著是 Prettier。

```
npm i -D prettier

```

最後是 Stylelint 這邊要注意的是在我的專案裡面使有用到 SCSS 的，可以視情況移除相關的 dependencies 。

```bash
npm i -D stylelint stylelint-config-prettier stylelint-config-sass-guidelines stylelint-config-standard stylelint-order stylelint-scss

```

## 新增 Config

### ESLint

```yaml
# .eslintrc.yml

env:

browser: true

es2021: true

jquery: true

node: true

extends:
  - google

  - eslint:recommended

  - plugin:react/recommended

  - plugin:react/jsx-runtime

  - plugin:import/recommended

  - plugin:jsx-a11y/recommended

  - plugin:prettier/recommended

parserOptions:

ecmaFeatures:

jsx: true

ecmaVersion: latest

sourceType: module

plugins:
  - react

  - prettier

rules: {prettier/prettier: error, require-jsdoc: 0}

settings:

import/resolver:

alias:

map:
  - ['@', ./src]
```

### Prettier

```yaml
# .prettierignore
build
node_modules
public

package.json
package-lock.json
*.svg
```

```json
// .prettierrc
{
  "tabWidth": 2,
  "semi": true,
  "printWidth": 92,
  "singleQuote": true,
  "bracketSpacing": false,
  "endOfLine": "lf",
  "jsxSingleQuote": true,
  "bracketSameLine": true,
  "trailingComma": "all"
}
```

### StyleLint

```json
// .stylelintrc.json
{
  "extends": ["stylelint-config-standard", "stylelint-config-prettier", "stylelint-config-sass-guidelines"],

  "plugins": ["stylelint-scss", "stylelint-order"],
  "rules": {
    "no-descending-specificity": true,
    "function-url-quotes": "always",
    "selector-max-id": null,
    "max-nesting-depth": 5,
    "selector-class-pattern": null,
    "declaration-property-value-disallowed-list": null,
    "color-hex-length": "long",
    "no-duplicate-selectors": null,
    "selector-id-pattern": null
  }
}
```

接著就可以看到 `main.jsx` 跟 `App.css` 會出現紅色的錯誤。

![https://raw.githubusercontent.com/luofreddy/images/main/uPic/2022/11/14/eslint-error.png](https://raw.githubusercontent.com/luofreddy/images/main/uPic/2022/11/14/eslint-error.png)

![https://raw.githubusercontent.com/luofreddy/images/main/uPic/2022/11/14/stylelint-error.png](https://raw.githubusercontent.com/luofreddy/images/main/uPic/2022/11/14/stylelint-error.png)
