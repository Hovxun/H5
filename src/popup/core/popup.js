/**
 * https://github.com/Hovxun/H5/src/popup/
 */
(function(global) {
    let defaults = {
        wrapper: ".popup-wrapper",
        mask: true,
        onMask: false
    };

    function Popup(wrapper, parms) {
        let Po = this;
        this.params = {};
        this.config(defaults);
        this.config(parms);
        this.params.wrapper = wrapper;

        let $wrapper;
        if (document.querySelectorAll(wrapper)[0] !== undefined) {
            $wrapper = document.querySelectorAll(wrapper)[0];
            $wrapper.classList.add("popup-wrapper");
        } else {
            return;
        }

        $wrapper.addEventListener("touchmove", function(event) {
            event.preventDefault();
        });

        // config
        if (this.params.mask === true) {
            let maskEl = createMask($wrapper);
            maskEl.addEventListener("touchmove", function(event) {
                event.preventDefault();
            });
            if (this.params.onMask === true) {
                maskEl.addEventListener("click", function() {
                    Po.hide();
                });
            }
        }

        return this;
    }

    let fn = (Popup.prototype = {
        config: function(parms) {
            if (!parms) {
                return;
            }
            for (var key in parms) {
                this.params[key] = parms[key];
            }
            return this;
        },
        show: function() {
            let $wrapper = document.querySelectorAll(this.params.wrapper)[0];
            $wrapper.style.display = "block";
            return this;
        },
        hide: function() {
            let $wrapper = document.querySelectorAll(this.params.wrapper)[0];
            $wrapper.classList.add("fadeOutPopup");
            $wrapper.addEventListener("animationend", function() {
                if ($wrapper.classList.contains("fadeOutPopup")) {
                    $wrapper.classList.remove("fadeOutPopup");
                    $wrapper.style.display = "none";
                }
            });
        }
    });

    // create mask
    function createMask(pEl) {
        let maskEl = document.createElement("div");
        maskEl.classList.add("mask");
        pEl.appendChild(maskEl);
        return maskEl;
    }
    global.Popup = Popup;
})(this);
