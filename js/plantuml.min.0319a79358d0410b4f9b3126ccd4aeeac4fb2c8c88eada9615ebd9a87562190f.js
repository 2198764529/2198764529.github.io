function plantuml(){let e=document.querySelectorAll(".language-mindmap,.language-uml");e&&Array.from(e).forEach(e=>{t(e)});function t(t){let s=t.dataset.lang,e=t.innerText;s=="mindmap"&&(e=e.trim(),e.match(/^[+-]/gm)?e=e.replace(/^\+\d/gm,function(e){return`${"*".repeat(e.length+1)} `}):e.match(/^\t*/)?e=e.replace(/^\t*/gm,function(e){return`${"*".repeat(e.length+1)} `}):console.log(`el_innerText: ${e}`),e=e.replace(/^\** [\]|_:]/gm,function(e){return`${e.replace(" ","")} `}));let o=document.createElement("embed");e=`@start${s} \n${n()}\n${e}\n@end${s}`,e=plantumlEncoder.encode(e),o.src=`https://www.plantuml.com/plantuml/png/~1${e}`,o.style.display="inline",t.innerHTML=o.outerHTML}function n(){const t=getComputedStyle(document.body),e=t.getPropertyValue("--body-font-color").trim(),n=t.getPropertyValue("--body-background").trim(),s=t.getPropertyValue("--card-bg").trim();return`
        <style>
        mindmapDiagram {
            node {
              BackgroundColor ${n}
              FontColor ${e}
              LineColor ${e}
              LineThickness 0.5
            }
            arrow  {
              LineColor ${e}
              LineThickness 0.3
            }
          }
          componentDiagram {
            node {
              FontColor ${s}
              // BackgroundColor ${n}
              LineColor ${s}
            }
            arrow {
              LineColor ${s}
              FontColor ${e}
              LineThickness 5
            }
          }
          document {
            width 100%
            BackgroundColor ${n}
            node {
              FontColor ${e}
              LineColor ${e}
            }
            arrow {
              LineColor ${e}
            }
          }
        </style>`}}plantuml()