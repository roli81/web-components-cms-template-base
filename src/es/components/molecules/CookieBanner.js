import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'


export default class CookieBanner extends Shadow() {
    constructor(...args) {
        super(...args);

        this.clickEventListener = event => {
            localStorage.setItem('cookiesAccepted', true);
            

            
        }

    }

    connectedCallback () {
        if (this.shouldComponentRenderCSS()) this.renderCSS();
        if (this.shouldComponentRenderHTML()) this.renderHTML();

    }

    disconnectedCallback () {
        console.log('disconnected');
    }

    renderHTML () {
        
        this.cookieBanner = document.createElement('div');
        this.cookieBanner.setAttribute('id', 'cookie-banner');
        let tst = Array.from(this.root.childNodes);
        tst.forEach(e => this.cookieBanner.appendChild(e));
        this.button = document.createElement('button');
        this.button.innerText = "test";
        
        this.cookieBanner.appendChild(this.button);

        this.html = this.cookieBanner;

    }




    renderCSS(){


        this.css = `
        :host div {
            position: absolute;
            bottom: 0;
            left: 0;
            background-color: red;
            height: 10%;
            width: 100vw;
            z-index: 1001;
        }
        .cookie-banner {


            
        }`;
    }


    




    shouldComponentRenderHTML () {

          

            return true;
        }

        shouldComponentRenderCSS(){
            return !this.root.querySelector('style[_css]');
        }

}