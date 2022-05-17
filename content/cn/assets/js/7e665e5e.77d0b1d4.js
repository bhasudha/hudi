"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[27657],{3905:function(e,t,r){r.d(t,{Zo:function(){return s},kt:function(){return f}});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):u(u({},t),e)),r},s=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,s=a(e,["components","mdxType","originalType","parentName"]),p=l(r),f=o,m=p["".concat(c,".").concat(f)]||p[f]||d[f]||i;return r?n.createElement(m,u(u({ref:t},s),{},{components:r})):n.createElement(m,u({ref:t},s))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,u=new Array(i);u[0]=p;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a.mdxType="string"==typeof e?e:o,u[1]=a;for(var l=2;l<i;l++)u[l]=r[l];return n.createElement.apply(null,u)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},5260:function(e,t,r){r.r(t),r.d(t,{contentTitle:function(){return c},default:function(){return p},frontMatter:function(){return a},metadata:function(){return l},toc:function(){return s}});var n=r(87462),o=r(63366),i=(r(67294),r(3905)),u=["components"],a={title:"\u4e91\u50a8\u5b58",keywords:["hudi","aws","gcp","oss","azure","cloud"],summary:"In this page, we introduce how Hudi work with different Cloud providers.",toc:!0,last_modified_at:new Date("2019-06-17T01:59:57.000Z"),language:"cn"},c=void 0,l={unversionedId:"cloud",id:"version-0.5.3/cloud",title:"\u4e91\u50a8\u5b58",description:"\u4e0e\u4e91\u5b58\u50a8\u8fde\u63a5",source:"@site/i18n/cn/docusaurus-plugin-content-docs/version-0.5.3/cloud.md",sourceDirName:".",slug:"/cloud",permalink:"/cn/docs/0.5.3/cloud",editUrl:"https://github.com/apache/hudi/tree/asf-site/website/versioned_docs/version-0.5.3/cloud.md",tags:[],version:"0.5.3",frontMatter:{title:"\u4e91\u50a8\u5b58",keywords:["hudi","aws","gcp","oss","azure","cloud"],summary:"In this page, we introduce how Hudi work with different Cloud providers.",toc:!0,last_modified_at:"2019-06-17T01:59:57.000Z",language:"cn"},sidebar:"version-0.5.3/docs",previous:{title:"\u7ba1\u7406 Hudi Pipelines",permalink:"/cn/docs/0.5.3/deployment"},next:{title:"S3 Filesystem",permalink:"/cn/docs/0.5.3/s3_hoodie"}},s=[{value:"\u4e0e\u4e91\u5b58\u50a8\u8fde\u63a5",id:"\u4e0e\u4e91\u5b58\u50a8\u8fde\u63a5",children:[],level:2}],d={toc:s};function p(e){var t=e.components,r=(0,o.Z)(e,u);return(0,i.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"\u4e0e\u4e91\u5b58\u50a8\u8fde\u63a5"},"\u4e0e\u4e91\u5b58\u50a8\u8fde\u63a5"),(0,i.kt)("p",null,"\u65e0\u8bba\u4f7f\u7528RDD/WriteClient API\u8fd8\u662f\u6570\u636e\u6e90\uff0c\u4ee5\u4e0b\u4fe1\u606f\u90fd\u6709\u52a9\u4e8e\u914d\u7f6e\u5bf9\u4e91\u5b58\u50a8\u7684\u8bbf\u95ee\u3002"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/cn/docs/s3_hoodie"},"AWS S3")," ",(0,i.kt)("br",null),"\nS3\u548cHudi\u534f\u540c\u5de5\u4f5c\u6240\u9700\u7684\u914d\u7f6e\u3002"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/cn/docs/gcs_hoodie"},"Google Cloud Storage")," ",(0,i.kt)("br",null),"\nGCS\u548cHudi\u534f\u540c\u5de5\u4f5c\u6240\u9700\u7684\u914d\u7f6e\u3002"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/cn/docs/oss_hoodie"},"Alibaba Cloud OSS")," ",(0,i.kt)("br",null),"\n\u963f\u91cc\u4e91\u548cHudi\u534f\u540c\u5de5\u4f5c\u6240\u9700\u7684\u914d\u7f6e\u3002"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/cn/docs/azure_hoodie"},"Microsoft Azure")," ",(0,i.kt)("br",null),"\nAzure\u548cHudi\u534f\u540c\u5de5\u4f5c\u6240\u9700\u7684\u914d\u7f6e\u3002")))}p.isMDXComponent=!0}}]);