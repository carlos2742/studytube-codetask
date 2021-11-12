import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MatToolbarModule} from "@angular/material/toolbar";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let compiled:any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        RouterTestingModule.withRoutes([])],
      declarations: [ NavbarComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should exist 2 buttons in the navbar', () => {
    expect(component).toBeTruthy();
    const buttons = compiled.querySelectorAll('button');

    expect(buttons.length).toEqual(2);
    expect(buttons[0].textContent).toEqual('Users');
    expect(buttons[1].textContent).toEqual('Learnings');
  });
});
