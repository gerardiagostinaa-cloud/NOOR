(function(){
function ready(f){if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',f)}else{f()}}

/* 1) Reseñas y FAQ a lo ancho */
ready(function(){
  var destino=document.querySelector('#related-products');
  var producto=document.querySelector('.producto.m-section-half');
  var tipos=['.noor-reviews','.noor-faq'];
  if(!document.querySelector('.noor-reviews, .noor-faq'))return;
  var cont=document.querySelector('.noor-reviews-full');
  if(!cont){
    cont=document.createElement('div');cont.className='noor-reviews-full';
    if(destino){destino.parentNode.insertBefore(cont,destino)}
    else if(producto){producto.parentNode.insertBefore(cont,producto.nextSibling)}
    else return;
  }
  for(var t=0;t<tipos.length;t++){
    var c=document.querySelectorAll(tipos[t]);if(!c.length)continue;
    var e=cont.querySelector(tipos[t]);
    if(!e){e=c[0];cont.appendChild(e)}
    for(var i=0;i<c.length;i++){if(c[i]!==e&&c[i].parentNode)c[i].parentNode.removeChild(c[i])}
  }
});

/* 2) Avisos de ventas reales */
var ventas=[
  ['Agustina N.','CABA','Clip 5 en 1','2026-09-25'],
  ['BRUNO R.','SALTA','Clip 5 en 1','2026-09-23'],
  ['RAMIRO D.','MISIONES','Clip 2 en 1 - Acetato','2026-09-22'],
  ['NICOLAS A.','LA PLATA','Spray Limpia Cristales','2026-09-21'],
  ['JERO F.','FORMOSA','Clip 5 en 1','2026-09-25']
];
if(location.pathname.indexOf('checkout')<0)ready(function(){
  var b=document.createElement('div');b.className='noor-toast';
  b.innerHTML='<div class="noor-toast-icon"></div><div><p class="noor-toast-title"></p><p class="noor-toast-text"></p><p class="noor-toast-tag"></p></div><button class="noor-toast-close">×</button>';
  document.body.appendChild(b);
  var i=0,off=false,q=function(s){return b.querySelector(s)};
  function hace(f){var d=Math.floor((Date.now()-new Date(f+'T12:00:00'))/864e5);return d<=0?'Hoy':d===1?'Ayer':'Hace '+d+' días'}
  function ver(){if(off)return;var v=ventas[i];
    q('.noor-toast-icon').textContent=v[0].charAt(0).toUpperCase();
    q('.noor-toast-title').textContent=v[0]+' de '+v[1];
    q('.noor-toast-text').textContent='Compró '+v[2];
    q('.noor-toast-tag').textContent=hace(v[3])+' · ✔ Compra verificada';
    b.classList.add('visible');setTimeout(esc,6000)}
  function esc(){b.classList.remove('visible');i=(i+1)%ventas.length;if(!off)setTimeout(ver,12000)}
  q('.noor-toast-close').onclick=function(){off=true;b.classList.remove('visible')};
  setTimeout(ver,5000);
});

/* 3) Barra de anuncios */
ready(function(){
  if(document.querySelector('.noor-topbar'))return;
  var m=['🚚 ENVÍO GRATIS A TODO EL PAÍS','💳 3 CUOTAS SIN INTERÉS','🔥 HASTA 50% OFF','💸 10% OFF EXTRA CON TRANSFERENCIA'];
  var h='<span>'+m.join('</span><span>')+'</span>';h=h+h+h;
  var b=document.createElement('div');b.className='noor-topbar';
  b.innerHTML='<div class="noor-topbar-track">'+h+h+'</div>';
  var hd=document.querySelector('[data-store="head"]');
  if(hd)hd.insertBefore(b,hd.firstChild);else document.body.insertBefore(b,document.body.firstChild);
  setTimeout(function(){window.dispatchEvent(new Event('resize'))},300);
});

/* 4) Carrusel 3D */
var R='https://d1a9qnv764bsoo.cloudfront.net/stores/007/899/679/rte/';
var fotos=[
  ['hf_20260925_170420_02e40c43-ef30-4fed-b7ed-ba38790f422e.png','Al volante de noche','CLIP AMARILLO'],
  ['ChatGPT Image 25 sept 2026, 04_15_00 p.m..png','Con el sol fuerte','CLIP AZUL ESPEJADO'],
  ['hf_20260925_190928_46c4e36e-7057-4db0-a07f-700d1a313e06.png','Home office','CONTROL BLUE'],
  ['ChatGPT Image 25 sept 2026, 04_19_50 p.m..png','En la ciudad','CLIP NEGRO DEGRADÉ'],
  ['ChatGPT Image 25 sept 2026, 04_21_21 p.m..png','De paseo','CLIP MARRÓN'],
  ['ChatGPT Image 25 sept 2026, 04_23_45 p.m..png','Sol intenso','CLIP NEGRO']
];
ready(function(){
  var dest=document.querySelector('[data-store="home-products-featured"]');
  if(!dest||document.querySelector('.noor-cf-wrap'))return;
  var w=document.createElement('div');w.className='noor-cf-wrap';
  var c='',d='';
  for(var i=0;i<fotos.length;i++){
    c+='<div class="noor-cf-card" data-i="'+i+'" style="background-image:url(\''+encodeURI(R+fotos[i][0])+'\')"><div class="noor-cf-caption">'+fotos[i][1]+'<span>'+fotos[i][2]+'</span></div></div>';
    d+='<button data-i="'+i+'"></button>';
  }
  w.innerHTML='<p class="noor-cf-tag">UN LOOK PARA CADA MOMENTO</p><p class="noor-cf-title">Así se usa el Clip 5 en 1</p><p class="noor-cf-sub">Un armazón, cinco clips y la pantalla cubierta.</p><div class="noor-cf">'+c+'</div><div class="noor-cf-dots">'+d+'</div>';
  dest.parentNode.insertBefore(w,dest);
  var it=w.querySelectorAll('.noor-cf-card'),pt=w.querySelectorAll('.noor-cf-dots button'),n=it.length,a=Math.floor(n/2),tm;
  function pin(){var p=innerWidth<768?110:190;
    for(var i=0;i<n;i++){var k=i-a;if(k>n/2)k-=n;if(k<-n/2)k+=n;var s=Math.abs(k);
      it[i].style.transform='translateX('+k*p+'px) rotateY('+(k?(k<0?35:-35):0)+'deg) scale('+(1-s*.12)+')';
      it[i].style.zIndex=10-s;it[i].style.opacity=s>2?0:1;it[i].style.filter=k?'brightness(.75)':'none';
      pt[i].className=i===a?'activo':''}}
  function ir(i){a=(i+n)%n;pin();re()}
  function re(){clearInterval(tm);tm=setInterval(function(){ir(a+1)},3500)}
  for(var j=0;j<n;j++){it[j].onclick=pt[j].onclick=function(){ir(+this.getAttribute('data-i'))}}
  var z=w.querySelector('.noor-cf'),x=null;
  z.addEventListener('touchstart',function(e){x=e.touches[0].clientX},{passive:true});
  z.addEventListener('touchend',function(e){if(x===null)return;var dx=e.changedTouches[0].clientX-x;if(Math.abs(dx)>40)ir(a+(dx<0?1:-1));x=null});
  z.onmouseenter=function(){clearInterval(tm)};z.onmouseleave=re;
  addEventListener('resize',pin);pin();re();
});

/* 5) Cuidamos tu visión */
ready(function(){setTimeout(function(){
  var pr=document.querySelector('[data-store="home-products-featured"]');
  if(!pr||document.querySelector('.noor-benef'))return;
  function ic(p){return '<svg viewBox="0 0 24 24">'+p+'</svg>'}
  function it(p,t,s){return '<div class="noor-benef-item">'+ic(p)+'<div><strong>'+t+'</strong><small>'+s+'</small></div></div>'}
  function tr(p,t,s){return '<div class="noor-trust-item">'+ic(p)+'<p class="noor-trust-title">'+t+'</p><p class="noor-trust-sub">'+s+'</p></div>'}
  var b=document.createElement('div');b.className='noor-benef';
  b.innerHTML='<div class="noor-benef-glow"></div><p class="noor-benef-tag">LO QUE NOS DIFERENCIA</p><p class="noor-benef-title">Cuidamos <span>tu visión</span></p><p class="noor-benef-sub">DE PRINCIPIO A FIN</p><div class="noor-benef-grid">'+
    it('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>','Polarizados UV400','Bloquean el 100% de los rayos UVA y UVB')+
    it('<path d="M6 3v8a6 6 0 0 0 12 0V3h-4v8a2 2 0 0 1-4 0V3z"/><path d="M6 7h4M14 7h4"/>','Clips magnéticos','Cambiás de look en un segundo')+
    it('<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>','Control Blue','Filtro de luz azul para pantallas')+
    '</div><div class="noor-trust">'+
    tr('<path class="oro" d="M1 8h4M1.5 11h3.5M2.5 14h2.5"/><path d="M7 6h9v10H7zM16 9h3l3 3v4h-6"/><circle cx="10" cy="17" r="2"/><circle cx="19" cy="17" r="2"/>','ENVÍO <span>GRATIS</span>','A TODO EL PAÍS')+
    tr('<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path class="oro" d="M6 15h2M10 15h2"/>','<span>3</span> CUOTAS','SIN INTERÉS')+
    tr('<path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/><path class="oro" d="M8.5 12l2.5 2.5 4.5-5"/>','COMPRA <span>SEGURA</span>','PAGO PROTEGIDO')+'</div>';
  var ca=document.querySelector('.noor-cf-wrap, .noor-acc-wrap, .noor-ugc')||pr;
  ca.parentNode.insertBefore(b,ca);
  var f=b.querySelectorAll('svg, svg *');
  for(var i=0;i<f.length;i++){var o=f[i].getAttribute('class')==='oro',t=!!f[i].closest('.noor-trust'),s=f[i].style;
    s.setProperty('fill','none','important');s.setProperty('stroke',t&&!o?'#15151a':'#e0990f','important');
    s.setProperty('stroke-width','1.8','important');s.setProperty('stroke-linecap','round','important');s.setProperty('stroke-linejoin','round','important')}
},50)});

/* 6) Inicio: ocultar sin stock y mostrar máximo 9 productos */
ready(function(){
  var h=document.querySelector('[data-store="home-products-featured"]');
  if(!h)return;
  var MAX=9;
  var it=h.querySelectorAll('.js-item-product'),n=0;
  for(var i=0;i<it.length;i++){
    var s=it[i].querySelector('[data-store^="stock-product-"]');
    var sin=s&&/-0$/.test(s.getAttribute('data-store'));
    if(sin||n>=MAX){it[i].style.display='none'}else{n++}
  }
});

/* 8) Cuadro de medidas del armazón */
ready(function(){
  var cajas=document.querySelectorAll('.noor-medidas');
  for(var k=0;k<cajas.length;k++){
    var c=cajas[k];
    if(c.getAttribute('data-ok'))continue;
    var m=c.textContent.split('|');
    if(m.length<4)continue;
    var F=m[0].trim(),C=m[1].trim(),P=m[2].trim(),T=m[3].trim();
    function col(ic,v,t,d){return '<div class="noor-anat-col"><svg viewBox="0 0 60 40">'+ic+'</svg><strong>'+v+' mm</strong><span>'+t+'</span><small>'+d+'</small></div>'}
    var icL='<path class="osc" d="M8 6C20 5 40 5 52 7C51 18 49 26 46 30C44 33 40 34 30 34C18 34 14 33 12 30C9 25 8 17 8 6Z"/><path class="oro" d="M13 20H47M13 20L17 17M13 20L17 23M47 20L43 17M47 20L43 23"/>';
    var icP='<path class="osc" d="M2 7H22C22 18 20 27 16 33M58 7H38C38 18 40 27 44 33M22 11Q30 4 38 11"/><path class="oro" d="M23 24H37M23 24L26 21.5M23 24L26 26.5M37 24L34 21.5M37 24L34 26.5"/>';
    var icT='<path class="osc" d="M4 12L38 13C45 13 50 16 54 22L57 27"/><path class="oro" d="M4 34H56M4 34L8 31M4 34L8 37M56 34L52 31M56 34L52 37"/>';
    c.innerHTML=
      '<p class="noor-med-tag">ANATOMÍA DE LAS MEDIDAS · UNISEX</p>'+
      '<p class="noor-anat-sub">Así vienen grabadas en la parte interna de la patilla</p>'+
      '<svg class="noor-anat-top" viewBox="0 0 320 70">'+
        '<path class="pat" d="M6 24L228 26C254 27 274 32 292 46L312 62"/>'+
        '<rect class="eti" x="112" y="14" width="96" height="22" rx="5"/>'+
        '<text x="160" y="29">'+C+' □ '+P+' - '+T+'</text>'+
        '<path class="oro" d="M160 36V64M155 58L160 65L165 58"/>'+
      '</svg>'+
      '<p class="noor-anat-code"><b>'+C+'</b> <i>□</i> '+P+' <i>-</i> '+T+'</p>'+
      '<div class="noor-anat-grid">'+
        col(icL,C,'Ancho del lente','Ancho horizontal de cada cristal.')+
        col(icP,P,'Ancho del puente','Distancia entre ambos cristales.')+
        col(icT,T,'Largo de la patilla','Desde la bisagra hasta la punta.')+
      '</div>'+
      '<p class="noor-anat-frente">Ancho total del frente: <b>'+F+' mm</b></p>'+
      '<p class="noor-med-nota">Anteojos <b>unisex</b>. Son medidas estándar, pensadas para adaptarse cómodamente a la mayoría de los rostros. Si ya tenés un anteojo que te queda bien, podés comparar sus medidas con estas. Todas las medidas están en milímetros.</p>';
    c.setAttribute('data-ok','1');
    var el=c.querySelectorAll('svg *');
    for(var i=0;i<el.length;i++){
      var s=el[i].style,cl=el[i].getAttribute('class'),tg=el[i].tagName.toLowerCase();
      function st(p,v){s.setProperty(p,v,'important')}
      st('stroke-linecap','round');st('stroke-linejoin','round');
      if(tg==='text'){
        st('fill','#15151a');st('stroke','none');st('font-size','11px');st('font-weight','700');
        el[i].setAttribute('text-anchor','middle');
      }else if(cl==='eti'){
        st('fill','#fff');st('stroke','#15151a');st('stroke-width','1.2');
      }else if(cl==='pat'){
        st('fill','none');st('stroke','#15151a');st('stroke-width','7');
      }else if(cl==='osc'){
        st('fill','none');st('stroke','#15151a');st('stroke-width','3');
      }else if(cl==='oro'){
        st('fill','none');st('stroke','#e0990f');st('stroke-width','1.6');
      }
    }
  }
});

/* 9) Banner principal con frase animada (v3) */
ready(function(){
  if(document.querySelector('.noor-hero'))return;
  var IMG=encodeURI('https://d1a9qnv764bsoo.cloudfront.net/stores/007/899/679/rte/ChatGPT Image 25 sept 2026, 07_41_50 p.m..png');
  var FRASES=['el home office.','tus horas de estudio.','la ruta.','tus días de sol.','la pantalla y el sol.','cada momento del día.'];
  var LINK='/lentes-clip-on/';
  if(!document.body.classList.contains('template-home'))return;
  function subir(x){var el=x,top=null;
    while(el&&el!==document.body){
      var cn=(typeof el.className==='string'?el.className:'')+' '+((el.getAttribute&&el.getAttribute('data-store'))||'');
      if(/slider/i.test(cn))top=el;
      el=el.parentNode;
    }
    return top;}
  var sl=null;
  var hs=document.querySelector('.js-home-main-slider-container');
  if(hs)sl=subir(hs)||hs;
  var im=sl?null:document.querySelector('img.slide-img,img[src*="slide-"],img[data-srcset*="slide-"]');
  if(im)sl=subir(im)||im.closest('section');
  if(!sl){var b=document.querySelector('[data-store*="slider"],.js-home-slider,.home-slider,.section-slider');if(b)sl=subir(b)||b;}
  if(!sl){var sw=document.querySelector('.swiper-container,.swiper');if(sw)sl=subir(sw)||sw.closest('section')||sw;}
  if(!sl)return;
  var h=document.createElement('div');h.className='noor-hero';
  h.innerHTML='<div class="noor-hero-bg" style="background-image:url(\''+IMG+'\')"></div><div class="noor-hero-shade"></div>'+
    '<div class="noor-hero-txt">'+
      '<p class="noor-hero-t1">ENFOCATE</p>'+
      '<p class="noor-hero-t2">EN LO IMPORTANTE.</p>'+
      '<p class="noor-hero-t3">Nosotros cuidamos <span>tu visión.</span></p>'+
      '<p class="noor-hero-t4">Anteojos diseñados para <span class="noor-hero-w">'+FRASES[0]+'</span></p>'+
      '<div class="noor-hero-cta"><span class="noor-hero-promo">HASTA <b>50%</b> OFF</span><a class="noor-hero-btn" href="'+LINK+'">Ver clipones →</a></div>'+
    '</div>';
  sl.parentNode.insertBefore(h,sl);
  sl.style.setProperty('display','none','important');
  var w=h.querySelector('.noor-hero-w'),i=0;
  setInterval(function(){
    w.classList.add('sale');
    setTimeout(function(){
      i=(i+1)%FRASES.length;
      w.textContent=FRASES[i];
      w.classList.remove('sale');
      w.classList.add('entra');
      void w.offsetWidth;
      w.classList.remove('entra');
    },350);
  },2600);
});
/* 10) Tarjeta de oferta animada sobre el botón de compra
   Se activa con <div class="noor-oferta" style="display:none">Título|Subtítulo|Regalo</div> en la descripción */
ready(function(){
  var cfg=document.querySelector('.noor-oferta');
  if(!cfg||document.querySelector('.noor-deal'))return;
  var btn=document.querySelector('.js-addtocart:not(.js-addtocart-placeholder)')||document.querySelector('#product_form [type="submit"]');
  if(!btn)return;
  var p=cfg.textContent.split('|');
  var tit=(p[0]||'').trim(),sub=(p[1]||'').trim(),reg=(p[2]||'').trim();
  cfg.parentNode.removeChild(cfg);

  var css=
  '.noor-deal{position:relative;margin:0 0 14px;border:2px solid #e0990f;border-radius:14px;background:#fffaf0;overflow:hidden;opacity:0;font-family:inherit}'+
  '.noor-deal.noor-in{animation:noorDealIn .7s cubic-bezier(.2,.9,.3,1.2) forwards}'+
  '.noor-deal:after{content:"";position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.75),transparent);pointer-events:none}'+
  '.noor-deal.noor-in:after{animation:noorSheen 1.1s .7s ease-out}'+
  '.noor-deal-main{display:flex;align-items:center;gap:12px;padding:16px}'+
  '.noor-deal-dot{flex:0 0 22px;height:22px;border-radius:50%;border:2px solid #e0990f;display:flex;align-items:center;justify-content:center;animation:noorDot 2.4s 1.5s infinite}'+
  '.noor-deal-dot:before{content:"";width:12px;height:12px;border-radius:50%;background:#e0990f}'+
  '.noor-deal-info{flex:1;min-width:0}'+
  '.noor-deal-tit{margin:0;font-weight:800;font-size:16px;color:#111;line-height:1.25}'+
  '.noor-deal-sub{margin:4px 0 0;font-size:13px;color:#555}'+
  '.noor-deal-prices{text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:2px}'+
  '.noor-deal-off{background:#111;color:#e0990f;font-size:11px;font-weight:800;padding:3px 8px;border-radius:20px;letter-spacing:.5px}'+
  '.noor-deal-price{font-size:21px;font-weight:800;color:#111}'+
  '.noor-deal-old{font-size:13px;color:#999}'+
  '.noor-deal-extra{background:#f6ead2;border-top:1px solid #ecd9b0;padding:10px 16px}'+
  '.noor-deal-line{margin:3px 0;font-size:13px;color:#333;display:flex;align-items:center;gap:8px}'+
  '.noor-deal-line b{color:#111}'+
  '.noor-deal-ic{flex:0 0 18px;height:18px;border-radius:5px;background:#e0990f;color:#fff;font-size:12px;display:flex;align-items:center;justify-content:center}'+
  '.noor-deal-free{margin-left:auto;background:#e0990f;color:#fff;font-size:10px;font-weight:800;padding:3px 9px;border-radius:20px}'+
  '.noor-nudge{animation:noorNudge .9s ease}'+
  '@keyframes noorDealIn{0%{opacity:0;transform:translateY(18px) scale(.97)}60%{opacity:1;transform:translateY(-4px) scale(1.01)}100%{opacity:1;transform:none}}'+
  '@keyframes noorSheen{to{left:130%}}'+
  '@keyframes noorDot{0%,100%{box-shadow:0 0 0 0 rgba(224,153,15,.45)}50%{box-shadow:0 0 0 7px rgba(224,153,15,0)}}'+
  '@keyframes noorNudge{0%,100%{transform:none}20%{transform:translateY(-3px) scale(1.02)}40%{transform:none}60%{transform:translateY(-2px)}}'+
  '@media (max-width:480px){.noor-deal-tit{font-size:15px}.noor-deal-price{font-size:19px}}'+
  '@media (prefers-reduced-motion:reduce){.noor-deal,.noor-deal.noor-in{animation:none;opacity:1}.noor-deal:after,.noor-deal-dot,.noor-nudge{animation:none}}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  var d=document.createElement('div');d.className='noor-deal';
  d.innerHTML=
    '<div class="noor-deal-main"><span class="noor-deal-dot"></span>'+
    '<div class="noor-deal-info"><p class="noor-deal-tit"></p><p class="noor-deal-sub"></p></div>'+
    '<div class="noor-deal-prices"><span class="noor-deal-off"></span><strong class="noor-deal-price"></strong><s class="noor-deal-old"></s></div></div>'+
    '<div class="noor-deal-extra">'+
    '<p class="noor-deal-line noor-deal-reg"><span class="noor-deal-ic">✓</span><span class="noor-deal-regtx"></span><span class="noor-deal-free">GRATIS</span></p>'+
    '<p class="noor-deal-line noor-deal-pay"><span class="noor-deal-ic">$</span><span class="noor-deal-paytx"></span></p>'+
    '<p class="noor-deal-line"><span class="noor-deal-ic">➜</span><span class="noor-deal-ship"></span></p></div>';
  var q=function(s){return d.querySelector(s)};
  q('.noor-deal-tit').textContent=tit;
  q('.noor-deal-sub').textContent=sub;
  if(reg)q('.noor-deal-regtx').textContent=reg;else q('.noor-deal-reg').style.display='none';

  var pe=document.querySelector('#price_display, .js-price-display');
  var ce=document.querySelector('#compare_price_display, .js-compare-price-display');
  function num(el){if(!el)return 0;var t=(el.textContent||'').replace(/[^\d,]/g,'').replace(',','.');return parseFloat(t)||0}
  function fmt(n){return '$'+Math.round(n).toLocaleString('es-AR')}
  function upd(){
    var pr=num(pe),old=num(ce);
    if(!pr){d.style.display='none';return}
    d.style.display='';
    q('.noor-deal-price').textContent=fmt(pr);
    if(old>pr){q('.noor-deal-old').textContent=fmt(old);q('.noor-deal-off').textContent=Math.round((1-pr/old)*100)+'% OFF';q('.noor-deal-old').style.display='';q('.noor-deal-off').style.display=''}
    else{q('.noor-deal-old').style.display='none';q('.noor-deal-off').style.display='none'}
    q('.noor-deal-paytx').innerHTML='3 cuotas sin interés de <b>'+fmt(pr/3)+'</b> · <b>'+fmt(pr*0.9)+'</b> por transferencia';
  }
  function habil(n){var x=new Date(),c=0;while(c<n){x.setDate(x.getDate()+1);var w=x.getDay();if(w>0&&w<6)c++}return x}
  var o={weekday:'short',day:'numeric',month:'short'};
  q('.noor-deal-ship').innerHTML='Envío gratis · llega aprox. entre el <b>'+habil(4).toLocaleDateString('es-AR',o)+'</b> y el <b>'+habil(7).toLocaleDateString('es-AR',o)+'</b>';
  upd();
  if(pe&&window.MutationObserver)new MutationObserver(upd).observe(pe,{childList:true,subtree:true,characterData:true});

  var t=btn.closest('.form-row')||btn;
  t.parentNode.insertBefore(d,t);

  if(window.IntersectionObserver){
    var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){d.classList.add('noor-in');io.disconnect()}},{threshold:.3});
    io.observe(d);
  }else d.classList.add('noor-in');

  var usado=false;btn.addEventListener('click',function(){usado=true});
  setInterval(function(){if(usado||document.hidden)return;btn.classList.add('noor-nudge');setTimeout(function(){btn.classList.remove('noor-nudge')},900)},7000);
});
})();
