// objetos console
// metodos

// eventos

window.addEventListener("load", () => {
    const videohero = document.querySelector(".hero video");   
    const videoFooter = document.querySelector("footer video"); 
    
    console.log(videoFooter)

    videohero.src = "img/video-hero.mp4";
    videohero.autoplay = true;
    videohero.loop = true;
    videohero.muted = true;

    videoFooter.src = "img/video-footer.mp4";
    videoFooter.autoplay = true;
    videoFooter.loop = true;
    videoFooter.muted = true;

});





