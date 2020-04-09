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
  console.log(u8.buffer)
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