// Generating content based on the template
const template =
  "<article>\n\
    <img src='data/img/SLUG.jpg' alt='NAME'>\n\
    <h3>#POS. NAME</h3>\n\
    <ul>\n\
    <li><span>Author:</span> <strong>AUTHOR</strong></li>\n\
    <li><span>Twitter:</span> <a href='https://twitter.com/TWITTER'>@TWITTER</a></li>\n\
    <li><span>Website:</span> <a href='http://WEBSITE/'>WEBSITE</a></li>\n\
    <li><span>GitHub:</span> <a href='https://GITHUB'>GITHUB</a></li>\n\
    <li><span>More:</span> <a href='http://js13kgames.com/entries/SLUG'>js13kgames.com/entries/SLUG</a></li>\n\
    </ul>\n\
</article>";
let content = '';
for (let i = 0; i < games.length; i++) {
  let entry = template
    .replace(/POS/g, i + 1)
    .replace(/SLUG/g, games[i].slug)
    .replace(/NAME/g, games[i].name)
    .replace(/AUTHOR/g, games[i].author)
    .replace(/TWITTER/g, games[i].twitter)
    .replace(/WEBSITE/g, games[i].website)
    .replace(/GITHUB/g, games[i].github);
  entry = entry.replace("<a href='http:///'></a>", '-');
  content += entry;
}
document.getElementById('content').innerHTML = content;

// Registering Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/learn-pwa/sw.js');
}

// Requesting permission for Notification after clicking on the button
const button = document.getElementById('notifications');
button.addEventListener('click', (e) => {
  Notification.requestPermission().then((result) => {
    if (result === 'granted') {
      randomNotification();
    }
  });
});

// Setting up random Notification
function randomNotification() {
  const randomItem = Math.floor(Math.random() * games.length);
  const notifTitle = games[randomItem].name;
  const notifBody = 'Created by ' + games[randomItem].author + '.';
  const notifImg = 'data/img/' + games[randomItem].slug + '.jpg';
  const options = {
    body: notifBody,
    icon: notifImg,
  };
  const notif = new Notification(notifTitle, options);
  setTimeout(randomNotification, 30000);
}
