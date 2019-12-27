/**
 * https://github.com/Hovxun/H5/src/hint/
 */
(function(global) {
    let private = {
        toast: {
            el: null,
            icon: "none"
        },
        loading: {
            el: null
        },
        modal: {
            el: null
        },
        timer: null
    };
    let hint = {
        showToast(parms) {
            clearTimeout(private.timer);
            let msg = "",
                icon = "none",
                duration = 2000;
            if (typeof parms === "undefined" || typeof parms === "string") {
                msg = parms || "";
            } else if (parms.constructor === Object) {
                msg = parms.message || "";
                icon = parms.icon || "none";
                duration = parms.duration || duration;
            } else {
                return;
            }
            renderToast({
                mode: "toast",
                message: msg,
                icon: icon
            });
            private.timer = setTimeout(() => {
                this.hideToast();
                clearTimeout(private.timer);
            }, 1500);
        },
        hideToast() {
            if (private.toast.el) {
                private.toast.el.style.display = "none";
            } else {
                return;
            }
        },
        showLoading(parms) {
            let msg = "",
                icon = "loading";
            if (typeof parms === "undefined" || typeof parms === "string") {
                msg = parms || "";
            } else {
                return;
            }
            renderToast({
                mode: "loading",
                message: msg,
                icon: icon
            });
        },
        hideLoading(parms) {
            if (private.loading.el) {
                private.loading.el.style.display = "none";
            } else {
                return;
            }
        },
        showModal(parms) {
            let defaults = {
                title: "",
                message: "",
                confirmText: "确定",
                cancelText: "取消",
                showCancel: true,
                onConfirm: function() {
                    console.log("onConfirm");
                },
                onCancel: function() {
                    console.log("onCancel");
                }
            };
            if (parms && parms.constructor === Object) {
                config(defaults, parms);
            } else {
                return;
            }
            renderModal(defaults);
        }
    };
    global.hint = hint;
    /**
     * 配置自定义参数
     * @defaults Object 默认值
     * @parms Object 自定义值
     */
    function config(defaults, parms) {
        if (parms.constructor !== Object) {
            return;
        }
        for (var key in parms) {
            defaults[key] = parms[key];
        }
    }
    /**
     * 生成 Toast 模板字符串
     * @parms {icon: 'none||loading||success', message: 'String'}
     */
    function toastTpl(parms) {
        return `<div class="hint-toast hint-tpl-${parms.icon}">
                    <div class="hint-icon-wrapper">
                        <div class="hint-icon"></div>
                    </div>
                    <div class="hint-message">${parms.message}</div>
                </div>`;
    }
    /**
     * 渲染 Toast
     * @parms {mode: 'toast || loading', message: 'String', icon: 'none | loading | success'}
     */
    function renderToast(parms) {
        let mode = private[parms.mode];
        let modeEl = mode.el;
        let modeIcon = mode.icon;
        if (!modeEl) {
            let tpl = toastTpl(parms);
            let perch = document.createElement("div");
            perch.innerHTML = tpl;
            private[parms.mode].el = perch;
            document.body.appendChild(perch);
        } else {
            modeEl.querySelector(".hint-message").innerText = parms.message;
            if (parms.icon !== modeIcon) {
                let el = modeEl.querySelector(".hint-toast");
                el.classList.remove("hint-tpl-" + modeIcon);
                el.classList.add("hint-tpl-" + parms.icon);
            }
            private[parms.mode].el.style.display = "block";
        }
        if (parms.icon) {
            private[parms.mode].icon = parms.icon;
        }
    }
    /**
     * 生成 Modal 模板字符串
     * @parms {title: 'String', message: 'String', cancelText: 'String', confirmText: 'String'}
     */
    function modalTpl(parms) {
        return `<div class="hint-modal">
                    <div class="hint-title">${parms.title}</div>
                    <div class="hint-message">${parms.message}</div>
                    <div class="hint-button-group">
                        <div class="hint-cancel">${parms.cancelText}</div>
                        <div class="hint-confirm">${parms.confirmText}</div>
                    </div>
                </div>`;
    }
    /**
     * 渲染 Modal
     * @parms {title: 'String', message: 'String', cancelText: 'String', confirmText: 'String', showCancel: Boolean, onConfirm: Function, onCancel: Function}
     */
    function renderModal(parms) {
        let mode = private.modal,
            modeEl = mode.el;
        if (!modeEl) {
            let tpl = modalTpl(parms),
                perch = document.createElement("div"),
                mask = document.createElement("div");
            perch.innerHTML = tpl;
            mask.classList.add("hint-mask");
            perch.appendChild(mask);
            modeEl = private.modal.el = perch;
            document.body.appendChild(perch);
        } else {
            private.modal.el.querySelector(".hint-title").innerText = parms.title;
            private.modal.el.querySelector(".hint-message").innerText = parms.message;
            private.modal.el.querySelector(".hint-confirm").innerText = parms.confirmText;
            private.modal.el.querySelector(".hint-cancel").innerText = parms.cancelText;
            private.modal.el.style.display = "block";
        }

        let confirmBtn = modeEl.querySelector(".hint-confirm");
        confirmBtn.onclick = function() {
            parms.onConfirm();
            private.modal.el.style.display = "none";
        };
        let cancelBtn = modeEl.querySelector(".hint-cancel");
        if (parms.showCancel === false) {
            cancelBtn.style.display = "none";
        } else {
            cancelBtn.style.display = "block";
            cancelBtn.onclick = function() {
                parms.onCancel();
                private.modal.el.style.display = "none";
            };
        }
        return private.modal.el;
    }
})(this);
