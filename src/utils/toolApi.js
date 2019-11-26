function routerAllName(obj, name) {
  // if(/\//.test(name)) {
  //     name = '/'+name
  // }
  // if(name) {
  //     obj.forEach(item=>{
  //         item.path = name+item.path
  //     })
  // }
  obj.forEach(item => {
    if (item.path.indexOf('/') === -1) {
      item.path = '/' + item.path
    }
    if (name) {
      item.path = name + item.path
    }
    if (item.children) {
      item.children = routerAllName(item.children, item.path)
    }
  })
  return obj
}

function addComma(arr) {
  var str = ''
  for (var i = 0; i < arr.length; i++) {
    if (arr.length - 1 === i) {
      str += arr[i]
    } else {
      str += arr[i] + ','
    }
  }
  return str
}
function copy(obj1, obj2) {
  for (var key in obj1) {
    if (obj1[key] instanceof Object) {
      obj2[key] = {}
      copy(obj1[key], obj2[key])
    } else if (obj1[key] instanceof Array) {
      obj2[key] = []
      copy(obj1[key], obj2[key])
    } else {
      obj2[key] = obj1[key]
    }
  }
}
export default {
  routerAllName,
  addComma,
  copy
}
