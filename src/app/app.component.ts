import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const nameLengthValidator = Validators.maxLength(10);
const summaryLengthValidator = Validators.maxLength(10);

// nameLengthValidator(new FormControl());
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rxjs-in-angular-course';
  form = new FormGroup({
    name: new FormControl('', nameLengthValidator),
    parentName: new FormControl('', nameLengthValidator),
    age: new FormControl(null),
    summary: new FormControl('', summaryLengthValidator),
  })
}
