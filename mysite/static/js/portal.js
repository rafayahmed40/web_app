
$(function(){
    $.ajax({
        url: "ajax/get_active",
        success: function(data){
            var name = data['name'];
            $("#name-container").append(`<h1>Welcome, ${name}</h1>`)
    }})
    getJobs();
})

function getJobs(){
    $.ajax({
        url: "ajax/get_jobs",
        success: function(data){
            var jobs = data['jobs'];
            console.log(jobs);
            if (jobs){
                $("#jobs-container").append(`<h1>Jobs Applied:</h1>`);
                for (let i = 0; i < jobs.length; i++){
                    $("#jobs-container").append(`<h6>Jobs Applied: ${jobs[i]}</h6><br>`);
                }
            }
                 
    }})
}

function changeName(){
    
    var name = $("#new-name").val();
    var data_dict = {
        "name": name
    }
    $.ajax({
        data: data_dict,
        url: "ajax/change_name",
        success: function(data){
            alert("Name updated succesfully");
        }
    })
}

function changePass(){
    
    var pass = $("#new-pass").val();
    var c_pass = $("#confirm-new-pass").val();
    console.log(pass);
    if (pass === c_pass){
        var data_dict = {
            "pass": pass
        }
        $.ajax({
            data: data_dict,
            url: "ajax/change_pass",
            success: function(data){
                alert("Passwords updated succesfully");
            }
        })
    }
    else{
        alert("Passwords don't match");
    }
    
}

function changeEmail(){
    var email = $("#new-email").val();
    var data_dict = {
        "email": email
    }
    $.ajax({
        data: data_dict,
        url: "ajax/change_email",
        success: function(data){
            alert("Email updated succesfully");
        }
    })
}

function switchName(){
    $("#switch-name").attr("class", "nav-link active");
    $("#switch-pass").attr("class", "nav-link");
    $("#switch-email").attr("class", "nav-link");

    $("#show-new-name").attr('class', "tab-pane fade show active");
    $("#show-new-pass").attr('class', "tab-pane fade");
    $("#show-new-email").attr('class', "tab-pane fade");

}

function switchPass(){
    $("#switch-pass").attr("class", "nav-link active");
    $("#switch-name").attr("class", "nav-link");
    $("#switch-email").attr("class", "nav-link");

    $("#show-new-pass").attr('class', "tab-pane fade show active");
    $("#show-new-name").attr('class', "tab-pane fade");
    $("#show-new-email").attr('class', "tab-pane fade");
}

function switchEmail(){
    $("#switch-email").attr("class", "nav-link active");
    $("#switch-name").attr("class", "nav-link");
    $("#switch-pass").attr("class", "nav-link");

    $("#show-new-email").attr('class', "tab-pane fade show active");
    $("#show-new-name").attr('class', "tab-pane fade");
    $("#show-new-pass").attr('class', "tab-pane fade");
}