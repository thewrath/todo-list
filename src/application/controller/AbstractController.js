'use strict'

export default class AbstractController {

    constructor() {
        this.routes = []
    }

    sendResponse(h, statusCode, view) {
        return h.response(view.generateOutput()).code(statusCode);
    }
}