"use strict";

document.addEventListener("DOMContentLoaded",()=>{



  const video = document.querySelector("video");
  const play = document.querySelector("#play");
  const mute = document.querySelector("#mute");
  const reboot = document.querySelector("#reboot");
  const volUp = document.querySelector("#vol_up");
  const volDown = document.querySelector("#vol_down");
  const fullScreen = document.querySelector("#full");
  const archivo = document.querySelector("#archivo");
  const titulo = document.querySelector(".titulo");
  const picture = document.querySelector("#picture");
  const loader = document.querySelector(".loader");
  const atras = document.querySelector("#atras");
  const adelante = document.querySelector("#adelante");
  const duracion = document.querySelector(".duracion");
  const listar = document.querySelector(".lista");
  const btnList = document.querySelector("#lista");
  const cerrar = document.querySelector("#cerrar");
  const barraCon = document.querySelector(".barra-con");
  const progreso = document.querySelector("#progreso");
  const controles = document.querySelector("#controles");
  const controles2 = document.querySelector(".controles");
  const fragmento = document.createDocumentFragment();
  
  

  let view = false;

  // video.addEventListener("mouseout",()=>{

  //    setTimeout(() => {
  //     document.querySelector(".botones").style.visibility = "hidden";
  //     console.log("tiempo")
  //    }, 3000); 
  // });

  // OBTENER VOLUMEN, USAR ESTO DESPUES PARA ALGO
  // Math.round(document.querySelector("video").volume * 100)
  
  let mostrar = false;
  
  btnList.addEventListener("click",()=>{

    if (mostrar == false) {

      listar.style.display = "block";
      listar.style.animation = `abrirMenu ${800 / 1000}s ease`;
      mostrar = true;
    } else {

      listar.style.animation = `cerrarMenu ${800 / 1000}s ease`;
      setTimeout(() => {
        listar.style.display = 'none';
    }, 800);
      mostrar = false;
    }

  });

  cerrar.addEventListener("click",()=>{

    listar.style.animation = `cerrarMenu ${800 / 1000}s ease`;
    setTimeout(() => {
      listar.style.display = 'none';
  }, 800);
    mostrar = false;

  });

  let menu = false;

  controles.addEventListener("click",()=>{

    if (menu == true) {

      controles2.style.display = "flex";
      controles2.style.animation = `abrirMenu ${800 / 1000}s ease`;
      menu = false;
    } else {

      controles2.style.animation = `cerrarMenu ${800 / 1000}s ease`;
      setTimeout(() => {
        controles2.style.display = 'none';
    }, 800);
        menu = true;
    }

  });

  document.querySelector(".abrirMenu").addEventListener("click",()=>{
      controles2.style.display = "flex";
      controles2.style.animation = `abrirMenu ${800 / 1000}s ease`;
      menu = false;
  })

// PONER VIDEO EN MUTE

  mute.addEventListener("click",()=>{
   if (video.muted == false) {
     mute.firstChild.innerHTML = "volume_off";
      video.muted = true;
   } else {
    mute.firstChild.innerHTML = "volume_mute";
    video.muted = false;
   }
  });

  // SUBIR VOLUMEN

  volUp.addEventListener("click",()=>{
    if(video.volume < 1){
      video.volume += 0.1;
    }
  });

  volDown.addEventListener("click",()=>{
    if(video.volume > 0.1){
      video.volume -= 0.1;
    }
  });
  
  let lista = [];
  let videoActual;
  let i = 0;
  
  // convertir segundos en hora actual
  
  // const hora = (segundos)=>{
  //   let date= new Date(segundos*1000);
  //   let hora = (date.getHours()==0)?23:date.getHours()-1;
  //   hora = (hora<9)?"0"+hora:hora;
  //   let minuto = (date.getMinutes()<9)?"0"+date.getMinutes():date.getMinutes();
  //   let segundo = (date.getSeconds()<9)?"0"+date.getSeconds():date.getSeconds();
  
  //   return hora+":"+minuto+":"+segundo;
  // }

  // OBTENER DURACION DEL VIDEO EN TIEMPO DE CARGA 

  video.addEventListener("loadedmetadata",()=>{
      progreso.max = video.duration;
  });
 
// CONVERTIR DURACION DEL VIDEO A UN NUMERO CONCRETO

function convertirSegundosAMinutos(segundos){
  
  let hora = Math.floor(segundos / 3600);
  let horaConvertida = hora.toString().split(".");
  let minutos = Math.floor( (segundos % 3600) / 60);
  let segundosRestantes = segundos % 60;
  let segundosRedondeados = segundosRestantes.toString().split(".");

  // if (minutos >= 60 && modo == "duracion") {
    
  //   hora = Math.round(minutos/60);
    
  //   minutos -= hora*60;

  // }

  let duracion = hora.toString().padStart(2, '0') + ":" + minutos.toString().padStart(2, '0') + ":" + segundosRedondeados[0].padStart(2, '0');
  
  return duracion;
}

  video.addEventListener("timeupdate",()=>{
    //  duracion.innerHTML = `Tiempo: ${hora(video.currentTime)}`;
    //  document.querySelector(".barra").style.width = `${(video.currentTime * 100) / video.duration}%`;
     progreso.value = video.currentTime;
    let duracionVideo = convertirSegundosAMinutos(video.duration);
    if (duracionVideo === "NaN:NaN:NaN") {
      duracionVideo = "";
    }
     duracion.textContent = `${convertirSegundosAMinutos(video.currentTime)} / ${ duracionVideo }`;

    });


  progreso.addEventListener("input",()=>{
    video.currentTime = progreso.value;
  });
  
  video.addEventListener("play",()=>{
    play.disabled = false;
    // pausar.disabled = false;
    picture.disabled = false;
    reboot.disabled = false;
    atras.disabled = false;
    adelante.disabled = false;
    mute.disabled = false;
    volUp.disabled = false;
    volDown.disabled = false;
    console.log("REPRODUCIENDO")
    play.firstChild.innerHTML = "pause";
      modo = true
  });
  
  video.addEventListener("pause",()=>{
    console.log("PAUSADO")
  });
   
  let modo = false;
  let j = 0;
  
  video.addEventListener("ended",()=>{
    // play.disabled = true;
    // // pausar.disabled = true;
    // reboot.disabled = true;
    // atras.disabled = true;
    // adelante.disabled = true;
    // picture.disabled = true;
    play.firstChild.innerHTML = "play_arrow";
    modo = false;
     
    // if (lista.length > 1 && lista[j+1] != undefined) {
    //   j++;
    //   titulo.innerHTML = lista[j][0];
    //   progreso.max = lista[j][2];
    //   video.setAttribute("src",lista[j][1]);
    //   video.play()
    // } else if (lista[j+1] == undefined) {
    //   j = 0;
    // }

    for (let i = 0; i < lista.length; i++) {
      
      if (lista[i][0] === videoActual && lista[i+1] != undefined) {
        console.log("Siguiente en Lista");
        j = i + 1;
        videoActual = lista[j][0];
        titulo.innerHTML = lista[j][0];
        progreso.max = lista[j][2];
        video.setAttribute("src",lista[j][1]);
        video.play()
        break;
      } else {
        console.log("no hay mas videos en la lista");
      }

    }
    
    console.log("ELEMENTOS A REPRODUCIRE "+ lista);
    console.log("VIDEO FINALIZADO" + j)
  });

  video.addEventListener("click",()=>{
    
    console.log("controles en pantalla")

    if (modo == false) {
        
      video.play()
      play.firstChild.innerHTML = "pause";
      modo = true
    } else {
      video.pause()
      play.firstChild.innerHTML = "play_arrow";
      modo = false;
    }
    
  });
 
  
  play.addEventListener("click",()=>{ // este boton pausa y da play
      
      if (modo == false) {
        
        video.play()
        play.firstChild.innerHTML = "pause";
        modo = true
      } else {
        video.pause()
        play.firstChild.innerHTML = "play_arrow";
        modo = false;
      }
      
      
  });
  
  // pausar.addEventListener("click",()=>{
      
  //     video.pause()
  // });
  
  reboot.addEventListener("click",()=>{
      
      video.currentTime = 0;
      video.play()
  
      modo = true;
      play.firstChild.innerHTML = "pause";
  });
  
  atras.addEventListener("click",()=>{
    video.currentTime -= 10;
  });
  
  adelante.addEventListener("click",()=>{
    video.currentTime += 10;
  });
  
  fullScreen.addEventListener("click",()=>{
     if (!document.fullscreenElement) {
      video.requestFullscreen()
     } else if (document.exitFullscreen) {
      document.exitFullscreen()
     }
  
  });
  
  picture.addEventListener("click",()=>{
  
        if (document.pictureInPictureElement) {
          document.exitPictureInPicture()
        } else if(document.pictureInPictureEnabled){
          video.requestPictureInPicture()
        }
  
  });
  
  video.addEventListener("dragover",(e)=>{
  e.preventDefault();
  console.log(e.target + " desde el drag over")
  
  });
  
  // video.addEventListener("dragleave",(e)=>{
  // console.log(e.target + " desde el drag leave")
  
  // });
  
  video.addEventListener("drop",(e)=>{
    console.log(e.dataTransfer.files[0] + " desde el drop")
    e.preventDefault(); // para que no cargue el archivo en otra pestaña
    cargarVideo(e.dataTransfer.files[0])
    .catch(err=> console.log("Error al cargar archivo"))
  });
  
  archivo.addEventListener("change",(e)=>{
  
    console.log(archivo.files[0])

    if (archivo.files[0]) {
      cargarVideo(archivo.files[0])
      .catch(err=> console.log("Error al cargar archivo"))
    } else {
      console.log("NO se cargo nada");
    }
  
    
  
  });
  
  const cargarVideo = async ar=>{

    const loaderBar = document.createElement("DIV");
    loaderBar.classList.add("loader");
    
  
      const reader = new FileReader();
      reader.readAsArrayBuffer(ar);
  
      reader.addEventListener("progress",(e)=>{
        // loader.style.visibility = "visible";
        // let carga = Math.round(e.loaded / ar.size * 100);
        // loader.textContent = `${carga}%`;
        // console.log(carga)
        // loader.style.width = `${carga}%`;
        // loader.style.padding = "4px 0";
        // loader.style.height = "10px";

        // ESTA ES LA BARRA DE CARGA GENERADA CON CODIGO

        // barraCon.appendChild(loaderBar);

        // let carga = Math.round(e.loaded / ar.size * 100);
        // loaderBar.textContent = `${carga}%`;
        // console.log(carga)
        // loaderBar.style.width = `${carga}%`;
        // loaderBar.style.padding = "4px 0";
        // loaderBar.style.height = "10px";
  });
  
  reader.addEventListener("loadend",()=>{
    // loaderBar.style.background = "#4f9";
    // loaderBar.style.animation = "desaparecer 3s forwards";
    // loaderBar.style.opacity = "0";
    // barraCon.removeChild(loaderBar);
    // titulo.innerHTML = `${ar.name.substring(0,30)}...(${ar.type})`;
    titulo.innerHTML = ar.name;
    // barraCon.removeChild(loaderBar);
    console.log(reader);
  })  
  
  reader.addEventListener("load",e=>{
      console.log(e + " desde el evento load")
  
      let videoBlob = new Blob([new Uint8Array(e.currentTarget.result)],{ type: ar.type});
      
      
    console.log(videoBlob)
    console.log(e)
    console.log(e.currentTarget.result)
  
      let url = URL.createObjectURL(videoBlob);
  
     if (video.canPlayType(ar.type)) {
      
      video.setAttribute("src",url);
      // video.load()
      video.play()
  
      modo = true;
      play.firstChild.innerHTML = "pause";
  
      videoActual = ar.name;
      lista[i] = [ar.name,url,video.duration];
      
  
      const btn = document.createElement("button");
      btn.setAttribute('id',"itemLista")
      btn.innerHTML = titulo.innerHTML = ar.name;
      btn.addEventListener("click",()=>{
        // titulo.innerHTML = `${ar.name.substring(0,60)}...(${ar.type})`;
        titulo.innerHTML = ar.name;
        videoActual = ar.name;
        console.log("VIDEO ACTUAL" + videoActual)
        video.setAttribute("src",url);
        video.play()
      })
      listar.appendChild(btn)
  
      i++;

     } else {
        
        alert("NO SE PUEDE REPRODUCIR");
     }
  
  });
       
  }
  
})