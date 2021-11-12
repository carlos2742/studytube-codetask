export enum LEARNING_STATUS{
  ARCHIVED,
  UNARCHIVED
};

export type Learning = {
  id: string;
  name: string;
  status: LEARNING_STATUS;
  users: string[];
};

export type User = {
  id: string;
  avatar: string;
  name: string;
  email:string;
};
