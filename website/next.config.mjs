import { BASE_PATH } from './src/lib/basePath.js';

/** @type {import('next').NextConfig} */
export default {
  // Static bundle pushed to the gh-pages branch.
  output: 'export',
  basePath: BASE_PATH,
  // The canonical is javier.xyz/react-number-easing, without a trailing slash.
  trailingSlash: false,
};
