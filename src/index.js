import {stream, map} from 'flyd'
<<<<<<< HEAD
import { h, patch } from 'superfine'
// let h = (type, props, ...children) => {
//      return { type, props: props || {}, children }
// }
=======

let h = (type, props, ...children) => {
    if(typeof children[0] ==='string'){
      //let children =children[0].toString()
      // let children = ''
      console.log(typeof children[0])
      // children.map((x)=>{
      //   children = children+' '+x
      // })
    }

     return { type, props: props || {}, children }
}
>>>>>>> b208a5c2b80330149586b079d6a80deffc0a5180

let vdom
let Root
let App
let Init =(dom, app) =>{
  Root = dom
  App = app
}

let update = (Root, newDom)=>{
  if(vdom == undefined){
    vdom = newDom
    patch(Root, newDom)
  }
  if(newDom != vdom){
    console.time('Update')
    patch(Root, newDom, vdom)
    vdom = newDom
    console.timeEnd('Update')
  }
}

let Model = stream()

let Render = stream()
map( (x)=>{
<<<<<<< HEAD
  console.log(x)
  update(Root, x)
  return
=======
  console.time('Render')
  update(Root, x)
  console.timeEnd('Render')
>>>>>>> b208a5c2b80330149586b079d6a80deffc0a5180
}, Render)

let AutoRender = (option = true) => {
  if (option === true) map ( (m)=>{
    Render(App())
  }, Model)
}


let createElement = (node) => {
  if(node.type != undefined){
    if(typeof node.type === 'object') {
      node = node.type
    }
  }
  
  if (typeof node === 'string') {
     return document.createTextNode(node.toString())
  }
 if (typeof node.type =='function'){
   node = node.type(node.props)
 }
  const $el = typeof node.type == 'string'? document.createElement(node.type) : document.createElement(node.type)
 
  
  if(node.props != undefined || node.props != null){
    Object.entries(node.props).map( (p) => {setAttrs($el, p)})
  }
  node.children
    .map(createElement)
    .forEach($el.appendChild.bind($el))
  return $el;
}

let objecttoInlineStyle = (o) =>{
    let inline =''
    Object.entries(o).map( (s)=>{
        inline += s[0].replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()+':'+s[1]+';'
    })
    return inline
}

let getStyle = (style) =>{
    let inlineStyle = ''
    if (typeof style === 'string'){
        inlineStyle =  style
    }else {
        inlineStyle = objecttoInlineStyle(style)
    }
    return inlineStyle
}

let addEventListener = ( $el, event, cb) =>{
    let e = event.substring(2)
    $el.addEventListener(e,cb)
}

let setAttrs= ($el, prop) => {
    if( prop[0].startsWith("on") ){
       addEventListener($el,prop[0],prop[1])
    }else if (prop[0] =='style'){
        $el.setAttribute(prop[0],getStyle(prop[1]))
    }else{
        $el.setAttribute(prop[0], prop[1])
    }
}

let removeAttr= ($el, name, value) => {
    if( name.startsWith("on") ){
        removeEventListener($el,name ,value)
     }else if (name =='style'){
         $el.removeAttribute(name,getStyle(value))
     }else if (typeof value === 'boolean') {
      removeBooleanProp($target, name)
     }else{
         $el.removeAttribute(name, value)
     }
}

let setAttr= ($el, name, value) => {
    if( name.startsWith("on") ){
        addEventListener($el,name ,value)
     }else{
         $el.setAttribute(name, value)
     }
}


let diff = (node1, node2) => {
  return typeof node1 !== typeof node2 ||
         typeof node1 === 'string' && node1 !== node2 ||
         node1.type !== node2.type
}

let updateAttr = ($target, name, newVal, oldVal) => {
    if (!newVal) {
      removeAttr($target, name, oldVal)
    } else if (!oldVal || newVal !== oldVal) {
      setAttr($target, name, newVal)
    }
}

let updateAttrs = ($target, newProps, oldProps = {}) => {
    const props = Object.assign({}, newProps, oldProps);
    Object.keys(props).forEach(name => {
      updateAttr($target, name, newProps[name], oldProps[name]);
    });
  }

  
<<<<<<< HEAD
// let patch = ($parent,newNode, oldNode, index = 0) => {
//   if (!oldNode) {
//     $parent.appendChild(
//       createElement(newNode)
//     );
//   } else if (!newNode) {
//     $parent.removeChild(
//       $parent.childNodes[index]
//     );
//   } else if (diff(newNode, oldNode)) {
//     $parent.replaceChild(
//       createElement(newNode),
//       $parent.childNodes[index]
//     )
//     }else if (newNode.type) {
//     updateAttrs(
//         $parent.childNodes[index],
//         newNode.props,
//         oldNode.props
//       )
//     const newLength = newNode.children.length;
//     const oldLength = oldNode.children.length;
//     for (let i = 0; i < newLength || i < oldLength; i++) {
//       patch(
//         $parent.childNodes[index],
//         newNode.children[i],
//         oldNode.children[i],
//         i
//       );
//     }
//   }
// }
=======
let patch = ($parent,newNode, oldNode, index = 0) => {
  if (!oldNode) {
    $parent.appendChild(
      createElement(newNode)
    )
    return newNode
  } else if (!newNode) {
    $parent.removeChild(
      $parent.childNodes[index]
    );
  } else if (diff(newNode, oldNode)) {
    $parent.replaceChild(
      createElement(newNode),
      $parent.childNodes[index]
    )
    return newNode
    }else if (newNode.type) {
    updateAttrs(
        $parent.childNodes[index],
        newNode.props,
        oldNode.props
      )
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      patch(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      )
      return newNode
    }
  }
}
>>>>>>> b208a5c2b80330149586b079d6a80deffc0a5180

module.exports = {
  h: h,
  patch: patch,
  diff: diff,
  Init : Init,
  Render: Render,
  Model: Model,
  AutoRender: AutoRender
}
