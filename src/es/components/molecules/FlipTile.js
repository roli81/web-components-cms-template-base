import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'



export default class FlipTile extends Shadow() {
    constructor(...args){
        super(...args);


    }


    connectedCallback() {
        if (this.shouldComponentRenderCSS()) this.renderCSS();
        if (this.shouldComponentRenderHTML()) this.renderTile();
    }


    disconnectedCallback() {
        console.log('disconnected');
    }


 
    shouldComponentRenderHTML () {
    return !this.root.querySelector('div')
    }

    renderCSS(){
        this.css = `
        /* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
         .flip-card {
          background-color: transparent;
          width: 300px;
          height: 200px;
          border: 1px solid #f1f1f1;
          perspective: 1000px; /* Remove this if you don't want the 3D effect */
        }
        
        /* This container is needed to position the front and back side */
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        
        /* Do an horizontal flip when you move the mouse over the flip box container */
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        
        /* Position the front and back side */
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden; /* Safari */
          backface-visibility: hidden;
        }
        
        /* Style the front side (fallback if image is missing) */
        .flip-card-front {
          background-color: #bbb;
          color: black;
        }
        
        /* Style the back side */
        .flip-card-back {
          background-color: dodgerblue;
          color: white;
          transform: rotateY(180deg);
        }`;
    }


    renderTile(){

        this.flipCard = document.createElement('DIV');
        this.flipCard.className = 'flip-card';
        this.flipCardInner = document.createElement('DIV');
        this.flipCardInner.className = 'flip-card-inner';
        this.flipCardFront = document.createElement('DIV');
        this.flipCardFront.className = 'flip-card-front';
        this.flipCardBack = document.createElement('DIV');
        this.flipCardBack.className = 'flip-card-back';

        this.flipCardInner.appendChild(this.flipCardFront);
        this.flipCardInner.appendChild(this.flipCardBack);

        this.flipCard.appendChild(this.flipCardInner);



        
        this.flipCard = this.root.appendChild(this.flipCard);


        Array.from(this.root.children).forEach(node => {
            if (node === this.flipTile || node.getAttribute('slot') || node.nodeName === 'STYLE') return false;
            this.appendChild(node);
        });
        if (this.getAttribute('card-front-src')) {
            
            this.loadChildComponents().then(children => {
                const Picture = new children[0][1]({ namespace: this.getAttribute('namespace') ? `${this.getAttribute('namespace')}a-picture` : ''});
                Picture.defaultSource = this.getAttribute('card-front-src');
                Picture.alt = '';
                Picture.setAttribute('loading', 'eager');
                this.flipCardFront.appendChild(Picture);
            });
    
        }
        if (this.getAttribute('card-back-src')) {

            this.loadChildComponents().then(children => {
                const Picture = new children[0][1]({ namespace: this.getAttribute('namespace') ? `${this.getAttribute('namespace')}a-picture` : ''});
                Picture.defaultSource = this.getAttribute('card-back-src');
                Picture.alt = '';
                Picture.setAttribute('loading', 'eager');
                this.flipCardBack.appendChild(Picture);
            });
        

        }
    }


    loadChildComponents() {
        if (this.childComponentsPromise) return this.childComponentsPromise;

        let cardFrontPromise; 
        try{
            cardFrontPromise = Promise.resolve({default: Picture});
        } catch(error){
            cardFrontPromise = import('../web-components-cms-template/src/es/components/atoms/Picture.js');
        }

        return (this.childComponentsPromise = Promise.all([
            cardFrontPromise.then(module => ['a-picture', module.default]
            )
        ]).then(elements => {
            elements.forEach(element => {
                if (!customElements.get(element[0])) customElements.define(...element);
            })
            return elements
        }))
        

    }

    shouldComponentRenderCSS(){
        return !this.root.querySelector('style[_css]');
    }


}