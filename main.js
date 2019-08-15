var inputArea = $('#calculator');
var operator = $('.operator');

//Allow only specified keys
var allowedCodes = ['+', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '/', '-', 'Backspace', 'ArrowRight', 'ArrowLeft', '*'];

$(inputArea).bind({
    keydown: function (e) {

        if (allowedCodes.includes(e.key)) {
            $('.warning-container').hide();
            $('.result-container').hide();
            return true;
        } else if(e.key == "Enter"){
            calculatorMain();    
        }else
        {
            return false;
        }
    }
});


// Write the Equation with buttons
$('.number, .operator').on('click', function () {
    var id = event.target.id;
    var input = $('#' + id).text();
    inputArea.val(inputArea.val() + input);
    $('.warning-container').hide();
    $('.result-container').hide();
});

// Delete Equation on button click
$('.delete').on('click', function () {
    deleteInput();
    $('.warning-container').hide();
    $('.result-container').hide();
});

//Delete Function for the Input
function deleteInput() {
    var text = inputArea.val();
    var newtext = text.substr(0, text.length - 1);
    inputArea.val(newtext);
}

//Calculation trigger on click
$(".calculate").on("click", function () {

    calculatorMain();
    
});


//Calculation
function calculatorMain() {
    
    var inputArea = $('#calculator');
    $('.result-container').hide();

    //Separate Numbers and Operators
    string = inputArea.val();

    if (string.length == '') {
        $('.result-container').hide();
        $('#warning').text("Please enter an equation!");
        $('.warning-container').show();


    } else {

        var replaced = string.replace(/[+]/g, ' ').replace(/[-]/g, ' ').replace(/[/]/g, ' ').replace(/[*]/g, ' ');
        var opstring = string.replace(/[0-9]/g, ' ').replace(/\./g, ' ');
        var myArray = replaced.split(" ");
        var operationArray = []

        //Convert Operation Array into numbers
        myArray.forEach(e => {
            operationArray.push(parseFloat(e));
        });

        var myOps = opstring.split(" ");
        myOps = myOps.filter(function (str) {
            return /\S/.test(str);
        });

        var string = $('#calculator').val();
        var orderOperation = ["/", "*", "-", "+"]

        //START LOOPS AND Calculation
        orderOperation.forEach(operation => {
            for (var i = 0; i <= myOps.length; i++) {
                if (myOps[i] === operation) {
                    var a = operationArray[i];
                    var b = operationArray[i + 1];
                    switch (operation) {
                        case "/":
                            var res = a / b;
                            reduceArray();
                            break;
                        case "*":
                            var res = a * b;
                            reduceArray();
                            break;
                        case "+":
                            var res = a + b;
                            reduceArray();
                            break;
                        case "-":
                            var res = a - b;
                            reduceArray();
                            break;
                        default:
                    }
                }
            };
            function reduceArray() {
                operationArray[i] = res;
                operationArray.splice(i + 1, 1);
                myOps.splice(i, 1);
                i = -1;
            };


            if (operationArray.includes(NaN)) {
                $('.result-container').hide();
                $('#warning').text("Please check the equation");
                $('.warning-container').show();
            } else {

                if (res) {
                    $('.warning-container').hide();
                    $('.result-container').show();

                    if (res < 1) {
                        $("#result").text(res.toPrecision(2));
                    } else {
                        $("#result").text(res.toFixed(2));
                    };

                } else {
                    res = operationArray[0];
                    $("#result").text(res.toFixed(2));
                    $('.warning-container').hide();
                    $('.result-container').show();
                }
            }
        })
    };
};