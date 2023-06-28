import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import { ResponseUsers } from '@models/user.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit{
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  user: ResponseUsers | null;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }


  ngOnInit(): void {
    this.authService.getProfile()
    .subscribe(user=>{
      this.user = user
    })
  }
  profile(){

  }
}
