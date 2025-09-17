const video = document.getElementById('introVideo');
const source = document.getElementById('videoSource');
const countdown = document.getElementById('countdown');
const timer = document.getElementById('timer');

// Create audio element for background music
const backgroundAudio = new Audio('./media/countdown.mp3'); // Replace with your audio file
backgroundAudio.loop = true; // Loop the music
backgroundAudio.volume = 0.3; // Set volume (0.0 to 1.0)

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
    
    if(width < 600){
        handleScreenSizeChange(source);
    }
});

const isMobile = window.innerWidth <= 600;

if (isMobile) {
    source.src = './media/adobe-video-mob.mp4';
    video.load();
}

video.play();

// When video ends, fade it out and show countdown WITH SOUND
video.onended = () => {
    videoContainer.classList.add('fade-out');
    
    // Start background music when countdown appears
    setTimeout(() => {
        countdown.classList.add('show');
        
        // Play background music with error handling
        backgroundAudio.play().catch(error => {
            console.log("Audio autoplay prevented:", error);
        });
    }, 1500);
};

// Allow user to unmute video and enable audio
document.body.addEventListener("click", () => {
    video.muted = false;
    video.play();
    
    // Also ensure background audio can play after user interaction
    if (countdown.classList.contains('show')) {
        backgroundAudio.play().catch(error => {
            console.log("Background audio play failed:", error);
        });
    }
}, { once: true });

// Countdown timer logic
setInterval(() => {
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance < 0) {
        timer.innerHTML = "We're live!";
        
        // Optional: Stop background music when launch time is reached
        backgroundAudio.pause();
        backgroundAudio.currentTime = 0;
        
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

// Optional: Add volume control
function adjustBackgroundVolume(volume) {
    backgroundAudio.volume = Math.max(0, Math.min(1, volume));
}

// Optional: Fade in effect for background music
function fadeInBackgroundMusic(duration = 2000) {
    backgroundAudio.volume = 0;
    backgroundAudio.play().catch(console.log);
    
    const fadeStep = 0.3 / (duration / 100); // Target volume 0.3
    const fadeInterval = setInterval(() => {
        if (backgroundAudio.volume < 0.3) {
            backgroundAudio.volume += fadeStep;
        } else {
            backgroundAudio.volume = 0.3;
            clearInterval(fadeInterval);
        }
    }, 100);
}