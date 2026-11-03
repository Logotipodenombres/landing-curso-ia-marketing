window.dataLayer = window.dataLayer || [];
window.dataLayer.push({event:"view_course"});
document.addEventListener("click",event=>{
  const a=event.target.closest("a[href]");
  if(!a)return;
  if(a.getAttribute("href")==="#inscripcion") window.dataLayer.push({event:"click_enroll"});
  if(a.closest(".menu"))document.querySelector(".menu").open=false;
});
document.addEventListener("keydown",e=>{const m=document.querySelector(".menu");if(e.key==="Escape" && m.open){m.open=false;m.querySelector("summary").focus()}});
const fixed=document.querySelector(".mobile-enroll");
const form=document.querySelector("#inscripcion");
if(form)new IntersectionObserver(([entry])=>fixed.hidden=entry.isIntersecting).observe(form);
const links=[...document.querySelectorAll(".wide-nav a")];
const watch=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){for(const a of links){if(a.hash==="#"+entry.target.id)a.setAttribute("aria-current","location");else a.removeAttribute("aria-current")}}},{rootMargin:"-8% 0px -67% 0px"});
for(const a of links){const s=document.querySelector(a.hash);if(s)watch.observe(s)}
const previousSections = {beneficios:"programa", publico:"precio", oportunidad:"precio", demostracion:"programa", evidencias:"galeria", incluye:"precio", cierre:"inscripcion"};
function resolvePreviousSection() {
  const target = previousSections[location.hash.slice(1)];
  if (target) document.getElementById(target)?.scrollIntoView();
}
resolvePreviousSection();
window.addEventListener("hashchange", resolvePreviousSection);
