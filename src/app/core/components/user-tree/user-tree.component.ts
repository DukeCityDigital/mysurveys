import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "@app/core/services/user.service";

@Component({
  selector: "app-user-tree",
  templateUrl: "./user-tree.component.html",
  styleUrls: ["./user-tree.component.scss"],
})
export class UserTreeComponent implements OnInit {
  data = [];

  constructor(private uService: UserService) {}

  ngOnInit(): void {
    console.log(this.data);
    this.getUserTable();
  }

  getUserTable() {
    this.uService.get_user_table().subscribe((users: any) => {
      console.log(users);
      users.data.forEach((element) => {
        element.show = false;
      });
      console.log(users.data);
      this.data = users.data;
    });

    // this.pService.getAll().subscribe((projects: any) => {
    //   this.projects = projects.data;
    // });
  }
}
