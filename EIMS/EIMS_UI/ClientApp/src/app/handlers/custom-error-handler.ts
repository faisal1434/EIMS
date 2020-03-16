import { Injectable } from '@angular/core';

@Injectable()
export class CustomErrorHandler {
  handleError(error: Error) {

    const err = {
      message: error.message ? error.message : error.toString(),
      stack: error.stack ? error.stack : ''
    };

    // Log  the error
    //const err = error.statusText || error.toString();
    console.log(err);

    // Optionally send it to your back-end API
    // Notify the user
  }
}
