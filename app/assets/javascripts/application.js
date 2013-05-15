//= require lib_pre/jquery
//= require lib_pre/jquery-migrate-1.1.1.js
//= require jquery_ujs
//= require lib_pre/underscore-min
//= require_directory ./lib_pre
//= require twitter/bootstrap
//= require_directory ./lib_logic
//= require_directory ./lib_post

// dropdown fix
$('.dropdown-toggle').dropdown();
$('.dropdown-menu').find('form').click(function (e) {
    e.stopPropagation();
});

$(document).ready(function () {
    window.onpopstate = function (event) {
        //console.log("popstate");
        if (event.state != null) {
            handle_state(event.state);
        }
    }
});