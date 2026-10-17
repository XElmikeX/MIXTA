const Q=[
["¿Cuántas estrategias para el diseño de esquemas distingue el manual?",["Dos","Tres","Cinco","Cuatro"],3],
["¿Cuál de las siguientes NO es una estrategia de diseño de esquemas?",["Descendente","Centrífuga","Lineal","Mixta"],2],
["La estrategia descendente se obtiene aplicando solo primitivas de…",["refinamiento descendente","refinamiento ascendente","fusión de esquemas","normalización"],0],
["La estrategia ascendente parte de…",["el dominio de aplicación completo ascendente","un esquema ya normalizado sistematicamente","conceptos elementales para construir otros más complejos","el concepto más importante únicamente estrategicamente"],2],
["En la estrategia ascendente, los requerimientos se conceptualizan de manera independiente y finalmente…",["se descartan los repetidos de la estrategia acendente","se fusionan en un esquema global","se convierten en tablas dobles","se refinan hacia abajo unidamente"],1],
["La estrategia centrífuga es un caso especial de la estrategia…",["descendente","mixta","ascendente","relacional"],2],
["¿Con qué imagen se compara el avance de la estrategia centrífuga?",["Un árbol que se ramifica","Una mancha de aceite","Una escalera double","Un embudo"],1],
["En la estrategia centrífuga, lo primero que se fija son…",["los atributos de menor importancia","los conceptos más importantes o evidentes","las cardinalidades que se almacenan en el sistema","los conceptos más distantes"],1],
["La estrategia mixta aprovecha…",["solo la descendente dispersa al esquema","solo la centrífuga que equivale al contemporaneo","la ascendente y la descendente con particiones controladas","ninguna primitiva de refinamiento controlado"],2],
["El ejemplo de la empresa hotelera se resuelve con la estrategia…",["ascendente","descendente","mixta","centrífuga"],3],
["El ejemplo de la base de datos demográfica (censo) usa la estrategia…",["ascendente","mixta","centrífuga","descendente"],0],
["El ejemplo del torneo de tenis Grand Slam se resuelve con la estrategia…",["descendente","centrífuga","ascendente","mixta"],1],
["El ejemplo del personal de una entidad bancaria se resuelve con la estrategia…",["mixta","descendente","ascendente","centrífuga"],0],
["En el ejemplo bancario con estrategia mixta, ¿qué esquema se elabora primero?",["El esquema final","El esquema armazón","El esquema de agencia","El primer esquema sin estructuras"],1],
["Un esquema es completo (complexión) cuando…",["no tiene elementos redundantes en el esquema","representa todas las características pertinentes del dominio","se entiende sin explicaciones en base a las caracteristicas mostradas","respeta las formas normales alrededor del dominio"],1],
["Un esquema es sintácticamente correcto cuando los conceptos se definen con propiedad; por ejemplo, las generalizaciones se definen entre…",["relaciones","atributos","entidades","dominios"],2],
["Un esquema es mínimo cuando…",["cada aspecto de los requerimientos aparece solo una vez","tiene pocas entidades","no tiene atributos","solo usa relaciones binarias que minimiza al esquema"],0],
["¿Qué cualidad indica que el esquema representa los requerimientos de forma natural y fácil de entender?",["Minimalidad","Normalidad","Expresividad","Complexión"],2],
["La legibilidad es una propiedad…",["del diagrama que representa gráficamente el esquema","de las tablas relacionales que muestra ligeslidad en esquema","del lenguaje SQL ","de los requerimientos"],0],
["¿Qué cualidad permite descomponer el esquema en módulos o vistas para adaptarlo a requerimientos cambiantes?",["Autoexplicación","Legibilidad","Corrección","Extensibilidad"],3]
];
let i=0,score=0,done=false;
const $=id=>document.getElementById(id);
function show(){
 done=false;$("nx").hidden=true;$("res").hidden=true;$("fb").textContent="";$("fb").style.color="";
 $("qn").textContent="Pregunta "+(i+1)+" de "+Q.length;$("qt").textContent=Q[i][0];
 $("bar").firstElementChild.style.width=(i/Q.length*100)+"%";
 const o=$("opts");o.innerHTML="";
 Q[i][1].forEach((t,k)=>{const b=document.createElement("button");b.className="opt";b.textContent=String.fromCharCode(65+k)+") "+t;b.onclick=()=>pick(k);o.appendChild(b)});
}
function pick(k){
 if(done)return;done=true;
 const c=Q[i][2],bs=[...document.querySelectorAll(".opt")];
 bs.forEach(b=>b.disabled=true);bs[c].classList.add("ok");
 if(k===c){score++;$("fb").textContent="¡Correcto!";$("fb").style.color="var(--ok)"}
 else{bs[k].classList.add("bad");$("fb").textContent="Incorrecto. La respuesta correcta es "+bs[c].textContent;$("fb").style.color="var(--bad)"}
 if(i<Q.length-1){$("nx").hidden=false;$("nx").focus()}else finish();
}
function finish(){
 $("bar").firstElementChild.style.width="100%";
 const r=$("res");r.hidden=false;
 r.innerHTML="<p>Tu puntaje final</p><b>"+score+" / "+Q.length+"</b><p>"+(score>=18?"Excelente dominio del tema.":score>=14?"Muy bien, repasa los detalles.":score>=10?"Vas bien, vuelve a revisar el concepto.":"Repasa la sección de concepto e inténtalo otra vez.")+"</p><button class=\"btn\" id=\"rs\">Empezar de nuevo</button>";
 $("rs").onclick=()=>{i=0;score=0;show();$("quiz").scrollIntoView({block:"start"})};
}
$("nx").onclick=()=>{i++;show()};
show();

/* Navegación entre secciones: solo una visible a la vez */
document.querySelectorAll("nav a[data-target]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.dataset.target;
    const target = document.getElementById(targetId);
    if (!target) return;
    document.querySelectorAll("main > section, main > header").forEach(el => {
      el.classList.toggle("active", el === target);
    });
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* Asegurar que al cargar haya exactamente una sección activa */
(function ensureOneActive() {
  const sections = document.querySelectorAll("main > section, main > header");
  const actives = [...sections].filter(s => s.classList.contains("active"));
  if (actives.length === 0 && sections.length) {
    sections[0].classList.add("active");
  } else if (actives.length > 1) {
    actives.slice(1).forEach(s => s.classList.remove("active"));
  }
})();