class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(!config) throw new Error();
        this.config = config;
        this.currentState = config.initial;
        this.previousState = null;
        this.nextState = null;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        let allStates = [];
        for (let state in this.config.states) {
            allStates.push(state);
        }
        if (allStates.indexOf(state) != -1) {
            this.previousState = this.currentState;
            this.currentState = state;
        } else {
            throw new Error();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.config.states[this.currentState].transitions[event] === undefined) {
            throw new Error();
        } else {
            this.previousState = this.currentState;
            this.currentState = this.config.states[this.currentState].transitions[event];
            this.nextState = null;
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState = this.config.initial;
        this.nextState = null;
        this.previousState = null;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let allStates = [];
        if (event === undefined) {
            for (let state in this.config.states) {
                allStates.push(state);
            }
        } else {
            for (let state in this.config.states) {
                if (this.config.states[state].transitions[event]) {
                    allStates.push(state);
                }
            }
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.currentState == 'normal') {
            return false;
        }
        if (this.previousState) {
            this.nextState = this.currentState;
            this.currentState = this.previousState;
            this.previousState = null;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.nextState == null) {
            return false;
        } else {
            this.previousState = this.currentState;
            this.currentState = this.nextState;
            this.nextState = null;
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.previousState = null;
        this.nextState = null;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
