(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{21:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var s=n(0),r=n(2),c=n.n(r),o=n(15),i=n.n(o),a=(n(21),n(6)),u=n(3),l=n(4),d=n.n(l),j="http://localhost:3001/api/persons",b={getAll:function(){return d.a.get(j)},create:function(e){return d.a.post(j,e)},remove:function(e){return d.a.delete(j+"/"+e)},update:function(e){return d.a.put(j+"/"+e.id,e)}},f=function(e){var t=e.message,n=e.error;return null===t?null:void 0!==n&&n?Object(s.jsx)("div",{className:"error",children:t}):Object(s.jsx)("div",{className:"success",children:t})},h=function(e){return Object(s.jsxs)("div",{children:["filter shown with ",Object(s.jsx)("input",{value:e.filter,onChange:function(t){e.setFilter(t.target.value)}})]})},O=function(e){var t=Object(r.useState)(""),n=Object(u.a)(t,2),c=n[0],o=n[1],i=Object(r.useState)(""),l=Object(u.a)(i,2),d=l[0],j=l[1];return Object(s.jsxs)("form",{onSubmit:function(t){if(t.preventDefault(),e.persons.map((function(e){return e.name})).indexOf(c)>=0){if(window.confirm("".concat(c," is already added to phonebook, replace the old number with a new one?"))){var n=e.persons.find((function(e){return e.name===c}));n.number=d,b.update(n),e.setPersons(e.persons.map((function(e){return e.name===n.name?n:e}))),e.setMessage("Number changed for ".concat(c)),setTimeout((function(){e.setMessage(null)}),5e3),o(""),j("")}}else{var s={name:c,number:d};b.create(s).then((function(t){e.setPersons(e.persons.concat(Object(a.a)(Object(a.a)({},s),{},{id:t.data.id})))})),e.setMessage("Added ".concat(c)),setTimeout((function(){e.setMessage(null)}),5e3),o(""),j("")}},children:[Object(s.jsxs)("div",{children:["name: ",Object(s.jsx)("input",{value:c,onChange:function(e){o(e.target.value)}})]}),Object(s.jsxs)("div",{children:["number: ",Object(s.jsx)("input",{value:d,onChange:function(e){j(e.target.value)}})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},m=function(e){var t=e.persons.find((function(t){return t.id===e.id}));return Object(s.jsx)("button",{type:"submit",onClick:function(){return n=t,void(window.confirm("Delete ".concat(n.name,"?"))&&(b.remove(n.id).catch((function(t){e.setMessage("".concat(n.name," already deleted."),!0),setTimeout((function(){e.setMessage(null)}),5e3)})),e.setPersons(e.persons.filter((function(e){return e!==n})))));var n},children:"Delete"})},p=function(e){var t=e.persons.filter((function(t){return t.name.toLowerCase().includes(e.filter.toLowerCase())}));return Object(s.jsx)("div",{children:Object(s.jsx)("ul",{children:t.map((function(t){return Object(s.jsxs)("li",{children:[t.name," ",t.number," ",Object(s.jsx)(m,{id:t.id,persons:e.persons,setPersons:e.setPersons,setMessage:e.setMessage})]},t.name)}))})})},v=function(){var e=Object(r.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],o=Object(r.useState)(""),i=Object(u.a)(o,2),a=i[0],l=i[1],d=Object(r.useState)(null),j=Object(u.a)(d,2),m=j[0],v=j[1];return Object(r.useEffect)((function(){b.getAll().then((function(e){c(e.data)}))}),[]),Object(s.jsxs)("div",{children:[Object(s.jsx)("h1",{children:"Phonebook"}),Object(s.jsx)(f,{message:m}),Object(s.jsx)(h,{filter:a,setFilter:l}),Object(s.jsx)("h2",{children:"Add a new"}),Object(s.jsx)(O,{persons:n,setPersons:c,setMessage:v}),Object(s.jsx)("h2",{children:"Numbers"}),Object(s.jsx)(p,{persons:n,setPersons:c,filter:a,setMessage:v})]})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,41)).then((function(t){var n=t.getCLS,s=t.getFID,r=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),s(e),r(e),c(e),o(e)}))};i.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(v,{})}),document.getElementById("root")),g()}},[[40,1,2]]]);
//# sourceMappingURL=main.da8c9f0e.chunk.js.map