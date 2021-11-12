import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {User} from "../../../models/models";
import {USER_DATA} from "../../core.module";
import {cloneData} from "../learning/learning.service.spec";

describe('UserService', () => {
  let service: UserService;
  let allUsers: User[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new UserService(cloneData(USER_DATA.useValue));
    allUsers = service.all;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new user', () =>{
    expect(allUsers.length).toEqual(3);
    const newUser: User = {
      id:'',
      avatar: 'h2',
      name: 'George',
      email: 'george@gmail.com'
    };
    service.create({...newUser});
    expect(allUsers.length).toBeGreaterThan(3);
    const storedUser: User = allUsers[allUsers.length-1];
    expect(storedUser.email).toEqual(newUser.email);
    expect(storedUser.id).not.toEqual(newUser.id);
  });

  describe('Paginate User List', ()=>{
    it('Should return 2 elements in the first page with a pageSize 2', ()=>{
      const {data, total} = service.list(0, 2);
      expect(data.length).toBe(2);
      expect(total).toBe(allUsers.length);
    });
    it('Should return 1 element in the second page with a pageSize 2', ()=>{
      const {data, total} = service.list(1, 2);
      expect(data.length).toBe(1);
      expect(total).toBe(allUsers.length);
    });
    it('Should return 3 element in the first page with a pageSize 4', ()=>{
      const {data, total} = service.list(0, 4);
      expect(data.length).toBe(3);
      expect(total).toBe(allUsers.length);
    });
  });

  describe('Search User List', ()=>{
    it('Should find 1 element by name', ()=>{
      const first = allUsers[0];
      const {data, total} = service.list(0, 2, first.name);
      const result = data[0];
      expect(data.length).toBe(1);
      expect(result.email).toEqual(first.email);
      expect(total).toBe(1);
    });
    it('Should find 1 element by email', ()=>{
      const first = allUsers[0];
      const {data, total} = service.list(0, 2, first.email);
      const result = data[0];
      expect(data.length).toBe(1);
      expect(result.email).toEqual(first.email);
      expect(total).toBe(1);
    });
    it('Should find 0 element', ()=>{
      const {data, total} = service.list(0, 2, 'qwerty');
      expect(data.length).toBe(0);
      expect(total).toBe(0);
    });
  });

  describe( 'Remove User', () =>{
    it('should remove an existing user', () =>{
      expect(allUsers.length).toEqual(3);
      const user = {...allUsers[0]};
      const removed = service.remove(user.id);
      expect(removed).toBeTrue();
      expect(allUsers.length).toBeLessThan(3);
      expect(user.id).not.toEqual(allUsers[0].id);
    });

    it('should not remove an unexisting user', () =>{
      expect(allUsers.length).toEqual(3);
      const removed = service.remove('qwerty');
      expect(removed).toBeFalse();
      expect(allUsers.length).toEqual(3);
    });
  });

  describe( 'Find many Users by Id', () =>{
    it('should return 2 users', () =>{
      const usersId = [allUsers[0].id, allUsers[1].id];
      const result = service.findManyById(usersId);
      expect(result.length).toBe(2);
      expect(result[0].id).toEqual(usersId[0]);
      expect(result[1].id).toEqual(usersId[1]);
    });

    it('should return 1 user', () =>{
      const usersId = [allUsers[0].id, 'qwerty'];
      const result = service.findManyById(usersId);
      expect(result.length).toBe(1);
      expect(result[0].id).toEqual(usersId[0]);
    });
  });

});
