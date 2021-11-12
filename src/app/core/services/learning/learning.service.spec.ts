import {TestBed} from '@angular/core/testing';

import {LearningService} from './learning.service';
import {Learning, LEARNING_STATUS} from "../../../models/models";
import {LEARNING_DATA} from "../../core.module";

export const cloneData = (data:any[]) => JSON.parse(JSON.stringify(data));

describe('LearningService', () => {
  let service: LearningService;
  let allLearning: Learning[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new LearningService(cloneData(LEARNING_DATA.useValue));
    allLearning = service.all;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new learning', () =>{
    expect(allLearning.length).toEqual(3);
    const newLearning: Learning = {
      id:'',
      name: 'Python',
      status: LEARNING_STATUS.ARCHIVED,
      users:[]
    };
    service.create({...newLearning});
    expect(allLearning.length).toBeGreaterThan(3);
    const storedLearning: Learning = allLearning[allLearning.length-1];
    expect(storedLearning.name).toEqual(newLearning.name);
    expect(storedLearning.status).toEqual(newLearning.status);
    expect(storedLearning.id).not.toEqual(newLearning.id);
  });

  describe('Paginate Learning List ', ()=>{
    it('Should return 2 elements in the first page with a pageSize 2', ()=>{
      const {data, total} = service.list(0, 2);
      expect(data.length).toBe(2);
      expect(total).toBe(allLearning.length);
    });
    it('Should return 1 element in the second page with a pageSize 2', ()=>{
      const {data, total} = service.list(1, 2);
      expect(data.length).toBe(1);
      expect(total).toBe(allLearning.length);
    });
    it('Should return 3 element in the first page with a pageSize 4', ()=>{
      const {data, total} = service.list(0, 4);
      expect(data.length).toBe(3);
      expect(total).toBe(allLearning.length);
    });
  });

  describe('Search Learning List', ()=>{
    it('Should find 1 element by name', ()=>{
      const first = allLearning[0];
      const {data, total} = service.list(0, 2, first.name);
      const result = data[0];
      expect(data.length).toBe(1);
      expect(result.name).toEqual(first.name);
      expect(result.status).toEqual(first.status);
      expect(total).toBe(1);
    });
    it('Should find 0 element', ()=>{
      const {data, total} = service.list(0, 2, 'qwerty');
      expect(data.length).toBe(0);
      expect(total).toBe(0);
    });
  });

  describe('Update Learning Status', ()=>{
    it('Should update learning status to archived', ()=>{
      const first:Learning = {...allLearning[0]};
      expect(first.status).toEqual(LEARNING_STATUS.UNARCHIVED);
      const updated = service.updateStatus(first.id,LEARNING_STATUS.ARCHIVED);
      const updatedLearning = allLearning[0];
      expect(updated).toBeTrue();
      expect(updatedLearning.status).not.toEqual(first.status);
      expect(updatedLearning.status).toEqual(LEARNING_STATUS.ARCHIVED);
    });
    it('Should not update learning status', ()=>{
      const updated = service.updateStatus('qwerty',LEARNING_STATUS.ARCHIVED);
      expect(updated).toBeFalse();
    });
  });

  describe( 'Remove Learning', () =>{
    it('should remove an existing learning', () =>{
      expect(allLearning.length).toEqual(3);
      const learning = {...allLearning[0]};
      const removed = service.remove(learning.id);
      expect(removed).toBeTrue();
      expect(allLearning.length).toBeLessThan(3);
      expect(learning.id).not.toEqual(allLearning[0].id);
    });

    it('should not remove an unexisting learning', () =>{
      expect(allLearning.length).toEqual(3);
      const removed = service.remove('qwerty');
      expect(removed).toBeFalse();
      expect(allLearning.length).toEqual(3);
    });
  });

  describe('Remove user from learning', () => {
    it( 'Should remove an assigned user from the learning',()=>{
      const first = {...allLearning[0]};
      expect(first.users.length).toBe(2);
      const removed = service.removeUser(first.users[0]);
      const updated = allLearning[0];
      expect(removed).toBeTrue();
      expect(updated.users.length).toBeLessThan(first.users.length);
      expect(updated.users.length).toBe(1);
    });
    it( 'Should not remove an assigned user',()=>{
      const removed = service.removeUser('qwerty');
      expect(removed).toBeFalse();
    });
  });

  describe('Assign User to a Learning', () => {
    it( 'Should add 2 users',()=>{
      const first = {...allLearning[0]};
      expect(first.users.length).toBe(2);
      const assigned = service.assignUsers(first.id,[...first.users,'qwert','yuiop']);
      const updated = allLearning[0];
      expect(assigned).toBeTrue();
      expect(updated.users.length).toBeGreaterThan(first.users.length);
      expect(updated.users.length).toBe(4);
    });
    it( 'Should not assign',()=>{
      const assigned = service.assignUsers('zxcvb',['qwert','yuiop']);
      expect(assigned).toBeFalse();
    });
  });

  describe('Find Learning by id', () => {
    it( 'Should return a learning',()=>{
      const first = {...allLearning[0]};
      const result = service.findById(first.id);
      expect(result?.name).toEqual(first.name);
      expect(result?.status).toEqual(first.status);
    });
    it( 'Should return undefined',()=>{
      const result = service.findById('zxcvb');
      expect(result).toBeUndefined();
    });
  });

});
