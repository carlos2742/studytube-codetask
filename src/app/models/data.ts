import {Learning, LEARNING_STATUS, User} from "./models";

export const users: User[] = [
  {
    id: 1,
    avatar: '',
    name: 'John Doe',
    email: 'jdoe@gmail.com',
    learnings:[1]
  },
  {
    id: 2,
    avatar: '',
    name: 'Ariella Valentine',
    email: 'avalentine@gmail.com',
    learnings:[1,2]
  },
  {
    id: 3,
    avatar: '',
    name: 'Saul Fields',
    email: 'sfields@gmail.com',
    learnings:[]
  }
];

export const learnings: Learning[] = [
  {
    id: 1,
    name: 'Angular',
    status: LEARNING_STATUS.UNARCHIVED,
  },
  {
    id: 2,
    name: 'Ruby on Rails',
    status: LEARNING_STATUS.UNARCHIVED,
  },
  {
    id:3,
    name: 'React',
    status: LEARNING_STATUS.ARCHIVED,
  }
];
