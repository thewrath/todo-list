'use strict'

export default class AbstractController {

    constructor(namespace) {
        this.namespace = namespace
        this.routes = []
    }
}