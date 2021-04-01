export function GetStepUrl(user) {
  let localstep = localStorage.getItem("step");

  let returnUrl = "dashboard/profile";
  console.log("getstepurl USER ", user);
  if (localstep == "") {
    localStorage.setItem("step", "");
    return "";
  }

  // if (user.mustVerify) {
  //     returnUrl = "/verify-email";
  // }
  if (user.role === "administrator") {
    returnUrl = "dashboard/settings";
  }
  if (user.role === "researcher") {
    returnUrl = "dashboard/projects";
  }

  if (user.role === "participant") {
    console.log("localstep", localstep);
    // let step = user.step !== "" ? user.step : "profile";
    // console.log("proced step", step);

    returnUrl = "dashboard/" + localstep;
    if (returnUrl == "dashboard/questionnaire") returnUrl = "questionnaire";
    console.log(returnUrl);
  }
  return returnUrl.trim();
  debugger;
}
