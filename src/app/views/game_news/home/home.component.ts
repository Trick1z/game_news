import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiServices } from '../apiServices';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [HttpClientModule,CommonModule,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.get_data();
  }

  constructor(private  nav:Router
    ,private http: HttpClient, private Base: ApiServices) {}
  _data: any = [];
  get_data() {
    this.http.get(`${this.Base.Api()}/get.user.main`).subscribe((res: any) => {
      console.log(res);
      this._data = res;
    });
  }



  // convert times

  convertTime(timestamp: string) {
    const date = new Date(timestamp);

    const day = date.getDate();
    // const month = date.toLocaleString('th-TH', { month: 'long' });
    const month = date.toLocaleString('th-TH', { month: 'short' }); // Use 'short' for abbreviated month
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    const formattedDate = `${day} ${month} ${year}`;
    const formattedTime = `${hours}:${minutes}`;
    return `${formattedDate},${formattedTime}น.`
  }

  goto_page(getid :number){
    var id = getid.toString()
    sessionStorage.setItem('main_id' , id)
    this.nav.navigateByUrl('game-news/info-page')

  }
}
