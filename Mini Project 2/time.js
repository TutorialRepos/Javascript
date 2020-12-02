
function banner(){
  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let ampm = (hour > 12) ? 'PM': 'AM';
  calendar.innerHTML = 
  `
  <div class="timeBanner">
    ${now.toDateString()}
    <div>
      ${hour}:${minute}:${second}
      ${ampm}
    </div>
  </div>
  `;
}

banner()

setInterval(banner, 1000);