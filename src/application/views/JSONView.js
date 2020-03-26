'use strict'
import AbstractView from './AbstractView'

export default class JSONView extends AbstractView {
    constructor(model) {
        super(model);
    }

    generateOutput() {
        return JSON.stringify(this.model);
    }
}