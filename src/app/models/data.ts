import {Learning, LEARNING_STATUS, User} from "./models";

export const users: User[] = [
  {
    id: 'uhumdr8ko',
    avatar: 'h1',
    name: 'John Doe',
    email: 'jdoe@gmail.com'
  },
  {
    id: "4lu6l450j",
    avatar: 'w1',
    name: 'Ariella Valentine',
    email: 'avalentine@gmail.com'
  },
  {
    id: "oxabanran",
    avatar: 'h2',
    name: 'Saul Fields',
    email: 'sfields@gmail.com'
  }
];

export const learnings: Learning[] = [
  {
    id: "n4bjbuw72",
    name: 'Angular',
    status: LEARNING_STATUS.UNARCHIVED,
    users:['uhumdr8ko', '4lu6l450j']
  },
  {
    id: "ub2ee6wvm",
    name: 'Ruby on Rails',
    status: LEARNING_STATUS.UNARCHIVED,
    users: ['oxabanran']
  },
  {
    id: "8pb71bd47",
    name: 'React',
    status: LEARNING_STATUS.ARCHIVED,
    users:[]
  }
];
