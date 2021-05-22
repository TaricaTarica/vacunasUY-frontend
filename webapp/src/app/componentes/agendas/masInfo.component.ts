import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'masInfo',
    templateUrl: 'dialog-data-example-dialog.html',
  })
  export class masInfo {
    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  }