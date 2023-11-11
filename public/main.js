let check = document.getElementsByClassName("fa-check");
let xMark = document.getElementsByClassName("fa-x");
let trash = document.getElementsByClassName('fa-trash')


Array.from(check).forEach(function(element) {
      element.addEventListener('click', function(){
        const li = element.closest('li').querySelector('.item')
        const name = element.closest('li').querySelector('.item').innerText
        fetch('packingitemstrue', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          li.classList.add('strikethrough')
        })
      });
});

Array.from(xMark).forEach(function(element) {
  element.addEventListener('click', function(){
    const li = element.closest('li').querySelector('.item')
    const name = element.closest('li').querySelector('.item').innerText
    fetch('packingitemsfalse', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      li.classList.remove('strikethrough')
    })
  });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const li = element.closest('li')
        const name = this.parentNode.parentNode.childNodes[1].innerText
        fetch('packingitems', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
          })
        }).then(function (response) {
          li.remove()
        })
      });
});
