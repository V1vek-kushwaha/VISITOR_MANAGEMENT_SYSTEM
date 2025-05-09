export function dataURLtoBlob(dataURL) {
  let mime = 'image/jpeg';
  let base64 = dataURL;

  if (dataURL.includes(',')) {
    const parts = dataURL.split(',');
    const header = parts[0];
    base64 = parts[1];

    const match = header.match(/:(.*?);/);
    if (match) {
      mime = match[1];
    }
  }

  try {
    const binary = atob(base64);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    return new Blob([array], { type: mime });
  } catch (err) {
    console.error("Failed to decode base64:", err);
    throw new Error("Invalid image format.");
  }
}

export function getDummySignature() {
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAmIBgUxZevkAAAAASUVORK5CYII=";
}

export function getDummyImage() {
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAmIBgUxZevkAAAAASUVORK5CYII=";
}
