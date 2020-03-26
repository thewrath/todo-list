'use strict'

export default class AbstractView {

    constructor(model) {
        this.model = model;
    }

    generateOutput() {
        throw error("Cannot use abstract view to generate HTTP Response");
    }
    
}