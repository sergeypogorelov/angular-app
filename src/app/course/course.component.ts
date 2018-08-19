import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Movie } from '../shared/entities/movie';
import { MoviesService } from '../shared/services/movies/movies.service';

const DURATION_PATTERN = /^[0-9]+$/;
const CREATE_DATE_PATTERN = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/;

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
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _moviesService: MoviesService
  ) { }

  ngOnInit() {

    this.initForm({
      name: '',
      duration: '',
      createDate: ''
    });

    if (!this.isAdding) {
      this._moviesService.loadMovieById(this._route.snapshot.params.id).subscribe(movie => {
        this.form.setValue({
          name: movie.title,
          duration: movie.duration,
          createDate: movie.create_date
        });
      });
    }

  }

  submitForm(form: FormGroup) {

    if (form.valid) {

      let movie = new Movie({
        title: form.value.name,
        duration: form.value.duration,
        create_date: form.value.createDate
      });

      if (this.isAdding) {
        this._moviesService.addMovie(movie).subscribe(() => {
          this.goToViewAllPage();
        });
      } else {
        this._moviesService.editMovie(this._route.snapshot.params.id, movie).subscribe(() => {
          this.goToViewAllPage();
        });
      }
      
    } else {
      this.form.controls.name.markAsDirty();
      this.form.controls.duration.markAsDirty();
      this.form.controls.createDate.markAsDirty();
    }

  }

  private get isAdding(): boolean {
    return `${this._route.snapshot.params.id}`.toUpperCase() === 'NEW';
  }

  private goToViewAllPage() {
    this._router.navigate(['']);
  }

  private initForm({name, duration, createDate}) {
    this.form = this._formBuilder.group({
      name: [name, [Validators.required]],
      duration: [duration, [Validators.required, Validators.pattern(DURATION_PATTERN)]],
      createDate: [createDate, [Validators.required, Validators.pattern(CREATE_DATE_PATTERN)]],
    });
  }

}
