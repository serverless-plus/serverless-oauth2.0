$(document).ready(function() {
  const button = $('#button');
  const resultBox = $('#result-box');
  const result = $('#result');

  button.on('click', () => {
    $.ajax({
      method: 'POST',
      url: '/login',
      dataType: 'json',
      data: {},
    })
      .done((res) => {
        if (res.code === 200) {
          resultBox.css('display', 'none');
          location.href = `${location.protocol}//${location.host}/callback?code=${res.data.code}`;
        } else {
          resultBox.css('display', 'block');
          result.html(`<span class="error">${res.error.message}</span>`);
        }
      })
      .fail((res) => {
        resultBox.css('display', 'block');
        const error = JSON.parse(res.responseText).error;
        result.html(`<span class="error">${error.message}</span>`);
      });
  });
});
