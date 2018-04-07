import { Component, Inject, Input, OnInit } from '@angular/core';
import { BookPriceCount } from '../../entity/book-price-count';

@Component({
  selector: 'app-book-price-count',
  templateUrl: './book-price-count.component.html',
  styleUrls: ['./book-price-count.component.css']
})
export class BookPriceCountComponent implements OnInit {
  @Input() bookPriceCountInfo: BookPriceCount [];
  displayedColumns = ['bookName', 'price', 'count'];

  @Input() showHeader: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
