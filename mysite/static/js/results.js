

$(document).ready(function () {
    var link = window.location.href;
    updateResults(link);

});

function updateResults(link){
    var arr = link.split("-");
    var majors = arr[1];
    var employers = arr[2];
    var locations = arr[3];
    

    majors = majors.split("=")[1];
    locations = locations.split("=")[1];
    employers = employers.split("=")[1];
    majors = majors.split("&");
    
    locations = locations.split("&");
    employers = employers.split("&");
    majors = majors.slice(0,majors.length-1);
    locations = locations.slice(0, locations.length-1);
    employers = employers.slice(0, employers.length-1);

    data_dict = {
        "majors":majors,
        "locations":locations,
        "employers":employers
    }
    console.log(data_dict);
    $.ajax({
        data: data_dict,
        url: "ajax/get_results",
        success: function(data){
            addDropdowns(data['JOBS']);
        },
        error: function(xhr, status, error){
            console.log(status);
            console.log(error);
        }
    })
}

function addDropdowns(data){
    console.log(data);
    for (let i = 0; i < data.length; i++){
        var job = data[i];
        var title = job['Title'];
        var description = job['Description'];
        var positions = job['Positions'];
        var location = job['Location'];
        var majors = job['Majors'];
        var image = job['Image']
        var majors_st = ""
        for (let j = 0; j < majors.length; j++){
            majors_st = majors_st.concat(majors[j], ",");
        }
        majors_st = majors_st.slice(0, majors_st.length-1);


        var div_st = '<div class="card" style="width: 35rem; left: 20%;">';
        div_st = div_st.concat(`<img class="card-img-top" src="${image}" alt="Card image cap">`);
        div_st = div_st.concat('<div class="card-body">');
        div_st = div_st.concat(`<p class="card-text"><h6>Title: ${title}</h6></p>`);
        div_st = div_st.concat(`<p class="card-text"><h6>Positions: ${positions}</h6></p>`);
        div_st = div_st.concat(`<p class="card-text"><h6>Location: ${location}</h6></p>`);
        div_st = div_st.concat(`<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#data-${i}" aria-expanded="false" aria-controls="collapseExample">View Description</button>`);
        div_st = div_st.concat(`<div class="collapse" id="data-${i}">`);
        div_st = div_st.concat(`<br><div class="card card-body">`);
        div_st = div_st.concat(`<h6>${description}<h6></div></div></div><br>`);

        $('#res-container').append(div_st);

    }
}
