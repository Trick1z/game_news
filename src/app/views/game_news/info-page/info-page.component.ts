import { Component, OnInit } from '@angular/core';
import { ApiServices } from '../apiServices';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgIf } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-info-page',
  imports: [HttpClientModule, CommonModule, NgIf],
  templateUrl: './info-page.component.html',
  styleUrl: './info-page.component.scss',
})
export class InfoPageComponent implements OnInit {
  ngOnInit(): void {
    this.setid();

  }

  constructor(private http: HttpClient, private Base: ApiServices,
    private sanitizer: DomSanitizer
  ) {}

  //code start here
  videoUrl: SafeResourceUrl | null = null;
  SteamUrl: SafeResourceUrl | null = null;

  _data: any = {};
  setid() {
    var getid = sessionStorage.getItem('main_id') || '0';
    var id = parseInt(getid);

    this.get_data(id);
  }
  get_data(id: number) {
    this.http
      .get(`${this.Base.Api()}/get.user.detail/ref_mainid=${id}`)
      .subscribe((res: any) => {
        console.log(res[0]);
        this._data = res[0];
        this.videoUrl = this.sanitizeUrl( this._data.YOUTUBE);
        this.SteamUrl = this.sanitizeUrl( this._data.STEAM);

      });
  }



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
    return `${formattedDate},${formattedTime}น.`;
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
