import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
gsap.registerPlugin(ScrollTrigger,ScrollSmoother,SplitText);

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

    //animações dos textos surgindo do secao4

    const linhaDoTempo2 = gsap.timeline({
         scrollTrigger: {
            trigger: ".secao4",
            scrub: 2,
            end: "+=3000",
            pin: true,
        },
    });

    const textosSecao4 = document.querySelectorAll(".secao4 h2");

    textosSecao4.forEach((texto) => {
        const split2 = new SplitText(texto,{
            types: "chars"
        });
        linhaDoTempo2.from(split2.chars, {
            opacity: 0,
            filter: "blur(20px)",
            stagger: {
                each: .2,
                from: "random"
            }
        });

        linhaDoTempo2.to(split2.chars, {
            opacity: 0,
            stagger: {
                each: .2,
                from: "random"
            }
        }, "+=2");
    });

    // começando o codigo THREE JS = 3D

    // CENA
    const cena = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth/window.innerHeight,
        0.1,
        1000
    )

    camera.position.z = 4;

    // RENDERIZADOR
    const renderizador = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderizador.setSize(window.innerWidth, window.innerHeight);
    const divDiamante = document.querySelector(".divDiamante");
    divDiamante.appendChild(renderizador.domElement)

    // Inserir modelo 3D
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("img/diamond-compressed.glb", (objeto)=>{
        const diamante = objeto.scene;
        diamante.position.z = -4;
        cena.add(diamante);
    });

    // inserir textura
    const txtLoader = new THREE.TextureLoader();
    txtLoader.load("img/hdri.webp", (texturaCarregada)=>{
        texturaCarregada.mapping = THREE.EquirectangularReflectionMapping;
        const pmrem = new THREE.PMREMGenerator(renderizador);
        const ambiente = pmrem.fromEquirectangular(texturaCarregada).texture;
        cena.environment = ambiente;
    });

    // 60hz ou 140hz

    function animar(){
        renderizador.render(cena, camera);
        requestAnimationFrame(animar);
    }

    animar()
});





