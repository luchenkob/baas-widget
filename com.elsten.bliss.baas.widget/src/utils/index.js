import _ from 'lodash';

export const ToBase64 = (u8) => {
  const Uint8ToString = (u8a) => {
    var CHUNK_SZ = 0x8000;
    var c = [];
    for (var i = 0; i < u8a.length; i += CHUNK_SZ) {
      c.push(String.fromCharCode.apply(null, u8a.subarray(i, i + CHUNK_SZ)));
    }
    return c.join("");
  }
  return "data:image/jpeg;base64," + btoa(Uint8ToString(u8));
}

export const getU8Dimensions = (u8) => {
  const dataView = new DataView(u8.buffer)

  return {
    width: dataView.getInt32(0),
    height: dataView.getInt32(4)
  }
}

export const getFilteredCodec = (codec) => {
  switch (codec) {
    case "image/jpeg":
      return "jpeg"
    case "image/png":
      return "png"
    default:
      return "jpeg"
  }
}

export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const getFileExtension = (name) => {
  return name.split('.').pop();
} 

export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
}

export const filterIt = (array, value, key) => {
  return array.filter(key
      ? a => a[key] === value
      : a => Object.keys(a).some(k => a[k] === value)
  );
}

export const getFromKey = (array, value) => {
  for (const property in Object.keys(array)) {
    if(Object.keys(array)[property] == value) return array[Object.keys(array)[property]];
  }
}

export const isArrayEqual = (x, y) => {
  return _(x).differenceWith(y, _.isEqual).isEmpty();
};

export const isArrayEqualByFileName = (x, y) => {
  if(x.length != y.length) return false;

  x.map((item, i)=>{
    if(item.file !==  y[i].file) return false;
  })

  return true;
};

export const secondsToHms = (d) => {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor(d % 3600 / 60);
  const s = Math.floor(d % 3600 % 60);

  const hDisplay = h > 0 ? h + ":" : "";
  const mDisplay = m > 0 ? h > 0 ? "0"+ m + ":" : m + ":" : "0:";
  const sDisplay = s > 0 ? s > 9 ? s : "0"+s : "";
  return hDisplay + mDisplay + sDisplay; 
}