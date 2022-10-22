import { Shadow } from '../web-components-toolbox/src/es/components/prototypes/Shadow.js'


export default class CaptchaSubmitButton extends Shadow() {


    constructor(...args) {
        super(...args);
        setInterval(() => {
            this.refreshCaptcha();
        }, 285000)

        this.refreshIcon =
            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
            <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
        </svg>`;
        this.valid = true;
        this.apiPath = this.getAttribute('apiPath') ? this.getAttribute('apiPath').endsWith('/') ? this.getAttribute('apiPath') : this.getAttribute('apiPath') + '/': '/umbraco/api/captcha/';
        this.corsMode = this.getAttribute('corsMode') ? this.getAttribute('corsMode') : 'same-origin';
    }

    connectedCallback() {
        if (!this.hasFetched) {
            this.getCaptcha();
            this.hasFetched = true;
        }
    }

    disconnectedCallback() {

    }


    refreshCaptcha() {
        return new Promise((resolve, reject) => {
            fetch(`${this.apiPath}RefreshCaptcha?id=${this.id}`, { mode: this.corsMode })
                .then(response => response.json())
                .then(newImage => {
                    this.captchaImage.setAttribute('src', newImage.image);
                    this.html = this.wrapper;
                    resolve();
                })
                .catch(error => reject(error));
        })
    }


    validateCaptcha() {
        const captchaReq = {
            id: this.id,
            text: this.input.value
        };

        return new Promise((resolve, reject) => {
            fetch(`${this.apiPath}validatecaptcha`, {
                method: 'POST',
                mode: this.corsMode,
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(captchaReq)
            })
                .then(response => {
                    return response.text()
                }).then(captchaValid => {
                    if (captchaValid === 'false') {
                        this.valid = false;
                    } else {
                        this.valid = true;
                    }
                    resolve();
                }).catch(error => { reject(error) });
        })
    }


    renderHtml(data) {
        this.wrapper = document.createElement('div');
        this.captchaImage = document.createElement('img');
        this.captchaImage.setAttribute('src', data.image);
        this.id = this.getAttribute('id');

        this.wrapper.appendChild(this.captchaImage);

        this.button = document.createElement('button');
        this.button.innerHTML = this.refreshIcon;
        this.button.addEventListener('click', (event) => {
            event.preventDefault();
            this.refreshCaptcha();
        });
        this.wrapper.appendChild(this.button);
        this.errorMessage = document.createElement('div');
        this.wrapper.appendChild(this.errorMessage);
        this.inputDiv = document.createElement('div');
        this.input = document.createElement('input');
        this.input.setAttribute('type', 'text');
        this.input.setAttribute('id', this.id);
        this.input.addEventListener('change', () => {
            if (this.input?.value?.length === 6) {
                this.validateCaptcha()
                    .then(() => {
                        if (this.valid) {
                            this.dispatchEvent(new CustomEvent('captcha-success', { bubbles: true, cancelable: false, composed: true }));
                            this.errorMessage.innerText = '';
                        } else {
                            this.dispatchEvent(new CustomEvent('captcha-failed', { bubbles: true, cancelable: false, composed: true }));
                            this.errorMessage.innerText = 'Bitte gib den richtigen Code ein!';
                        }
                    });
            }
        });
        this.inputDiv.appendChild(this.input);
        this.wrapper.appendChild(this.inputDiv);
        this.submitDiv = document.createElement('div');
        this.submitButton = document.createElement('button');
        this.submitButton.setAttribute('id', 'submitButton');
        this.submitButton.setAttribute('type', 'submit');
        this.submitButton.innerText = 'Senden';
        this.submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.validateCaptcha()
                .then(() => {
                    if (this.valid) {
                        this.dispatchEvent(new CustomEvent('submit-form', { bubbles: true, cancelable: false, composed: true }));
                        this.errorMessage.innerText = '';
                    } else {
                        this.dispatchEvent(new CustomEvent('captcha-failed', { bubbles: true, cancelable: false, composed: true }));
                        this.errorMessage.innerText = 'Bitte gib den richtigen Code ein!';
                    }
                });
        });
        this.submitDiv.appendChild(this.submitButton);
        this.wrapper.appendChild(this.submitDiv);
        this.html = this.wrapper;
    }


    getCaptcha() {
        return new Promise((res, rej) => {
            fetch(`${this.apiPath}getcaptchaimage`, { mode: this.corsMode })
                .then((response) => response.json())
                .then((data) => {
                    if (this.shouldComponentRenderHTML()) {
                        this.id = data.id;
                        this.renderHtml(data);
                    }
                    res()
                })
                .catch((error) => rej(error))
        });
    }


    shouldComponentRenderHTML() {
        return !this.wrapper;
    }
}