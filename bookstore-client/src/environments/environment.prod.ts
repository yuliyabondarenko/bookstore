export const environment = {
  production: true,

  server: {
    basePath: 'http://localhost:7070',
    apiPath: 'http://localhost:7070/api'
  },

  ordersPage: {
    pageIndex: 0,
    pageSize: 5
  },

  ordersSort: {
    active: 'date',
    direction: 'desc'
  },

  customerBooksPage: {
    pageIndex: 0,
    pageSize: 12
  },

  customerBooksSort: {
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
