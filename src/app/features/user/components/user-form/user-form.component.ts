import { Component} from '@angular/core';
import {IFormComponent} from "../../../../shared/components/create-dialog/create-dialog.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements IFormComponent {

  public form: FormGroup;

  public avatars: string[];
  public avatarIndex: number;

  constructor(private formBuilder: FormBuilder) {
    this.avatars = ['h1','h2', 'w1', 'w2'];
    this.avatarIndex = 0;

    this.form = this.formBuilder.group({
      avatar: new FormControl(this.avatars[0]),
      name: new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  get avatar(){
    return this.form.get('avatar');
  }

  get name(){
    return this.form.get('name');
  }

  get email(){
    return this.form.get('email');
  }

  get emailErrorMessage(): string{
    const {errors} = this.email as FormControl;
    if(errors){
      if(errors['required']){
        return 'You must enter an Email';
      }else{
        return 'Email wrong format'
      }
    }
    return '';
  }

  isValid(): boolean {
    if(this.form.invalid){
      Object.keys(this.form.controls).forEach(
        field => {
          const control = this.form.get(field);
          control?.markAsTouched({ onlySelf: true });
        });
      return false;
    }
    return true;
  }

  getValues(): any {
    return this.form.value;
  }

  get hasPrev():boolean{
    return this.avatarIndex > 0;
  }
  get hasNext():boolean{
    return this.avatarIndex < this.avatars.length-1;
  }

  nextAvatar(){
    this.avatarIndex+=1;
    this._updateAvatar();
  }

  prevAvatar(){
    this.avatarIndex-=1;
    this._updateAvatar();
  }

  private _updateAvatar(){
    if(this.avatar){
      this.avatar.setValue(this.avatars[this.avatarIndex]);
    }
  }

}
