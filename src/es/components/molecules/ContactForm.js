import Form from '../web-components-cms-template/src/es/components/molecules/Form.js';



export default class ContactForm extends Form {



    constructor(...args) {
      super(...args);
      this.textAreas = [];
    }


    connectedCallback(){
        super.connectedCallback();
        
        
    }


    submitByHTML(formData, method, action){
      const form = document.createElement('form')
      form.setAttribute('method', method)
      form.setAttribute('action', action);
      [...formData].forEach(([key, val]) => {
        if (key !== 'ufprt') {

          console.log(`key ${key} value ${val}`)
          const input = document.createElement('input')
          input.setAttribute('name', key)
          input.setAttribute('value', val)
          form.appendChild(input)
        } else {
          const input = this.form.querySelector('input[name="ufprt"]').cloneNode()
          form.appendChild(input)
        }
      })
      const button = document.createElement('button')
      button.setAttribute('type', 'submit')
      form.appendChild(button)
      document.body.appendChild(form)
      form.hidden = true
      button.click()
    }

    renderCSS () {
        // super.renderCSS();

        this.css = `
        :host {
            display: var(--display, block);
            width: var(--width, auto) !important;
          }
          :host form {
            display: var(--form-display, flex);
            margin: var(--form-margin, 0 0 50px 0);
            flex-direction: var(--form-flex-direction, column);
            align-items: var(--form-align-items, center);
          }

          :host form a-button {
            background-color: var(--background-color);
            padding: 2em;
          }

       
          :host form a-text-area, :host form a-input {
              width: var(--width, unset);
              padding: 0.5em;
              font-family: var(--font-family);
              margin-bottom: 2em;
          }
          ::placeholder {
            color: var(--placeholder-color, grey);
            opacity: var(--placeholder-opacity, 0.6);
          }

          :host form #oceans {
            display: none;
          }

          @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
            :host {
              display: var(--display-mobile, var(--display, block));
              width: var(--width-mobile, var(--width, auto)) !important;
            }
            :host form {
              display: var(--form-display-mobile, var(--form-display, flex));
              flex-direction: var(--form-flex-direction-mobile, var(--form-flex-direction, column));
              align-items: var(--form-align-items-mobile, var(--form-align-items, center));
            }
          }

          /* https://kazzkiq.github.io/balloon.css/ */
          /* https://raw.githubusercontent.com/kazzkiq/balloon.css/master/balloon.css */
          :root {
            --balloon-border-radius: 2px;
            --balloon-color: rgba(16, 16, 16, 0.95);
            --balloon-text-color: #fff;
            --balloon-font-size: 12px;
            --balloon-move: 4px; }
          
          button[aria-label][data-balloon-pos] {
            overflow: visible; }
          
          [aria-label][data-balloon-pos] {
            position: relative;
            cursor: pointer; }
            [aria-label][data-balloon-pos]:after {
              /* custom */
              max-width: 100vw;
              /* /custom */
              opacity: 0;
              pointer-events: none;
              transition: all 0.18s ease-out 0.18s;
              text-indent: 0;
              font-family: var(--font-family);
              font-weight: normal;
              font-style: normal;
              text-shadow: none;
              font-size: var(--balloon-font-size);
              background: var(--balloon-color);
              border-radius: 2px;
              color: var(--balloon-text-color);
              border-radius: var(--balloon-border-radius);
              content: attr(aria-label);
              padding: .5em 1em;
              position: absolute;
              white-space: nowrap;
              z-index: 10; }
            [aria-label][data-balloon-pos]:before {
              width: 0;
              height: 0;
              border: 5px solid transparent;
              border-top-color: var(--balloon-color);
              opacity: 0;
              pointer-events: none;
              transition: all 0.18s ease-out 0.18s;
              content: "";
              position: absolute;
              z-index: 10; }
            [aria-label][data-balloon-pos]:hover:before, [aria-label][data-balloon-pos]:hover:after, [aria-label][data-balloon-pos][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-visible]:after, [aria-label][data-balloon-pos]:not([data-balloon-nofocus]):focus:before, [aria-label][data-balloon-pos]:not([data-balloon-nofocus]):focus:after {
              /* custom */
              opacity: var(--balloon-opacity, 0.8);
              pointer-events: none; }
            [aria-label][data-balloon-pos].font-awesome:after {
              font-family: FontAwesome, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; }
            [aria-label][data-balloon-pos][data-balloon-break]:after {
              white-space: pre; }
            [aria-label][data-balloon-pos][data-balloon-break][data-balloon-length]:after {
              white-space: pre-line;
              word-break: break-word; }
            [aria-label][data-balloon-pos][data-balloon-blunt]:before, [aria-label][data-balloon-pos][data-balloon-blunt]:after {
              transition: none; }
            [aria-label][data-balloon-pos][data-balloon-pos="up"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="up"][data-balloon-visible]:after, [aria-label][data-balloon-pos][data-balloon-pos="down"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="down"][data-balloon-visible]:after {
              transform: translate(-50%, 0); }
            [aria-label][data-balloon-pos][data-balloon-pos="up"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="up"][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-pos="down"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="down"][data-balloon-visible]:before {
              transform: translate(-50%, 0); }
            [aria-label][data-balloon-pos][data-balloon-pos*="-left"]:after {
              left: 0; }
            [aria-label][data-balloon-pos][data-balloon-pos*="-left"]:before {
              left: 5px; }
            [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:after {
              right: 0; }
            [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:before {
              right: 5px; }
            [aria-label][data-balloon-pos][data-balloon-pos*="-left"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos*="-left"][data-balloon-visible]:after, [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos*="-right"][data-balloon-visible]:after {
              transform: translate(0, 0); }
            [aria-label][data-balloon-pos][data-balloon-pos*="-left"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos*="-left"][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos*="-right"][data-balloon-visible]:before {
              transform: translate(0, 0); }
            [aria-label][data-balloon-pos][data-balloon-pos^="up"]:before, [aria-label][data-balloon-pos][data-balloon-pos^="up"]:after {
              /* custom */
              bottom: var(--balloon-bottom, 0%);
              transform-origin: top;
              transform: translate(0, var(--balloon-move)); }
            [aria-label][data-balloon-pos][data-balloon-pos^="up"]:after {
              margin-bottom: 10px; }
            [aria-label][data-balloon-pos][data-balloon-pos="up"]:before, [aria-label][data-balloon-pos][data-balloon-pos="up"]:after {
              left: 50%;
              transform: translate(-50%, var(--balloon-move)); }
            [aria-label][data-balloon-pos][data-balloon-pos^="down"]:before, [aria-label][data-balloon-pos][data-balloon-pos^="down"]:after {
              top: var(--balloon-top, 0%);
              transform: translate(0, calc(var(--balloon-move) * -1)); }
            [aria-label][data-balloon-pos][data-balloon-pos^="down"]:after {
              margin-top: 10px; }
            [aria-label][data-balloon-pos][data-balloon-pos^="down"]:before {
              width: 0;
              height: 0;
              border: 5px solid transparent;
              border-bottom-color: var(--balloon-color); }
            [aria-label][data-balloon-pos][data-balloon-pos="down"]:after, [aria-label][data-balloon-pos][data-balloon-pos="down"]:before {
              left: 50%;
              transform: translate(-50%, calc(var(--balloon-move) * -1)); }
            [aria-label][data-balloon-pos][data-balloon-pos="left"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="left"][data-balloon-visible]:after, [aria-label][data-balloon-pos][data-balloon-pos="right"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="right"][data-balloon-visible]:after {
              transform: translate(0, -50%); }
            [aria-label][data-balloon-pos][data-balloon-pos="left"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="left"][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-pos="right"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="right"][data-balloon-visible]:before {
              transform: translate(0, -50%); }
            [aria-label][data-balloon-pos][data-balloon-pos="left"]:after, [aria-label][data-balloon-pos][data-balloon-pos="left"]:before {
              right: 100%;
              top: 50%;
              transform: translate(var(--balloon-move), -50%); }
            [aria-label][data-balloon-pos][data-balloon-pos="left"]:after {
              margin-right: 10px; }
            [aria-label][data-balloon-pos][data-balloon-pos="left"]:before {
              width: 0;
              height: 0;
              border: 5px solid transparent;
              border-left-color: var(--balloon-color); }
            [aria-label][data-balloon-pos][data-balloon-pos="right"]:after, [aria-label][data-balloon-pos][data-balloon-pos="right"]:before {
              left: 100%;
              top: 50%;
              transform: translate(calc(var(--balloon-move) * -1), -50%); }
            [aria-label][data-balloon-pos][data-balloon-pos="right"]:after {
              margin-left: 10px; }
            [aria-label][data-balloon-pos][data-balloon-pos="right"]:before {
              width: 0;
              height: 0;
              border: 5px solid transparent;
              border-right-color: var(--balloon-color); }
            [aria-label][data-balloon-pos][data-balloon-length]:after {
              white-space: normal; }
            [aria-label][data-balloon-pos][data-balloon-length="small"]:after {
              width: 80px; }
            [aria-label][data-balloon-pos][data-balloon-length="medium"]:after {
              width: 150px; }
            [aria-label][data-balloon-pos][data-balloon-length="large"]:after {
              width: 260px; }
            [aria-label][data-balloon-pos][data-balloon-length="xlarge"]:after {
              width: 380px; }
              @media screen and (max-width: 768px) {
                [aria-label][data-balloon-pos][data-balloon-length="xlarge"]:after {
                  width: 90vw; } }
            [aria-label][data-balloon-pos][data-balloon-length="fit"]:after {
              width: 100%; }

        `

        console.log("render css from contactForm");
    }




