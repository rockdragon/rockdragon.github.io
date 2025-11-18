function pad(n){return n.toString().padStart(2,'0')}
function update(){const d=new Date();const t=`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;document.getElementById('time').textContent=t;document.getElementById('date').textContent=d.toDateString()}
setInterval(update,1000);update();