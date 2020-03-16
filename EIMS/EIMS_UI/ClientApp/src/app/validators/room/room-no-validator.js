"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function roomNoValidator(c) {
    console.log(c);
    this.roomService.roomNoCheck(c.value)
        .subscribe(function (x) {
        if (x.result) {
            return {
                roomNoExists: {
                    valid: false
                }
            };
        }
        else {
            return null;
        }
    });
}
exports.roomNoValidator = roomNoValidator;
//# sourceMappingURL=room-no-validator.js.map