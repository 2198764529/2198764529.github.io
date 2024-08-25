function plantuml(){let e=document.querySelectorAll(".language-mindmap,.language-uml");if(e){t();function t(){Array.from(e).forEach(e=>{let t=e.innerText;e.dataset.lang=="mindmap"&&(t=t.trim().replace(/^\t*/gm,function(e){return"*".repeat(e.length+1)+"  "}).replace(/\* (\[|_)/gm,function(e){return e.replace(" ","")}));let s=document.createElement("embed");t=`@start${e.dataset.lang} \n<style>${n()}</style>\n`+`${t}\n@end${e.dataset.lang}`;let o="https://www.plantuml.com/plantuml/svg/~1"+plantumlEncoder.encode(t);s.src=o,s.style.display="inline",e.innerHTML=s.outerHTML})}function n(){const e=getComputedStyle(document.body),t=e.getPropertyValue("--body-font-color").trim(),n=e.getPropertyValue("--body-background").trim(),s=e.getPropertyValue("--card-bg").trim();return`
      mindmapDiagram {
          node {
            BackgroundColor _dBackgroundColor
            FontColor _FontColor
            LineColor _LineColor
            LineStyle 4
            LineThickness 0.5
          }
          arrow  {
            LineColor _LineColor
            LineStyle 4
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
      `.replace(/_LineColor/g,t).replace(/_FontColor/g,t).replace(/_dBackgroundColor/g,n)}}}plantuml()