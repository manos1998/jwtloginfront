import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: any;
  selectedDate: Date = new Date();
  username?: string;
  userid?: number;

  constructor(private userService: UserService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
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

  // viewUserReport(id: any): void {
  //   alert(id);
  //   console.log(this.router.navigate([`/report/${id}?date=${this.datePipe.transform(this.selectedDate,"yyyy-MM-dd")}`]));
  // }

  viewAdminUserReport(): void {
    this.router.navigate(['/report/',this.userid,this.datePipe.transform(this.selectedDate,"yyyy-MM-dd")]);
  }

  // viewUserReport(id: any): void {
  //   this.router.navigateByUrl(`${API_URL + 'user'}?title=${this.datePipe.transform(this.selectedDate,"yyyy-MM-dd")}}`);
  // }

  setDate(datee: any, e: Date) {
    datee === (this.selectedDate = e)
  }

  setuser(user: any) {
    this.userid = user
    console.log(user);
  }

  search() {
    console.log(this.username || this.userid);
    console.log(this.datePipe.transform(this.selectedDate,"yyyy-MM-dd"));  
  }
}
