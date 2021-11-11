import { Injectable } from '@angular/core';
import {Learning, LEARNING_STATUS} from "../../../models/models";
import {learnings} from "../../../models/data";

@Injectable({
  providedIn: 'root'
})
export class LearningService {

  private readonly _data: Learning[];

  constructor() {
    this._data = learnings;
  }

  public list(pageIndex: number, pageSize: number, search?:string): {data: Learning[], total:number}{
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    let list;

    if(search === undefined || search === null){
      list = this._data;
    } else {
      list = this._data.filter(item =>{
        return item.name.toLowerCase().includes(search.toLowerCase())
      });
    }
    return {
      data: list.slice(start, end),
      total: list.length
    }
  }

  public create(payload: Learning): boolean{
    payload.id = this._data.length+1;
    payload.users = [];
    this._data.push(payload);
    return true;
  }

  public updateStatus(id: number, value: LEARNING_STATUS):boolean{
    const entity = this.findById(id);
    if(entity){
      entity.status = value;
      return true;
    }
    return false;
  }

  public remove(id: number): boolean{
    const index = this.findIndexById(id);
    if(index > -1){
      const deletedElements = this._data.splice(index,1);
      if(deletedElements.length > 0){
        return true;
      }
    }
    return false;
  }

  /**
   *  Remove an user from all the learnings
   * */
  public removeUser(userId: number){
    let entities = this._data.filter(item => item.users.includes(userId));
    entities.forEach(item => {
      item.users = item.users.filter(id => id !== userId);
    })
  }

  public assignUsers(id:number, usersId: number[]):boolean{
    const entity = this.findById(id);
    if(entity){
      entity.users = usersId;
      return true;
    }
    return false;
  }

  public findById(id:number): Learning | undefined{
    return this._data.find((item) => item.id === id);
  }

  /**
   * Return the Learnings assigned to a user.
   * */
  public findByUserId(userId:number): Learning[]{
    return this._data.filter(item => item.users.includes(userId));
  }

  private findIndexById(id:number): number{
    return this._data.findIndex((item) => item.id === id);
  }
}
