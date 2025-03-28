import { Component, Input } from '@angular/core';
import { Link } from '../../../../interface/theme-option.interface';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TitleCasePipe } from '../../../../pipe/title-case.pipe';

@Component({
  selector: 'app-footer-links',
  standalone: true,
  imports: [CommonModule, RouterModule, TitleCasePipe],
  templateUrl: './links.component.html',
  styleUrl: './links.component.scss'
})
export class FooterLinksComponent {

  @Input() links: Link[] = [];
  
}
