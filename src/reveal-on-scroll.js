/*
* Reveal elements as user scrolls 
* Author: Juned Chhipa
*/

(function(){
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }

    this.revealOnScroll = (function() {
        revealOnScroll.prototype.defaults = {
            selector: 'reveal',
            delay: 100,
            offset: 0,
            animationSpeed: 1500
        };

        function revealOnScroll(options) {
            if (options == null) {
                options = {};
            }
            this.start = bind(this.start, this);
            this.config = this.extend(options, this.defaults);
        }

        revealOnScroll.prototype.init = function () {
            var self = this;
            this.element = window.document.documentElement;
            if ((ref = document.readyState) === "interactive" || ref === "complete") {
                this.start();
            } else {
                document.addEventListener('DOMContentLoaded', this.start);
            }
        }

        revealOnScroll.prototype.start = function () {
            var self = this;
            this.elms = function() {
                var i, elements, element, results;
                elements = this.element.querySelectorAll("."+self.config.selector);
                elements = self.nodelistToArray(elements);
                return elements;
            };
            Array.prototype.forEach.call(self.elms(), function(el, i){
                var revealed = false;
                window.addEventListener("scroll", function() {
                    if(self.scrolledIn(el,self.config.offset)) {
                        if(revealed==false) {
                            setTimeout(function(){
                                revealed = true;
                                var speed = self.config.animationSpeed;
                                el.style.opacity = 1;
                                el.style.transition = speed/1000 + 's all ease';
                            }, self.config.delay);
                        }
                    }
                });                
            });
        }

        revealOnScroll.prototype.extend = function(custom, defaults) {
            var key, value;
            for (key in defaults) {
                value = defaults[key];
                if (custom[key] == null) {
                  custom[key] = value;
                }
            }
            return custom;
        }

        revealOnScroll.prototype.nodelistToArray = function(nodelist) {
            var results = [];
            var i, element;
            for(i=0; i < nodelist.length; i++) {
                element = nodelist[i];
                results.push(element);
            }
            return results;
        }

        revealOnScroll.prototype.scrolledIn = function(el, offset) {
            if(typeof el == 'undefined') return;
  
            var elemTop = el.getBoundingClientRect().top;
            var elemBottom = el.getBoundingClientRect().bottom;

            var scrolledInEl = (elemTop >= 0) && (elemTop <= window.innerHeight);
            return scrolledInEl;

        }

        return revealOnScroll;

    })();
}).call(this);