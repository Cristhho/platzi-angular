import { Component, OnDestroy, OnInit } from '@angular/core';

import { EmployeeData } from '../../../core/models/employee.model';
import { GeneratorService } from '../../../core/services/generator.service';
import { Observable } from 'rxjs';

const names = ['nicolas', 'juan', 'felipe', 'maria'];

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  salesList: EmployeeData[] = [];
  bList: EmployeeData[] = [];

  value$!: Observable<number>

  // private sub$!: Subscription

  constructor(
    private generatorService: GeneratorService
  ) {
    this.value$ = generatorService.getData()
  }

  ngOnInit() {
    this.salesList = this.generatorService.generate(names, [10, 20], 10);
    this.bList = this.generatorService.generate(names, [10, 20], 10);

    /* this.sub$ = this.generatorService.getData()
      .subscribe((val) => {
        console.log(val)
        this.value = val
      }) */
  }

  ngOnDestroy(): void {
    console.log()
    // this.sub$.unsubscribe()
  }

  addItem(list: EmployeeData[], label: string) {
    list.unshift({
      label,
      num: this.generatorService.generateNumber([10, 20]),
    });
  }
}
