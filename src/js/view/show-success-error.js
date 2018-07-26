//function to show error message
const showErrorMsg = (err) => {
    return `
        <div class="alert alert-danger" role="alert" id="fail_msg">${err}
        </div>
    `;
}

//function to show success message
const showSuccessMsg = (success) => {
    return `
        <div class="alert alert-success" role="alert" id="success_msg">${success}
        </div>
    `;
}

export { showErrorMsg, showSuccessMsg };


