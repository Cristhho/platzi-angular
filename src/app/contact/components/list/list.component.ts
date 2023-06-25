import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { EmployeeData } from '../../../core/models/employee.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  @Input()
  title = ''

  @Input()
  data: EmployeeData[] = []

  @Output() add = new EventEmitter<string>();

  label = ''

  addItem() {
    this.add.emit(this.label);
    this.label = ''
  }
}
