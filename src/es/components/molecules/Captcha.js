import { Shadow } from '../web-components-toolbox/src/es/components/prototypes/Shadow.js'

export default class Captcha extends Shadow() {

    constructor(...args) {
        super(...args);

    }
    connectedCallback() {

        //if (!this.hasFetched) {
        //    this.getCaptcha();
        //    this.hasFetched = true;
        //}

        if (this.shouldComponentRenderHTML()) this.renderHtml();

        
    }

    disconnectedCallback() {

    }


    getCaptcha() {

        return new Promise((res, rej) => {
            fetch('https://localhost:44391/umbraco/api/captcha/getcaptchaimage', { mode: 'cors' })
                .then((response) => response.json())
                .then((data) => {
                    if (this.shouldComponentRenderHTML())  this.renderHtml(data)
                    res()
                })
                .catch((error) => rej(error))
        });
    }

    renderHtml() {
        this.wrapper = document.createElement('div');
        this.capcthaImage = document.createElement('img');
        this.capcthaImage.setAttribute('src', this.getAttribute('src'));
        this.id = this.getAttribute('id');
        this.wrapper.appendChild(this.capcthaImage);
        this.html = this.wrapper;
    }


    shouldComponentRenderHTML() {
        return !this.wrapper;
    }

}

