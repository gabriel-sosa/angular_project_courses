import { ValidatorFn, AbstractControl } from '@angular/forms';

export function validator(regex: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const forbidden = regex.test(control.value);
        return forbidden ? null : {'forbiddenName': {value: control.value}};
    };
}