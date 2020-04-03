'use strict'

import ApiError from "../model/ApiError";

export default class AbstractForm {
    constructor(params) {
        if(params == null){
            throw error("Input params cannot be null");
        }
        this.params = params;
        this.expectedParams = [];
        this.error = null;
    }

    isValid() {
        let noError = true;
        this.expectedParams.forEach(param => {
            if(!this.params.hasOwnProperty(param)){
                noError = false;
                this.error = new ApiError("Field is missing", `Field ${param} is missing`);
                return;
            }
        });
        return noError;
    }
}