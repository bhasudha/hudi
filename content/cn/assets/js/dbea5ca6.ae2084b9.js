"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[61072],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>m});var r=a(67294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=r.createContext({}),u=function(e){var t=r.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},c=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=u(a),h=n,m=p["".concat(s,".").concat(h)]||p[h]||d[h]||i;return a?r.createElement(m,o(o({ref:t},c),{},{components:a})):r.createElement(m,o({ref:t},c))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,o=new Array(i);o[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:n,o[1]=l;for(var u=2;u<i;u++)o[u]=a[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}h.displayName="MDXCreateElement"},24441:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>u});var r=a(87462),n=(a(67294),a(3905));const i={title:"Build Your First Hudi Lakehouse with AWS S3 and AWS Glue",excerpt:"Follow this tutorial on building your first hudi lakehouse with AWS S3 & AWS Glue",author:"Nadine Farah",category:"blog",image:"/assets/images/blog/DataCouncil.jpg",tags:["how-to","use-case","apache hudi","aws"]},o=void 0,l={permalink:"/cn/blog/2022/12/19/Build-Your-First-Hudi-Lakehouse-with-AWS-Glue-and-AWS-S3",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/blog/blog/2022-12-19-Build-Your-First-Hudi-Lakehouse-with-AWS-Glue-and-AWS-S3.md",source:"@site/blog/2022-12-19-Build-Your-First-Hudi-Lakehouse-with-AWS-Glue-and-AWS-S3.md",title:"Build Your First Hudi Lakehouse with AWS S3 and AWS Glue",description:"/assets/images/blog/DataCouncil.jpg",date:"2022-12-19T00:00:00.000Z",formattedDate:"December 19, 2022",tags:[{label:"how-to",permalink:"/cn/blog/tags/how-to"},{label:"use-case",permalink:"/cn/blog/tags/use-case"},{label:"apache hudi",permalink:"/cn/blog/tags/apache-hudi"},{label:"aws",permalink:"/cn/blog/tags/aws"}],readingTime:1.26,truncated:!1,authors:[{name:"Nadine Farah"}],prevItem:{title:"Apache Hudi 2022 - A year in Review",permalink:"/cn/blog/2022/12/29/Apache-Hudi-2022-A-Year-In-Review"},nextItem:{title:"Run Apache Hudi at scale on AWS",permalink:"/cn/blog/2022/12/01/Run-apache-hudi-at-scale-on-aws"}},s={authorsImageUrls:[void 0]},u=[{value:"Getting Started",id:"getting-started",children:[],level:2},{value:"Questions",id:"questions",children:[],level:2}],c={toc:u},p="wrapper";function d(e){let{components:t,...i}=e;return(0,n.kt)(p,(0,r.Z)({},c,i,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"/assets/images/blog/DataCouncil.jpg",src:a(64946).Z})),(0,n.kt)("h1",{id:"build-your-first-hudi-lakehouse-with-aws-s3-and-aws-glue"},"Build Your First Hudi Lakehouse with AWS S3 and AWS Glue"),(0,n.kt)("p",null,"Soumil Shah is a Hudi community champion building ",(0,n.kt)("a",{parentName:"p",href:"https://www.youtube.com/@SoumilShah/playlists"},"YouTube content")," so developers can easily get started incorporating a lakehouse into their data infrastructure. In this ",(0,n.kt)("a",{parentName:"p",href:"https://www.youtube.com/watch?v=5zF4jc_3rFs&list=PLL2hlSFBmWwwbMpcyMjYuRn8cN99gFSY6"},"video"),", Soumil shows you how to get started with AWS Glue, AWS S3, Hudi and Athena."),(0,n.kt)("p",null,"In this tutorial, you\u2019ll learn how to:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Create and configure AWS Glue"),(0,n.kt)("li",{parentName:"ul"},"Create a Hudi Table"),(0,n.kt)("li",{parentName:"ul"},"Create a Spark Data Frame"),(0,n.kt)("li",{parentName:"ul"},"Add data to the Hudi Table "),(0,n.kt)("li",{parentName:"ul"},"Query data via Athena")),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"/assets/images/blog/build-your-first-hudi-lakehouse-12-19-diagram.jpg",src:a(90231).Z})),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Step 1"),": Users in this architecture purchase things from online retailers and generate an order transaction that is kept in DynamoDB."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Step 2"),": The raw data layer stores the order transaction data that is fed into the data lake. To accomplish this, enable Kinesis Data Streams for DynamoDB, and we will stream real-time transactions from DynamoDB into kinesis data streams, process the streaming data with lambda, and insert the data into the next kinesis stream, where a glue streaming job will process and insert the data into Apache Hudi Transaction data lake."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Step 3"),": Users can build dashboards and derive insights using QuickSight."),(0,n.kt)("h2",{id:"getting-started"},"Getting Started"),(0,n.kt)("p",null,"To get started on building this data app, follow the YouTube video on\n",(0,n.kt)("a",{parentName:"p",href:"https://www.youtube.com/watch?v=5zF4jc_3rFs&list=PLL2hlSFBmWwwbMpcyMjYuRn8cN99gFSY6&"},"Build Datalakes on S3 and Glue with Apache HUDI"),"."),(0,n.kt)("p",null,"Follow the the ",(0,n.kt)("a",{parentName:"p",href:"https://drive.google.com/file/d/1W-E_SupsoI8VZWGtq5d7doxdWdNDPEoj/view"},"step-by-step instructions"),". "),(0,n.kt)("p",null,"Apply the ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/soumilshah1995/dynamodb-hudi-stream-project"},"code source"),"."),(0,n.kt)("h2",{id:"questions"},"Questions"),(0,n.kt)("p",null,"If you run into blockers doing this tutorial, please reach out on the Apache Hudi community and tag ",(0,n.kt)("strong",{parentName:"p"},"soumilshah1995")," to help debug."))}d.isMDXComponent=!0},64946:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/DataCouncil-04dfc7a9001968f04689ba9fda4dbaab.jpg"},90231:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/build-your-first-hudi-lakehouse-12-19-diagram-7bec1745b0437f71e86e4ab659bee730.jpg"}}]);