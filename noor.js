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

/* 7) Cartel promo 2x1 en la ficha del producto */
ready(function(){
  var p=document.querySelector('.producto .product-price-container');
  if(!p)return;
  var l=document.querySelectorAll('.producto [class*="label"]'),es=false;
  for(var i=0;i<l.length;i++){if(l[i].textContent.trim().toUpperCase()==='2X1')es=true}
  if(!es)return;
  var d=document.createElement('div');d.className='noor-2x1';
  d.innerHTML='🎁 <b>PROMO 2x1:</b> llevás <b>2 lentes</b> por este precio';
  p.parentNode.insertBefore(d,p.nextSibling);
  });
})();
