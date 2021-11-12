import {Inject, Injectable} from '@angular/core';
import {Learning, LEARNING_STATUS} from "../../../models/models";
import {ID} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class LearningService {


  constructor(@Inject('LEARNING_DATA') private _data: Learning[]) {}

  get all(): Learning[]{
    return this._data;
  }

  public list(pageIndex: number, pageSize: number, search?:string): {data: Learning[], total:number}{
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    let list;

    if(search === undefined || search === null){
      list = this.all;
    } else {
      list = this.all.filter(item =>{
        return item.name.toLowerCase().includes(search.toLowerCase())
      });
    }
    return {
      data: list.slice(start, end),
      total: list.length
    }
  }

  public create(payload: Learning): boolean{
    payload.id = ID();
    payload.users = [];
    this.all.push(payload);
    return true;
  }

  public updateStatus(id: string, value: LEARNING_STATUS):boolean{
    const entity = this.findById(id);
    if(entity){
      entity.status = value;
      return true;
    }
    return false;
  }

  public remove(id: string): boolean{
    const index = this.findIndexById(id);
    if(index > -1){
      const deletedElements = this.all.splice(index,1);
      if(deletedElements.length > 0){
        return true;
      }
    }
    return false;
  }

  /**
   *  Remove an user from all the learnings
   * */
  public removeUser(userId: string):boolean{
    let entities = this.all.filter(item => item.users.includes(userId));
    if(entities.length === 0){
      return false;
    }

    entities.forEach(item => {
      item.users = item.users.filter(id => id !== userId);
    });
    return true;
  }

  public assignUsers(id:string, usersId: string[]):boolean{
    const entity = this.findById(id);
    if(entity){
      entity.users = usersId;
      return true;
    }
    return false;
  }

  public findById(id:string): Learning | undefined{
    return this.all.find((item) => item.id === id);
  }

  /**
   * Return the Learnings assigned to a user.
   * */
  public findByUserId(userId:string): Learning[]{
    return this.all.filter(item => item.users.includes(userId));
  }

  private findIndexById(id:string): number{
    return this.all.findIndex((item) => item.id === id);
  }
}
