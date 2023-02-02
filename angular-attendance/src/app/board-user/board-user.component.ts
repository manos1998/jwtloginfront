import { StorageService } from './../_services/storage.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Loggins } from '../models/loggins.model';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  currentUser: any;

  content?: string;
  message?: string;
  date?:string;
  time?: string;
  logged: boolean= false;

  userReport?: string; 

  tutorial: Loggins = {
    id: '',
    loggerid: '',
    login: '',
    logout: ''
  };

  currentDateTime: any;

  constructor(private userService: UserService, private storageService: StorageService, public datepipe: DatePipe, private router: Router ) {
    this.currentDateTime = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss'); 

    setInterval(() =>{
      const currentDate = new Date();
      this.time = currentDate.toLocaleTimeString();
      this.date = currentDate.toLocaleDateString();
    }, 1000);

  }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.userService.getUserBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
  }

  viewUserReport(): void {
    // console.log("--------------"+this.router+"------------------------"+ this.currentUser.id);
    this.router.navigate(['/report'],this.currentUser.id)
  }

  login(): void {
    this.currentUser = this.storageService.getUser();
    this.userService.getUserLoggedIn(this.currentUser.id).subscribe({
      next: data => {
        this.message = data;
        console.log(data);
        this.logged = true;
      },
      error: err => {console.log(err)
        if (err.error) {
          this.message = JSON.parse(err.error).message;
        } else {
          this.message = "Error with status: " + err.status;
        }
      }
    });
  }

  logout(): void {
    this.currentUser = this.storageService.getUser();
    this.userService.getUserLoggedOut(this.currentUser.id).subscribe({
      next: data => {
        this.message = data;
        console.log(data);
        this.logged = true;
      },
      error: err => {console.log(err)
        if (err.error) {
          this.message = JSON.parse(err.error).message;
        } else {
          this.message = "Error with status: " + err.status;
        }
      }
    });
  }
}