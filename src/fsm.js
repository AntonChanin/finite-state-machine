class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        var active = 'normal';
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return active;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        switch (state) {
            case 'busy': active = 'busy';
            case 'sleeping': active ='sleeping';
            case 'normal': active = 'normal';
            case 'hungry': active = 'hungry';
            default: reset();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if ( active == 'sleeping' ) {
            switch (event) {
                case 'get_hungry': this.changeState('hungry');
                case 'get_up': this.changeState('normal');
                default: this.reset();
            }
        }
        if (active == 'busy') {
            switch (event) {
                case 'get_hungry': this.changeState('hungry');
                case 'get_tired': this.changeState('sleeping');
                default: this.reset();
            }
        }
        if ( active == 'normal' ) {
            switch (event) {
                case 'study': this.changeState('busy');
                default: this.reset();
            }
        }
        if ( active == 'busy') {
            switch (event) {
                case 'get_hungry': this.changeState('hungry');
                default: this.reset();
            }
        }
        if ( active == 'hungry') {
            switch (event) {
                case 'eat': this.changeState('normal');   
                default: this.reset();
            }
        }    
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        active = FSM.config[initial];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
