'use strict'
import AbstractView from './AbstractView'
import ApiError from '../model/ApiError';

export default class JSONView extends AbstractView {
    constructor(model) {
        super(model);
    }

    generateOutput(statusCode) {
        if(this.model != null) {
            if(this.model instanceof ApiError){
                return {
                    "statusCode": statusCode,
                    "error": this.model.name,
                    "message": this.model.message
                }
            } else {
                return {
                    "statusCode": statusCode,
                    "payload": this.model
                }
            }
        } else {
            return {
                "statusCode": statusCode
            }
        }
        
    }
}