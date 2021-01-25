import { Component, OnInit } from '@angular/core';
import { ICollection } from '../models/collection.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CollectionsService } from '../services/collections.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.scss']
})
export class CollectionListComponent implements OnInit {

  collections$: Observable<ICollection[]>;
  collectionsSubscription: Subscription;

  constructor(
    private readonly collectionsService: CollectionsService,
    private readonly router: Router,

  ) {
  }

  ngOnInit() {
    this.collectionsService.getCurrentUserCollections().then(collections => {
      this.collections$ = collections;
    });
  }

  // Navigate to new collection form
  onNewCollection() {
    this.router.navigate(['/collections', 'new']);
  }

  onViewCollection(id: number) {
    this.router.navigate(['/collections', 'view', id]);
  }

  onRemoveCollection(collection): void {
    this.collectionsService.removeCollection(collection);
  }

}
