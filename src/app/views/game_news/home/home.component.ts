import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiServices } from '../apiServices';
@Component({
  selector: 'app-home',
  imports: [HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  ngOnInit(): void {
    this.get_data()
  }

  constructor(
    private http :HttpClient,
    private Base :ApiServices
  ){}

  get_data(){
    this.http.get(`${this.Base.Api()}/get.user.main`).subscribe((res:any) =>{
      console.log(res);

    })
  }
}
