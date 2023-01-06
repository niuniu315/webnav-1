const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const localData = localStorage.getItem('localData')
const localDataObject = JSON.parse(localData) //字符串变成对象

const isTouchDevice = 'ontouchstart' in document.documentElement
if (isTouchDevice) {
  document.body.style.minWidth = document.documentElement.clientWidth + 'px'
  document.body.style.minHeight = document.documentElement.clientHeight + 'px'
}

const hashMap = localDataObject || [
  {logo: 'A', url: 'https://www.acfun.cn'},
  {logo: 'B', url: 'https://www.bilibili.com'}
]
const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('//', '')
    .replace('www.', '')
    .replace('/\/.*', '')
    .replace('/\..*/', '')
    .replace('.cn', '')
    .replace('.com', '')
}
const render = () => {
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
          <div class="site">
            <div class="logo">${node.logo}</div>         
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
              <svg class="icon">
                <use xlink:href="#icon-close"></use>
              </svg>
            </div>
          </div>   
      </li>`).insertBefore($lastLi)
    $li.on('click', () => {
      window.open(node.url)
    })
    $li.on('click', '.close', (e) => {
      e.stopPropagation() //阻止冒泡
      hashMap.splice(index, 1) //删除一个此网站
      render()
    })
  })
}
render()

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是啥？");
  if (url.indexOf('http') !== 0) {
    url = 'https://' + url
  }
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(), //toUpperCase将字母变成大写
    url: url
  })
  render()
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap) //把对象变成字符串
  localStorage.setItem('localData', string)
}
// $(document).on('keypress', (e) => {
//     const { key } = e
//     for (let i = 0; i < hashMap.length; i++) {
//         if (hashMap[i].logo.toLowerCase() === key) { //toLowerCase把字母变成小写
//             window.open(hashMap[i].url)
//         }
//     }
// })
