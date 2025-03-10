// my-service.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiServices {
  // base: string = 'www.apiDeploy.com';
  base: string = 'http://127.0.0.1:8000';
  constructor() {}

  // Method that returns a string
  Api(): string {
    return this.base;
  }
}
