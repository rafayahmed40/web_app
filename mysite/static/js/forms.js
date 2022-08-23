

function login(){
    var email = $("#l-email").val();
    var pass = $("#l-pass").val();
    validate_login(email, pass);
}

function register(){
    var name = $("#r-name").val();
    var email = $("#r-email").val();
    var pass = $("#r-pass").val();
    var c_pass = $("#r-cpass").val();
    
    if (pass.length >= 8){
        if (pass === c_pass){
            validate_reg(name, pass, email);
        }
        else{
            alert("Passwords don't match");
        }
    }
    else{
        alert("Password must be 8 or more characters")
    }
}

function validate_login(email, pass){
    data_dict = {
        "email": email,
        "pass": pass
    }
    $.ajax({
        data: data_dict,
        url: "ajax/validate_login",
        success: function(data){
            ret = data['Response'];
            if (ret){
                var link = "home";
                alert("Logged in successfully");
                window.location.href = link;
            }
            else{
                alert("Account not found");
            }

        },
        error: function(xhr, status, error){
            console.log(status);
            console.log(error);
        }
    })
}

function validate_reg(name, password, email){
    data_dict = {
        "email": email
    }
    $.ajax({
        data: data_dict,
        url: "ajax/validate_reg",
        success: function(data){
            ret = data['Response'];
            if (ret){
                save_info(name, password, email);
            }
            else{
                alert("Account already exists under email");
            }
        },
        error: function(xhr, status, error){
        }
    })
}

function save_info(name, email, pass){
    data_dict = {
        "name": name,
        "email": email,
        "pass": pass
    }
    $.ajax({
        data: data_dict,
        url: "ajax/save_info",
        success: function(data){
            ret = data['Response'];
            if (ret){
                var link = "home";
                alert("Account created successfully");
                window.location = link;
            }  

        },
        error: function(xhr, status, error){
            console.log(status);
            console.log(error);
        }
    })
}