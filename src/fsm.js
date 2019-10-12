
var historyChange = false;
class FSM { 
    /**
     * Creates new FSM instance.
     * @param config
     */
    
    constructor(config) {
        //var active = 'normal';throw(Error)
        this.thisConfig = config;
        this.active = 'normal';
        this.history = ['normal'];
        this.i = 0;
        
        if (this.thisConfig == undefined) {
            throw new Error;
        }
    } 
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.active;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        let history = this.history;
        this.i = history.length;
        switch (state) {
            case 'busy': this.active = 'busy';
                history.push('busy');
                break;
            case 'sleeping': this.active = 'sleeping';
                history.push('sleeping');
                break;
            case 'normal': this.active = 'normal';
                history.push('normal');
                break;
            case 'hungry': this.active = 'hungry';
                history.push('hungry');
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
        let history = this.history;
        let active = this.active;
        historyChange = false;
        if (event != 'hmmm... exception?') {
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
        } else {
            changeState = false;
            eventSuccess = true;
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.active = 'normal';
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
            default: ['normal'];
        }
        return (event != undefined) ? output : ['normal', 'busy', 'hungry', 'sleeping'];
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {   
        this.i -= 1;
        let i = this.i;
        if (this.history[i] != undefined) {
            this.active = this.history[i];
        } else {
            this.active = this.history[i];
        }
        return (this.history[i] == undefined) ? false : true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        this.i += 1;
        let i = this.i;
         let output = undefined;
         if (output == undefined) {
             output = false;
         }
         this.active = this.history[i];
         return (this.history[i] == undefined) ? false : true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
