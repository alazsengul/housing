var update_site = function(result, your_info) {

    $("#new_card").remove();

    var new_card = $("<div>").attr("class", "card").attr("id", "new_card");

    if (your_info.length !== 0) {

        var card_body = $("<div>").attr("class", "card-body");
        var time = $("<p>").attr("class", "card-text text-center").html("Your selection time: " + your_info["time"]);
        card_body.append(time)

        var table = $("<table>").attr("class", "table table-hover text-center");

        var table_head_row = $("<tr>").append($("<th>").attr("scope", "col").html("Group Size")).append($("<th>").attr("scope", "col").html("Number of Groups Selecting Before You")).append($("<th>").attr("scope", "col").html("Total Number of Groups"));
        var table_head = $("<thead>").append(table_head_row);

        var table_body = $("<tbody>");

        $.each(result, function(i, datum) {

            var table_body_row = $("<tr>");

            table_body_row.append($("<th>").attr("scope", "row").html(datum[0]));
            table_body_row.append($("<td>").html(datum[1]));
            table_body_row.append($("<td>").html(datum[2]));

            table_body.append(table_body_row);

        });

        table.append(table_head).append(table_body);
        new_card.append(card_body).append(table);

    }
    else {

        var card_body = $("<div>").attr("class", "card-body");
        var time = $("<p>").attr("class", "card-text text-center").html("No group/individual found, please double-check inputs above.");
        card_body.append(time)

        new_card.append(card_body)

    }

    $("#input_card").after(new_card);

}

var run_script = function(query, method) {

    $.ajax({

        type: "POST",
        url: "/run_script",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({"query": query, "method": method}),

        success: function(response){

            update_site(response["result"], response["your_info"]);

        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }

    });

}


var submit_handling = function() {

    $("#lottery").attr('class', "form-control");
    $("#group").attr('class', "form-control");
    $("#uni").attr('class', "form-control");
    $(".invalid-feedback").remove();

    if ($("#lottery").val().trim() !== "") {

        if (isNaN($("#lottery").val().trim())) {
            $("#lottery").attr('class', "form-control is-invalid");
            $("#group").after($("<div>").attr('class','invalid-feedback').html("Please enter a number."));
            return
        }

        run_script($("#lottery").val().trim(), "lottery")
    }

    if ($("#group").val().trim() !== "") {
        run_script($("#group").val().trim(), "group")
    }

    if ($("#uni").val().trim() !== "") {

        var correct_uni = new RegExp('^[A-Za-z]{2,3}[0-9]{4}$');

        if (!(correct_uni.test($("#uni").val().trim()))) {
            $("#uni").attr('class', "form-control is-invalid");
            $("#uni").after($("<div>").attr('class','invalid-feedback').html("Please enter a correct UNI."));
            return
        }

        run_script($("#uni").val().trim(), "uni")
    }

}



$(document).ready(function(){

    $("#lottery").keypress(function() {

        $("#group").prop("disabled", true);
        $("#group").attr("placeholder", "");

        $("#uni").prop("disabled", true);
        $("#uni").attr("placeholder", "");


        }).keyup(function() {

        if ($("#lottery").val() === "") {

            $("#group").prop("disabled", false);
            $("#group").attr("placeholder", "Group name");

            $("#uni").prop("disabled", false);
            $("#uni").attr("placeholder", "ab1234");

        }

    });

    $("#group").keypress(function() {

        $("#lottery").prop("disabled", true);
        $("#lottery").attr("placeholder", "");

        $("#uni").prop("disabled", true);
        $("#uni").attr("placeholder", "");


        }).keyup(function() {

        if ($("#group").val() === "") {

            $("#lottery").prop("disabled", false);
            $("#lottery").attr("placeholder", "Lottery #");

            $("#uni").prop("disabled", false);
            $("#uni").attr("placeholder", "ab1234");

        }

    });

    $("#uni").keypress(function() {

        $("#lottery").prop("disabled", true);
        $("#lottery").attr("placeholder", "");

        $("#group").prop("disabled", true);
        $("#group").attr("placeholder", "");


        }).keyup(function() {

        if ($("#uni").val() === "") {

            $("#lottery").prop("disabled", false);
            $("#lottery").attr("placeholder", "Lottery #");

            $("#group").prop("disabled", false);
            $("#group").attr("placeholder", "Group name");

        }

    });


    $('#lottery').keypress(function (e) {

        if (e.which == 13) {
            submit_handling();
        }

    });
    $('#group').keypress(function (e) {

        if (e.which == 13) {
            submit_handling();
        }

    });
    $('#uni').keypress(function (e) {

        if (e.which == 13) {
            submit_handling();
        }

    });

    $("#submit").click(function() {
        submit_handling();
    });

})
