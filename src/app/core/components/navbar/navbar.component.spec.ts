import {ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {Location} from '@angular/common';
import { NavbarComponent } from './navbar.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MatToolbarModule} from "@angular/material/toolbar";
import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'user',
  template: '<p class="prl">MockUser</p>'
})
class MockUserComponent{}

@Component({
  selector: 'learning',
  template: '<p class="prl">MockLearning</p>'
})
class MockLearningComponent{}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let compiled:any;
  let location: Location;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        RouterTestingModule.withRoutes([
          {path: 'users', component:MockUserComponent},
          {path: 'learnings', component:MockLearningComponent}
        ])],
      declarations: [
        NavbarComponent,
        MockUserComponent,
        MockLearningComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
  });

  it('should exist 2 buttons in the navbar', () => {
    expect(component).toBeTruthy();
    const buttons = compiled.querySelectorAll('button');

    expect(buttons.length).toEqual(2);
    expect(buttons[0].textContent).toEqual('Users');
    expect(buttons[1].textContent).toEqual('Learnings');
  });

  it('navigate to /users', fakeAsync(() => {
    const button = compiled.querySelector('#users');
    button.click();
    tick();
    expect(location.path()).toBe('/users');
  }));

  it('navigate to /learnings', fakeAsync(() => {
    const button = compiled.querySelector('#learnings');
    button.click();
    tick();
    expect(location.path()).toBe('/learnings');
  }));
});
