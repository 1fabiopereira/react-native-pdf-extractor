// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'React Native Pdf Extractor',
  tagline: 'This library allows you to extract pdfs file data using matches especifics patterns.',
  url: 'https://1fabiopereira.github.io/',
  baseUrl: '/react-native-pdf-extractor/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  
  

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: '1fabiopereira', // Usually your GitHub org/user name.
  projectName: 'react-native-pdf-extractor', // Usually your repo name.
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editCurrentVersion: true,
          editUrl: 'https://github.com/1fabiopereira/react-native-pdf-extractor/edit/master/website',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'React Native Pdf Extractor',
        logo: {
          alt: 'React Native Pdf Extractor',
          src: 'img/react-native-pdf-extractor.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'before-you-start',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/1fabiopereira/react-native-pdf-extractor',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Docs',
                to: '/docs/before-you-start',
              },
            ],
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Fábio Pereira.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
