import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../entity/user';
import { MatSort, MatTableDataSource, Sort, SortDirection } from '@angular/material';
import { environment } from '../../../../environments/environment';
import { Page } from '../../../../page';
import { UsersPageService } from '../../../service/api/page.service/users.page.service';
import { SessionService } from '../../../service/session.service';
import { DataRestService } from '../../../service/api/data.rest.service';

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

  constructor(private resourceService: DataRestService<User>,
              private usersPageService: UsersPageService) {
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
    //const customerRoleUrl = `${environment.server.apiPath}/userRoles/search/findOneByName?name=CUSTOMER`;
    const customerRoleUrl = `${environment.server.apiPath}/userRoles/3`;

    this.usersPageService.getUsersPageByUserRole(customerRoleUrl, page.pageIndex, page.pageSize, sortParam)
      .then(collectionPage => {
        debugger;
        this.users = collectionPage.collection;
        this.totalElements = collectionPage.totalElements;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.currentPage = page;
        this.dataSource.sort = this.sort;
      });
  }

  deleteUser(user: User) {
    this.resourceService.delete(user).then(() => {
      this.getPage(this.currentPage, this.sort);
    })
  }

  enableDelete(user: User) {
    return user.id !== SessionService.userId;
  }

}
