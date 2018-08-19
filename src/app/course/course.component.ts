import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  form: FormGroup;

  get formName() {
    return this.form.controls.name;
  }

  get formDuration() {
    return this.form.controls.duration;
  }

  get formCreateDate() {
    return this.form.controls.createDate;
  }

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      createDate: ['', [Validators.required]],
    });
  }

  submitForm(form: FormGroup) {
    console.log(form);
  }

}
