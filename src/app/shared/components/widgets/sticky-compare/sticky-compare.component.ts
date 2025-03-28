import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CompareState } from '../../../state/compare.state';
import { GetCompare } from '../../../action/compare.action';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sticky-compare',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './sticky-compare.component.html',
  styleUrl: './sticky-compare.component.scss'
})
export class StickyCompareComponent {

  @Select(CompareState.compareTotal) compareTotal$: Observable<number>;

  constructor(private store: Store) {
    // this.store.dispatch(new GetCompare());
  }

}
