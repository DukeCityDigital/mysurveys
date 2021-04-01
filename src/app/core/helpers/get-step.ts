export function GetStepUrl(user) {
  let returnUrl = "dashboard/profile";
  console.log("getstepurl USER ", user);
  if (user.step == "") {
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
    let localstep = localStorage.getItem("step");
    console.log("localstep", localstep);
    let step = user.step !== "" ? user.step : "profile";
    console.log("proced step", step);
    if (localstep) {
      step = localstep;
    }
    console.log("userstep", step);

    returnUrl = "dashboard/" + step;
    if (returnUrl == "dashboard/questionnaire") returnUrl = "questionnaire";
    console.log(returnUrl);
  }
  return returnUrl.trim();
  debugger;
}
