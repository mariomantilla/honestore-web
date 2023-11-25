/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/feedback',
        destination: 'https://forms.gle/4N5fkZgUXtKVhwRV8',
        permanent: true,
      },
      {
        source: '/download',
        destination: 'https://play.google.com/store/apps/details?id=app.honestore.android',
        permanent: true,
      },
      {
        source: '/s/:path*',
        destination: '/shop/:path*',
        permanent: true,
      },
      {
        source: '/shop/:path*',
        destination: '/shops/:path*',
        permanent: true,
      },
      {
        source: '/shops/119',
        destination: '/shops/119-detela-barcelona',
        permanent: true,
      },
      {
        source: '/shops/1',
        destination: '/shops/1-zoe-eco-bcn',
        permanent: true,
      },
      {
        source: '/shops/12',
        destination: '/shops/12-biombillas',
        permanent: true,
      },
      {
        source: '/shops/6',
        destination: '/shops/6-taller-arte-belle',
        permanent: true,
      },
      {
        source: '/shops/13',
        destination: '/shops/13-batllo-cafe',
        permanent: true,
      },
      {
        source: '/shops/2',
        destination: '/shops/2-organica-original',
        permanent: true,
      },
      {
        source: '/shops/15',
        destination: '/shops/15-mantra-knives',
        permanent: true,
      },
      {
        source: '/shops/8',
        destination: '/shops/8-pincel-andino',
        permanent: true,
      },
      {
        source: '/shops/9',
        destination: '/shops/9-ceroplas',
        permanent: true,
      },
      {
        source: '/shops/3',
        destination: '/shops/3-velvet-bcn',
        permanent: true,
      },
      {
        source: '/shops/10',
        destination: '/shops/10-green-waste',
        permanent: true,
      },
      {
        source: '/shops/16',
        destination: '/shops/16-telares-artesanales-del-sur',
        permanent: true,
      },
      {
        source: '/shops/5',
        destination: '/shops/5-honestore',
        permanent: true,
      },
      {
        source: '/shops/29',
        destination: '/shops/29-ecopacks',
        permanent: true,
      },
      {
        source: '/shops/18',
        destination: '/shops/18-ecology-pets',
        permanent: true,
      },
      {
        source: '/shops/28',
        destination: '/shops/28-the-upcyclingco',
        permanent: true,
      },
      {
        source: '/shops/32',
        destination: '/shops/32-econaturals-chile',
        permanent: true,
      },
      {
        source: '/shops/19',
        destination: '/shops/19-apolo-y-gea-l-cosmetica-natural',
        permanent: true,
      },
      {
        source: '/shops/20',
        destination: '/shops/20-a-granel-super-justo-arica',
        permanent: true,
      },
      {
        source: '/shops/21',
        destination: '/shops/21-super-justo-iquique-tienda-de-alimentos-saludables-y-a-granel',
        permanent: true,
      },
      {
        source: '/shops/23',
        destination: '/shops/23-super-justo-copiapo',
        permanent: true,
      },
      {
        source: '/shops/24',
        destination: '/shops/24-superjusto-concon-alimentos-saludables-a-granel',
        permanent: true,
      },
      {
        source: '/shops/25',
        destination: '/shops/25-superjusto-saludable-y-a-granel-vina',
        permanent: true,
      },
      {
        source: '/shops/26',
        destination: '/shops/26-saludable-y-a-granel-olmue',
        permanent: true,
      },
      {
        source: '/shops/30',
        destination: '/shops/30-dobakaru-tienda-zero-waste-basura-cero',
        permanent: true,
      },
      {
        source: '/shops/27',
        destination: '/shops/27-super-justo-maullin',
        permanent: true,
      },
      {
        source: '/shops/120',
        destination: '/shops/120-detela-barcelona',
        permanent: true,
      },
      {
        source: '/shops/31',
        destination: '/shops/31-la-percha-concon',
        permanent: true,
      },
      {
        source: '/shops/46',
        destination: '/shops/46-cal-rosset-som-pagesos',
        permanent: true,
      },
      {
        source: '/shops/45',
        destination: '/shops/45-re-viu-re',
        permanent: true,
      },
      {
        source: '/shops/42',
        destination: '/shops/42-washaby',
        permanent: true,
      },
      {
        source: '/shops/17',
        destination: '/shops/17-colihue',
        permanent: true,
      },
      {
        source: '/shops/40',
        destination: '/shops/40-la-cofradia-mercat-social',
        permanent: true,
      },
      {
        source: '/shops/43',
        destination: '/shops/43-frooty',
        permanent: true,
      },
      {
        source: '/shops/48',
        destination: '/shops/48-venivinum',
        permanent: true,
      },
      {
        source: '/shops/60',
        destination: '/shops/60-yes-future-positive-supermarket-sant-antoni',
        permanent: true,
      },
      {
        source: '/shops/65',
        destination: '/shops/65-casa-ruiz-bruc',
        permanent: true,
      },
      {
        source: '/shops/66',
        destination: '/shops/66-casa-ruiz-aribau',
        permanent: true,
      },
      {
        source: '/shops/68',
        destination: '/shops/68-tienda-jaime-renobell',
        permanent: true,
      },
      {
        source: '/shops/53',
        destination: '/shops/53-londji',
        permanent: true,
      },
      {
        source: '/shops/51',
        destination: '/shops/51-granoleta',
        permanent: true,
      },
      {
        source: '/shops/55',
        destination: '/shops/55-vasovengo',
        permanent: true,
      },
      {
        source: '/shops/59',
        destination: '/shops/59-yes-future-positive-supermarket-poblenou',
        permanent: true,
      },
      {
        source: '/shops/54',
        destination: '/shops/54-teva-terra',
        permanent: true,
      },
      {
        source: '/shops/56',
        destination: '/shops/56-leconomat-social-roquetes',
        permanent: true,
      },
      {
        source: '/shops/58',
        destination: '/shops/58-som-nexes',
        permanent: true,
      },
      {
        source: '/shops/64',
        destination: '/shops/64-bon-granel',
        permanent: true,
      },
      {
        source: '/shops/61',
        destination: '/shops/61-limonada-de-lavanda',
        permanent: true,
      },
      {
        source: '/shops/62',
        destination: '/shops/62-vernita',
        permanent: true,
      },
      {
        source: '/shops/71',
        destination: '/shops/71-la-verdita-herbodietetica',
        permanent: true,
      },
      {
        source: '/shops/76',
        destination: '/shops/76-ecoteca',
        permanent: true,
      },
      {
        source: '/shops/79',
        destination: '/shops/79-le-pain-deric-benjamin-consell-d-cent',
        permanent: true,
      },
      {
        source: '/shops/67',
        destination: '/shops/67-casa-ruiz-muntaner',
        permanent: true,
      },
      {
        source: '/shops/74',
        destination: '/shops/74-circular-denim-fashion',
        permanent: true,
      },
      {
        source: '/shops/72',
        destination: '/shops/72-la-eco-tribu',
        permanent: true,
      },
      {
        source: '/shops/77',
        destination: '/shops/77-al-gra-del-sac-al-plat',
        permanent: true,
      },
      {
        source: '/shops/78',
        destination: '/shops/78-el-gibrell',
        permanent: true,
      },
      {
        source: '/shops/81',
        destination: '/shops/81-colmado-casa-buendia',
        permanent: true,
      },
      {
        source: '/shops/82',
        destination: '/shops/82-la-golosa-vegan-vurger-tamarit',
        permanent: true,
      },
      {
        source: '/shops/83',
        destination: '/shops/83-la-golosa-vegan-vurger-torrent-de-lolla',
        permanent: true,
      },
      {
        source: '/shops/85',
        destination: '/shops/85-cal-sarda',
        permanent: true,
      },
      "86","86-km-0-by-unio"
      {
        source: '/shops/87',
        destination: '/shops/87-biopompas-ninot',
        permanent: true,
      },
      {
        source: '/shops/93',
        destination: '/shops/93-biopompas-st-andreu',
        permanent: true,
      },
      {
        source: '/shops/89',
        destination: '/shops/89-biopompas-sagrada-familia',
        permanent: true,
      },
      {
        source: '/shops/101',
        destination: '/shops/101-visual-poetry-barcelona',
        permanent: true,
      },
      {
        source: '/shops/105',
        destination: '/shops/105-organic-market-sarria',
        permanent: true,
      },
      {
        source: '/shops/103',
        destination: '/shops/103-organic-market-comte-durgell',
        permanent: true,
      },
      {
        source: '/shops/84',
        destination: '/shops/84-nuda-market',
        permanent: true,
      },
      {
        source: '/shops/92',
        destination: '/shops/92-biopompas-horta',
        permanent: true,
      },
      {
        source: '/shops/91',
        destination: '/shops/91-biopompas-gracia',
        permanent: true,
      },
      {
        source: '/shops/90',
        destination: '/shops/90-biopompas-sant-gervasi',
        permanent: true,
      },
      {
        source: '/shops/88',
        destination: '/shops/88-biopompas-llibertat',
        permanent: true,
      },
      {
        source: '/shops/99',
        destination: '/shops/99-alimentacio-cal-romesco',
        permanent: true,
      },
      {
        source: '/shops/107',
        destination: '/shops/107-bolseta',
        permanent: true,
      },
      {
        source: '/shops/111',
        destination: '/shops/111-mescladis-bostik',
        permanent: true,
      },
      {
        source: '/shops/104',
        destination: '/shops/104-organic-market-gracia',
        permanent: true,
      },
      {
        source: '/shops/102',
        destination: '/shops/102-organic-market-sant-joan',
        permanent: true,
      },
      {
        source: '/shops/11',
        destination: '/shops/11-travieso-ropa-infantil-reutilizada',
        permanent: true,
      },
      {
        source: '/shops/41',
        destination: '/shops/41-mcpack-distribucion-de-packaging',
        permanent: true,
      },
      {
        source: '/shops/69',
        destination: '/shops/69-abans-morta-k-senzilla',
        permanent: true,
      },
      {
        source: '/shops/47',
        destination: '/shops/47-idoni',
        permanent: true,
      },
      {
        source: '/shops/94',
        destination: '/shops/94-via-dolca-hospital-clinic',
        permanent: true,
      },
      {
        source: '/shops/57',
        destination: '/shops/57-leconomat-social-sants',
        permanent: true,
      },
      {
        source: '/shops/70',
        destination: '/shops/70-food-coop-bcn',
        permanent: true,
      },
      {
        source: '/shops/52',
        destination: '/shops/52-i-love-food',
        permanent: true,
      },
      {
        source: '/shops/98',
        destination: '/shops/98-via-dolca-horta',
        permanent: true,
      },
      {
        source: '/shops/97',
        destination: '/shops/97-via-dolca-via-julia',
        permanent: true,
      },
      {
        source: '/shops/95',
        destination: '/shops/95-via-dolca-sant-antoni',
        permanent: true,
      },
      {
        source: '/shops/80',
        destination: '/shops/80-le-pain-deric-benjamin-cardenal-vives-i-tuto',
        permanent: true,
      },
      {
        source: '/shops/112',
        destination: '/shops/112-bassal-store',
        permanent: true,
      },
      {
        source: '/shops/113',
        destination: '/shops/113-original-market',
        permanent: true,
      },
      {
        source: '/shops/114',
        destination: '/shops/114-minimal-life',
        permanent: true,
      },
      {
        source: '/shops/106',
        destination: '/shops/106-grans-de-la-terra',
        permanent: true,
      },
      {
        source: '/shops/96',
        destination: '/shops/96-via-dolca-sants',
        permanent: true,
      },
      {
        source: '/shops/75',
        destination: '/shops/75-solnature-bio-market',
        permanent: true,
      },
      {
        source: '/shops/63',
        destination: '/shops/63-manantial-drogueria',
        permanent: true,
      },
      {
        source: '/shops/50',
        destination: '/shops/50-botiga-a-granel',
        permanent: true,
      },
      {
        source: '/shops/110',
        destination: '/shops/110-mescladis-del-pou',
        permanent: true,
      },
      {
        source: '/shops/109',
        destination: '/shops/109-mescladis-borell',
        permanent: true,
      },
      {
        source: '/shops/115',
        destination: '/shops/115-linverd',
        permanent: true,
      },
      {
        source: '/shops/100',
        destination: '/shops/100-refill-zero-waste',
        permanent: true,
      },
      {
        source: '/shops/49',
        destination: '/shops/49-usar-y-reusar',
        permanent: true,
      },
      {
        source: '/shops/108',
        destination: '/shops/108-ecolectia',
        permanent: true,
      },
      {
        source: '/shops/116',
        destination: '/shops/116-cero-residuo',
        permanent: true,
      },
      {
        source: '/shops/117',
        destination: '/shops/117-aida-books-more',
        permanent: true,
      },
      {
        source: '/shops/118',
        destination: '/shops/118-the-goood-shop',
        permanent: true,
      },
    ]
  },
}
