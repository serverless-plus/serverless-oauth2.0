$(document).ready(function() {
  const result = $('#post-list');
  const token = Cookies.get('token');

  if (!token) {
    location.href = `${location.protocol}//${location.host}/login`;
  } else {
    $.ajax({
      method: 'GET',
      url: '/post',
      dataType: 'json',
      // beforeSend(xhr) {
      //   xhr.setRequestHeader('Authorization', `Bearer id_token="${token}"`);
      // },
      headers: {
        Authorization: `Bearer id_token="${token}"`,
      },
    })
      .done((res) => {
        if (res.code === 200) {
          const postList = res.data.posts;
          if (!postList || postList.length === 0) {
            result.html(`<div class="post-item">No Data</div>`);
          } else {
            let listStr = '';
            console.log('postList', postList);
            postList.forEach((item, index) => {
              listStr += `<div class="post-item"><h3>${index + 1}. ${item.title}</h3><p>${
                item.content
              }</p><br></div>`;
            });
            result.html(listStr);
          }
        } else if (res.code === 403) {
          location.href = `${location.protocol}//${location.host}/login`;
        } else {
          result.html(`<span class="error">${res.error.message}</span>`);
        }
      })
      .fail((res) => {
        const error = JSON.parse(res.responseText).error;
        result.html(`<span class="error">${error.message}</span>`);
      });
  }
});
