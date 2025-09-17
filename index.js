
const video = document.getElementById('introVideo');
 
const source = document.getElementById('videoSource');
const countdown = document.getElementById('countdown');
const timer = document.getElementById('timer');
// Launch date
const launchDate = new Date("2025-12-31T00:00:00").getTime();


 function handleScreenSizeChange(vidSource){
     source.src = './media/adobe-video-mob.mp4'; // mobile-friendly video
    video.load(); // reload the video with new source
 }  

window.addEventListener('resize', function() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    console.log(`Screen size: ${width} x ${height}`);
    
    // Your logic here
    if(width < 600){
        handleScreenSizeChange(source);
    }
    
});

 const isMobile = window.innerWidth <= 600; // you can adjust breakpoint

  if (isMobile) {
      source.src = './media/adobe-video-mob.mp4'; // mobile-friendly video
      video.load(); // reload the video with new source
  }

  // Optional: autoplay if muted
  video.play();


// When video ends, fade it out and show countdown
video.onended = () => {
    videoContainer.classList.add('fade-out');
    setTimeout(() => countdown.classList.add('show'), 1500);
};

document.body.addEventListener("click", () => {
        video.muted = false;
        video.play();
    }, { once: true });
// Countdown timer logic
setInterval(() => {
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance < 0) {
        timer.innerHTML = "We're live!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);