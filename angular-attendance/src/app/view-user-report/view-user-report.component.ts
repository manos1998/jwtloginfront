import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loggins } from '../models/loggins.model';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-view-user-report',
  templateUrl: './view-user-report.component.html',
  styleUrls: ['./view-user-report.component.css']
})
export class ViewUserReportComponent implements OnInit {
  currentUser: any;
  userReport?: any; 
  message?: string;

  constructor(private userService: UserService, private storageService: StorageService, private route: ActivatedRoute,) {
  }

   

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    console.log("------------------------"+this.route.snapshot.params["id"]);
    this.userService.getUserViewReport(this.currentUser.id).subscribe({
      next: data => {
        this.userReport = data;
        console.log(data);
      },
      error: err => {console.log(err)
        if (err.error) {
          this.userReport = JSON.parse(err.error).message;
        } else {
          this.message = "Error with status: " + err.status;
        }
      }
    });
  }

}
