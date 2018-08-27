import { WOW } from "wowjs";

window.addEventListener("DOMContentLoaded", function() {
  new WOW().init();

  function raf(func) {
    window.requestAnimationFrame(function() {
      func();
    });
  }

  document.querySelector(".toggle-menu").addEventListener("click", function(e) {
    this.firstElementChild.classList.toggle("focus");
    document.querySelector(".collapsed").classList.toggle("show");
    document.querySelector(".top-line").classList.toggle("show");
    document.querySelector(".minilogo").classList.toggle("hide");

    raf(function() {
      document.querySelector(".collapsed").classList.toggle("enter");
    });
  });

  function toggleForms(...arrayBtn) {
    arrayBtn.forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        
        if (btn.id == "btnRegister") {
          document
            .querySelector(".register-container")
            .classList.remove("hide");
          document.querySelector(".auth-container").classList.remove("show");
        } else {
          document.querySelector(".register-container").classList.add("hide");
          document.querySelector(".auth-container").classList.add("show");
        }
      });
    });
  }

  var btnAuth = document.querySelector("#btnAuth");
  var btnReg = document.querySelector("#btnRegister");

  if (btnAuth && btnReg) {
    toggleForms(btnAuth, btnReg);
  }

  window.addEventListener("scroll", function() {
    if (this.pageYOffset) {
      document.querySelector(".top-line").classList.add("scrolling");
    } else {
      document.querySelector(".top-line").classList.remove("scrolling");
    }
  });

  $(window).on("load", function() {
    $(".preloader")
      .delay(1200)
      .fadeOut("slow");
  });
});
