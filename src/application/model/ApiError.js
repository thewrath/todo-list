'use strict'

export default class ApiError {

    constructor(name, message) {
        this.name = name;
        this.message = message;
    }
}