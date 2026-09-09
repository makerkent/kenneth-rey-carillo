import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const loader=document.querySelector("#loader");
window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("loaded"),900));

/* Ambient 3D star field — deliberately lightweight for GitHub Pages/iPad. */
const canvas=document.querySelector("#space");
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,.1,1000);
camera.position.z=8;
const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
renderer.setSize(innerWidth,innerHeight);

const geo=new THREE.BufferGeometry();
const count=900;
const pos=new Float32Array(count*3);
for(let i=0;i<count*3;i++) pos[i]=(Math.random()-.5)*34;
geo.setAttribute("position",new THREE.BufferAttribute(pos,3));
const mat=new THREE.PointsMaterial({color:0xffffff,size:.018,transparent:true,opacity:.65});
const stars=new THREE.Points(geo,mat);
scene.add(stars);

let mx=0,my=0,sy=0;
addEventListener("pointermove",e=>{mx=(e.clientX/innerWidth-.5);my=(e.clientY/innerHeight-.5)});
addEventListener("scroll",()=>sy=scrollY);
addEventListener("resize",()=>{
 camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);
});
function tick(){
 requestAnimationFrame(tick);
 stars.rotation.y += .00035;
 stars.rotation.x += .00008;
 stars.position.x += (mx*.35-stars.position.x)*.015;
 stars.position.y += (-my*.35-stars.position.y)*.015;
 camera.position.y += ((-sy/innerHeight)*.8-camera.position.y)*.015;
 renderer.render(scene,camera);
}
tick();

const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("on")}),{threshold:.12});
document.querySelectorAll("h1,h2,.worlds article,.cards article,.copy,.hero-line,.hero-actions,.contact-copy,.email").forEach(e=>{e.classList.add("reveal");observer.observe(e)});

const cursor=document.querySelector(".cursor");
addEventListener("pointermove",e=>{if(cursor){cursor.style.left=e.clientX+"px";cursor.style.top=e.clientY+"px"}});
document.querySelectorAll("a,.worlds article,.cards article").forEach(el=>{
 el.addEventListener("mouseenter",()=>{if(cursor){cursor.style.width="42px";cursor.style.height="42px"}});
 el.addEventListener("mouseleave",()=>{if(cursor){cursor.style.width="13px";cursor.style.height="13px"}});
});
document.querySelectorAll(".magnetic").forEach(el=>{
 el.addEventListener("pointermove",e=>{
   const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;
   el.style.transform=`translate(${x*.18}px,${y*.18}px)`;
 });
 el.addEventListener("pointerleave",()=>el.style.transform="");
});
