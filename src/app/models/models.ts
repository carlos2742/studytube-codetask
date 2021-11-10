export type User = {
  id: number;
  avatar: string;
  name: string;
  email:string;
  learnings: number[]
};

export type Learning = {
  id: number;
  name: string;
  status: LEARNING_STATUS;
};

export enum LEARNING_STATUS{
  ARCHIVED,
  UNARCHIVED
};