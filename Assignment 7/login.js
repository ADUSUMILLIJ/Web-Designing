$(document).ready(function () {
     
    // Initially disable the login button
    $("#submitbtn").prop("disabled", true);

    // Hide all error messages initially
    $(".error-message").hide();

    // Function to validate Username
    let usernameError = true;
    $("#usernames").keyup(function () {
        validateUsername();
    });

    function validateUsername() {
        let usernameValue = $("#usernames").val();
        if (usernameValue.length == "") {
            $("#usercheck").show();
            usernameError = false;
        } else if (usernameValue.length < 3 || usernameValue.length > 10) {
            $("#usercheck").show();
            $("#usercheck").html("**Length of username must be between 3 and 10");
            usernameError = false;
        } else {
            $("#usercheck").hide();
            usernameError = true;
        }
        checkFormValidity();
    }

    // Function to validate Email
    let emailError = true;
    $("#email").keyup(function () {
        validateEmail();
    });

    function validateEmail() {
        let emailValue = $("#email").val();
        let regex = /^[a-zA-Z0-9._%+-]+@(northeastern)\.edu$/;
        if (!regex.test(emailValue)) {
            $("#emailvalid").show();
            emailError = false;
        } else {
            $("#emailvalid").hide();
            emailError = true;
        }
        checkFormValidity();
    }

    // Function to validate Password
    let passwordError = true;
    $("#password").keyup(function () {
        validatePassword();
    });

    function validatePassword() {
        let passwordValue = $("#password").val();
        if (passwordValue.length == "") {
            $("#passcheck").show();
            passwordError = false;
        } else if (passwordValue.length < 3 || passwordValue.length > 10) {
            $("#passcheck").show();
            $("#passcheck").html("**Length of your password must be between 3 and 10");
            passwordError = false;
        } else {
            $("#passcheck").hide();
            passwordError = true;
        }
        checkFormValidity();
    }

    // Function to validate Confirm Password
    let confirmPasswordError = true;
    $("#conpassword").keyup(function () {
        validateConfirmPassword();
    });

    function validateConfirmPassword() {
        let confirmPasswordValue = $("#conpassword").val();
        let passwordValue = $("#password").val();
        if (passwordValue != confirmPasswordValue) {
            $("#conpasscheck").show();
            confirmPasswordError = false;
        } else {
            $("#conpasscheck").hide();
            confirmPasswordError = true;
        }
        checkFormValidity();
    }

    // Function to check form validity and enable/disable login button
    function checkFormValidity() {
        if (usernameError && emailError && passwordError && confirmPasswordError) {
            $("#submitbtn").prop("disabled", false);
        } else {
            $("#submitbtn").prop("disabled", true);
        }
    }

    // Submit button click event
    $("#submitbtn").click(function (event) {
        event.preventDefault(); // Prevent form submission
        
        // Perform login validation here
        var username = $("#usernames").val().trim();
        var email = $("#email").val().trim();

        // Assuming successful login for demonstration purposes
        if (username && email) {
            // Store the logged-in user's information in sessionStorage
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('email', email);

            // Redirect to page2.html
            window.location.href = "page2.html";
        } else {
            alert("Please fill in all fields."); // Display error message if fields are empty
        }
    });
});
