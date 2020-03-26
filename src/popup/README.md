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
<div class="popup-wrapper-mine">
    <div class="popup-content">
        Hello World!
    </div>
</div>
```

_class 名 `popup-content` 不可自定义_

#### css

```
.popup-wrapper-mine {
    display: none;
}
.popup-content {
    background: #fff;
}
```

#### js

```
window.onload = function() {
    let demoPopup = new Popup(".popup-wrapper-mine", {
        closeOnMask: true
    });
    // 或
    // let demoPopup = new Popup({
    //     wrapper: ".popup-wrapper-mine",
    //     closeOnMask: true
    // });
    let showBtn = document.querySelector(".showBtn");
    showBtn.onclick = function() {
        demoPopup.show();
    };
}
```

### API

#### Params

| 参数        | 说明                   | 可选值                                     | 默认值   |
| ----------- | ---------------------- | ------------------------------------------ | -------- |
| wrapper     | 弹出层 DOM             | String (Class Name \|ID Name...)           | \*       |
| position    | 弹出层位置             | `center`, `top`, `bottom`, `left`, `right` | `center` |
| mask        | 是否显示遮罩层         | Boolean                                    | true     |
| closeOnMask | 是否在点击遮罩层后关闭 | Boolean                                    | false    |
| lockScroll  | 是否禁止滚动           | Boolean                                    | true     |

#### Events

| 参数   | 说明       | 参数 |
| ------ | ---------- | ---- |
| show() | 显示弹出层 | -    |
| hide() | 关闭弹窗   | -    |
