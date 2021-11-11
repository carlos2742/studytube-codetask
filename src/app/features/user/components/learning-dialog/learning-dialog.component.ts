import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {LearningService} from "../../../../core/services/learning/learning.service";
import {Learning, User} from "../../../../models/models";

@Component({
  selector: 'app-learning-dialog',
  templateUrl: './learning-dialog.component.html',
  styleUrls: ['./learning-dialog.component.scss']
})
export class LearningDialogComponent {

  public readonly learnings: Learning[];

  constructor(@Inject(MAT_DIALOG_DATA) public user: User,
              private _learning: LearningService) {
    this.learnings = this._learning.findByUserId(user.id);
  }
}
