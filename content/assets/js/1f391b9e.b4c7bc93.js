"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[13085],{87529:(e,a,t)=>{t.r(a),t.d(a,{default:()=>d});var l=t(67294),n=t(86010),s=t(39256),i=t(3905),c=t(67707),m=t(51575),r=t(53810);const o="mdxPageWrapper_eQvw";const d=function(e){const{content:a}=e,{frontMatter:t,metadata:d}=a,{title:v,description:N,wrapperClassName:g,hide_table_of_contents:u}=t,{permalink:f}=d;return l.createElement(s.Z,{title:v,description:N,permalink:f,wrapperClassName:g??r.kM.wrapper.mdxPages,pageClassName:r.kM.page.mdxPage},l.createElement("main",{className:"container container--fluid margin-vert--lg"},l.createElement("div",{className:(0,n.Z)("row",o)},l.createElement("div",{className:(0,n.Z)("col",!u&&"col--8")},l.createElement(i.Zo,{components:c.Z},l.createElement(a,null))),!u&&a.toc&&l.createElement("div",{className:"col col--2"},l.createElement(m.Z,{toc:a.toc,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level})))))}},51575:(e,a,t)=>{t.d(a,{Z:()=>m});var l=t(87462),n=t(67294),s=t(86010),i=t(25002);const c="tableOfContents_vrFS";const m=function(e){let{className:a,...t}=e;return n.createElement("div",{className:(0,s.Z)(c,"thin-scrollbar",a)},n.createElement(i.Z,(0,l.Z)({},t,{linkClassName:"table-of-contents__link toc-highlight",linkActiveClassName:"table-of-contents__link--active"})))}},25002:(e,a,t)=>{t.d(a,{Z:()=>c});var l=t(87462),n=t(67294),s=t(53810);function i(e){let{toc:a,className:t,linkClassName:l,isChild:s}=e;return a.length?n.createElement("ul",{className:s?void 0:t},a.map((e=>n.createElement("li",{key:e.id},n.createElement("a",{href:`#${e.id}`,className:l??void 0,dangerouslySetInnerHTML:{__html:e.value}}),n.createElement(i,{isChild:!0,toc:e.children,className:t,linkClassName:l}))))):null}function c(e){let{toc:a,className:t="table-of-contents table-of-contents__left-border",linkClassName:c="table-of-contents__link",linkActiveClassName:m,minHeadingLevel:r,maxHeadingLevel:o,...d}=e;const v=(0,s.LU)(),N=r??v.tableOfContents.minHeadingLevel,g=o??v.tableOfContents.maxHeadingLevel,u=(0,s.DA)({toc:a,minHeadingLevel:N,maxHeadingLevel:g}),f=(0,n.useMemo)((()=>{if(c&&m)return{linkClassName:c,linkActiveClassName:m,minHeadingLevel:N,maxHeadingLevel:g}}),[c,m,N,g]);return(0,s.Si)(f),n.createElement(i,(0,l.Z)({toc:u,className:t,linkClassName:c},d))}}}]);