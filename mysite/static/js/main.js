
$(document).ready(function () {
    $.ajax({
        url: "ajax/get_dropdowns",
        success: function(data){
            console.log(data);
            for (let i = 0; i < data['EMPLOYERS'].length; i++){
                var emp = data['EMPLOYERS'][i];
                var emp_st = `<div class="form-check"><div id="employer_checkboxes"><input class="form-check-input" type="checkbox" id="check1" name="${emp}" value=""><label class="form-check-label">${emp}</label></div></div>`;
                $("#employer_dropdown").append(emp_st);
            }
            for (let i = 0; i < data['MAJORS'].length; i++){
                var major = data['MAJORS'][i];
                var major_st = `<div class="form-check"><div id="major_checkboxes"><input class="form-check-input" type="checkbox" id="check1" name="${major}" value=""><label class="form-check-label">${major}</label></div></div>`;
                $("#major_dropdown").append(major_st);
            }
            for (let i = 0; i < data['LOCATIONS'].length; i++){
                var loc = data['LOCATIONS'][i];
                var loc_st = `<div class="form-check"><div id="location_checkboxes"><input class="form-check-input" type="checkbox" id="check1" name="${loc}" value=""><label class="form-check-label">${loc}</label></div></div>`;
                $("#location_dropdown").append(loc_st);
            }
        }
    })
    $.ajax({
        url: "ajax/get_active",
        success: function(data){
            console.log(data['name']);
            if (data['name'] === null){
                var st = '<li class="nav-item">'
                st = st.concat('<a class="nav-link" href="login">Login</a></li>');
                st = st.concat('<li class="nav-item">');
                st = st.concat('<a class="nav-link" href="register">Register</a></li>');
                $("#nav-container").append(st);
            }
            else{
                var st = '<li class="nav-item dropdown">';
                st = st.concat('<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Account<a>');
                st = st.concat('<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">');
                st = st.concat('<a class="dropdown-item" href="portal">Portal</a>');
                st = st.concat('<a class="dropdown-item" href="javascript:logout()">Logout</a></div></li>')
            
                $("#nav-container").append(st);
            }
        }
    })

});


function logout(){
    $.ajax({
        url: "ajax/logout",
        success: function(data){
            ret = data['Response'];
            if (ret){
                var link = "home";
                alert("Logged out successfully");
                window.location.href = link;
            }

        },
        error: function(xhr, status, error){
            console.log(status);
            console.log(error);
        }
    })
}

function getResults(){
    var majors = "majors=";
    var employers = "employers=";
    var locations = "locations=";
    $('#major_checkboxes input:checked').each(function() {
        var major = $(this).attr('name');
        majors = majors.concat(major.concat("&"));
    });
    $('#employer_checkboxes input:checked').each(function() {
        var employer = $(this).attr('name');
        employers = employers.concat(employer.concat("&"));
    });
    $('#location_checkboxes input:checked').each(function() {
        var location = $(this).attr('name');
        locations = locations.concat(location.concat("&"));
    });
    var query = majors.concat("-", employers, "-", locations);
    var link = "results/-".concat(query);
    window.location.href = link;
}