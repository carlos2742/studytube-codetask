import { AvatarDirective } from './avatar.directive';
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Component} from "@angular/core";
import {By} from "@angular/platform-browser";

@Component({
  template: `<img [appAvatar]="'h2'" avatarSize="big">`
})
class TestComponent{}

describe('AvatarDirective', () => {
  let component:TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directive: any;

  beforeEach(async ()=>{
    await TestBed.configureTestingModule({
      declarations:[AvatarDirective, TestComponent]
    }).compileComponents();
  });
  beforeEach(()=>{
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    directive = fixture.debugElement.query(By.directive(AvatarDirective));
  });

  it('Should have AvatarDirective element', () => {
    expect(directive).toBeTruthy();
  });

  it('Should appAvatar equal "h2"',() =>{
    const ad = directive.injector.get(AvatarDirective) as AvatarDirective;
    expect(ad.appAvatar).toEqual('h2');
  });

  it('Should avatar size equal "big"',() =>{
    const ad = directive.injector.get(AvatarDirective) as AvatarDirective;
    expect(ad.avatarSize).toEqual('big');
  });
});
