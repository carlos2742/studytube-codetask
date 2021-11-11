import {AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appAvatar]'
})
export class AvatarDirective implements OnChanges{
  @Input() appAvatar:string;
  @Input() avatarSize:'small' | 'medium' | 'big' | undefined;

  constructor(private _element: ElementRef, private render: Renderer2) {}

  get native(): HTMLImageElement{
    return this._element.nativeElement as HTMLImageElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.appAvatar){
      this._updateElement();
    }
  }

  private _updateElement(){
    this.native.src = `/assets/avatars/${this.appAvatar}.jpg`;
    this.render.addClass(this.native, 'avatar');
    this.render.addClass(this.native, this.avatarSize ? this.avatarSize : 'small');
  }

}
