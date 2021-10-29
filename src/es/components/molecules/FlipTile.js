import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'



export default class FlipTile extends Shadow() {
    constructor(...args) {
        super(...args);
    }


    connectedCallback() {
        if (this.shouldComponentRenderCSS()) this.renderCSS();
        if (this.shouldComponentRenderHTML()) this.renderTile();
    }

    disconnectedCallback() {
        console.log('disconnected');
    }

    shouldComponentRenderHTML() {
        return !this.root.querySelector('div')
    }

    renderCSS() {
        this.css = `

        @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
            :host {
                height: var(--flip-img-height-mobile, var(--flip-img-height));
                width: var(--flip-img-width-mobile, var(--flip-img-width));
                max-height: var(--flip-img-max-height-mobile, var(--flip-img-max-height));
                max-width: var(--flip-img-max-width-mobile, var(--flip-img-max-width));
                --flip-img-width: 70vw;
                --flip-img-height: 70vw;
            }

            .flip-card {
                height: var(--flip-img-height-mobile, var(--flip-img-height));
                width: var(--flip-img-width-mobile, var(--flip-img-width));
                max-height: var(--flip-img-max-height-mobile, var(--flip-img-max-height));
                max-width: var(--flip-img-max-width-mobile, var(--flip-img-max-width));
              }

              .flip-card-back {
                height: var(--flip-img-height-mobile, var(--flip-img-height));
                width: var(--flip-img-width-mobile, var(--flip-img-width));
                max-height: var(--flip-img-max-height-mobile, var(--flip-img-max-height));
                max-width: var(--flip-img-max-width-mobile, var(--flip-img-max-width));
      
              
              }

              
        }

        :host {
            height: var(--flip-img-height);
            width: var(--flip-img-width);
            max-height: var(--flip-img-max-height);
            max-width: var(--flip-img-max-width);
        }

        :host  {
            padding: 1em;
        }

        :host * {
            margin: 0;
        }

        :host h4 {
   
        }

        :host p {
            margin: 0.5em 0;
            font-weight: normal;
      
        }

        /* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
         .flip-card {
          background-color: transparent;
          perspective: 1000px; /* Remove this if you don't want the 3D effect */

          height: auto;
          width: auto;
          height: var(--flip-img-height);
          width: var(--flip-img-width);
          max-height: var(--flip-img-max-height);
          max-width: var(--flip-img-max-width);
        

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
        .flip-card-inner a-picture picture img {
            object-fit: contain;
    
        }
        
        .flip-card-inner a, .flip-card-inner a:link, .flip-card-inner a:active, .flip-card-inner a:visited {
            color: var(--color);
        } 

        .flip-card-inner a:hover {
            color: #ffffff;
            text-decoration: none;
        }
        /* Do an horizontal flip when you move the mouse over the flip box container */
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        
        /* Position the front and back side */
        .flip-card-front, .flip-card-back {
          position: absolute;
          -webkit-backface-visibility: hidden; /* Safari */
          backface-visibility: hidden;
        }
        
        /* Style the front side (fallback if image is missing) */
        .flip-card-front {

          
          color: black;
        }

        .flip-card-front  > picture > img {
            object-fit: contain;
        
        }
        
        /* Style the back side */
        .flip-card-back {
          background-color: var(--flip-tile-background-color);
          color: var(--color);
          transform: rotateY(180deg);
          height: 100%;
          display: flex;
          justify-content: center;
          flex-direction: column;
          height: var(--flip-img-height);
          width: var(--flip-img-width);
          max-height: var(--flip-img-max-height);
          max-width: var(--flip-img-max-width);

        
        }`;
    }


    renderTile() {

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

        
        if (this.getAttribute('card-front-src')) {

            this.loadChildComponents().then(children => {
                const div = document.createElement('div');
                div.innerHTML = /* HTML */`<${children[0][0]} defaultSource="${this.getAttribute('card-front-src')}" namespace="flip-" alt="${this.getAttribute('card-front-alt')}"></${children[0][0]}>`;
                this.flipCardFront.appendChild(div.children[0]);
            });

        }
        if (this.getAttribute('card-back-src')) {

            this.loadChildComponents().then(children => {

                const div = document.createElement('div');
                div.innerHTML = /* HTML */`<${children[0][0]} defaultSource="${this.getAttribute('card-back-src')}" namespace="flip-" alt="${this.getAttribute('card-back-alt')}"></${children[0][0]}>`;
                this.flipCardBack.appendChild(div.children[0]);
            });
        }
        else {
            Array.from(this.root.children).forEach(c => {
                if (c !== this.flipCardBack) {
                    this.flipCardBack.appendChild(c);
                }
                
            });
        }

        this.html = this.flipCard;

    }


    loadChildComponents() {
        if (this.childComponentsPromise) return this.childComponentsPromise;

        let cardFrontPromise;
        try {
            cardFrontPromise = Promise.resolve({ default: Picture });
        } catch (error) {
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

    shouldComponentRenderCSS() {
        return !this.root.querySelector('style[_css]');
    }


}