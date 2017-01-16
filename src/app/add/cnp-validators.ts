import { CNP } from 'cnp.js/cnp';
import { FormControl } from '@angular/forms'

export class CnpValidator {

    private static isEmptyInputValue(value: any): boolean {
        // we don't check for string here so it also works with arrays
        return value == null || value.length === 0;
    }


    public static inputTextValidator(control: FormControl): { [s: string]: boolean } {
        if (CnpValidator.isEmptyInputValue(control.value)) {
            return null;  // don't validate empty values to allow optional controls
        }
        if (control.value.search(/[A-Za-z]/))
            return { invalidInput: true };
    }
    public static inputNumberValidator(control: FormControl): { [s: string]: boolean } {
        if (CnpValidator.isEmptyInputValue(control.value)) {
            return null;  // don't validate empty values to allow optional controls
        }
        if (control.value.search(/[0-9]/))
            return { validNumber: true };
    }
    public static lengthValid2(control: FormControl): { [s: string]: boolean } {
        if (CnpValidator.isEmptyInputValue(control.value)) {
            return null;  // don't validate empty values to allow optional controls
        }
        if (control.value.length != 2)
            return { validLength: true };
    }
    public static lengthValid6(control: FormControl): { [s: string]: boolean } {
        if (CnpValidator.isEmptyInputValue(control.value)) {
            return null;  // don't validate empty values to allow optional controls
        }
        if (control.value.length != 6)
            return { validLength6: true };
    }
    public static cnpValid(control: FormControl): { [s: string]: boolean } {
        if (CnpValidator.isEmptyInputValue(control.value)) {
            return null;  // don't validate empty values to allow optional controls
        }
        var cod = new CNP(control.value);
        if (!cod.isValid)
            return { codValid: true };
    }
}