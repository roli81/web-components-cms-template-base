import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

export default class Input extends Shadow() {

    constructor(input, label, ...args) {
        this._input = input;
        this._label = label;


        this.onChange = event => {
            if (!this.getAttribute('name')) this.setAttribute('name', event.target.name);


            if (this.event.key === 'Enter') {
                this.dispatchEvent(new CustomEvent('form-submit', {
                    bubbles: true,
                    cancelable: true,
                    composed: true
                }))
            }
            else {
                this.setAttribute('value', event.target.value);
            }

        }
    }

    connectedCallback() {
        if (this.shouldComponentRenderCSS()) this.renderCSS()
        if (this.shouldComponentRenderHTML()) this.renderHTML()
        if (this.input) {
          this.input.addEventListener('keyup', this.onChange)
          this.input.addEventListener('change', this.onChange)
        }
    }

    disconnectedCallback() {
        if (this.input) {
            this.input.removeEventListener('keyup', this.onChange)
            this.input.removeEventListener('change', this.onChange)
          }
    }

    shouldComponentRenderCSS() {
        return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
    }

    shouldComponentRenderHTML() {
        return !this.root.querySelector('input') || !this.root.querySelector('label')
    }

    renderCSS() {
        this.css = `
            :host {
                background-color: red;
            }
        `;
    }

    renderHTML() {
        if (this.hasAttribute('reverse')) {
            this.html = [this.input, this.label]
          } else {
            this.html = [this.label, this.input]
          }
    }

    get label() {
        return this._label || this.root.querySelector('label')
    }

    get input() {
        return this._input || this.root.querySelector('input')
    }


}