    renderHTML () {
        this.hasRendered = true
        this.loadChildComponents().then(children => {
          this.inputAll
          .filter(i => i.getAttribute('type') !== 'hidden').forEach(input => {
            this.inputFields.push(input)
            const label = this.root.querySelector(`label[for='${input.getAttribute('id')}']`) || this.root.querySelector(`label[for='${input.getAttribute('name')}']`)
            const description = this.getDescription(input)
            const aInput = new children[0][1](input, label, description, { mode: 'false', namespace: this.getAttribute('namespace-children') || this.getAttribute('namespace') || '', namespaceFallback: this.hasAttribute('namespace-fallback-children') || this.hasAttribute('namespace-fallback') })
            aInput.setAttribute('type', input.getAttribute('type'))
            if (input.hasAttribute('reverse')) aInput.setAttribute('reverse', input.getAttribute('reverse'))
            input.replaceWith(aInput)
            if (input.hasAttribute('validation-message')) {
              const changeListener = event => {
                if (input.hasAttribute('valid') ? input.getAttribute('valid') === 'true' : input.validity.valid) {
                  label.removeAttribute('data-balloon-visible')
                  label.removeAttribute('aria-label')
                  label.removeAttribute('data-balloon-pos')
                } else {
                  label.setAttribute('data-balloon-visible', 'true')
                  label.setAttribute('aria-label', input.getAttribute('validation-message'))
                  label.setAttribute('data-balloon-pos', input.hasAttribute('reverse') ? 'down' : 'up')
                }
              }
              this.validateFunctions.push(changeListener)
              input.changeListener = changeListener
              input.addEventListener('blur', changeListener)
              input.addEventListener('blur', event => {
                input.addEventListener('change', changeListener)
                input.addEventListener('keyup', changeListener)
              }, { once: true })
            }
          })
          // spam protection
          // if (this.getAttribute('type') === 'newsletter') {
          //   this.emptyInput = document.createElement('input')
          //   this.emptyInput.type = 'text'
          //   this.emptyInput.id = 'oceans'
          //   this.form.appendChild(this.emptyInput)
          // }
          Array.from(this.root.querySelectorAll('textarea')).forEach(textarea => {
            this.textAreas.push(textarea)
            const label = this.root.querySelector(`label[for='${textarea.getAttribute('id')}']`)
            const aTextArea = new children[2][1](textarea, label, { mode: 'false', namespace: this.getAttribute('namespace-children') || this.getAttribute('namespace') || '' })
     
            if (textarea.hasAttribute('reverse')) aTextArea.setAttribute('reverse', textarea.getAttribute('reverse'))
            textarea.replaceWith(aTextArea)
            if (textarea.hasAttribute('validation-message')) {
              const changeListener = event => {
                if (textarea.hasAttribute('valid') ? textarea.getAttribute('valid') === 'true' : textarea.validity.valid) {
                  label.removeAttribute('data-balloon-visible')
                  label.removeAttribute('aria-label')
                  label.removeAttribute('data-balloon-pos')
                } else {
                  label.setAttribute('data-balloon-visible', 'true')
                  label.setAttribute('aria-label', textarea.getAttribute('validation-message'))
                  label.setAttribute('data-balloon-pos', textarea.hasAttribute('reverse') ? 'down' : 'up')
                }
              }
              this.validateFunctions.push(changeListener)
              textarea.changeListener = changeListener
              textarea.addEventListener('blur', changeListener)
              textarea.addEventListener('blur', event => {
                textarea.addEventListener('change', changeListener)
                textarea.addEventListener('keyup', changeListener)
              }, { once: true })
            }
          });

          Array.from(this.root.querySelectorAll('button')).forEach(button => {
            const aButton = new children[1][1](button, { namespace: this.getAttribute('namespace-children') || this.getAttribute('namespace') || '' })
            button.replaceWith(aButton)
          })
        })
      }


