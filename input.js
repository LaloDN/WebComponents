class Input extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this._input;
        this._template;
        this._createInput();
    }

    /**Gets a input template and appends it to the shadow root */
    _createInput() {
        this._template = document.querySelector('template').content.cloneNode(true);
        this.shadowRoot.appendChild(this._template);
    }

    /**Check if the input of one box is mandatory  */
    _isInputRequired(){
        //The atribute 'is-required' isn't defined in the class code, its given by the user when he creates
        //the tag, i.e. <my-node is-required></my-node> the 'is-required' is an attribute
        if(this.hasAttribute('is-required')){
            this._input.setAttribute('required',''); //Sets the atribute required to the main input box
        }
    }

    /**
     * Checks if the value inside the input is empty after one touch, and if it's required colors the input border red
     */
    _onFocusOut(){
        if(this.hasAttribute('is-required')){
            if(this._input.value !== ''){
                this._input.style.border = '1px solid black';
            }else{
                this._input.style.border = '1px solid red';
            }
        }
    }

    connectedCallback() {
        this._input = this.shadowRoot.querySelector('input'); //Get the input box from the shadow root to manipulate its attributes and functionality
        this._isInputRequired();
        this._input.addEventListener('focusout', this._onFocusOut.bind(this));
    }

}

//This function receives two arguments: the name of the element and the element that which inherits from
customElements.define('cus-input',Input)