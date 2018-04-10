export const environment = {
  production: true,

  apiUrl: 'http://localhost:7070',

  ordersPage: {
    pageIndex: 0,
    pageSize: 5
  },

  ordersSort: {
    active: 'date',
    direction: 'desc'
  },

  userBooksPage: {
    pageIndex: 0,
    pageSize: 12
  },

  userBooksSort: {
    active: 'absent',
    direction: 'asc'
  },

  manageBooksPage: {
    pageIndex: 0,
    pageSize: 10
  },

  manageBooksSort: {
    active: 'id',
    direction: 'desc'
  },

  manageUsersPage: {
    pageIndex: 0,
    pageSize: 10
  },

  manageUsersSort: {
    active: 'id',
    direction: 'desc'
  }
};
