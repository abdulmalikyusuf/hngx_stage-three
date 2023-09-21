import { createApi } from "unsplash-js";


// on your node server
const unsplash = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY as string,
  //...other fetch options
});

// in the browser
// const browserApi = createApi({
//   apiUrl: 'https://mywebsite.com/unsplash-proxy',
//   //...other fetch options
// });

// const controller = new AbortController();
// const signal = controller.signal;

// unsplash.photos.get({ photoId: '123' }, { signal }).catch(err => {
//   if (err.name === 'AbortError') {
//     console.log('Fetch aborted');
//   }
// });
// controller.abort();



export { unsplash }