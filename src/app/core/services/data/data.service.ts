import { Injectable } from '@angular/core';
import {Learning, LEARNING_STATUS, User} from "../../../models/models";
import {learnings, users} from "../../../models/data";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userData: User[];
  private learningData: Learning[];

  constructor() {
    this.userData = users;
    this.learningData = learnings;
  }

  public users(start: number, count: number, search?:{name?: string, email?:string}): Observable<{data:User[], total: number}>{
    return new Observable(observer => {
      const list = search === undefined ? this.userData : this.userData.filter(user => {
        const {name, email} = search;
        return (name!=undefined && user.name === name) || (email!=undefined && user.email === email);
      });
      const response = {
        data: list.slice(start,start+count),
        total: list.length
      };
      observer.next(response)
    });
  }

  public getAllUsers(): User[]{
    return this.userData;
  }

  public learnings(pageIndex: number, pageSize: number, search?:string): {data: Learning[], total:number}{
    const list = search === undefined || search === null ? this.learningData : this.learningData.filter(learning => learning.name.toLowerCase().includes(search.toLowerCase()));
    const start = pageIndex * pageSize;
    return {
      data: list.slice(start,start+pageSize),
      total: list.length
    };
  }

  public assignLearning(learningId: number, usersId: number[]){
    const learning = this.learningData.find(learning => learning.id === learningId);
    if(learning){
      learning.users = usersId;
    }
  }

  public getUserAssigned(usersId: number[]){
    return this.userData.filter(user => usersId.includes(user.id));
  }

  public createLearning(learning: Learning): boolean{
    learning.id = this.learningData.length+1;
    learning.users = [];
    this.learningData.push(learning);
    return true;
  }

  public updateLearningStatus(id:number, status: LEARNING_STATUS):boolean{
    const learning = this.getLearning(id);
    if(learning){
      learning.status = status;
      return true;
    }else{
      return false
    }
  }

  public deleteLearning(id:number): boolean{
    const index = this.getLearningIndex(id);
    if(index > -1){
      const deletedElements = this.learningData.splice(index,1);
      if(deletedElements.length > 0){
        return true;
      }
    }
    return false;
  }

  private getLearning(id:number): Learning | undefined{
    return this.learningData.find((item) => item.id === id);
  }

  private getLearningIndex(id:number): number{
    return this.learningData.findIndex((item) => item.id === id);
  }
}
