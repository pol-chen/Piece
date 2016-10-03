const shell = window.require('electron').shell

exports.addExternalLinks = () => {
  const links = document.querySelectorAll('a[href]')
  
  Array.prototype.forEach.call(links, function (link) {
    const url = link.getAttribute('href')
    console.log(url)
    if (url.indexOf('http') === 0) {
      link.addEventListener('click', function (e) {
        e.preventDefault()
        shell.openExternal(url)
      })
    }
  })
}
