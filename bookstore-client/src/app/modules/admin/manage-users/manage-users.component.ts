import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../entity/user';
import { MatSort, MatTableDataSource, Sort, SortDirection } from '@angular/material';
import { environment } from '../../../../environments/environment';
import { Page } from '../../../../page';
import { UsersPageService } from '../../../service/api/page.service/users.page.service';
import { SessionService } from '../../../service/session.service';
import { DataRestService } from '../../../service/api/data.rest.service';
import { RoleService } from '../../../service/api/page.service/role.service';

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
  customerRoleUrl: string;
  SEARCH_USER_ROLE = 'CUSTOMER';

  constructor(private resourceService: DataRestService<User>,
              private roleService: RoleService,
              private usersPageService: UsersPageService) {
  }

  ngOnInit(): void {
    this.sort.active = environment.manageUsersSort.active;
    this.sort.direction = environment.manageUsersSort.direction as SortDirection;
    this.roleService.getRoleUrlByName(this.SEARCH_USER_ROLE)
      .then(roleUrl => {
        this.customerRoleUrl = roleUrl;
        this.getPage(this.currentPage, this.sort);
      });
  }

  sortData(sort: Sort) {
    this.getPage(this.currentPage, sort);
  }

  getPage(page: Page, sort: Sort) {
    const sortParam = `${sort.active},${sort.direction}`;

    this.usersPageService.getUsersPageByUserRole(this.customerRoleUrl, page.pageIndex, page.pageSize, sortParam)
      .then(collectionPage => {
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
