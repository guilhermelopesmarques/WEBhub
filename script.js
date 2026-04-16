// objetos console
// metodos

// eventos

window.addEventListener("load", () => {
    gsap.registerPlugin(ScrollTrigger,ScrollSmoother,SplitText);

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

    //quando rolo a pagina cada retangulo desce
    //linha do tempo

    const linhaDoTempo = gsap.timeline({
        scrollTrigger: {
            trigger: ".transicao",
            scrub: 2,
            start: "0% 0%",
            end: "+=3000",
            pin: true,     
        },
    });
    linhaDoTempo.to(".retangulos div", {
        y: 0,
        stagger: 0.2,
        duration: 4
    });


    linhaDoTempo.to(".secao2", {
        opacity: 1,
        duration: 0.1
    })

    linhaDoTempo.from(".secao2 h2", {
        y: 200
    })

    const split = new SplitText(".secao2 h2", {
        types: "chars",
        mask: "lines"
    })
    linhaDoTempo.from(split.chars, {
        y: 100,
        stagger: 0.1,
        duration: 1
    })

});





