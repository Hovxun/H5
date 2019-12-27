## 提示对话框 hint

### 引入

1. `<link rel="stylesheet" href="./path/hint.css" />`
2. `<script src="./path/hint.js"></script>`

### loading

#### html

```
<button class="showLoadingBtn">
    showLoadingBtn
</button>
```

#### js

```
window.onload = function() {
    let showLoadingBtn = document.querySelector(".showLoadingBtn");
    showLoadingBtn.onclick = function() {
        hint.showLoading();
        let timer = setTimeout(() => {
            hint.hideLoading();
            clearTimeout(timer)
        }, 5000);
    };
}
```

#### Loading API

##### Events

| 参数          | 说明         | 参数     |
| ------------- | ------------ | -------- |
| showLoading() | 显示 loading | [String] |
| hideLoading() | 关闭 loading | -        |

### Toast

#### html

```
<button class="showToastBtn">
    showToastBtn
</button>
```

#### js

```
window.onload = function() {
    let showToastBtn = document.querySelector(".showToastBtn");
    showToastBtn.onclick = function() {
        hint.showToast("提示信息");
    };
}
```

#### Loading API

##### Events

| 参数        | 说明       | 参数                  |
| ----------- | ---------- | --------------------- |
| showToast() | 显示 toast | **options** \| String |
| hideToast() | 关闭 toast | -                     |

###### options

| 参数     | 说明     | 可选值                     | 默认值   |
| -------- | -------- | -------------------------- | -------- |
| message  | 提示内容 | String                     | ''       |
| icon     | 图标     | `'loading'` \| `'success'` | `'none'` |
| duration | 展示时长 | Number                     | 2000     |

### Modal

#### html

```
<button class="showModalBtn">
    showModalBtn
</button>
```

#### js

```
window.onload = function() {
    let showModalBtn = document.querySelector(".showModalBtn");
    showModalBtn.onclick = function() {
        hint.showModal({
            title: "标题",
            message: "内容",
            confirmText: "确定",
            cancelText: "取消",
            showCancel: true,
            onConfirm: function() {
                console.log("短歌行=>点击了确定");
            },
            onCancel: function() {
                console.log("短歌行=>点击了取消");
            }
        });
    };
}
```

#### Loading API

##### Events

| 参数        | 说明       | 参数        |
| ----------- | ---------- | ----------- |
| showModal() | 显示 modal | **options** |

###### options

| 参数        | 说明             | 可选值   | 默认值 |
| ----------- | ---------------- | -------- | ------ |
| title       | 提示标题         | String   | ''     |
| message     | 提示内容         | String   | ''     |
| confirmText | 确认按钮文字     | String   | '确定' |
| cancelText  | 取消按钮文字     | String   | '取消' |
| showCancel  | 是否显示取消按钮 | Boolean  | true   |
| onConfirm   | 点击确定回调函数 | Function | -      |
| onCancel    | 点击取消回调函数 | Function | -      |
