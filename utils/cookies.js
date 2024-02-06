import Cookies from "js-cookie";

export function setTokenCookie(token) {
  Cookies.set("token", token, { expires: 1 / 24 }); // Token expires in 1 hour
}

export function getTokenCookie() {
  return Cookies.get("token");
}

export function removeTokenCookie() {
  Cookies.remove("token");
}
