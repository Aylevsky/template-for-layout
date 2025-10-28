import { resolve, basename } from 'node:path';

const buildFolder = './dist';
const srcFolder = './src';

export const filePaths = {
  build: {
    js: `${buildFolder}/scripts/`,
    css: `${buildFolder}/css/`,
    static: `${buildFolder}/static/`,
    images: `${buildFolder}/images/`,
    componentsImages: {
      images: `${buildFolder}/images/components/`,
      svg: `${buildFolder}/images/components/`
    },
    fonts: `${buildFolder}/fonts/`
  },
  src: {
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/images/**/*.svg`,
    componentsImages: {
      images: `${srcFolder}/components/**/*.{jpg,jpeg,png,gif,webp}`,
      svg: `${srcFolder}/components/**/*.svg`
    },
    js: `${srcFolder}/js/main.js`,
    scss: `${srcFolder}/styles/main.scss`,
    html: `${srcFolder}/pages/**/*.html`,
    pug: `${srcFolder}/pages/**/*.pug`,
    static: [`${srcFolder}/static/**/*.*`, `!${srcFolder}/static/readme.md`],
    svgIcons: `${srcFolder}/icons/**/*.svg`,
    fontFacesFile: `${srcFolder}/styles/default/fonts.scss`,
    fonts: `${srcFolder}/fonts/`,
  },
  watch: {
    js: `${srcFolder}/**/*.js`,
    scss: [`${srcFolder}/styles/**/*.scss`, `${srcFolder}/pages/**/*.scss`, `${srcFolder}/components/**/*.scss`],
    html: `${srcFolder}/**/*.html`,
    pug: `${srcFolder}/**/*.pug`,
    images: `${srcFolder}/**/*.{jpg,jpeg,png,svg,gif,webp,ico}`,
    svg: `${srcFolder}/images/**/*.svg`,
    static: `${srcFolder}/static/**/*.*`,
    componentsImages: {
      images: `${srcFolder}/components/**/*.{jpg,jpeg,png,gif,webp}`,
      svg: `${srcFolder}/components/**/*.svg`
    },
    fonts: `${buildFolder}/fonts/`
  },
  buildFolder,
  srcFolder,
  projectDirName: basename(resolve()),
  // Путь к нужной папке на удаленном сервере. Gulp добавит имя папки проекта автоматически
  ftp: '',
  fontsFile: `${srcFolder}/styles/default/fonts.scss`
};
