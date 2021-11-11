import { Injectable } from '@angular/core';
import {users} from "../../../models/data";

export type User = {
  id: number;
  avatar: string;
  name: string;
  email:string;
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _data: User[];

  constructor() {
    this._data = users;
  }

  public all(): User[]{
    return this._data;
  }

  public list(pageIndex: number, pageSize: number, search?:string): {data: User[], total: number}{
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    let list;

    if(search === undefined || search === null){
      list = this._data;
    } else {
      list = this._data.filter(item =>{
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
    payload.id = this._data.length+1;
    this._data.push(payload);
    return true;
  }

  public remove(id: number): boolean | User[]{
    const index = this._data.findIndex(item => item.id === id);
    if(index > -1){
      return this._data.splice(index,1);
    }
    return false;
  }

  public findManyById(usersId: number[]): User[]{
    return this._data.filter(item => usersId.includes(item.id));
  }
}
