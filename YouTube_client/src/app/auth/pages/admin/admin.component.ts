import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/servises/authservice/authservice.service';
import { addCard } from 'src/app/redux/actions/search.actions';
import { CardItem } from 'src/app/youtube/models/search.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  })
export class AdminComponent implements OnInit {
  public adminForm!: FormGroup;

  public isAuth = this.authService.isAuthenticatedUser();

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.initAdminForm();
  }

  private initAdminForm(): void {
    this.adminForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      description: ['', [Validators.maxLength(255)]],
      link: ['', [Validators.required]],
      linkVideo: ['', [Validators.required]],
      date: ['', [Validators.required, AdminComponent.dateValidator()]],
      tags: this.fb.array([this.createTagInput()]),
    });
  }

  public static dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;

      const selectedDate = new Date(value);
      const currentDate = new Date();

      if (selectedDate > currentDate) {
        return { futureDate: true };
      }

      return null;
    };
  }

  private createTagInput(): FormGroup {
    return this.fb.group({
      tag: ['', Validators.required],
    });
  }

  public addTagInput(): void {
    const tagsArray = this.adminForm.get('tags') as FormArray;
    if (tagsArray.length < 5) {
      tagsArray.push(this.createTagInput());
    }
  }

  public removeTagInput(index: number): void {
    const tagsArray = this.adminForm.get('tags') as FormArray;
    if (tagsArray.length > 1) {
      tagsArray.removeAt(index);
    }
  }

  public resetForm(): void {
    this.adminForm.reset();
    const tagsArray = this.adminForm.get('tags') as FormArray;
    while (tagsArray.length > 1) {
      tagsArray.removeAt(1);
    }
  }

  get title() {
    return this.adminForm.get('title');
  }

  get description() {
    return this.adminForm.get('description');
  }

  get link() {
    return this.adminForm.get('link');
  }

  get linkVideo() {
    return this.adminForm.get('linkVideo');
  }

  get date() {
    return this.adminForm.get('date');
  }

  get tags() {
    return (this.adminForm.get('tags') as FormArray).controls;
  }

  public createCard(): void {
    const {
      title, description, link, linkVideo, date, tags,
    } = this.adminForm.value;
    const id = Date.now().toString();
    const card: CardItem = {
      id,
      title,
      description,
      link,
      linkVideo,
      date,
      tags,
    };
    this.store.dispatch(addCard(card));
  }
}
