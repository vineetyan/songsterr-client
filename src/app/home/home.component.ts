import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router, private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(`logo`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/logo.svg"));
  }

  onSearch(searchText: string) {
    this.router.navigate(['/search'], { queryParams: { q: searchText } });
  }


}
