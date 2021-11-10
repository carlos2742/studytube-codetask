import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../core/services/data/data.service";
import {Observable} from "rxjs";
import {User} from "../../../models/models";
import {switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public users: User[];
  public total: number;

  constructor(private data:DataService) {
    this.data.users(0,3).subscribe(
      ({data, total}) => {
      this.users = data;
      this.total = total;
    });
  }

  ngOnInit(): void {}

}
