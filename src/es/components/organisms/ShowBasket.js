import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js';


export default class ShowBasket extends Shadow () {


    constructor(...args) {
        super(...args);
        this.isOpen = false;
    }



    getBasketItems() {
        this.basketItems = window.basket ?? []; 
        return this.basketItems;
    }

    setSetbasketItems(basketItems) {
        this.basketItems = basketItems;
        window.basket = basketItems;
    }





    static get observedAttributes() {
        return ['basketItems'];
      }
    
      attributeChangedCallback(attrName, oldVal, newVal) {
          debugger;
        if (oldVal !== newVal) {
          if (newVal === null) {
            // Attribute was removed
            this.basketItems = null;
            this.renderHTML();
          }
          else {
            this.basketItems = JSON.parse(newVal);
            this.renderHTML();
          }
        }
      }  



   

    connectedCallback () {


        debugger;

        if (this.shouldComponentRenderCSS()) this.renderCSS();
        if (this.shouldComponentRenderHTML()) this.renderHTML();
    }

    disconnectedCallback () {

    }

    renderCSS() {
        this.css = `
            @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css");

            :host {
                position: fixed;
                top: 10vh;
                right: 0;
                width: auto !important;
                background-color: rgba(0,0,0,0.7);
                color: white;
                padding: 1em;
            }

            :host div.basket-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }



            :host div i {
                font-size: 2em;
                cursor: pointer;
            }

            :host div.basket-item-container {

                display: flex;
                flex-direction: column;
            }

            :host div.basket-item-container > div {
                margin: 0.5em 0;
            }
            
            :host div.basket-item-container > div  i {
                font-size: 1em;
            }

            :host div.basket-total {
                font-size: 1.2em;
                display: flex;
                justify-content: space-between;
            }
        `;
    }

    async fetchBasket(data) {

        
        const response = await fetch('/Umbraco/Api/Basket/GetBasket',{
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(data)
        });

    
        return response.json();
    }


    
    shouldComponentRenderHTML() {

        return !this.root.querySelector('div');
    }

    shouldComponentRenderCSS() {
        return !this.root.querySelector('style[_css]');
    }

    openBasket(event){
        this.isOpen = true;    
        this.renderHTML();
        // this.html = ``;
    }

    closeBasket(event) {
        this.isOpen = false;
        debugger;
        this.html = '';
        this.renderHTML();
    }

    renderHTML () {

        debugger;
        if (this.isOpen) {
            this.html = '';
            this.fetchBasket(this.getBasketItems()).then(data => {
                debugger;
                this.basket = document.createElement('div');
                this.basketHeader = document.createElement('div');
                this.basketHeader.className = 'basket-header';
                this.basketTitle = document.createElement('h4');
                this.basketTitle.innerText = 'Dein Warenkorb';
                this.basketHeader.appendChild(this.basketTitle);
                this.basketCloseButton = document.createElement('i');
                this.basketCloseButton.className = 'bi bi-x';
                this.basketCloseButton.addEventListener('click', event => this.closeBasket(event));
                this.basketHeader.appendChild(this.basketCloseButton);
                this.basket.appendChild(this.basketHeader);
                this.basketContent = document.createElement('div'); 
                this.basketContent.innerHTML = `
                <div class="basket-item-container">
                ${data.products?.map(d => `<div>
                <span class="basket-item item-count">${d.count}</span> x <span class="basket-item item-name">${d.name}</span> 
                <div class="basket-item item-price">à ${d.price} SFr. / Stk. <i class="bi bi-plus-circle-fill"></i> / <i class="bi bi-dash-circle-fill"></i><base-o-order-button product-id="${d.id}"></base-o-order-button></div>
                </div>`).join('')}</div>
                <hr />
                <div class="basket-total"><span>Total:</span> <span>${data.totalPrice} SFr.</span></div>`;
                this.basket.appendChild(this.basketContent);
                this.html = this.basket;
            });
        } else {

            this.basket = document.createElement('div');
            this.basketIcon = document.createElement('i');
            this.basketIcon.className = 'bi bi-cart4';
            this.basketIcon.addEventListener('click', event => this.openBasket(event));
            this.basket.appendChild(this.basketIcon);
            this.html = this.basket;
        }



    }

}