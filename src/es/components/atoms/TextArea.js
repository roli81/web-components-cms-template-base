import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js';

export default class TextArea extends Shadow() {



    constructor(textAria, label, ...args) {
        super(...args);
        this._textAria = textAria;
        this._label = label;


        this.onChange = event => {
            if (!this.getAttribute('name')) this.setAttribute('name', event.target.name);

            if (event.key == 'Enter') {
                this.dispatchEvent(new CustomEvent('form-submit', {
                    bubbles: true,
                    cancelable: true,
                    component: true
                }))
            } else {
                this.setAttribute('value', event.target.value);
            }
        }

    }


    connectedCallback () {
        console.log('Hello from texarea wc')

        if (this.shouldComponentRenderCSS()) this.renderCSS();
        if (this.shouldComponentRenderHTML()) this.renderHTML();
        if (this.textAria) {
            this.textAria.addEventListener('keyup', this.onChange)
            this.textAria.addEventListener('change', this.onChange)
        }
    }

    disconnectedCallback () {
        if (this.textAria) {
            this.textAria.removeEventListener('keyup', this.onChange)
            this.textAria.removeEventListener('change', this.onChange)
          }
    }

    shouldComponentRenderCSS () {
        return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
    }

    shouldComponentRenderHTML () {
        return !this.root.querySelector('textarea') || !this.root.querySelector('label')
    }

    renderCSS () {
        this.css = `
        :host {
            display: var(--display, flex);
            width: auto;
 
            flex-grow: var(--flex-grow, 0);
            padding: var(--padding, 0);
            margin: var(--margin, 0);
            flex-direction: var(--flex-direction, column);
            text-align: var(--text-align, center);
            position: var(--position, static);
          }

          :host label {
            background: var(--label-background, var(--background, none));
            padding: var(--label-padding, var(--padding, 0 15px));
            margin: var(--label-margin, var(--margin, 0));
            margin-bottom: 2em;
            border: var(--label-border, var(--border, none));
            border-radius: var(--label-border-radius, var(--border-radius, 0px));
            font-family: var(--label-font-family-bold, var(--font-family-bold));
            font-weight: var(--label-font-weight, var(--font-weight, normal));
            font-size: var(--label-font-size, var(--p-font-size, var(--font-size)));
            text-align: var(--label-text-align, var(--text-align, center));
            color: var(--label-color, var(--color, red));
            width: var(--label-width, var(--width, 40%));
            align-self: var(--label-align-self, var(--align-self, center));
            height: var(--label-height, var(--height, 100%));
            text-transform: var(--label-text-transform, var(--text-transform, uppercase));
          }

          :host textarea {
            resize: none !important;
            height: 25vh;
            background-color: var(--input-background);
            font-family: var(--input-font-family, var(--font-family));
            font-weight: var(--input-font-weight, var(--font-weight, normal));
            font-size: var(--input-font-size, var(--p-font-size, var(--font-size)));
            padding:0.5em;
            margin: var(--input-margin, var(--margin, 0));
            margin-top: 2em;
          }
        
        `;
    }

    renderHTML () {
        if (this.hasAttribute('reverse')) {
            this.html = [this.textAria, this.label]
          } else {
            this.html = [this.label, this.textAria]
          }
    }

    get label () {
        return this._label || this.root.querySelector('label');
    }

    get textAria () {
        return this._textAria || this.root.querySelector('textaria');
    }

}


