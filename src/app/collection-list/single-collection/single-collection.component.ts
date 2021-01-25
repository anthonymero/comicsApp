import { Component, OnInit } from '@angular/core';
import { ICollection } from 'src/app/models/collection.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-single-collection',
  templateUrl: './single-collection.component.html',
  styleUrls: ['./single-collection.component.scss']
})
export class SingleCollectionComponent implements OnInit {

  collection: ICollection;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly collectionsService: CollectionsService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    this.collection = {
      uid: '',
      name: '',
      editor: '',
      volumeCount: 1,
      state: '',
      style: '',
      userId: '',
      books: [],
    };


  }

  onBack(): void {
    this.router.navigate(['/collections']);
  }

}
