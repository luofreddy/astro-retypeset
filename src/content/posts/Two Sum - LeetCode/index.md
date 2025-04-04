---
published: 2024-11-02
abbrlink: leetcode-two-sum
tags:
  - Algorithm
keywords:
  - leetcode
  - twosum
  - algorithm
  - hashmap
description: two sum 是很有名的演算法題，這邊文章記錄了解題的過程以及思緒，首先用最直觀的雙層迴圈處理，但是考量到效能後發現這不是最佳解，到後來使用 hashmap 來解題。
title: Two Sum - LeetCode
---

紀錄 two sum 的解題過程以及解題思緒

[**Two Sum**](https://leetcode.com/problems/two-sum/)

```
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]
```

<!-- truncate -->

## 兩個迴圈

首先閱讀完第一個題目我的直覺是兩個迴圈來處理

```jsx
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
let twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target && i !== j) {
        return [i, j]
      }
    }
  }
}
```

![image.png](1%20Two%20Sum%20-%20LeetCode%201335bc8a796580279322d785ade192ff/image.png)

## 改進兩個迴圈

接著觀察一下發現遍歷的過程中，在內層的那層迴圈中其實頭幾個是不需要算了，因為在更前面的外層迴圈中其實是驗證過的

```jsx
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
let twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
}
```

![image.png](1%20Two%20Sum%20-%20LeetCode%201335bc8a796580279322d785ade192ff/image%201.png)

但這樣的時間複雜度還是 _O_(n²) ，參考別人的解法後用 HashMap 做出了 _O_(n) 的解法

## HashMap

```jsx
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
let twoSum = function (nums, target) {
  const hash = {}
  for (let i = 0; i < nums.length; i++) {
    let num1 = nums[i]
    let num2 = target - num1
    if (typeof hash[num2] !== 'undefined') {
      return [hash[num2], i]
    }

    hash[num1] = i
  }
}
```

![image.png](1%20Two%20Sum%20-%20LeetCode%201335bc8a796580279322d785ade192ff/image%202.png)

來試著解析一下，首先我們是要在 array 中尋找兩個數加起來等於 target

```jsx
nums[i] + nums[j] = target
```

換句話說

```jsx
target - nums[i] = nums[j]
```

那怎麼利用 HashMap 跟剛剛的思考方向解題，首先在遍歷 array 的過程中並且紀錄下所需要的補數及 index

```jsx
let twoSum = function (nums, target) {
  const hash = {}
  for (let i = 0; i < nums.length; i++) {
    let num1 = nums[i]
    let num2 = target - num1
    if (typeof hash[num2] !== 'undefined') {
      return [hash[num2], i]
    }

    hash[num1] = i
  }
}
```

```jsx
// 定義出 array 中的數跟它所需的補數
let num1 = nums[i]
let num2 = target - num1
```

```jsx
// 如果發現 HashMap 中有補數，代表這個補數有出現在這個 array 並且在前面遍歷過了
if (typeof hash[num2] !== 'undefined') {
  return [hash[num2], i];
}
```

```jsx
// 把 array 中的數及 index 當作 kay-value 放入 HashMap
hash[num1] = i
```
