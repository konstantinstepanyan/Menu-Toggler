document.addEventListener('DOMContentLoaded', () => {

    alert(1);
    
    class MenuToggler {
        constructor(data) {
            this.menuTriggerSelector = data.menuTriggerSelector;
            this.menuSelector = data.menuSelector;
            this.type = data.type || 'appear'; //type of Apperance
            this.transitionTime = data.transitionTime || '.25s';
            this.transitionType = data.transitionType || '.ease';
            this.menuDisplay = data.menuDisplay || 'block';

            this.menuTrigger = document.querySelector(`${this.menuTriggerSelector}`);
            this.menu = document.querySelector(`${this.menuSelector}`);
            this.isChanging = false;
            this.state = 'hide';

            this.init();
        }

        init() {

            if (this.type == 'appear') {
                // add first styles, makes elem invisible and untouchuble
                //this.menu.style.transition = 'none';
                this.menu.style.height = '0';
                this.menu.style.opacity = 0;
                this.menu.style.display = 'none';



                //                this.menu.style.cssText = `-webkit-transition: opacity ${this.transitionTime} ${this.transitionType} ${this.transitionTime}, height 0s ${this.transitionType} 0s`;
                //                this.menu.style.cssText = `-o-transition: opacity ${this.transitionTime} ${this.transitionType} ${this.transitionTime}, height 0s ${this.transitionType} 0s`;

                this.menuTrigger.addEventListener('click', this.toggle.bind(this));
                this.menuTrigger.addEventListener('touchstart', this.toggle.bind(this));

                this.menu.addEventListener('transitionend', (e) => {
                    if (e.target == this.menu) {
                        this.isChanging = false;

                        if (this.state == 'hide') {
                            this.menu.style.display = 'none'
                        }
                    }

                });
            }

        }

        addTransition (element, property, value) {

                    element.style["webkit" + property] = value;
                    element.style["moz" + property] = value;
                    element.style["ms" + property] = value;
                    element.style["o" + property] = value;
                    element.style[property] = value;
         
            }
        
        toggle() {


            if (this.type == 'appear' && !this.isChanging) {

                if (this.menu.style.opacity == '1') {
                    this.addTransition(this.menu, 'Transition', `opacity ${this.transitionTime} ${this.transitionType}`);

                    if (this.menuTrigger.classList.contains('burger')) {
                        this.menuTrigger.classList.remove('burger_close');
                    }

                    this.state = 'hide';
                    this.menu.style.height = '0';
                    this.menu.style.opacity = '0';
                    this.isChanging = true;
                    return;
                }
                if (this.menu.style.opacity == '0') {

                    
                    if (this.menuTrigger.classList.contains('burger')) {
                        this.menuTrigger.classList.add('burger_close');
                    }
                    
                    
                    this.state = 'show';
                    this.menu.style.display = this.menuDisplay;
                    setTimeout(() => {
                        this.addTransition(this.menu, 'Transition', `opacity ${this.transitionTime} ${this.transitionType}`);
                        this.menu.style.height = 'initial';
                        this.menu.style.opacity = '1';
                        this.isChanging = true
                    }, 1);
                    return;
                }

            }
        }
    }

    const menuToggler1 = new MenuToggler({
        menuTriggerSelector: '.burger', //if burger, to onClick add class burger_close
        menuSelector: '.links-wrapper',
        transitionTime: '2.5s',
        transitionType: 'linear',
        menuDisplay: 'grid'
    });

});
