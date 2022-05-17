"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[92648],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return d}});var r=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},s=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),f=u(n),d=i,m=f["".concat(c,".").concat(d)]||f[d]||p[d]||o;return n?r.createElement(m,a(a({ref:t},s),{},{components:n})):r.createElement(m,a({ref:t},s))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=f;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:i,a[1]=l;for(var u=2;u<o;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},9752:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return c},default:function(){return f},frontMatter:function(){return l},metadata:function(){return u},toc:function(){return s}});var r=n(87462),i=n(63366),o=(n(67294),n(3905)),a=["components"],l={title:"File Layouts",toc:!0},c=void 0,u={unversionedId:"file_layouts",id:"file_layouts",title:"File Layouts",description:"The following describes the general file layout structure for Apache Hudi",source:"@site/docs/file_layouts.md",sourceDirName:".",slug:"/file_layouts",permalink:"/docs/next/file_layouts",editUrl:"https://github.com/apache/hudi/tree/asf-site/website/docs/file_layouts.md",tags:[],version:"current",frontMatter:{title:"File Layouts",toc:!0},sidebar:"docs",previous:{title:"Indexing",permalink:"/docs/next/indexing"},next:{title:"Metadata Table",permalink:"/docs/next/metadata"}},s=[],p={toc:s};function f(e){var t=e.components,l=(0,i.Z)(e,a);return(0,o.kt)("wrapper",(0,r.Z)({},p,l,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"The following describes the general file layout structure for Apache Hudi"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Hudi organizes data tables into a directory structure under a base path on a distributed file system"),(0,o.kt)("li",{parentName:"ul"},"Tables are broken up into partitions"),(0,o.kt)("li",{parentName:"ul"},"Within each partition, files are organized into file groups, uniquely identified by a file ID"),(0,o.kt)("li",{parentName:"ul"},"Each file group contains several file slices "),(0,o.kt)("li",{parentName:"ul"},"Each slice contains a base file (",(0,o.kt)("em",{parentName:"li"},".parquet) produced at a certain commit/compaction instant time, along with set of log files ("),".log.*) that contain inserts/updates to the base file since the base file was produced. ")),(0,o.kt)("p",null,"Hudi adopts Multiversion Concurrency Control (MVCC), where ",(0,o.kt)("a",{parentName:"p",href:"/docs/next/compaction"},"compaction")," action merges logs and base files to produce new\nfile slices and ",(0,o.kt)("a",{parentName:"p",href:"/docs/next/hoodie_cleaner"},"cleaning")," action gets rid of unused/older file slices to reclaim space on the file system."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Partition On HDFS",src:n(79719).Z})))}f.isMDXComponent=!0},79719:function(e,t,n){t.Z=n.p+"assets/images/hudi_partitions_HDFS-5f9da4e0c57c9ee20b74b31c035ba0e6.png"}}]);