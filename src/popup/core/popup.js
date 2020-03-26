/**
 * https://github.com/Hovxun/H5/tree/master/src/popup
 */
(function(global) {
    let Utils = {
        isObject: function(o) {
            return typeof o === "object" && o !== null && o.constructor && o.constructor === Object;
        },
        extend: function() {
            let target = Object(arguments[0]);
            for (let i = 1, argsLen = arguments.length; i < argsLen; i++) {
                let option = arguments[i];
                if (option !== undefined && option !== null) {
                    let keysArr = Object.keys(Object(option));
                    for (let j = 0, len = keysArr.length; j < len; j++) {
                        let key = keysArr[j];
                        let Des = Object.getOwnPropertyDescriptor(option, key);
                        if (Des !== undefined && Des.enumerable) {
                            if (Utils.isObject(target[key]) && Utils.isObject(option[key])) {
                                Utils.extend(target[key], option[key]);
                            } else if (!Utils.isObject(target[key]) && Utils.isObject(option[key])) {
                                target[key] = {};
                                Utils.extend(target[key], option[key]);
                            } else {
                                target[key] = option[key];
                            }
                        }
                    }
                }
            }
            return target;
        }
    };

    function Popup() {
        let wrapper, parms;
        if (arguments.length === 1 && arguments[0].constructor && arguments[0].constructor === Object) {
            parms = arguments[0];
        } else {
            wrapper = arguments[0];
            parms = arguments[1];
        }
        if (!parms) {
            parms = {};
        }
        if (wrapper && !parms.wrapper) {
            parms.wrapper = wrapper;
        }
        this.params = Utils.extend({}, this.originalParams, parms);
        this.$wrapper = document.querySelector(this.params.wrapper);
        if (!this.$wrapper) {
            return;
        }
        this.$wrapper.classList.add("popup-wrapper");
        // 阻止滚动。如不阻止滚动，会滚动穿透。如只需内容滚动，用 Iscroll.js 插件。
        if (this.params.lockScroll) {
            this.$wrapper.addEventListener("touchmove", function(event) {
                event.preventDefault();
            });
        }
        this.init();
        return this;
    }

    global.Popup = Popup;

    Popup.prototype.originalParams = {
        wrapper: ".popup-wrapper",
        position: "center", // 弹窗位置
        mask: true, // 是否显示阴影层
        closeOnMask: false, // 点击阴影层是否关闭弹窗
        lockScroll: true // 是否禁止滚动
    };
    Popup.prototype.init = function() {
        let self = this,
            params = this.params;
        self.position();
        if (params.mask === true) {
            self.renderMask();
        }
    };
    // 弹窗位置
    Popup.prototype.position = function() {
        let $content = this.$wrapper.querySelector(".popup-content");
        $content.className = "popup-content";
        $content.classList.add(this.params.position);
    };
    Popup.prototype.show = function() {
        this.$wrapper.style.display = "block";
        return this;
    };
    Popup.prototype.hide = function() {
        let self = this,
            $wrapper = self.$wrapper;
        $wrapper.classList.add("fadeOutPopup");
        $wrapper.addEventListener("animationend", function() {
            if ($wrapper.classList.contains("fadeOutPopup")) {
                $wrapper.classList.remove("fadeOutPopup");
                $wrapper.style.display = "none";
            }
        });
        return this;
    };
    // 阴影层
    Popup.prototype.renderMask = function() {
        let self = this,
            params = this.params;
        let maskEl = document.createElement("div");
        maskEl.classList.add("mask");
        self.$wrapper.appendChild(maskEl);
        maskEl.addEventListener("touchmove", function(event) {
            event.preventDefault();
        });
        if (params.closeOnMask === true) {
            maskEl.addEventListener("click", function() {
                self.hide();
            });
        }
        return maskEl;
    };
})(this);
