export class CollectionPage<T> {
  constructor(public collection: Array<T> = null,
              public totalElements: number = null) {
  }
}
