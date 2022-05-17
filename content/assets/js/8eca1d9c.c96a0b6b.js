"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[38057],{3905:function(e,t,r){r.d(t,{Zo:function(){return d},kt:function(){return f}});var o=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},i=Object.keys(e);for(o=0;o<i.length;o++)r=i[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)r=i[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=o.createContext({}),c=function(e){var t=o.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},d=function(e){var t=c(e.components);return o.createElement(l.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},p=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,l=e.parentName,d=u(e,["components","mdxType","originalType","parentName"]),p=c(r),f=n,m=p["".concat(l,".").concat(f)]||p[f]||s[f]||i;return r?o.createElement(m,a(a({ref:t},d),{},{components:r})):o.createElement(m,a({ref:t},d))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,a=new Array(i);a[0]=p;var u={};for(var l in t)hasOwnProperty.call(t,l)&&(u[l]=t[l]);u.originalType=e,u.mdxType="string"==typeof e?e:n,a[1]=u;for(var c=2;c<i;c++)a[c]=r[c];return o.createElement.apply(null,a)}return o.createElement.apply(null,r)}p.displayName="MDXCreateElement"},73638:function(e,t,r){r.r(t),r.d(t,{contentTitle:function(){return l},default:function(){return p},frontMatter:function(){return u},metadata:function(){return c},toc:function(){return d}});var o=r(87462),n=r(63366),i=(r(67294),r(3905)),a=["components"],u={version:"0.7.0",title:"Cloud Storage",keywords:["hudi","aws","gcp","oss","azure","cloud"],summary:"In this page, we introduce how Hudi work with different Cloud providers.",toc:!0,last_modified_at:new Date("2019-06-17T01:59:57.000Z")},l=void 0,c={unversionedId:"cloud",id:"version-0.7.0/cloud",title:"Cloud Storage",description:"Talking to Cloud Storage",source:"@site/versioned_docs/version-0.7.0/cloud.md",sourceDirName:".",slug:"/cloud",permalink:"/docs/0.7.0/cloud",editUrl:"https://github.com/apache/hudi/tree/asf-site/website/versioned_docs/version-0.7.0/cloud.md",tags:[],version:"0.7.0",frontMatter:{version:"0.7.0",title:"Cloud Storage",keywords:["hudi","aws","gcp","oss","azure","cloud"],summary:"In this page, we introduce how Hudi work with different Cloud providers.",toc:!0,last_modified_at:"2019-06-17T01:59:57.000Z"},sidebar:"version-0.7.0/docs",previous:{title:"Deployment Guide",permalink:"/docs/0.7.0/deployment"},next:{title:"S3 Filesystem",permalink:"/docs/0.7.0/s3_hoodie"}},d=[{value:"Talking to Cloud Storage",id:"talking-to-cloud-storage",children:[],level:2}],s={toc:d};function p(e){var t=e.components,r=(0,n.Z)(e,a);return(0,i.kt)("wrapper",(0,o.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"talking-to-cloud-storage"},"Talking to Cloud Storage"),(0,i.kt)("p",null,"Immaterial of whether RDD/WriteClient APIs or Datasource is used, the following information helps configure access\nto cloud stores."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/s3_hoodie"},"AWS S3")," ",(0,i.kt)("br",null),"\nConfigurations required for S3 and Hudi co-operability."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/gcs_hoodie"},"Google Cloud Storage")," ",(0,i.kt)("br",null),"\nConfigurations required for GCS and Hudi co-operability."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/oss_hoodie"},"Alibaba Cloud OSS")," ",(0,i.kt)("br",null),"\nConfigurations required for OSS and Hudi co-operability."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/azure_hoodie"},"Microsoft Azure")," ",(0,i.kt)("br",null),"\nConfigurations required for Azure and Hudi co-operability."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/cos_hoodie"},"Tencent Cloud Object Storage")," ",(0,i.kt)("br",null),"\nConfigurations required for COS and Hudi co-operability."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/ibm_cos_hoodie"},"IBM Cloud Object Storage")," ",(0,i.kt)("br",null),"\nConfigurations required for IBM Cloud Object Storage and Hudi co-operability.")))}p.isMDXComponent=!0}}]);