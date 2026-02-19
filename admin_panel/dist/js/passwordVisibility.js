
function togglePassword(checkbox) {
    const passwordInput = document.getElementById('password');
    passwordInput.type = checkbox.checked ? 'text' : 'password';
}
