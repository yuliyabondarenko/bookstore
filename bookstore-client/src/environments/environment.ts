// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,

  server: {
    basePath: `http://localhost:7070`,
    apiPath: `http://localhost:7070/api`
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
