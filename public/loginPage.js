"use strict"
let userForm = new UserForm();
userForm.loginFormCallback = data => {
    ApiConnector.login(data, (result) => {
        console.log(JSON.stringify(result));
        if (result.success) {
            location.reload(); 
        } else {
            alert(result.error);
        }
    });
};

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (result) => {
        console.log(JSON.stringify(result));
        if (result.success) {
            location.reload(); 
        } else {
            alert(result.error);
        }
    });
}