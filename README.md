# Media Converter Tool
A general media converter tool powered by [ffmpeg-wasm](https://github.com/ffmpegwasm/ffmpeg.wasm). Inspired by [fireship](https://www.youtube.com/watch?v=-OTc0Ki7Sv0). All media conversion is done client-side - this server is basically just a web assembly file server! [Demo site.](https://converter.brianchen.me)

It currently supports swapping between file formats for video/image formats. There's a little extra bit to change the white background of .png images into transparent - it sort of works. 

### Running
- Clone repository
- Install dependencies - `npm install`
- Run dev environment - `npm run dev`
  - Hot reloading and all that jazz is up

### Building
- `npm run build && npm run start`
- Take inspiration from the Dockerfile :^)

### Notes
- CORS is enabled in `./next.config.js`. Needed to enabled ffmpeg-wasm
- This only works locally (localhost), or on an HTTPS connection because of CORS.
- There's a helper script called `build_and_push_image.sh`. Just a lazy script to automate building this into a docker image and pushing it into my local docker repository. Feel free to rip/edit as needed :)

### Technologies used:
- [ffmpeg-wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)
- [Next13](https://nextjs.org/blog/next-13_)
- [TailwindCSS](https://tailwindcss.com/)