import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js';

export default class Basket extends Shadow() {





    constructor(...args) {
        super(...args);
   
        
        
        
        this.setOrderListener = event => {

            let product = window.basket.find(p => p.id === event.detail.productId);

            if (!product){
                window.basket.push({id: event.detail.productId, count: 1});
            } else {
                product.count++;
            }
               
            localStorage.setItem('basket', JSON.stringify(window.basket));
        }
    }


    connectedCallback() {


        this.addEventListener('addToBasket', this.setOrderListener);

    }



    disconnectedCallback() {
        this.removeEventListener('addToBasket', this.setOrderListener);
    }

}