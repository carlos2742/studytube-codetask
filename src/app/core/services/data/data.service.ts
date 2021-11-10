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

  public learnings(page: number, pageSize: number, search?:string): Observable<{data: Learning[], total:number}>{
    return new Observable(observer => {
      const list = search === undefined || search === null ? this.learningData : this.learningData.filter(learning => learning.name.toLowerCase().includes(search.toLowerCase()));
      const start = (page - 1) * pageSize;
      const response = {
        data: list.slice(start,start+pageSize),
        total: list.length
      };
      observer.next(response)
    });
  }

  public createLearning(learning: Learning): Observable<{created:boolean}>{
    return new Observable(observer =>{
      learning.id = this.learningData.length+1;
      this.learningData.push(learning);
      observer.next({created:true});
    });
  }

  public updateLearningStatus(id:number, status: LEARNING_STATUS){
    return new Observable(observer =>{
      const learning = this.getLearning(id);
      if(learning){
        learning.status = status;
        observer.next({updated:true})
      }else{
        observer.error('Element not found');
      }
    });
  }

  public deleteLearning(id:number): Observable<{deleted:boolean}>{
    return new Observable( observer => {
      const index = this.getLearningIndex(id);
      if(index > -1){
        const deletedElements = this.learningData.splice(index,1);
        if(deletedElements.length > 0){
          observer.next({deleted:true})
        }else {
          observer.next({deleted: false});
        }
      }else{
        observer.error('Element not found');
      }
    });
  }

  private getLearning(id:number): Learning | undefined{
    return this.learningData.find((item) => item.id === id);
  }

  private getLearningIndex(id:number): number{
    return this.learningData.findIndex((item) => item.id === id);
  }
}
