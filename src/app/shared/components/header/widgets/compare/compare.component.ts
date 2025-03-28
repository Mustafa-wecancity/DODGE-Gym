import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CompareState } from '../../../../state/compare.state';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-compare',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.scss'
})
export class CompareComponent {

  @Select(CompareState.compareTotal) compareTotal$: Observable<number>;

}
