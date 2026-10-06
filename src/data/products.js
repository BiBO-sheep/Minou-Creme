// Edit products here. Each card renders from one object.
// `variants` turns the card into a swipeable variant picker (see Bisky);
// `flavors` prints the available tastes next to the name (see Milky Sando).

export const products = [
  {
    name: 'Bisky Cheese',
    price: 'Rp20.000',
    image: 'assets/products/bisky-cheese.png',
    alt: 'Bisky Cheese dessert Minou Crème dalam kemasan',
    desc: 'Renyah di luar, lembut di dalam, yang paling sering bikin orang balik lagi.',
    waMessage: 'Halo Minou Crème, saya ingin memesan Bisky Cheese.',
    variants: [
      {
        label: 'Cheese',
        name: 'Bisky Cheese',
        price: 'Rp20.000',
        image: 'assets/products/bisky-cheese.png',
        alt: 'Bisky Cheese dessert Minou Crème dalam kemasan',
        desc: 'Renyah di luar, lembut di dalam, yang paling sering bikin orang balik lagi.',
        waMessage: 'Halo Minou Crème, saya ingin memesan Bisky Cheese.'
      },
      {
        label: 'Matcha',
        name: 'Bisky Matcha',
        price: 'Rp25.000',
        image: 'assets/products/bisky-matcha-chocolate.png',
        objectPosition: '25% 30%',
        alt: 'Bisky Matcha dan Bisky Chocolate Minou Crème',
        desc: 'Krimnya diganti matcha, wangi teh hijaunya kebawa tiap gigitan.',
        waMessage: 'Halo Minou Crème, saya ingin memesan Bisky Matcha.'
      },
      {
        label: 'Chocolate',
        name: 'Bisky Chocolate',
        price: 'Rp25.000',
        image: 'assets/products/bisky-matcha-chocolate.png',
        objectPosition: '70% 72%',
        alt: 'Bisky Matcha dan Bisky Chocolate Minou Crème',
        desc: 'Krim cokelatnya lebih pekat, buat yang doyan manisnya nggak neko.',
        waMessage: 'Halo Minou Crème, saya ingin memesan Bisky Chocolate.'
      }
    ]
  },
  {
    name: 'Milky Sando',
    price: 'Rp15.000',
    image: 'assets/products/milky-sando.png',
    alt: 'Milky Sando dessert susu Minou Crème',
    desc: 'Roti gandum empuk isi susu legit, teman kopi sore yang nggak bikin enek.',
    waMessage: 'Halo Minou Crème, saya ingin memesan Milky Sando.',
    flavors: ['Chocolate', 'Strawberry', 'Matcha']
  },
  {
    name: 'Banana Pudding',
    price: 'Rp15.000',
    image: 'assets/products/banana-pudding.png',
    alt: 'Banana Pudding Minou Crème dengan lapisan pisang',
    desc: 'Puding pisang dingin berlapis krim, manisnya pas dan habisnya cepat.',
    waMessage: 'Halo Minou Crème, saya ingin memesan Banana Pudding.'
  },
  {
    name: 'Caramel Cheese Bites',
    price: 'Rp15.000',
    image: 'assets/products/caramel-cheese-bites.png',
    alt: 'Caramel Cheese Bites Minou Crème dengan taburan remah Regal',
    desc: 'Lembutnya krim keju ketemu saus karamel, ditabur remah Regal biar ada kriuk tiap sendok.',
    waMessage: 'Halo Minou Crème, saya ingin memesan Caramel Cheese Bites.'
  },
  {
    name: 'Korean Garlic Cheese Bread',
    price: 'Rp10.000 / 2 pcs',
    image: 'assets/products/korean-garlic-cheese-bread.png',
    alt: 'Korean Garlic Cheese Bread Minou Crème, dua roti berisi cream cheese',
    desc: 'Roti garlic Korea yang empuk, isi cream cheese lumer, dipanggang sampai keemasan. Wangi, gurih, susah berhenti.',
    waMessage: 'Halo Minou Crème, saya ingin memesan Korean Garlic Cheese Bread.'
  }
]
