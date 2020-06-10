import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService as AuthenticationService } from "@app/core/services/auth.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  currentUser;
  navLinks = [];

  links = {
    base: [
      { name: "home", link: "/", icon: "" },
      { name: "other links?", link: "/", icon: "" },
    ],
    participant: [
      { name: "main page", link: "/", icon: "" },
      { name: "statistics", link: "/", icon: "" },
      { name: "account information", link: "/", icon: "" },
    ],
    researcher: [
      { name: "main page", link: "/", icon: "" },
      { name: "selection", link: "selection", icon: "" },

      { name: "project management", link: "/", icon: "" },
      { name: "account information", link: "/", icon: "" },
    ],

    administrator: [
      { name: "main page", link: "/", icon: "" },
      { name: "add researchers", link: "/", icon: "" },
      { name: "add quotas", link: "/", icon: "" },
      { name: "show users", link: "/", icon: "" },
      { name: "manage payouts", link: "/", icon: "" },
      { name: "manage participants", link: "/", icon: "" },
      { name: "manage warnings", link: "/", icon: "" },
      { name: "system log", link: "/", icon: "" },
      { name: "backup", link: "/", icon: "" },
      { name: "MOTD", link: "/", icon: "" },
    ],
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    this.navLinks = this.links.base;
    if (this.currentUser && this.links[this.currentUser.role])
      this.navLinks.push(this.links[this.currentUser.role]);
  }

  ngOnInit(): void {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
  //   selectedStep = 0;
  //   setStep(step: number) {
  //     this.selectedStep = step;
  //   }
  //   steps = [
  //     {
  //       discussion: "translations - not necessary in this version I think",
  //       name: "Home",
  //       role: "any",
  //       color: "warn",
  //       pageTitle: "Mockup Home Page",
  //       notifications: ["example notification"],
  //       description: `
  //       The title of the step or page appears here
  //       `,
  //       assets: [
  //         "assets potentially needed for this step appear here, like",
  //         "image",
  //         "copy",
  //       ],
  //       data: "example data",
  //       html: `
  //     This draft mockup can be used to visually understand the flow of applicants and their data, as well as user interface
  //     components.  It can be a 'living document' and each item can reflect changes or questions within that item. It Should be a good starting point in terms of visualizing and designing the steps of the process.
  //     <ul>
  // <li>The left pane contains buttons, each for a step of the process.  Clicking a button will show information</li>
  // <li>The center pane show a visual representation of that step, or lists the main concepts.</li>
  // <li>The right pane can show other non-visual information from the step for clarity as we develop.</li>
  // <li>We can use the existing Scifriends software as a starting point and update what's needed</li>
  // </ul>
  //     `,
  //     },
  //     {
  //       name: "Facebook ad click",
  //       role: "participant",
  //       pageTitle: "Facebook news feed (or other facebook.com page)",
  //       color: "secondary",
  //       bgColor: "lightblue",
  //       description: "User clicks an ad seen on facebook",
  //       assets: ["facebook ad", "ad image", "ad copy"],
  //       html: `
  //     <img style="width:100%" src="assets/fb.png">
  //     `,
  //     },
  //     {
  //       name: "Qualifying survey",
  //       discussion: "what questions for qualifying survey?",
  //       html: `
  //   Discuss Qualification questions
  //     `,
  //     },
  //     { name: "QS thank you page" },
  //     {
  //       name: "View responses online",
  //       description: "view survey responses online",
  //       role: "researcher",
  //     },
  //     { name: "Qualifying process", role: "researcher" },
  //     {
  //       name: "Select qualified",
  //       role: "researcher",
  //       description:
  //         "select  applicants from leads in system and send notification",
  //       html: `
  //         Discuss Selection process - how changed from previously?
  //           `,
  //     },
  //     {
  //       name: "Participant receives acceptance email",
  //       description: "acceptance email with magic response link",
  //     },
  //     { name: "Magic link verification page" },
  //     { name: "User authenticated->participant" },
  //     {
  //       name: "User can log in; complete demographic profile",
  //     },
  //     {
  //       name: "Select participants for study",
  //       role: "researcher",
  //     },
  //     {
  //       role: "researcher",
  //       name: "Send email invitations",
  //     },
  //     {
  //       name: "**Actual Questionnaire**",
  //       discussion:
  //         "What question logic?  prev. using unipark, how advanced should our logic be etc. .",
  //       html: `
  //         Discuss Survey questions
  //           `,
  //       role: "participant",
  //     },
  //     {
  //       name: "?Send reminders to participants",
  //       role: "researcher",
  //     },
  //     {
  //       name: "Process payments",
  //       role: "researcher",
  //     },
  //     {
  //       name: "?upload new information",
  //       role: "researcher",
  //     },
  //     {
  //       name: "?reconcile payments ",
  //       description: "that didn't go through / view logs and get payment records",
  //       role: "researcher",
  //     },
  //     {
  //       name: "Admin page with full functionality from previous version ",
  //       role: "admin",
  //       description: "that didn't go through / view logs and get payment records",
  //       discussion:
  //         "how should admin interact with researchers given that we're not using unipark - imitate the URL parameter func would be fine",
  //     },
  //     {
  //       name:
  //         "Researcher page with full functionality from previous version - selection, demographics etc ",
  //       description: "that didn't go through / view logs and get payment records",
  //       role: "researcher",
  //     },
  //   ];
}
