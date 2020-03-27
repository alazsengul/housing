var update_site = function(result, your_info) {

    var new_card = $("<div>").attr("class", "card");

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
    new_card.append(table);

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

    if ($("#lottery").val().trim() !== "") {
        run_script($("#lottery").val().trim(), "lottery")
    }

    if ($("#group").val().trim() !== "") {
        run_script($("#group").val().trim(), "group")
    }

    if ($("#uni").val().trim() !== "") {
        run_script($("#uni").val().trim(), "uni")
    }

}



$(document).ready(function(){

    $("#lottery").keypress(function() {

        $("#group").prop("disabled", true);
        $("#group").attr("placeholder", "");


        }).keyup(function() {

        if ($("#lottery").val() === "") {

            $("#group").prop("disabled", false);
            $("#group").attr("placeholder", "Group name");

        }

    });

    $("#group").keypress(function() {

        $("#lottery").prop("disabled", true);
        $("#lottery").attr("placeholder", "");


        }).keyup(function() {

        if ($("#group").val() === "") {

            $("#lottery").prop("disabled", false);
            $("#lottery").attr("placeholder", "Lottery #");

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
