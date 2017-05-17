/**
 * Convert url to base64
 *
 * @export
 * @param {string} url
 * @param {object} [opt={}]
 * @returns
 */
export function toDataURL(url: string, opt: Object = {}) {
  return fetch(url, opt)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    }));
};

/**
 * Make an image
 *
 * @export
 * @param {string} src
 * @returns {promise}
 */
export function makeImage(src: string) {
    return toDataURL(src, {
      method: 'GET',
      headers: new Headers(),
      mode: 'cors',
      cache: 'default'
    }).then((source: string) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(src + ' can\'t load');
        (image as HTMLImageElement).src = source;
      });
    });
};