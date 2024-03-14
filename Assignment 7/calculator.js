$(document).ready(() => {
    $('#add').click(() => performOperation('add'));
    $('#subtract').click(() => performOperation('subtract'));
    $('#multiply').click(() => performOperation('multiply'));
    $('#divide').click(() => performOperation('divide'));

    // Validate input fields on keyup
    $('#number1, #number2').keyup(() => {
        validateInputs();
    });
});

const performOperation = operation => {
    // Validate inputs before performing operation
    if (!validateInputs()) {
        return;
    }

    const num1 = parseFloat($('#number1').val());
    const num2 = parseFloat($('#number2').val());
    let result;

    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            result = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero';
            break;
        default:
            result = 'Invalid operation';
    }

    $('#result').val(result);
};

const validateInputs = () => {
    const num1 = $('#number1').val().trim();
    const num2 = $('#number2').val().trim();

    // Validate number1
    if (num1 === '') {
        $('#number1-error').text('Number 1 is required').show();
        $('#number2-error').hide(); // Hide error for number2
        return false;
    } else {
        $('#number1-error').hide();
    }

    // Validate number2
    if (num2 === '') {
        $('#number2-error').text('Number 2 is required').show();
        $('#number1-error').hide(); // Hide error for number1
        return false;
    } else {
        $('#number2-error').hide();
    }

    // Validate numeric input for number1
    if (isNaN(parseFloat(num1)) || !isFinite(num1)) {
        $('#number1-error').text('Please enter a valid number').show();
        return false;
    } else {
        $('#number1-error').hide();
    }

    // Validate numeric input for number2
    if (isNaN(parseFloat(num2)) || !isFinite(num2)) {
        $('#number2-error').text('Please enter a valid number').show();
        return false;
    } else {
        $('#number2-error').hide();
    }

    // Validate special characters for number1
    if (/[^0-9.-]/.test(num1)) {
        $('#number1-error').text('Special characters are not allowed').show();
        return false;
    } else {
        $('#number1-error').hide();
    }

    // Validate special characters for number2
    if (/[^0-9.-]/.test(num2)) {
        $('#number2-error').text('Special characters are not allowed').show();
        return false;
    } else {
        $('#number2-error').hide();
    }

    return true;
};