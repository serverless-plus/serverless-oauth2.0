$(document).ready(function() {
  const button = $('#button');
  const resultBox = $('#result-box');
  const result = $('#result');

  button.on('click', () => {
    const username = $('#username').val();
    const password = $('#password').val();

    if (!username || !password) {
      alert('Please input username and password!');
    }
    $.ajax({
      method: 'POST',
      url: '/normal-login',
      dataType: 'json',
      data: {
        username: username,
        password: password,
      },
      success(res) {
        if (res.code === 200) {
          resultBox.css('display', 'none');
          location.href = `${location.protocol}//${location.host}/`;
        } else {
          resultBox.css('display', 'block');
          result.html(`<span class="error">${res.error.message}</span>`);
        }
      },
      error({ responseJSON }) {
        resultBox.css('display', 'block');
        result.html(`<span class="error">${responseJSON.error.message}</span>`);
      },
    });
  });
});
