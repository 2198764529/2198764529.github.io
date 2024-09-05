function plantuml(){let e=document.querySelectorAll(".language-mindmap,.language-uml");if(e){t();function t(){Array.from(e).forEach(t=>{let e=t.innerText;t.dataset.lang=="mindmap"&&(e=e.trim(),e.match(/^[+-]/gm)?e=e.replace(/^\+\d/gm,function(e){return`${"*".repeat(e.length+1)} `}):e.match(/^\t*/)?e=e.replace(/^\t*/gm,function(e){return`${"*".repeat(e.length+1)} `}):console.log(`el_innerText: ${e}`),e=e.replace(/^\** [\]|_:]/gm,function(e){return`${e.replace(" ","")} `}));let s=document.createElement("embed");e=`@start${t.dataset.lang} \n${n()}\n${e}\n@end${t.dataset.lang}`,s.src=`https://www.plantuml.com/plantuml/svg/~1${plantumlEncoder.encode(e)}`,s.style.display="inline",t.innerHTML=s.outerHTML})}function n(){const e=getComputedStyle(document.body),t=e.getPropertyValue("--body-font-color").trim(),n=e.getPropertyValue("--body-background").trim(),s=e.getPropertyValue("--card-bg").trim();return`
      <style>
      mindmapDiagram {
          node {
            BackgroundColor _dBackgroundColor
            FontColor _FontColor
            LineColor _LineColor
            LineThickness 0.5
          }
          arrow  {
            LineColor _LineColor
            LineThickness 0.3
          }
        }
        componentDiagram {
          node {
            FontColor _FontColor
            LineColor _LineColor
          }
          arrow {
            LineColor _LineColor
          }
        }
        document {
          width 100%
          BackgroundColor _dBackgroundColor
          node {
            FontColor _FontColor
            LineColor _LineColor
          }
          arrow {
            LineColor _LineColor
          }
      }
      </style>
      `.replace(/_LineColor/g,t).replace(/_FontColor/g,t).replace(/_dBackgroundColor/g,n)}}}plantuml()