import {Inject, Injectable} from '@angular/core';
import {User} from "../../../models/models";

export const ID = () => Math.random().toString(36).substr(2,9);

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Inject('USER_DATA') private _data: User[]) {}

  get all(): User[]{
    return this._data;
  }

  public list(pageIndex: number, pageSize: number, search?:string): {data: User[], total: number}{
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    let list;

    if(search === undefined || search === null){
      list = this.all;
    } else {
      list = this.all.filter(item =>{
        return item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.email.includes(search);
      });
    }
    return {
      data: list.slice(start, end),
      total: list.length
    }
  }

  public create(payload: User):boolean{
    payload.id = ID();
    this.all.push(payload);
    return true;
  }

  public remove(id: string): boolean{
    const index = this.all.findIndex(item => item.id === id);
    if(index > -1){
      const result = this.all.splice(index,1);
      return result.length > 0;
    }
    return false;
  }

  public findManyById(usersId: string[]): User[]{
    return this.all.filter(item => usersId.includes(item.id));
  }
}
