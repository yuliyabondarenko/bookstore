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

  adminBooksPage: {
    pageIndex: 0,
    pageSize: 10
  },

  adminBooksSort: {
    active: 'id',
    direction: 'desc'
  }
};
