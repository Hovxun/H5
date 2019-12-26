## 弹出层 Popup

### 引入

1. `<link rel="stylesheet" href="./path/popup.css" />`
2. `<script src="./path/popup.js"></script>`

### Demo

#### html

```
<!-- 弹出按钮 -->
<button class="showBtn">弹出 Popup</button>
<!-- 弹出框 -->
<div class="popup popup-wrapper">
    <div class="popup-content center">
        Hello World!
    </div>
</div>
```

把 `center` 改为 `top` | `bottom` | `left` | `right` 从而控制弹出层位置

#### css

```
.popup-wrapper {
    dispaly: none;
}
.popup-content {
    background: #fff;
}
```

#### js

```
window.onload = function() {
    let demoPopup = new Popup(".popup-wrapper", {
        onMask: true
    });
    let showBtn = document.querySelector(".showBtn");
    showBtn.onclick = function() {
        demoPopup.show();
    };
}
```

### API

#### Params

| 参数      | 说明                   | 可选值                           | 默认值 |
| --------- | ---------------------- | -------------------------------- | ------ |
| _wrapper_ | 弹出层 DOM             | String (Class Name \|ID Name...) | \*     |
| \-\-\-    |
| mask      | 是否显示遮罩层         | Boolean                          | true   |
| onMask    | 是否在点击遮罩层后关闭 | Boolean                          | false  |

#### Events

| 参数   | 说明       | 参数 |
| ------ | ---------- | ---- |
| show() | 显示弹出层 | -    |
| hide() | 关闭弹窗   | -    |
