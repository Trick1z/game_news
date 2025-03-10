import {
  ButtonDirective,
  TableColorDirective,
  TableDirective,
  TableModule,
} from '@coreui/angular';
import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiServices } from '../apiServices';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-data',
  imports: [
    CommonModule,
    NgFor,
    ButtonDirective,
    HttpClientModule,
    TableDirective,
    TableModule,
    TableColorDirective,
  ],
  templateUrl: './all-data.component.html',
  styleUrl: './all-data.component.scss',
  standalone: true,
})
export class AllDataComponent implements OnInit {
  ngOnInit(): void {
    this.get_data();
  }

  constructor(private http: HttpClient, private base: ApiServices,
    private nav : Router
  ) {}
  main_data: any = [];
  get_data() {
    this.http.get(`${this.base.Api()}/get.main`).subscribe((res: any) => {
      console.log(res);
      this.main_data = res;
    });
  }

  on_edit(getID :number){
    var id = getID.toString()
    sessionStorage.setItem('main_id' , id )
    this.nav.navigateByUrl('game-news/edit')
  }

  on_delete(id:number){
    this.http.put(`${this.base.Api()}/delete.sf_del.ref:mainID=${id}` , id ).subscribe((res:any)=>{
      console.log(res);
      this.get_data()
    })
  }
}
