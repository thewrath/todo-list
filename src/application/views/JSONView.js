'use strict'
import AbstractView from './AbstractView'
import ApiError from '../model/ApiError';

export default class JSONView extends AbstractView {
    constructor(model) {
        super(model);
    }

    generateOutput() {
        if(this.model != null) {
            if(this.model instanceof ApiError){
                return {
                    "status": "error",
                    "message": this.model.message
                }
            } else {
                return {
                    "status": "success",
                    "data": this.model
                }
            }
        } else {
            return {
                "status": "success"
            }
        }
        
    }
}