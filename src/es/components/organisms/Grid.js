import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js';



export default class Grid extends Shadow() {


    constructor(...args) {
        super(...args);

    }


    connectedCallback() {
       this.elements = Array.from(this.root.children);
       this.renderCSS();
       if (this.shouldComponentRenderHTML()) this.renderHTML();
    }

    disconnectedCallback() {

    }


    renderHTML() {

        this.rows = [];
    
        this.gridContainer = document.createElement('div');
        this.gridContainer.className = 'grid-container';

       
        for (let i = 0; i < this.elements.length; i++) {
            this.gridContainer.appendChild(this.elements[i]);
        }
        

        this.html = this.gridContainer;
        

    }


    renderCSS() {

       
        let cols = this.getAttribute('col');
        let colsMobile = this.getAttribute('col-mobile');
        let percents = 100 / cols;
        let percentsMobile = 100 / colsMobile;
        let columnTemplate = '';
        let columnTemplateMobile = '';

        for (let i = 0; i < cols; i++){
            columnTemplate += `${percents}% `;
        }

        for (let i = 0; i < colsMobile; i++){
            columnTemplateMobile += `${percentsMobile}% `;
        }
        this.css = `
        :host, host * {
            background-color: transparent;
        }

        div.grid-container div {
            background: rgba(0,0,0,0.3);
            margin: 1em;
            padding: 1em;
            display: flex;
            flex-direction: column;
            align-items: center;
        }



        div.grid-container h5 {

            font-size: 1.2em;
            text-transform: uppercase;
        }
        div.grid-container article {
            margin: 1em 0;
        }

        div.grid-container a  {
            text-decoration: none;
            color: var(--color);
            margin: 1em 0;
        }


        div.grid-container a:hover  {
            text-decoration: none;
            color: var(--color-hover);
        
        }


            div.grid-container {
                display: grid;
                grid-template-columns: ${columnTemplate};
                grid-template-rows:auto;
     
               
            }

            @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}){

                div.grid-container {
                    grid-template-columns: ${columnTemplateMobile};
                    grid-template-rows: auto;
                    
                    
                }

            }
        `; 

    }

    shouldComponentRenderHTML() {

        return !this.root.querySelector('div.grid-container');
    }

    shouldComponentRenderCSS() {
        return !this.root.querySelector('style[_css]');
    }

}