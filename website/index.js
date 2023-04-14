//awaiting new values for 2 new things that replaced 2 things.


//-----------------------------------------------------------------------------
//ADD FORMS FUNCTIONS

function addOilForm() {
    var oil_str = "";
    oil_str += '<select class="form-control oil" required>' +
        '<option value="">Choose Oil</option>' +
        '<option value="olive">olive</option>' +
        '<option value="coconut">coconut</option>' +
        '<option value="sunflower">sunflower</option>' +
        '<option value="apricot">apricot</option>' +
        '<option value="castor">castor</option>' +
        '<option value="hemp">hemp</option>' +
        '<option value="babassu">babassu</option>' +
        '</select>';
    $('.oil-div').append(oil_str);
}

function addGramsForm() {
    var gram_str = "";
    gram_str += '<input type="text" class="form-control grams" value="" required/>';
    $('.gram-div').append(gram_str);
}

//-----------------------------------------------------------------------------
//SUBTRACT FORMS FUNCTIONS

function subOilForm() {
    $('.oil:last').remove();
}

function subGramsForm() {
    $('.grams:last').remove();
}

//-----------------------------------------------------------------------------
//EVENT TO ADD FORM ENTRIES

var MAX_FORM_ENTRY = 8;

$('.button-add').on('click', function () {
    if ($('.oil').length >= MAX_FORM_ENTRY) {
        alert("Cannot be more than (" + $('.oil').length + ") long");
    } else {
        addOilForm();
        addGramsForm();
    }
});

//-----------------------------------------------------------------------------
//EVENT TO SUBTRACT FORM ENTRIES

$('.button-sub').on('click', function () {
    if ($('.oil').length <= 1) {
        alert("Cannot be less than (" + $('.oil').length + ") short");
    } else {
        subOilForm();
        subGramsForm();
    }
});

//-----------------------------------------------------------------------------
//EVENT TO CALCULATE

$('#soapForm').submit(function (evt) {
    evt.preventDefault();

    var x_max = $('.oil').length;
    //alert(x_max);
    var oil_array = [];
    var grams_array = [];
    var superfat = $("#superfat").val();
    var total_lye = 0;

    var x;

    //get the oil number values and the grams values into their own arrays
    for (x = 0; x < x_max; x++) {
        //need the "" and need the + so it works as a variable
        var a = $(".oil:eq(" + x + ") option:selected").val();
        oil_array.push(whichOil(a));
        //alert(a);

        var b = $(".grams:eq(" + x + ")").val();
        grams_array.push(b);
        //alert(b);

    }
    //alert(oil_array + " oil array");
    //alert(grams_array + " grams array");

    //calculating total lye part one
    for (x = 0; x < x_max; x++) {
        var temp = oil_array[x] * grams_array[x];
        //alert(temp + " temp");

        total_lye += temp;
    }
    //alert(total_lye + " lye before superfat");

    //calculating total lye part two
    superfat = 1 - (superfat / 100);

    //alert(superfat + " superfat");

    total_lye = total_lye * superfat;

    //using toFixed, is apparently a string now
    total_lye = total_lye.toFixed(4);

    //alert(total_lye + " the TOTAL LYE");

    //so it displays in the form spot for it
    $('#total-lye').val(total_lye);
});

//-----------------------------------------------------------------------------
//SWITCH STATEMENT FOR OILS

function whichOil(oilName) {
    switch (oilName) {

    case "olive":
        return 0.134;

    case "coconut":
        return 0.190;

// TODO: add sunflower and apricot values

    /*case "nuu":
        return 0;

    case "nuu":
        return 0;
        */

    case "castor":
        return 0.128;

    case "hemp":
        return 0.136;

    case "babassu":
        return 0.175;
    }
}

//SAP_OLIVE = 0.134
//SAP_COCONUT = 0.190
//SAP_sunflower = 0
//SAP_apricot = 0
//SAP_CASTOR = 0.128
//SAP_HEMP = 0.136
//SAP_BABASSU = 0.175

//-----------------------------------------------------------------------------
