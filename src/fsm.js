var active = 'normal';
var thisConfig = undefined;
var enveroupmentThis = undefined;
class FSM { 
    /**
     * Creates new FSM instance.
     * @param config
     */
    
    constructor(config) {
        //var active = 'normal';throw(Error)
        thisConfig = config;
        enveroupmentThis = this.changeState;
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
        let changeState = true;
        let eventSuccess = false;
        if (active == 'hungry' && changeState != false) {
            switch (event) {
                case 'eat': this.changeState('normal');
                    break;
                case 'study': this.changeState('normal');
                    this.changeState('busy');
                    break;
                case 'get_tired': this.changeState('normal');
                    this.changeState('busy');
                    this.changeState('sleeping');
                    break;
                default: this.reset();
            }
            changeState = false;
        }   
        if (active == 'normal' && changeState != false) {
            switch (event) {
                case 'study': this.changeState('busy');
                    break;
                case 'get_tired': this.changeState('busy');
                    this.changeState('sleeping');
                    break;
                case 'get_hungry': this.changeState('busy');
                    this.changeState('hungry');
                    break;
                default: this.reset();
            }
            changeState = false;
        }
        if (active == 'sleeping' && changeState != false) {
            switch (event) {
                case 'get_hungry': this.changeState('hungry');
                    break;
                case 'get_up': this.changeState('normal');
                    break;
                case 'study': this.changeState('normal');
                    this.changeState('busy');
                    break;
                default: this.reset(); 
            } 
            changeState = false;
        }
        if (active == 'busy' && changeState != false) {
            switch (event) {
                case 'get_hungry': this.changeState('hungry');
                    break;
                case 'get_tired': this.changeState('sleeping');
                    break;
                default: this.reset();
            }
            changeState = false;
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
