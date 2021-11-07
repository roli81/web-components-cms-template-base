import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

export default class ScrollButton extends Shadow() {
  
    constructor(...args) {
        super(...args);
        


        this.clickEventListener = event => {
           this.dispatchEvent(new CustomEvent('scroll-to', 
           {
               detail: {
                    button: event.target
               },
               bubbles: true,
               cancelable: false
           }
           ));
        };
    }
  

    connectedCallback() {
        if (this.shouldComponentRenderCSS()) this.renderCSS();
        if (this.shouldComponentRenderHTML()) this.renderHTML();
        this.targetPosition = this.getAttribute('target-position');

        this.root.addEventListener('click', this.clickEventListener);
    }

    disconnectedCallback() {
        this.root.removeEventListener('click', this.clickEventListener);
    }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
   shouldComponentRenderCSS () {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return !this.root.querySelector('button')
  }



    renderCSS() {

        let backgroundUrl = this.getAttribute('src') ? this.getAttribute('src') : '/src/img/arrowDown.svg'; 
        let backgroundUrlHover = this.getAttribute('src-hover') ? this.getAttribute('src-hover') : '/src/img/arrowDown.svg'; 
        
        this.css = `:host button {
            background: transparent  no-repeat center;
            background-image:   url('${backgroundUrl}');
            background-size: cover;
            width: 32px;
            height: 32px;
            border: 0;
            display: block;
            margin: 2em auto;
           
        }
        
        :host button:hover {
            background-image:   url('${backgroundUrlHover}');
        }`;
    }

    renderHTML () {
   
        this.scrollButton = document.createElement('button');
        this.scrollButton.setAttribute('target-id', this.getAttribute('target-id'));
        this.buttonImage = document.createElement('img');
        

        if (this.getAttribute('src-pos')) this.scrollButton.appendChild(this.buttonImage);
        
        this.scrollButton.innerText = this.childNodes[0]?.textContent ?? '';
        this.html = this.scrollButton;

      }

}