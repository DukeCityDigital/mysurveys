import { User } from "@app/core/models/user";
export function SetRole(user: User) {
  let u = JSON.stringify(user);
  console.log("stringU", u);
  if (JSON.parse(u)) {
    let jwtData = JSON.parse(u).access_token.split(".")[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    user.role = decodedJwtData.role;
    user.email = decodedJwtData.email;
  }
  console.log("setrole", user);

  return user;
}
export function GetRole(user: User) {
  let u = JSON.stringify(user);
  let jwtData = JSON.parse(u).access_token.split(".")[1];
  let decodedJwtJsonData = window.atob(jwtData);
  let decodedJwtData = JSON.parse(decodedJwtJsonData);
  user.role = decodedJwtData.roles[0];
  console.log("getrole", user);
  return user.role;
}
