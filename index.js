import{a as E,S as q,i as n}from"./assets/vendor-ZlulHAcp.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function i(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=i(r);fetch(r.href,o)}})();const S="49113613-79f6fca50dc45b87a79142d8e",w="https://pixabay.com/api/";async function h(t,e=1,i=40){try{return(await E.get(w,{params:{key:S,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:i}})).data}catch(a){throw console.error("Error fetching images:",a),a}}const d=document.querySelector(".gallery");let f;function b(t){const e=t.map(({webformatURL:i,largeImageURL:a,tags:r,likes:o,views:c,comments:v,downloads:L})=>`
        <a class="gallery-item" href="${a}">
          <img class="gallery-image" src="${i}" alt="${r}" />
          <div class="info">
            <p><b>Likes</b> ${o}</p>
            <p><b>Views</b> ${c}</p>
            <p><b>Comments</b> ${v}</p>
            <p><b>Downloads</b> ${L}</p>
          </div>
        </a>
      `).join("");d.insertAdjacentHTML("beforeend",e),f?f.refresh():f=new q(".gallery a")}function P(){for(;d.firstChild;)d.removeChild(d.firstChild)}const $=document.querySelector(".search-form"),g=document.querySelector('input[name="searchQuery"]');document.querySelector(".gallery");const u=document.querySelector(".load-more"),s=document.querySelector(".loading-text"),y=document.querySelector(".back-to-top");let p="",l=1;const m=40;$.addEventListener("submit",async t=>{if(t.preventDefault(),p=g.value.trim(),!p){n.error({title:"Error",message:"Please enter a search query.",position:"topRight"});return}l=1,P(),u.style.display="none",s.classList.remove("loading-top"),s.classList.add("loading-bottom"),s.style.display="block";try{const e=await h(p,l,m);if(!e||e.hits.length===0){n.error({title:"Error",message:"No images found!",position:"topRight"});return}b(e.hits),l*m<e.totalHits?(u.style.display="block",y.style.display="block"):(n.info({title:"End",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),y.style.display="none")}catch(e){console.error("Error:",e);let i="An error occurred. Please try again later.";e.response?i=`Server error: ${e.response.status}`:e.request&&(i="No response received from the server."),n.error({title:"Error",message:i,position:"topRight"})}finally{s.style.display="none",s.classList.remove("loading-bottom")}g.value=""});u.addEventListener("click",async()=>{l+=1,s.classList.remove("loading-bottom"),s.classList.add("loading-top"),s.style.display="block";try{const t=await h(p,l,m);b(t.hits),l*m>=t.totalHits&&(u.style.display="none",n.info({title:"End",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),y.style.display="none");const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();setTimeout(()=>{window.scrollBy({top:e*2,behavior:"smooth"})},100)}catch(t){console.error("Error:",t);let e="An error occurred. Please try again later.";t.response?e=`Server error: ${t.response.status}`:t.request&&(e="No response received from the server."),n.error({title:"Error",message:e,position:"topRight"})}finally{s.style.display="none",s.classList.remove("loading-top")}});y.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});
//# sourceMappingURL=index.js.map
