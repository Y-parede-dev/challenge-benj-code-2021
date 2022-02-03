let count = 0;
let logo, timer, elements, elementsTxt, elementsYear, slides, slideWidth, slideWidthYear, slideWidthText, txtWidth, yoda, vader;
const sabreAudio = new Audio('./assets/audio/sabre.wav');
window.onload=()=>{
    window.onresize=()=>{
        document.location.reload();
    }
    const loadContent = document.getElementById('load');
    yoda  = document.getElementById('yoda-example');
    vader  = document.getElementById('vader-example');
    elements = document.querySelector(".content-img");
    elementsTxt = document.querySelector(".content-txt");
    elementsYear = document.querySelector(".content-year"); 
    logo = document.querySelector('.logo');
    let soap = document.querySelector('.content-barre');
    slides = Array.from(elements.children);
    slidesTxt = Array.from(elementsTxt.children);
    slideWidth= elements.getBoundingClientRect().width;
    slideWidthText= elementsTxt.getBoundingClientRect().width;
    slideWidthYear= elementsYear.getBoundingClientRect().width;
    slideWidthYearB= elementsYear.children[1].children[0].children[0].getBoundingClientRect().width;
    let next = document.getElementById('btnMore');
    let prec = document.getElementById('btnLess');
    next.addEventListener('click', ()=>{
    prec.classList.remove('close')
       if(count<2){
           soap.children[count].children[1].classList.add('active-barre');
           setTimeout(()=>{
               soap.children[count].children[0].classList.add("active-round");
           },250)
        }
        slideNext(elements, 1, slideWidth);
        slideNext(elementsTxt, 0, slideWidthText);
        slideNext(elementsYear,0 ,slideWidthYear, slideWidthYearB);
    });
    prec.addEventListener('click',()=>{
        if(count == 1){
            setTimeout(()=>{
                
                prec.classList.add('close')
            },400)
        }
        if(count>0){

            soap.children[count].children[0].classList.remove("active-round")
        }
        setTimeout(()=>{
            soap.children[count].children[1].classList.remove('active-barre')
            
        },150)
        slidePrev(elements, 1, slideWidth);
        slidePrev(elementsTxt, 0, slideWidthText);
        slidePrev(elementsYear, 0, slideWidthYear, slideWidthYearB);
    });
    loadContent.style.transition='1.5s linear';
    loadContent.style.transform='transitionX(-500px)';
    loadContent.style.opacity="0";
    setTimeout(()=>{
        loadContent.style.display='none';
    },600)
    sabres()
}
const sabres = () => {
    sabreAudio.play();  /* PB AVEC AUDIO : si aucun click detecter l'audio ne se lance pas... 😥 un peut con pour un loader */
    yoda.checked = "true";
    vader.checked="true";
}
const slideNext = (elt, nb, sl, ...slb)=>{
    count = count + nb;
    if(count == 3){
        count = 2;
    }
    decl = -sl * count;
    if(elt.children[count]){
        if(elt.classList.contains('content-year')){
            let changeOrigin = elt.children[1].children[0].children[0];
            console.log(changeOrigin)
            if(count >1 ){
                decl= -slb*count
                changeOrigin.style.transform = `translateX(${decl/2}px)`
                changeOrigin.style.transition ="0.2s ease-out";
            }
            console.log(changeOrigin)
            console.log(count)
        }
        if(elt.classList.contains('content-txt')){
            elt.children[count].children[0].classList.add('logoA');
            elt.children[count].classList.add('active');
            if(elt.children[count-1]){
                elt.children[count].style.display='block';
                elt.children[count-1].style.display='none';
                setTimeout(()=>{
                    elt.children[count].children[0].classList.remove('logoA');
                    elt.children[count-1].children[0].classList.remove('logoA');
                    elt.children[count-1].classList.remove('active');
                    elt.children[count].classList.remove('active');
                },500)
            }
        }else{ 
            if(elt.classList.contains('content-img') || count<2){
                elt.style.transition ="0.25s ease-out";
                elt.style.transform = `translateX(${decl}px)`;
            }
        }
    }
}
const slidePrev = (elt, nb, sl, ...slb)=>{
    if(count === -1){
        count = 0;
    }
    count = count - nb;
    let decl = -sl * count;
    if(elt.children[count]){
        if(elt.classList.contains('content-year')){
            let changeOrigin = elt.children[1].children[0].children[0];
            console.log(changeOrigin)
            if(count <2 ){
                changeOrigin.style.transform = `translateX(0px)`
                changeOrigin.style.transition ="0.2s ease-out";
            }
        }
        if(elt.classList.contains('content-txt')){
                elt.children[count].children[0].classList.add('logoB');
                elt.children[count].style.display='block';
                elt.children[count].classList.add('activeBis');
                if(elt.children[count+1]){
                    setTimeout(()=>{
                        elt.children[count+1].children[0].classList.remove('logoB');
                        elt.children[count].children[0].classList.remove('logoB');
                        elt.children[count+1].classList.remove('activeBis');
                        elt.children[count].classList.remove('activeBis');
                        elt.children[count+1].style.display='none';
                    },500)
                }
        }else{
            elt.style.transition ="0.25s ease-out";
            elt.style.transform = `translateX(${decl}px)`;
        }
    }
 
}