    loadChildComponents(){
        if (this.childComponentsPromise) return this.childComponentsPromise
        let inputPromise
        try {
          inputPromise = Promise.resolve({ default: Input })
        } catch (error) {
          inputPromise = import('../web-components-cms-template/src/es/components/atoms/Input.js')
        }
        let buttonPromise
        try {
          buttonPromise = Promise.resolve({ default: Button })
        } catch (error) {
          buttonPromise = import('../web-components-cms-template/src/es/components/atoms/Button.js')
        }
        let textareaPromise
        try {
            textareaPromise = Promise.resolve({ default: TextArea })
          } catch (error) {
            textareaPromise = import('../atoms/TextArea.js')
          }
        return (this.childComponentsPromise = Promise.all([
          inputPromise.then(
            /** @returns {[string, CustomElementConstructor]} */
            module => ['a-input', module.default]
          ),
          buttonPromise.then(
            /** @returns {[string, CustomElementConstructor]} */
            module => ['a-button', module.default]
          ), 
          textareaPromise.then(
            /** @returns {[string, CustomElementConstructor]} */
            module => ['a-text-area', module.default]
          ),
        ]).then(elements => {
          elements.forEach(element => {
            // don't define already existing customElements
            // @ts-ignore
            if (!customElements.get(element[0])) customElements.define(...element)
          })
          return elements
        }))
        
    }


  getAllInputValues (form) {
    if (form) {
      const formData = new FormData();
      [...this.root.querySelectorAll(`input${this.getAttribute('type') !== 'newsletter' ? ', a-input' : ''}`)].forEach(i => {
        if ((this.getAttribute('type') !== 'newsletter' || i.id !== 'Policy') &&
            (i.getAttribute('type') !== 'radio' || i.checked) &&
            (i.getAttribute('type') !== 'checkbox' || i.checked)) formData.append(i.getAttribute('name'), i.value || i.getAttribute('value'))
      });
      [...this.root.querySelectorAll(`textarea${this.getAttribute('type') !== 'newsletter' ? ', a-text-area' : ''}`)].forEach(i => {
        formData.append(i.getAttribute('name'), i.value || i.getAttribute('value'))
      });
      [...this.root.querySelectorAll(`select${this.getAttribute('type') !== 'newsletter' ? ', a-select' : ''}`)].forEach(i =>
        formData.append(i.getAttribute('name'), i.options[i.selectedIndex].text)
      )
      return formData
    }
    return new FormData()
  }

}

