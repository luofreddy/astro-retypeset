---
published: 2023-03-04
abbrlink: git-reflog
description: 不小心下錯 git 指令別著急，試試 git reflog
title: 用 Git Reflog 來還原
---

# 用 Git Reflog 來還原

在使用 git 的時候若是在 remote 的 repo 沒有保存到就直接將 local 的 branch reset ，此時可以使用 git reflog 來還原。

可以看到這邊目前的 HEAD 是在 `862c7dd`

![https://raw.githubusercontent.com/luofreddy/images/main/uPic/2022/04/05/%E6%88%AA%E5%9C%96%202022-04-05%20%E4%B8%8B%E5%8D%8810.27.30.png](https://raw.githubusercontent.com/luofreddy/images/main/uPic/2022/04/05/%E6%88%AA%E5%9C%96%202022-04-05%20%E4%B8%8B%E5%8D%8810.27.30.png)

接著我使用了 `git  reset --hard HEAD^` 來回到上一個 commit，但是這時如果我們忘記把原本的 commit 推到 remote 的話也不要慌張，這時可以使用 `git reflog` 救回來。

![https://raw.githubusercontent.com/luofreddy/images/main/uPic/2022/04/05/%E6%88%AA%E5%9C%96%202022-04-05%20%E4%B8%8B%E5%8D%8810.29.23.png](https://raw.githubusercontent.com/luofreddy/images/main/uPic/2022/04/05/%E6%88%AA%E5%9C%96%202022-04-05%20%E4%B8%8B%E5%8D%8810.29.23.png)

下 `git reflog` 可以看到 git 的操作

![https://raw.githubusercontent.com/luofreddy/images/main/uPic/2022/04/05/%E6%88%AA%E5%9C%96%202022-04-05%20%E4%B8%8B%E5%8D%8810.33.15.png](https://raw.githubusercontent.com/luofreddy/images/main/uPic/2022/04/05/%E6%88%AA%E5%9C%96%202022-04-05%20%E4%B8%8B%E5%8D%8810.33.15.png)

這時我們在使用 `git reset` 回去

![https://raw.githubusercontent.com/luofreddy/images/main/uPic/2022/04/05/%E6%88%AA%E5%9C%96%202022-04-05%20%E4%B8%8B%E5%8D%8810.36.11.png](https://raw.githubusercontent.com/luofreddy/images/main/uPic/2022/04/05/%E6%88%AA%E5%9C%96%202022-04-05%20%E4%B8%8B%E5%8D%8810.36.11.png)

![https://raw.githubusercontent.com/luofreddy/images/main/uPic/2022/04/05/%E6%88%AA%E5%9C%96%202022-04-05%20%E4%B8%8B%E5%8D%8810.36.41.png](https://raw.githubusercontent.com/luofreddy/images/main/uPic/2022/04/05/%E6%88%AA%E5%9C%96%202022-04-05%20%E4%B8%8B%E5%8D%8810.36.41.png)
