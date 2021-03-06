import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-collection-form',
  templateUrl: './collection-form.component.html',
  styleUrls: ['./collection-form.component.scss']
})
export class CollectionFormComponent implements OnInit {

  collectionForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly collectionService: CollectionsService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.collectionForm = this.fb.group({
      name: ['', Validators.required],
      editor: ['', Validators.required],
      volumeCount: [],
      state: [''],
      style: [''],
    });
  }

  onSubmit() {
    this.collectionService.createNewCollection({
      name: this.collectionForm.value.name,
      editor: this.collectionForm.value.editor,
      volumeCount: this.collectionForm.value.volumeCount,
      state: this.collectionForm.value.state,
      style: this.collectionForm.value.style,
    });
    this.router.navigate(['/collections']);
  }

  onCancel(): void {
    this.router.navigate(['/collections']);
  }

}
