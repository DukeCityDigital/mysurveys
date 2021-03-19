export function GetStepUrl(user) {
  let returnUrl = "dashboard/profile";
  console.log("getstepurl", user);
  if (user.step == "") {
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
    let step = user.step !== "" ? user.step : "profile";
    returnUrl = "dashboard/" + step;
    if (returnUrl == "dashboard/questionnaire") returnUrl = "questionnaire";
    console.log(returnUrl);
  }
  return returnUrl.trim();
  debugger;
}
