import { User } from "@app/core/models/user";
export function SetRole(user: User) {
  console.log("setrole user", user);
  console.log("stringify is getting delayed?");
  let u = JSON.stringify(user);
  console.log(u);
  console.log(JSON.parse(u));
  if (JSON.parse(u)) {
    let jwtData = JSON.parse(u).access_token.split(".")[1];
    let decodedJwtJsonData = window.atob(jwtData);
    console.log(decodedJwtJsonData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    console.log(decodedJwtData);
    user.role = decodedJwtData.role;

    user.email = decodedJwtData.email;
  }

  return user;
}
export function GetRole(user: User) {
  let u = JSON.stringify(user);
  let jwtData = JSON.parse(u).access_token.split(".")[1];
  let decodedJwtJsonData = window.atob(jwtData);
  let decodedJwtData = JSON.parse(decodedJwtJsonData);
  user.role = decodedJwtData.roles[0];
  return user.role;
}
