import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    const matIconRegistryStub = () => ({ addSvgIcon: (logo: string, arg: SafeResourceUrl) => ({}) });
    const domSanitizerStub = () => ({
      bypassSecurityTrustResourceUrl: (s: string) => ({})
    });
    const routerStub = () => ({ navigate: (array: string[], object: NavigationExtras) => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent],
      providers: [
        { provide: MatIconRegistry, useFactory: matIconRegistryStub },
        { provide: DomSanitizer, useFactory: domSanitizerStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('onSearch navigates to other route', () => {
    const routerStub = fixture.debugElement.injector.get(Router);
    spyOn(routerStub, 'navigate').and.callThrough();
    component.onSearch('hello world');
    expect(routerStub.navigate).toHaveBeenCalled();
  });

});
