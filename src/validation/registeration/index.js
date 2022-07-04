import Validator from 'validator';

export const RegisterationValidation = ({
    first_name,
    last_name,
}) => {
    const status = {
        success: false,
        error_first_name: "",
        error_last_name: ""
    }

    if (Validator.isEmpty(first_name)) {
        status.error_first_name = "Please enter first name"
        return status
    }
    if (Validator.isEmpty(last_name)) {
        status.error_last_name = "Please enter last name"
        return status
    }
   
    status.success = true;
    return status;
}