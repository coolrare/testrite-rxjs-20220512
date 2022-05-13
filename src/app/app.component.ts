import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const nameLengthValidator = Validators.maxLength(10);
const summaryLengthValidator = Validators.maxLength(10);

// nameLengthValidator(new FormControl());

const autoUnSubscribeWhen = (condition$: Observable<any>) => {
  return function(source: Observable<any>) {
    return source.pipe(
      takeUntil(condition$)
    )
  }
}

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

  timer$ = timer(0, 100);
  destroy$ = new Subject();

  ngOnInit() {
    this.timer$
      .pipe(
        // takeUntil(this.destroy$)
        autoUnSubscribeWhen(this.destroy$)
      )
      .subscribe(console.log);
  }
}
