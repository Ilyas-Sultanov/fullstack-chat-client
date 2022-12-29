import { IChat } from "../../../types/chat";

export const userChats: Array<IChat> = [
  {
    _id: "63972642f1adba5fb136df23",
    name: "First group chat",
    isGroupChat: true,
    users: [
      {
        _id: "63909605ff8e15df6eec4c82",
        name: "user1",
        email: "zerocool174@mail.ru",
        avatar: "img/no-avatar.jpg",
        roles: [
          "user"
        ],
        isActivated: true,
        createdAt: "2022-12-07T13:32:53.483Z"
      },
      {
        _id: "639c621b7aa75c727baa73f7",
        name: "user3",
        email: "zerocool176@mail.ru",
        avatar: "img/no-avatar.jpg",
        roles: [
          "user"
        ],
        isActivated: true,
        createdAt: "2022-12-07T13:32:53.483"
      },
      {
        _id: "639c622d7aa75c727baa73f8",
        name: "user4",
        email: "zerocool177@mail.ru",
        avatar: "img/no-avatar.jpg",
        roles: [
          "user",
          "admin"
        ],
        isActivated: true,
        createdAt: "2022-12-07T13:32:53.483"
      }
    ],
    groupAdmin: {
      _id: "63909605ff8e15df6eec4c82",
      name: "user1",
      email: "zerocool174@mail.ru",
      avatar: "img/no-avatar.jpg",
      roles: [
        "user"
      ],
      isActivated: true,
      createdAt: "2022-12-07T13:32:53.483Z"
    },
    createdAt: "2022-12-12T13:01:54.747Z"
  },
  {
    _id: "63a1ce21f706cb848d9a043a",
    name: "Chat One on One",
    isGroupChat: false,
    users: [
      {
        _id: "639740acb24a7dad7be0938c",
        name: "user2",
        email: "zerocool175@mail.ru",
        avatar: "img/no-avatar.jpg",
        roles: [
          "user"
        ],
        isActivated: true,
        createdAt: "2022-12-07T13:32:53.483Z"
      },
      {
        _id: "63909605ff8e15df6eec4c82",
        name: "user1",
        email: "zerocool174@mail.ru",
        avatar: "img/no-avatar.jpg",
        roles: [
          "user"
        ],
        isActivated: true,
        createdAt: "2022-12-07T13:32:53.483Z"
      }
    ],
    createdAt: "2022-12-20T15:00:49.448Z"
  },
  {
    _id: "63a30c4b463fffe3c88ad087",
    name: "Second group chat",
    isGroupChat: true,
    users: [
      {
        _id: "63808c41d01d737336e01a41",
        name: "admin",
        email: "admin@mail.ru",
        avatar: "img/no-avatar.jpg",
        roles: [
          "user",
          "admin"
        ],
        isActivated: true,
        createdAt: "2022-11-25T09:34:57.866Z"
      },
      {
        _id: "63909605ff8e15df6eec4c82",
        name: "user1",
        email: "zerocool174@mail.ru",
        avatar: "img/no-avatar.jpg",
        roles: [
          "user"
        ],
        isActivated: true,
        createdAt: "2022-12-07T13:32:53.483Z"
      },
      {
        _id: "639c62397aa75c727baa73f9",
        name: "user5",
        email: "zerocool178@mail.ru",
        avatar: "img/no-avatar.jpg",
        roles: [
          "user"
        ],
        isActivated: true,
        createdAt: "2022-12-07T13:32:53.483Z"
      }
    ],
    groupAdmin: {
      _id: "63808c41d01d737336e01a41",
      name: "admin",
      email: "admin@mail.ru",
      avatar: "img/no-avatar.jpg",
      roles: [
        "user",
        "admin"
      ],
      isActivated: true,
      createdAt: "2022-11-25T09:34:57.866Z"
    },
    createdAt: "2022-12-21T13:38:19.637Z"
  },
  {
    _id: "63a45cad75bfd474f90e9dfa",
    name: "Chat One on One",
    isGroupChat: false,
    users: [
      {
        _id: "63808c41d01d737336e01a41",
        name: "admin",
        email: "admin@mail.ru",
        avatar: "img/no-avatar.jpg",
        roles: [
          "user",
          "admin"
        ],
        isActivated: true,
        createdAt: "2022-11-25T09:34:57.866Z"
      },
      {
        _id: "63909605ff8e15df6eec4c82",
        name: "user1",
        email: "zerocool174@mail.ru",
        avatar: "img/no-avatar.jpg",
        roles: [
          "user"
        ],
        isActivated: true,
        createdAt: "2022-12-07T13:32:53.483Z"
      }
    ],
    createdAt: "2022-12-22T13:33:33.474Z"
  }
]