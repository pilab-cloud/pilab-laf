import{r as d,j as e}from"./index-CUZ-VPFd.js";import{j as p,a as g,M as x,C as m}from"./markdown-editor-CllbdgbI.js";import"./utils-0eAJbn5V.js";const j=[{id:"alice",label:"alice"},{id:"bob",label:"bob"},{id:"carol",label:"carol"}],b=[{id:"1",key:"PIL-12",title:"Datastore latency alert",status:"Open"},{id:"2",key:"PIL-31",title:"Rotate API keys",status:"In progress"}],h=`# Release notes

Ping @alice about #PIL-12.

- [x] Draft
- [ ] Review

| Name | Status |
|------|--------|
| api  | ok     |

\`\`\`json
{ "replicas": 3 }
\`\`\`

<script>alert(1)<\/script> [bad](javascript:alert(1))`;function E(){const[r,o]=d.useState(h),[t,i]=d.useState(`{
  "name": "vm-01",
  "cpu": 2,
}`),l=d.useMemo(()=>p(t),[t]),n=s=>`#/${s.kind}/${s.id}`;return e.jsxs("div",{className:"grid max-w-4xl gap-6",children:[e.jsxs("section",{className:"grid gap-2",children:[e.jsx("h2",{className:"m-0",children:"MarkdownEditor"}),e.jsx("p",{className:"m-0 text-sm text-muted",children:"Type @ for people, # for issues; paste or drop an image; Ctrl/⌘+Enter submits."}),e.jsx(g,{value:r,onChange:o,onSubmit:s=>alert(`Submitted ${s.length} chars`),mentions:s=>j.filter(a=>a.label.includes(s.toLowerCase())),references:s=>b.filter(a=>a.key.toLowerCase().includes(s.toLowerCase())),onUpload:async(s,a)=>{for(const c of[25,60,100])a(c),await new Promise(u=>setTimeout(u,400));return URL.createObjectURL(s)},resolveLink:n})]}),e.jsxs("section",{className:"grid gap-2",children:[e.jsx("h2",{className:"m-0",children:"Markdown renderer"}),e.jsx("div",{className:"rounded-md border border-line p-3",children:e.jsx(x,{resolveLink:n,onTaskToggle:(s,a)=>o(c=>f(c,s,a)),children:r})})]}),e.jsxs("section",{className:"grid gap-2",children:[e.jsx("h2",{className:"m-0",children:"CodeEditor (CodeMirror)"}),e.jsx(m,{label:"Spec",language:"json",value:t,onChange:i,diagnostics:l,rows:6}),e.jsx(m,{label:"Read-only YAML",language:"yaml",value:`name: vm-01
cpu: 2
`,readOnly:!0,rows:3})]})]})}function f(r,o,t){let i=-1;return r.replace(/^(\s*[-*+] )\[( |x|X)\]/gm,(l,n)=>++i===o?`${n}[${t?"x":" "}]`:l)}export{E as default};
