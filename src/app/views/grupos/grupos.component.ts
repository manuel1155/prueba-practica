import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  done: boolean = false;
  groupList: any = [];
  groupListFilter: any = [];
  sub: Subscription = new Subscription;
  currentGroup: any;
  empleadosList: any = [];

  masterSelected: boolean;

  checkedList: any;

  conEmpleados = false;
  verEmpleados = false;

  constructor(
    private http: HttpClient,
  ) {
    this.masterSelected = false;
  }

  ngOnInit(): void {
    this.getGrupos();
  }

  getGrupos() {
    let url = 'https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/groups/manuel_esq';

    this.done = false;
    this.sub = this.http.get(url)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.success) {
            this.groupList = res.data.groups
            this.groupListFilter = this.groupList;
            console.log(this.groupList);
            this.done = true;
          } else {

          }

        },
        error => console.log('oops', error)
        /* console.log(res);
         */
      );

  }

  getEmpPorGrupo(group: any) {
    this.conEmpleados = false;
    this.verEmpleados = false;
    this.currentGroup = group;
    let url = 'https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/manuel_esq/getByGroup?id=' + this.currentGroup.id.toString();
    console.log(url);
    this.sub = this.http.get(url)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.success) {
            this.empleadosList = res.data.employees;
            for (let e of this.empleadosList) e['isSelected'] = false;
            this.conEmpleados = true;
          } else {
            this.conEmpleados = false;
            this.verEmpleados = false;
          }

        },
        error => {
          console.log('oops', error);
          this.conEmpleados = false;
          this.verEmpleados = false;
        }
        /* console.log(res);
         */
      );

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  filterGroup($event: any) {
    console.log($event.target.value);
    var query = $event.target.value;
    this.groupListFilter = this.groupList.filter((el: any) => el.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }

  checkUncheckAll() {
    for (var i = 0; i < this.empleadosList.length; i++) {
      this.empleadosList[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  // Check All Checkbox Checked
  isAllSelected() {
    this.masterSelected = this.empleadosList.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemList();
  }

  // Get List of Checked Items
  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.empleadosList.length; i++) {
      if (this.empleadosList[i].isSelected)
        this.checkedList.push(this.empleadosList[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }


  verSelect() {
    this.getCheckedItemList();
    console.log(this.checkedList)
    this.verEmpleados = true;
  }

}
