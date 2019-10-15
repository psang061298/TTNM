import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminClassService } from '../../../services/admin-class.service'


@Component({
  selector: 'app-admin-base',
  templateUrl: './admin-base.component.html',
  styleUrls: ['./admin-base.component.scss']
})
export class AdminBaseComponent implements OnInit {

  isAdmin = false;

  constructor(
    public routerService: Router,
    private adminClassService : AdminClassService

  ) { }

  ngOnInit() {
    if (localStorage.getItem('username') === 'admin') {
      this.isAdmin = true;
    }
    if (!this.adminClassService.load) {
      this.adminClassService.load = true;
      this.refresh();
    }
    
  }

  refresh(): void {
    window.location.reload();
  }

  async reload() {
    await new Promise(resolve => setTimeout(()=>resolve(), 10)).then(()=>window.location.reload());
  }


  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('access_token');
  }

}
