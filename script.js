const linkTab = document.querySelectorAll(".tab--link");

let theme = localStorage.getItem("theme");
if(theme){
    console.log(theme)
   $('body').addClass(theme);
   $(".theme--switcher .sr-only").text(theme == "dark" ? "click here to switch into theme into light mode" : "click here to switch into theme into dark mode");
   theme == "dark" ?  $(".theme--switcher").addClass("theme--switcher__light"):  $(".theme--switcher").removeClass("theme--switcher__light");
}
$(".theme--switcher").click(function(){
  theme = localStorage.getItem("theme");
  $('body').removeClass(theme)
  if(theme) {
      console.log(theme);
      $(this).find(".sr-only").text(!(theme == "dark") ? "click here to switch into theme into light mode" : "click here to switch into theme into dark mode");
      mode =  theme == "dark" ? "light" : "dark";
      theme == "dark" ?  $(".theme--switcher").removeClass("theme--switcher__light"):  $(".theme--switcher").addClass("theme--switcher__light");
  }else {
      $(this).text("click here to switch into theme into light mode");
      mode = "dark" 
      $(this).addClass("theme--switcher__light");
  }
  $('body').addClass(mode)
  localStorage.setItem("theme",mode); 
});

//Scroll spy
$(window).scroll(function() {
    ScrollTop = $(this).scrollTop();
    let headerHeight = $(".header").outerHeight();
    $(".header nav ul li a").each(function() {
      currentlink = $(this);
      if(currentlink.attr("data-attr") != undefined) {
          if($(currentlink.attr("data-attr")).offset().top - headerHeight <=  ScrollTop){
            $(".header nav ul li a").removeClass("nav__active");
            currentlink.addClass("nav__active");
          }
          else {
            currentlink.removeClass("nav__active");
          }
      }
    });
  });
  const hamburger =  $(".hamburger");
  const nav = $("header nav");
  $(document).ready(function() {
      $(".header nav ul li a").click(function(e) {
        let headerHeight = $(".header").outerHeight();
        e.stopPropagation();
        currentlink = $(this);
        if(currentlink.attr("data-attr") != undefined) {
        var refElement = $(currentlink.attr("data-attr"));
        var top = refElement.offset().top - headerHeight;
        $("HTML, BODY").animate({ scrollTop: top }, 1000)
      }
      });
      let intervalId = false;
      function interval() {
           intervalId = setInterval(function () {
            moveRight();
          }, 5000);
      }
      interval();
      $(".slider--control button").on("click", function() {
        clearInterval(intervalId)
        let button = $(this);
        let buttonattr = button.attr("data-dot");
        $(".slider--control button").removeClass("slider--dot__active");
        button.addClass("slider--dot__active");
        $(".slider--slide").removeClass("slider--slide__active")
        $(".slider--content").find(`[data-slide='${buttonattr}']`).addClass("slider--slide__active");
        interval();
      });
      hamburger.on("keyup", function(e) {
        if(e.keyCode == 13) {
            if($(this).hasClass("hamburger__active")) {
                $(this).attr({
                    'aria-expanded':false,
                    'aria-label': 'click here to close menu'
                });
            } else {
                $(this).attr({
                'aria-expanded':true,
                'aria-label': 'click here to open menu'
            });
            }}
            openNav();
      });
      hamburger.on("click", function(e) { 
          if($(this).hasClass("hamburger__active")) {
            $(this).attr({
                'aria-expanded':false,
                'aria-label': 'click here to close menu'
            });
        } else {
            $(this).attr({
            'aria-expanded':true,
            'aria-label': 'click here to open menu'
        });
        }
          openNav();
      });
      $(".expand-icon").click(function(e) {
          e.stopPropagation();
          if($(this).hasClass("expended")) {
            $(this).attr({
                'aria-expanded':false,
                'aria-label': 'click here to close menu'
            });
        } else {
            $(this).attr({
            'aria-expanded':true,
            'aria-label': 'click here to open menu'
        });
        }
          $(this).toggleClass("expended");
          $(this).parent().next().toggleClass("sub-menu__open");
      })
    })
    $(".expand-icon").on('keyup',function(e) {
        if(e.keyCode == 13) {
            e.stopPropagation();
            if($(this).hasClass("expended")) {
            $(this).attr({
                'aria-expanded':false,
                'aria-label': 'click here to close menu'
            });
        } else {
            $(this).attr({
            'aria-expanded':true,
            'aria-label': 'click here to open menu'
        });
        }
        $(this).toggleClass("expended");
        $(this).parent().next().toggleClass("sub-menu__open");
    }
  })
    function openNav() {
        hamburger.toggleClass("hamburger__active");
        nav.toggleClass("nav__open");
        tabOrder(".nav__open", true);
    }

    // Keep tabbing within active Mobile menu div.
    function tabOrder(elemt, firstFocus) {
        var $element = $(elemt);
        var inputs = $element.find('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        var firstInput = inputs.first();
        var lastInput = inputs.last();
        /*set focus on first input*/
        if (firstFocus == true) {
            setTimeout(function(){
                firstInput.focus();
            }, 100);
        }

        /*redirect last tab to first input*/
        lastInput.on('keydown', function (e) {
            if ((e.which === 9 && !e.shiftKey)) {
                e.preventDefault();
                firstInput.focus();
            }
	});

        /*redirect first shift+tab to last input*/
        firstInput.on('keydown', function (e) {
            if ((e.which === 9 && e.shiftKey)) {
                e.preventDefault();
                lastInput.focus();
            }
        });
    }

    function moveRight() {
        let activeSlide = $(".slider--slide__active");
        let activedot = $(".slider--dot__active");
        if(activeSlide.is(":last-child")) {
            $(".slider--slide").removeClass("slider--slide__active");
            $(".slider--control button").removeClass("slider--dot__active");
            $(".slider--slide").eq(0).addClass("slider--slide__active");
            $(".slider--control").find("button").eq(0).addClass("slider--dot__active");
        }else {
            $(".slider--slide").removeClass("slider--slide__active");
            $(".slider--control button").removeClass("slider--dot__active");
            activeSlide.next().addClass("slider--slide__active");
            activedot.parent().next().find("button").addClass("slider--dot__active");
        }
    };

for (var i = 0 ; i < linkTab.length; i++) {
    linkTab[i].addEventListener("click", function() {
        let tabContent = document.querySelectorAll("[data-tabid]");

        tabContent.forEach(function(value, index, arr) {
            arr[index].classList.remove("tab__active")
        });
        this.classList.add("tab__active");
        let tabLink = this.getAttribute("data-tabid");
        let linkedTab = document.querySelector(`.tab--content[data-tabid=${tabLink}]`);
        linkedTab.classList.add("tab__active");
    })
}

// Form validation
const fullName = document.querySelector("#fullname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const comment = document.querySelector("#comment");
const infoText = document.querySelector("#frm--error");
const submitBtn = document.querySelector("#submit-btn");
fullName.addEventListener("blur", () => {
    if(fullName.value.trim()=="") {
        showalert("please enter your full name");
        return false
    }
})
const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
email.addEventListener("blur", () => {
    if(!email.value.toLowerCase().match(emailRegex)) {
        showalert("please enter a valid email address");
        return false;
    }
})

const passwordRegex = /^(?=.*?[#?!@$%^&*-]).{8,}/gm;
password.addEventListener("blur", () => {
    if(!password.value.toLowerCase().match(passwordRegex)) {
        showalert("8 digit password with must use of some special characters");
        return false;
    }
})
confirmPassword.addEventListener("blur", () => {
    if(!(confirmPassword.value ===  password.value)) {
        showalert("confirm pwassword and password must be same");
        return false;
    }
})
comment.addEventListener("blur", () => {
    if(!(comment.value.length >= 150)) {
        showalert("comment length must be garter tahn or equal to 150 char");
        return false;
    }
})
let showalert = (massage) => {
    infoText.innerText = massage;
    infoText.style.display = "block";
    setTimeout(() => {
      infoText.style.display = "none";
    }, 5000);
  };

  $(document).ready(function() {
    $("#formvalidate").on('keyup', '.form--item .reqired', function(e){
        let Disabled = true;
        $(".form--item .reqired").each(function() {
            let disableValue = !(fullName.value.trim()=="") && email.value.toLowerCase().match(emailRegex) && password.value.match(passwordRegex) && (confirmPassword.value ===  password.value) &&  (comment.value.length >= 150);
            console.log(disableValue);
            if(disableValue) {
                submitBtn.removeAttribute("disabled")
            }else {
                submitBtn.setAttribute("disabled", true)
            }
          });
        })
})