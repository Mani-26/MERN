import Swal from "sweetalert2";

export function dataIncomplete() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Data you entered seems incomplete try to fill all neccesary fields",
  });
}

export function passwordInSufficient() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Password must have atleast 8 characters with 1 Uppercase,1 Lowercase, 1 number and 1 special character",
  });
}
export function somethingWrong() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong",
  });
}
export function userExist() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "You have already registered:) Try Log in!",
  });
}
export function passwordIncorrect() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Your password seems incorrect :(",
  });
}
export function successSignup() {
  Swal.fire({
    title: "Good job!",
    text: "You Successfuly Signed in!",
    icon: "success",
  });
}

export function successLogin() {
  Swal.fire({
    title: "Good job!",
    text: "You Successfuly Logged in!",
    icon: "success",
  });
}
export function userNotExist() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "You have not yet registered:) Try Sign Up!",
  });
}
