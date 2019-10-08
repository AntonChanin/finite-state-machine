var active = 'normal';
var thisConfig = undefined;
class FSM { 
    /**
     * Creates new FSM instance.
     * @param config
     */
    
        constructor(config) {
            //var active = 'normal';throw(Error)
            thisConfig = config;
            if (thisConfig == undefined) {
                throw new Error;
            }
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
                break;
            case 'sleeping': active = 'sleeping';
                break;
            case 'normal': active = 'normal';
                break;
            case 'hungry': active = 'hungry';
                break;
            default: reset();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
                 
    trigger(event) {
        let enveroupmentThis = this;
        if ( active == 'sleeping' ) {
            switch (event) {
                case 'get_hungry': enveroupmentThis.changeState('hungry');
                    break;
                case 'get_up': enveroupmentThis.changeState('normal');
                    break;
                default: enveroupmentThis.reset();
            }
        }
        if (active == 'busy') {
            switch (event) {
                case 'get_hungry':  enveroupmentThis.changeState('hungry');
                    break;
                case 'get_tired': enveroupmentThis.changeState('sleeping');
                    break;
                default: enveroupmentThis.reset();
            }
        }
        if ( active == 'normal' ) {
            switch (event) {
                case 'study': enveroupmentThis.changeState('busy');
                    break;
                default: enveroupmentThis.reset();
            }
        }
        if ( active == 'busy') {
            switch (event) { 
                case 'get_hungry': changeState('hungry');
                    break;
                default: enveroupmentThis.reset();
            }
        }
        if ( active == 'hungry') {
            switch (event) {
                case 'eat': enveroupmentThis.changeState('normal');
                    break;
                default: enveroupmentThis.reset();
            }
        }    
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        active = 'normal';
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let output = [];
        switch (event) {
            case 'get_hungry': output = ['busy','sleeping'];
                break;
            case 'eat': output = ['normal'];
                break;
            case 'study': output = ['normal'];
                break;
            case 'get_tired': output = ['busy'];
                break;
            default:  [];
        }
        return (event != undefined) ? output : ['normal', 'busy', 'hungry', 'sleeping'];
    }

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
