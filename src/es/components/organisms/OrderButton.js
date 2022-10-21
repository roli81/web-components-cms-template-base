import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js';

export default class OrderButton extends Shadow() {

    constructor(...args) {
        super(...args);

        this.order = product => {

        };
    }

    connectedCallback() {
        if (this.shouldComponentRenderCSS()) this.renderCSS();
        if (this.shouldComponentRenderHTML()) this.renderHTML();
    }



    disconnectedCallback() {

    }

    shouldComponentRenderHTML() {
        return !this.root.querySelector('div');
    }

    shouldComponentRenderCSS() {
        return !this.root.querySelector('style[_css]');
    }

    renderCSS() {
        this.css = `
            @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css");

            :host div.order-button {
                padding: 0.5em;
                color: white;
                background-color: rgba(0,0,0,0.7);
                margin: 1em;
                cursor: pointer;
            }

            :host div.order-button:hover {
                color: black;
                background-color: rgba(255,255,255,0.7);
                
                
            
            }

            :host div.order-button  * { margin: 0 0.25em;}
        
        `;
       

    }


    fireEvent(event) {

        debugger;

        let productId = event.target.getAttribute('data-id') ?? event.target.parentNode.getAttribute('data-id');
        const customEvent = new CustomEvent('addToBasket',
            {



                detail: {
                    productId: productId,           
                },
                bubbles: true,
                cancelable: false,
                composed: true
               
            });

        
        this.dispatchEvent(customEvent);

    }

    renderHTML() {

        this.container = document.createElement('DIV');
        this.button = document.createElement('div');
        this.button.className = 'order-button';
        this.buttonIcon = document.createElement('i');
        this.buttonIcon.className = 'bi bi-bag-fill';
        this.buttonText = document.createElement('span');
        this.buttonText.innerText = 'In den Warenkorb';
        this.button.appendChild(this.buttonIcon);
        this.button.appendChild(this.buttonText);

        this.button.setAttribute('data-id', this.getAttribute('product-id'));
     
        
        this.button.addEventListener('click', event => this.fireEvent(event));
    
        this.container.appendChild(this.button);
        this.html = this.container;
    }

}