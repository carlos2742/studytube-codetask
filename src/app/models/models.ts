export enum LEARNING_STATUS{
  ARCHIVED,
  UNARCHIVED
};

export type Learning = {
  id: number;
  name: string;
  status: LEARNING_STATUS;
  users: number[];
};

export type User = {
  id: number;
  avatar: string;
  name: string;
  email:string;
};
