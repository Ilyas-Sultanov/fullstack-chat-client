import { IChat } from "../../../types/chat";
import { IPaginatedData } from "../../../types/paginatedData";

const chats1: Array<IChat> = [
  {
    _id: '1',
    isGroupChat: true,
    name: 'test group chat 1',
    users: [],
    groupAdmin: {
      _id: '1',
      avatar: '',
      email: 'test email',
      isActivated: true,
      name: 'test name',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '2',
    isGroupChat: true,
    name: 'test group chat 2',
    users: [],
    groupAdmin: {
      _id: '2',
      avatar: '',
      email: 'test email 2',
      isActivated: true,
      name: 'test name 2',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '3',
    isGroupChat: true,
    name: 'test group chat 2',
    users: [],
    groupAdmin: {
      _id: '3',
      avatar: '',
      email: 'test email 3',
      isActivated: true,
      name: 'test name 3',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '4',
    isGroupChat: true,
    name: 'test group chat 4',
    users: [],
    groupAdmin: {
      _id: '4',
      avatar: '',
      email: 'test email 4',
      isActivated: true,
      name: 'test name 4',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '5',
    isGroupChat: true,
    name: 'test group chat 5',
    users: [],
    groupAdmin: {
      _id: '5',
      avatar: '',
      email: 'test email 5',
      isActivated: true,
      name: 'test name 5',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '6',
    isGroupChat: true,
    name: 'test group chat 6',
    users: [],
    groupAdmin: {
      _id: '6',
      avatar: '',
      email: 'test email 6',
      isActivated: true,
      name: 'test name 6',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '7',
    isGroupChat: true,
    name: 'test group chat 7',
    users: [],
    groupAdmin: {
      _id: '7',
      avatar: '',
      email: 'test email 7',
      isActivated: true,
      name: 'test name 7',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '8',
    isGroupChat: true,
    name: 'test group chat 8',
    users: [],
    groupAdmin: {
      _id: '8',
      avatar: '',
      email: 'test email 8',
      isActivated: true,
      name: 'test name 8',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '9',
    isGroupChat: true,
    name: 'test group chat 9',
    users: [],
    groupAdmin: {
      _id: '9',
      avatar: '',
      email: 'test email 9',
      isActivated: true,
      name: 'test name 9',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '10',
    isGroupChat: true,
    name: 'test group chat 10',
    users: [],
    groupAdmin: {
      _id: '10',
      avatar: '',
      email: 'test email 10',
      isActivated: true,
      name: 'test name 10',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '11',
    isGroupChat: true,
    name: 'test group chat 11',
    users: [],
    groupAdmin: {
      _id: '11',
      avatar: '',
      email: 'test email 11',
      isActivated: true,
      name: 'test name 11',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '12',
    isGroupChat: true,
    name: 'test group chat 12',
    users: [],
    groupAdmin: {
      _id: '12',
      avatar: '',
      email: 'test email 12',
      isActivated: true,
      name: 'test name 12',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '13',
    isGroupChat: true,
    name: 'test group chat 13',
    users: [],
    groupAdmin: {
      _id: '113',
      avatar: '',
      email: 'test email 13',
      isActivated: true,
      name: 'test name 13',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '14',
    isGroupChat: true,
    name: 'test group chat 14',
    users: [],
    groupAdmin: {
      _id: '14',
      avatar: '',
      email: 'test email 14',
      isActivated: true,
      name: 'test name 14',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '15',
    isGroupChat: true,
    name: 'test group chat 15',
    users: [],
    groupAdmin: {
      _id: '15',
      avatar: '',
      email: 'test email 15',
      isActivated: true,
      name: 'test name 15',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '16',
    isGroupChat: true,
    name: 'test group chat 16',
    users: [],
    groupAdmin: {
      _id: '16',
      avatar: '',
      email: 'test email 16',
      isActivated: true,
      name: 'test name 16',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '17',
    isGroupChat: true,
    name: 'test group chat 17',
    users: [],
    groupAdmin: {
      _id: '17',
      avatar: '',
      email: 'test email 17',
      isActivated: true,
      name: 'test name 17',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '18',
    isGroupChat: true,
    name: 'test group chat 18',
    users: [],
    groupAdmin: {
      _id: '18',
      avatar: '',
      email: 'test email 18',
      isActivated: true,
      name: 'test name 18',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '19',
    isGroupChat: true,
    name: 'test group chat 19',
    users: [],
    groupAdmin: {
      _id: '19',
      avatar: '',
      email: 'test email 19',
      isActivated: true,
      name: 'test name 19',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '20',
    isGroupChat: true,
    name: 'test group chat 20',
    users: [],
    groupAdmin: {
      _id: '20',
      avatar: '',
      email: 'test email 20',
      isActivated: true,
      name: 'test name 20',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '21',
    isGroupChat: true,
    name: 'test group chat 21',
    users: [],
    groupAdmin: {
      _id: '21',
      avatar: '',
      email: 'test email 21',
      isActivated: true,
      name: 'test name 21',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '22',
    isGroupChat: true,
    name: 'test group chat 22',
    users: [],
    groupAdmin: {
      _id: '22',
      avatar: '',
      email: 'test email 22',
      isActivated: true,
      name: 'test name 22',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '23',
    isGroupChat: true,
    name: 'test group chat 23',
    users: [],
    groupAdmin: {
      _id: '23',
      avatar: '',
      email: 'test email 23',
      isActivated: true,
      name: 'test name 23',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '24',
    isGroupChat: true,
    name: 'test group chat 24',
    users: [],
    groupAdmin: {
      _id: '24',
      avatar: '',
      email: 'test email 24',
      isActivated: true,
      name: 'test name 24',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '25',
    isGroupChat: true,
    name: 'test group chat 25',
    users: [],
    groupAdmin: {
      _id: '25',
      avatar: '',
      email: 'test email 25',
      isActivated: true,
      name: 'test name 25',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
]

const chats2: Array<IChat> = [
  {
    _id: '26',
    isGroupChat: true,
    name: 'test group chat 26',
    users: [],
    groupAdmin: {
      _id: '26',
      avatar: '',
      email: 'test email 26',
      isActivated: true,
      name: 'test name 26',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '27',
    isGroupChat: true,
    name: 'test group chat 27',
    users: [],
    groupAdmin: {
      _id: '27',
      avatar: '',
      email: 'test email 27',
      isActivated: true,
      name: 'test name 27',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
  {
    _id: '28',
    isGroupChat: true,
    name: 'test group chat 28',
    users: [],
    groupAdmin: {
      _id: '28',
      avatar: '',
      email: 'test email 28',
      isActivated: true,
      name: 'test name 28',
      roles: ['user'],
      createdAt: ''
    },
    createdAt: '',
  },
];

export const dataChats1: IPaginatedData<IChat> = {
  totalNumberOfMatches: 28,
  currentPage: 1,
  limit: 25,
  link: 'api/chats/search',
  data: chats1,
}

export const dataChats2: IPaginatedData<IChat> = {
  totalNumberOfMatches: 28,
  currentPage: 2,
  limit: 25,
  link: 'api/chats/search',
  data: chats2,
}