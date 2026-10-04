document.addEventListener('DOMContentLoaded',()=>{
  const burger=document.getElementById('burger');
  const navMobile=document.getElementById('navMobile');
  if(burger&&navMobile){
    burger.addEventListener('click',()=>{
      const o=navMobile.classList.toggle('open');
      burger.classList.toggle('open',o);
    });
    navMobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      navMobile.classList.remove('open');burger.classList.remove('open');
    }));
  }
  let lastY=0;const nav=document.getElementById('nav');
  window.addEventListener('scroll',()=>{
    const y=window.scrollY;
    if(nav){nav.style.transform=(y>80&&y>lastY)?'translateY(-100%)':'translateY(0)';}
    lastY=y;
  },{passive:true});
  document.querySelectorAll('.faq-q').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const exp=btn.getAttribute('aria-expanded')==='true';
      document.querySelectorAll('.faq-q').forEach(b=>{b.setAttribute('aria-expanded','false');b.nextElementSibling?.classList.remove('open');});
      if(!exp){btn.setAttribute('aria-expanded','true');btn.nextElementSibling?.classList.add('open');}
    });
  });
  document.querySelectorAll('.copy-email').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const email=btn.dataset.email;if(!email)return;
      navigator.clipboard.writeText(email).then(()=>{
        const l=btn.querySelector('.copy-label');
        if(l){l.textContent='Copied!';l.style.color='var(--accent)';setTimeout(()=>{l.textContent='Copy';l.style.color='';},2000);}
      }).catch(()=>{const t=document.createElement('textarea');t.value=email;t.style.cssText='position:fixed;opacity:0';document.body.appendChild(t);t.select();document.execCommand('copy');document.body.removeChild(t);});
    });
  });
  const els=document.querySelectorAll('.project-card,.testimonial-card,.faq-item,.about-strip__text,.about-strip__photo,.project-row');
  if('IntersectionObserver' in window){
    const obs=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');obs.unobserve(e.target);}});},{threshold:.08,rootMargin:'0px 0px -40px 0px'});
    els.forEach((el,i)=>{el.style.cssText+=`opacity:0;transform:translateY(22px);transition:opacity .5s ease ${i*.04}s,transform .5s ease ${i*.04}s`;obs.observe(el);});
  }
});
const s=document.createElement('style');
s.textContent='.revealed{opacity:1!important;transform:translateY(0)!important}';
document.head.appendChild(s);
