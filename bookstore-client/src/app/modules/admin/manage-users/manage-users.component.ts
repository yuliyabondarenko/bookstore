import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../entity/user';
import { MatSort, MatTableDataSource, Sort, SortDirection } from '@angular/material';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../service/api/user.service';
import { Page } from '../../../../page';
import { UsersPageService } from '../../../service/api/page.service/users.page.service';
import { SessionService } from '../../../service/session.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: Array<User>;
  dataSource: MatTableDataSource<User>;
  currentPage = environment.manageUsersPage;
  totalElements: number;
  displayedColumns = ['id', 'name', 'email', 'gender', 'birthday', 'actions'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService,
              private collectionPageService: UsersPageService) {
  }

  ngOnInit(): void {
    this.sort.active = environment.manageUsersSort.active;
    this.sort.direction = environment.manageUsersSort.direction as SortDirection;
    this.getPage(this.currentPage, this.sort);
  }

  sortData(sort: Sort) {
    this.getPage(this.currentPage, sort);
  }

  getPage(page: Page, sort: Sort) {
    const sortParam = `${sort.active},${sort.direction}`;

    this.collectionPageService.getCollectionPage(page.pageIndex, page.pageSize, sortParam)
      .then(collectionPage => {
        this.users = collectionPage.collection;
        this.totalElements = collectionPage.totalElements;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.currentPage = page;
        this.dataSource.sort = this.sort;
      });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).then(() => {
      this.getPage(this.currentPage, this.sort);
    })
  }

  enableDelete(user: User) {
    return user.id !== SessionService.userId;
  }

}
