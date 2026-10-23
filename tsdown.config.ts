import createTsdownConfig from '@fringeworks/dev/createTsdownConfig';

export default createTsdownConfig({
  css: true,
  exports: {
    include: [/\/helpers\/[^/]+\.ts$/],
    extraExports: {
      './styles.css': './styles.css',
      './*.css': './*/styles.css',
    },
  },
});
