import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
// import {MdCheckboxChange} from "../../lib/checkbox/checkbox";


let max = 5;

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  moduleId: module.id,
  selector: 'input-demo',
  templateUrl: 'input-demo.html',
  styleUrls: ['input-demo.css'],
})
export class InputDemo {
  floatingLabel: string = 'auto';
  color: boolean;
  requiredField: boolean;
  ctrlDisabled = false;

  name: string;
  errorMessageExample1: string;
  errorMessageExample2: string;
  errorMessageExample3: string;
  items: any[] = [
    { value: 10 },
    { value: 20 },
    { value: 30 },
    { value: 40 },
    { value: 50 },
  ];
  rows = 8;
  formControl = new FormControl('hello', Validators.required);
  emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);
  checkFormControl = new FormControl(true);
  model = 'hello';

  addABunch(n: number) {
    for (let x = 0; x < n; x++) {
      this.items.push({ value: ++max });
    }
  }

  enableCheckFormControl(event: any) {
    console.debug('enabling checkFormControl', event.checked);
    if (event.checked) this.checkFormControl.enable();
    else this.checkFormControl.disable();
    console.debug('is form control enabled', this.checkFormControl.enabled);
  }

}
