import {Learning, LEARNING_STATUS, User} from "./models";

export const users: User[] = [
  {
    id: 1,
    avatar: '',
    name: 'John Doe',
    email: 'jdoe@gmail.com'
  },
  {
    id: 2,
    avatar: '',
    name: 'Ariella Valentine',
    email: 'avalentine@gmail.com'
  },
  {
    id: 3,
    avatar: '',
    name: 'Saul Fields',
    email: 'sfields@gmail.com'
  }
];

export const learnings: Learning[] = [
  {
    id: 1,
    name: 'Angular',
    status: LEARNING_STATUS.UNARCHIVED,
    users:[1,2]
  },
  {
    id: 2,
    name: 'Ruby on Rails',
    status: LEARNING_STATUS.UNARCHIVED,
    users: [3]
  },
  {
    id:3,
    name: 'React',
    status: LEARNING_STATUS.ARCHIVED,
    users:[]
  }
];
