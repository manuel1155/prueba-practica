import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit, OnDestroy {

  sub: Subscription = new Subscription;
  empleadosList: any=[];
  done: boolean = false;

  private gridApi!: GridApi;

  columnDefs = [
    {headerName: 'ID', field: 'id', width: 60 },
    {headerName: 'Nombre', field: 'name', width: 200},
    {headerName: 'Apellidos', field: 'last_name', width: 200},
    {headerName: 'F_Nac', field: 'birthday', width: 120,
    cellRenderer: (data:any) => {
      if (data.value) return this.datepipe.transform(data.value, 'dd/MM/yyyy')
      else return '';
    },
  }
];

public defaultColDef: ColDef = {
  sortable: true,
  filter: true,
};

  constructor(
    private http: HttpClient,
    public datepipe: DatePipe,
    private router: Router,
  ) { 
    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  ngOnInit(): void {
    console.log('ngOnInit')
    this.getDataApi();
  }

  getDataApi(){
    let url = 'https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees/manuel_esq';
    this.done=false;
    this.sub = this.http.get(url)
      .subscribe(
        (res: any) => {
          console.log(res);
           if (res.success) {
            this.empleadosList = res.data.employees
            console.log(this.empleadosList);
            this.done=true;
          } else {

          }

        },
        error => console.log('oops', error)
        /* console.log(res);
         */
      );

  }

  goToAddEmployee(){
    this.router.navigate(['/agregar-empleado']);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

}
