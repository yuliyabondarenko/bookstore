export class User {
  constructor(public username: string = null,
              public email: string = null,
              public password: string = null,
              public birthday: Date = null,
              public gender: string = null,
              public _links: any = null) {
  }
}
