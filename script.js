document.getElementById("year").textContent=new Date().getFullYear();
const els=document.querySelectorAll(".tile,.work-row,.portrait-placeholder,.about-copy,.manifesto-lines p");
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
els.forEach(e=>io.observe(e));
const s=document.createElement("style");s.textContent=".tile,.work-row,.portrait-placeholder,.about-copy,.manifesto-lines p{opacity:0;transform:translateY(35px);transition:opacity .8s ease,transform .8s cubic-bezier(.2,.7,.2,1)}.in{opacity:1!important;transform:none!important}.manifesto-lines p:nth-child(2){transition-delay:.1s}.manifesto-lines p:nth-child(3){transition-delay:.2s}";document.head.appendChild(s);
document.getElementById("theme").onclick=()=>document.body.classList.toggle("dark");
