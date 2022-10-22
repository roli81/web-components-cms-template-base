import Form from '../web-components-toolbox/src/es/components/molecules/form/Form.js';



export default class ContactForm extends Form {



    constructor(...args) {
        super(...args);
  
    }


    connectedCallback() {
        super.connectedCallback();
        if (this.submit) this.submit.removeEventListener('click', this.clickListener)
        this.submit.addEventListener('submit-form', () => {
            this.form.submit();
        })
    }


    disconnectedCallback() {
        this.removeEventListener('submit-form');
        super.disconnectedCallback();
    }

    get submit() {
        return this;
    }


    get form() {
        return this.root.querySelector('form')
    }

}

