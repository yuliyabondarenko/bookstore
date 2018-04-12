import { Component, Input, OnInit } from '@angular/core';
import { LocalShoppingCartService } from '../../../service/local-shopping-cart.service';
import { Book } from '../../../entity/book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;

  constructor(private localShoppingCartService: LocalShoppingCartService) {
  }

  ngOnInit() {
  }

  addToCart() {
    this.localShoppingCartService.addBookToCart(this.book);
  }

  get isInCart() {
    return this.localShoppingCartService.isBookInCart(this.book);
  }
}
