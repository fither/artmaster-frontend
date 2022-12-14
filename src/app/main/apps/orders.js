const data = [
  {
    id: 2962,
    customerName: 'Maren Hensel',
    productName: 'Mosaiklampe',
    location: 'Neuenhagen/DE',
    bookingDate: '2022-04-29T10:54:21',
    totalPrice: '€ 158.00',
    payment: 'Apple Pay (Stripe)',
    countryCode: 'DE',
  },
  {
    id: 2961,
    customerName: 'Carolin Zang',
    productName: 'Mosaiklampe',
    location: 'Berlin/DE',
    bookingDate: '2022-04-28T20:21:21',
    totalPrice: '€ 158.00',
    payment: 'Zahle am Tag bar',
    countryCode: 'DE',
  },
  {
    id: 2960,
    customerName: 'Laila Abu alhaija',
    productName: 'Mosaiklampe',
    location: 'Berlin/DE',
    bookingDate: '2022-04-26T08:22:09',
    totalPrice: '€ 79.00',
    payment: 'PayPal',
    countryCode: 'DE',
  },
  {
    id: 2959,
    customerName: 'Derya Konanc',
    productName: 'Mosaiklampe',
    location: 'Berlin/DE',
    bookingDate: '2022-04-26T07:10:43',
    totalPrice: '€ 79.00',
    payment: 'Cash on delivery',
    countryCode: 'DE',
  },
  {
    id: 2950,
    customerName: 'Lorena Keutner',
    productName: 'Mosaiklampe',
    location: 'Berlin/DE',
    bookingDate: '2022-04-23T13:31:01',
    totalPrice: '€ 79.00',
    payment: 'Sofort',
    countryCode: 'DE',
  },
  {
    id: 2949,
    customerName: 'Ayla Schönefuß',
    productName: 'Mosaiklampe',
    location: 'Berlin/DE',
    bookingDate: '2022-04-22T18:08:09',
    totalPrice: '€ 79.00',
    payment: 'Credit Card (Stripe)',
    countryCode: 'DE',
  },
  {
    id: 2948,
    customerName: 'Juliane Helbig',
    productName: 'Mosaiklampe',
    location: 'Berlin/DE',
    bookingDate: '2022-04-20T09:29:03',
    totalPrice: '€ 148.00',
    payment: 'PayPal',
    countryCode: 'DE',
  },
  {
    id: 2929,
    customerName: 'Thien An Nguyen Dang',
    productName: 'Mosaiklampe',
    location: 'Düsseödprf/DE',
    bookingDate: '2022-04-10T19:14:18',
    totalPrice: '€ 89.00',
    payment: 'PayPal',
    countryCode: 'DE',
  },
  {
    id: 2918,
    customerName: 'Xinli Yang',
    productName: 'Mosaiklampe',
    location: 'Wuppertal/DE',
    bookingDate: '2022-04-07T23:53:58',
    totalPrice: '€ 89.00',
    payment: 'Credit Card (Stripe)',
    countryCode: 'DE',
  },
  {
    id: 2917,
    customerName: 'hantengri11 hantengri11',
    productName: 'Mosaiklampe',
    location: 'werther/DE',
    bookingDate: '2022-04-04T14:48:41',
    totalPrice: '€ 1.19',
    payment: 'SEPA Direct Debit',
    countryCode: 'DE',
  },
  {
    id: 3915,
    customerName: 'Lyubov Karmalintseva',
    productName: 'Mosaic Lamp',
    location: 'Toronto/CA',
    bookingDate: '2022-04-30T23:40:14',
    totalPrice: '$ 111.87',
    payment: 'Credit Card (Stripe)',
    countryCode: 'CA',
  },
  {
    id: 3914,
    customerName: 'Sidra Naushad',
    productName: 'Mosaic Lamp',
    location: 'Brampton/CA',
    bookingDate: '2022-04-30T21:50:07',
    totalPrice: '$ 178.54',
    payment: 'Credit Card (Stripe)',
    countryCode: 'CA',
  },
  {
    id: 3913,
    customerName: 'Zahra Vaziri',
    productName: 'Mosaic Lamp',
    location: 'Brampton/CA',
    bookingDate: '2022-04-30T16:57:54',
    totalPrice: '$ 77.97',
    payment: 'Credit Card (Stripe)',
    countryCode: 'CA',
  },
  {
    id: 3912,
    customerName: 'Erin Grevstad',
    productName: 'Mosaic Lamp',
    location: 'Toronto/CA',
    bookingDate: '2022-04-30T15:59:44',
    totalPrice: '$ 491.55',
    payment: 'Credit Card (Stripe)',
    countryCode: 'CA',
  },
  {
    id: 3911,
    customerName: 'Dana Dangelo',
    productName: 'Mosaic Lamp',
    location: 'North York/CA',
    bookingDate: '2022-04-30T12:51:08',
    totalPrice: '$ 123.17',
    payment: 'Credit Card (Stripe)',
    countryCode: 'CA',
  },
  {
    id: 3909,
    customerName: 'Lum Chan-Elieff',
    productName: 'Mosaic Lamp',
    location: 'Newmarket/CA',
    bookingDate: '2022-04-29T12:08:50',
    totalPrice: '$ 189.84',
    payment: 'PayPal',
    countryCode: 'CA',
  },
  {
    id: 3908,
    customerName: 'Flora Chan',
    productName: 'Mosaic Lamp',
    location: 'Richmond Hill/CA',
    bookingDate: '2022-04-29T12:02:27',
    totalPrice: '$ 223.74',
    payment: 'Credit Card (Stripe)',
    countryCode: 'CA',
  },
  {
    id: 3907,
    customerName: 'Stella Fernandes',
    productName: 'Mosaic Lamp',
    location: 'North York/CA',
    bookingDate: '2022-04-28T17:53:59',
    totalPrice: '$ 268.94',
    payment: 'PayPal',
    countryCode: 'CA',
  },
  {
    id: 3906,
    customerName: 'Areej Mahmood',
    productName: '',
    location: 'Maple/CA',
    bookingDate: '2022-04-28T15:29:11',
    totalPrice: '$ 100.57',
    payment: 'Credit Card (Stripe)',
    countryCode: 'CA',
  },
  {
    id: 3905,
    customerName: 'Brigitte LoCicero',
    productName: 'Mosaic Lamp',
    location: 'Toronto/CA',
    bookingDate: '2022-04-27T23:26:34',
    totalPrice: '$ 223.74',
    payment: 'Credit Card (Stripe)',
    countryCode: 'CA',
  },
  {
    id: 865,
    customerName: 'Eva Berg',
    productName: 'Mosaik Lampa',
    location: 'Saltsjö-Boo/SE',
    bookingDate: '2022-04-28T21:51:23',
    totalPrice: 'kr 10.00',
    payment: 'Payson',
    countryCode: 'SE',
  },
  {
    id: 864,
    customerName: 'Eva berg',
    productName: 'Mosaik Lampa',
    location: 'Saltsjö-Boo/SE',
    bookingDate: '2022-04-28T21:42:14',
    totalPrice: 'kr 5.00',
    payment: 'Cash on delivery',
    countryCode: 'SE',
  },
  {
    id: 862,
    customerName: 'Art Masterclass web-asdfrtmasterclassgfmail-com',
    productName: 'Mosaik Lampa',
    location: 'ÜMRANIYE/TR',
    bookingDate: '2022-04-28T21:31:33',
    totalPrice: 'kr 1.00',
    payment: 'Cash on delivery',
    countryCode: 'SE',
  },
  {
    id: 861,
    customerName: 'Art Masterclass web-artmasterclassgfmail-com',
    productName: '',
    location: 'ÜMRANIYE/TR',
    bookingDate: '2022-04-28T21:28:06',
    totalPrice: 'kr 0.00',
    payment: '',
    countryCode: 'SE',
  },
  {
    id: 4759048519911,
    customerName: 'Karen Arkinstall',
    productName: 'Art Masterclass Workshops Newcastle - Table Lamp',
    location: 'North Lambton/Australia',
    bookingDate: '2022-05-01T22:01:28+10:00',
    totalPrice: '99.00 AUD',
    payment: 'Visa',
    countryCode: 'AU',
  },
  {
    id: 4758993567975,
    customerName: 'Helen McTavish',
    productName:
      'Art Masterclass Workshops Brisbane - Swan Lamp, Art Masterclass Workshops Brisbane - Table Lamp, Art Masterclass Workshops Brisbane - Table Lamp',
    location: 'Sinnamon Park/Australia',
    bookingDate: '2022-05-01T20:37:56+10:00',
    totalPrice: '317.00 AUD',
    payment: 'Visa',
    countryCode: 'AU',
  },
  {
    id: 4758929998055,
    customerName: 'Daniel Quach',
    productName: 'Art Masterclass Workshops Sydney - Candle Holder',
    location: 'Parramatta/Australia',
    bookingDate: '2022-05-01T19:04:21+10:00',
    totalPrice: '227.00 AUD',
    payment: 'Visa',
    countryCode: 'AU',
  },
  {
    id: 4758929834215,
    customerName: 'Georgie Montague',
    productName: 'Art Masterclass Workshops Cairns - Swan Lamp',
    location: 'Julatten/Australia',
    bookingDate: '2022-05-01T19:03:59+10:00',
    totalPrice: '129.00 AUD',
    payment: 'paypal',
    countryCode: 'AU',
  },
  {
    id: 4758899851495,
    customerName: 'Kim Bredius',
    productName: 'Art Masterclass Workshops Sydney - Table Lamp',
    location: 'Ingleside/Australia',
    bookingDate: '2022-05-01T18:10:47+10:00',
    totalPrice: '99.00 AUD',
    payment: 'gift_card',
    countryCode: 'AU',
  },
  {
    id: 4758863020263,
    customerName: 'Fiona Caheny',
    productName: 'Art Masterclass Workshops Sydney - Candle Holder',
    location: 'Potts Point/Australia',
    bookingDate: '2022-05-01T17:37:34+10:00',
    totalPrice: '158.00 AUD',
    payment: 'Mastercard',
    countryCode: 'AU',
  },
  {
    id: 4758811377895,
    customerName: 'Elle Greaves',
    productName: 'Art Masterclass Workshops Canberra - Table Lamp',
    location: 'NARRABUNDAH/Australia',
    bookingDate: '2022-05-01T17:09:59+10:00',
    totalPrice: '198.00 AUD',
    payment: 'Visa',
    countryCode: 'AU',
  },
  {
    id: 4758802268391,
    customerName: 'Denise Deed',
    productName: 'Art Masterclass Workshops Cairns - Table Lamp',
    location: 'Kewarra Beach/Australia',
    bookingDate: '2022-05-01T17:04:53+10:00',
    totalPrice: '109.00 AUD',
    payment: 'paypal',
    countryCode: 'AU',
  },
  {
    id: 4758536650983,
    customerName: 'josephine baird',
    productName: 'Art Masterclass Workshops Sydney - Table Lamp',
    location: 'KINGS LANGLEY/Australia',
    bookingDate: '2022-05-01T11:12:09+10:00',
    totalPrice: '198.00 AUD',
    payment: 'paypal',
    countryCode: 'AU',
  },
  {
    id: 4758478684391,
    customerName: 'Jacelyn Crofts',
    productName: 'Rainbow Table Lamp Home Kit, Cloud Table Lamp Home Kit',
    location: 'Picton/Australia',
    bookingDate: '2022-05-01T09:46:39+10:00',
    totalPrice: '201.65 AUD',
    payment: 'paypal',
    countryCode: 'AU',
  },
  {
    id: 4757790490855,
    customerName: ' Lin',
    productName: 'Art Masterclass Workshops Sydney - Alaadin Lamp',
    location: 'Rydalmere/Australia',
    bookingDate: '2022-05-01T01:16:51+10:00',
    totalPrice: '109.00 AUD',
    payment: 'Mastercard',
    countryCode: 'AU',
  },
  {
    id: 4757519630567,
    customerName: 'Karlene Burns',
    productName: 'Ocean Table Lamp Home Kit',
    location: 'Wellington Point/Australia',
    bookingDate: '2022-04-30T20:32:09+10:00',
    totalPrice: '327.00 AUD',
    payment: 'Mastercard',
    countryCode: 'AU',
  },
  {
    id: 4757478015207,
    customerName: 'Min Kyong Jee',
    productName: 'Art Masterclass Workshops Sydney - Candle Holder',
    location: 'Singapore/Singapore',
    bookingDate: '2022-04-30T19:30:48+10:00',
    totalPrice: '79.00 AUD',
    payment: 'Visa',
    countryCode: 'AU',
  },
  {
    id: 4757451604199,
    customerName: 'Stephanie Van',
    productName: 'Art Masterclass Workshops Sydney - Table Lamp',
    location: 'EDMONDSON PARK/Australia',
    bookingDate: '2022-04-30T18:46:16+10:00',
    totalPrice: '297.00 AUD',
    payment: 'paypal',
    countryCode: 'AU',
  },
  {
    id: 4757448917223,
    customerName: 'Carolyn Knock',
    productName: 'Art Masterclass Workshops Adelaide (Kilkenny Community Hall) - Candle Holder',
    location: 'Paralowie/Australia',
    bookingDate: '2022-04-30T18:41:47+10:00',
    totalPrice: '89.00 AUD',
    payment: 'paypal',
    countryCode: 'AU',
  },
  {
    id: 4757304213735,
    customerName: 'emerly limpus',
    productName: 'Rainbow Table Lamp Home Kit, Mosaic Swan Lamp Home Kit #3',
    location: 'Cooktown/Australia',
    bookingDate: '2022-04-30T14:20:41+10:00',
    totalPrice: '221.65 AUD',
    payment: 'Mastercard',
    countryCode: 'AU',
  },
  {
    id: 4757180416231,
    customerName: 'Shay Machoro',
    productName: 'Art Masterclass Workshops Sydney - Table Lamp',
    location: 'Helensburgh/Australia',
    bookingDate: '2022-04-30T11:02:42+10:00',
    totalPrice: '198.00 AUD',
    payment: 'Visa',
    countryCode: 'AU',
  },
  {
    id: 4755359301863,
    customerName: 'Raj Sodhi',
    productName: 'Art Masterclass Workshops Sydney - Table Lamp',
    location: 'Woodcroft/Australia',
    bookingDate: '2022-04-29T23:46:09+10:00',
    totalPrice: '99.00 AUD',
    payment: 'Mastercard',
    countryCode: 'AU',
  },
  {
    id: 4754588434663,
    customerName: 'Naomi Wearden',
    productName: 'Art Masterclass Workshops Sydney - Short Table Lamp',
    location: 'Narellan/Australia',
    bookingDate: '2022-04-29T20:46:47+10:00',
    totalPrice: '198.00 AUD',
    payment: 'Visa',
    countryCode: 'AU',
  },
  {
    id: 4754259050727,
    customerName: ' Morota Chu',
    productName: 'Art Masterclass Workshops Sydney - Table Lamp',
    location: 'Bellevue Hill/Australia',
    bookingDate: '2022-04-29T19:26:55+10:00',
    totalPrice: '198.00 AUD',
    payment: 'Visa',
    countryCode: 'AU',
  },
  {
    id: 4753816289511,
    customerName: 'Hayley Klasen',
    productName: 'Art Masterclass Workshops Sydney - Swan Lamp',
    location: 'Maryvale /Australia',
    bookingDate: '2022-04-29T17:38:56+10:00',
    totalPrice: '238.00 AUD',
    payment: 'Mastercard',
    countryCode: 'AU',
  },
  {
    id: 4753383948519,
    customerName: 'Filiz Hopwood',
    productName: 'Art Masterclass Workshops Sydney - Short Table Lamp',
    location: 'Menai/Australia',
    bookingDate: '2022-04-29T15:50:15+10:00',
    totalPrice: '198.00 AUD',
    payment: 'American Express',
    countryCode: 'AU',
  },
  {
    id: 4746048438503,
    customerName: 'Dönay Uysal',
    productName: 'Art Masterclass Workshops Brisbane - Table Lamp',
    location: 'Upper Mount Gravatt/Australia',
    bookingDate: '2022-04-28T10:49:26+10:00',
    totalPrice: '99.00 AUD',
    payment: 'gift_card',
    countryCode: 'AU',
  },
  {
    id: 4743685439719,
    customerName: 'Donna Davidson',
    productName:
      'Art Masterclass Workshops - Table Lamp, Art Masterclass Workshops - Short Table Lamp',
    location: 'Ultimo/Australia',
    bookingDate: '2022-04-26T19:06:05+10:00',
    totalPrice: '792.00 AUD',
    payment: 'Mastercard',
    countryCode: 'AU',
  },
  {
    id: 4742346244327,
    customerName: 'William Tang',
    productName:
      'Art Masterclass Workshops Sydney - Swan Lamp, Art Masterclass Workshops Sydney - Short Table Lamp',
    location: 'Broadmeadow/Australia',
    bookingDate: '2022-04-25T21:37:57+10:00',
    totalPrice: '218.00 AUD',
    payment: 'Mastercard',
    countryCode: 'AU',
  },
  {
    id: 4740213211367,
    customerName: 'Nikki Kung',
    productName: 'Art Masterclass Workshops Melbourne - Table Lamp',
    location: 'Bayswater North/Australia',
    bookingDate: '2022-04-24T21:54:38+10:00',
    totalPrice: '297.00 AUD',
    payment: 'Visa',
    countryCode: 'AU',
  },
  {
    id: 4730029998311,
    customerName: 'chenjing ji',
    productName: 'Art Masterclass Workshops Melbourne - Candle Holder',
    location: 'Carlton/Australia',
    bookingDate: '2022-04-14T13:22:44+10:00',
    totalPrice: '158.00 AUD',
    payment: 'paypal',
    countryCode: 'AU',
  },
  {
    id: 4711698596071,
    customerName: ' Zhang',
    productName: 'Art Masterclass Workshops - Table Lamp',
    location: 'Moama/Australia',
    bookingDate: '2022-03-30T20:42:49+11:00',
    totalPrice: '198.00 AUD',
    payment: 'Mastercard',
    countryCode: 'AU',
  },
  {
    id: 4711121191143,
    customerName: 'Debra Davidson ',
    productName: 'Art Masterclass Workshops Melbourne - Swan Lamp',
    location: 'Seville/Australia',
    bookingDate: '2022-03-30T06:33:12+11:00',
    totalPrice: '119.00 AUD',
    payment: 'American Express',
    countryCode: 'AU',
  },
  {
    id: 4710576652519,
    customerName: 'Belinda Reading',
    productName: 'Art Masterclass Workshops Melbourne - Moon Lamp',
    location: 'WALLALOO EAST/Australia',
    bookingDate: '2022-03-29T22:04:23+11:00',
    totalPrice: '149.00 AUD',
    payment: 'paypal',
    countryCode: 'AU',
  },
  {
    id: 4703101812967,
    customerName: 'Claire Bullen',
    productName: 'Grazing Box - 2 People, Art Masterclass Workshops Sydney - Short Table Lamp',
    location: 'Cessnock/Australia',
    bookingDate: '2022-03-24T12:49:52+11:00',
    totalPrice: '233.00 AUD',
    payment: 'Visa',
    countryCode: 'AU',
  },
  {
    id: 4698155712743,
    customerName: 'Jenna Sattler',
    productName: 'Art Masterclass Workshops Sydney - Table Lamp',
    location: 'Grandora/Canada',
    bookingDate: '2022-03-21T02:19:18+11:00',
    totalPrice: '99.00 AUD',
    payment: 'Mastercard',
    countryCode: 'AU',
  },
  {
    id: 4694188294375,
    customerName: 'Patricia Ho',
    productName:
      'Art Masterclass Workshops Sydney - Candle Holder, Art Masterclass Workshops Sydney - Candle Holder',
    location: 'KELLYVILLE/Australia',
    bookingDate: '2022-03-17T15:28:35+11:00',
    totalPrice: '553.00 AUD',
    payment: 'American Express',
    countryCode: 'AU',
  },
  {
    id: 4675743940839,
    customerName: 'Elizabeth Thomson',
    productName: 'Art Masterclass Workshops Brisbane - Short Table Lamp',
    location: 'Annerley/Australia',
    bookingDate: '2022-02-26T17:57:05+11:00',
    totalPrice: '198.00 AUD',
    payment: 'paypal',
    countryCode: 'AU',
  },
  {
    id: 4668728148199,
    customerName: 'Sena Ozpek',
    productName: 'Art Masterclass Workshops Brisbane - Candle Holder',
    location: 'Brisbane/Australia',
    bookingDate: '2022-02-18T11:07:59+11:00',
    totalPrice: '0.00 AUD',
    payment: null,
    countryCode: 'AU',
  },
  {
    id: 4632664441063,
    customerName: 'Karen Sharp',
    productName: 'Art Masterclass Workshops Canberra - Table Lamp',
    location: 'Conder/Australia',
    bookingDate: '2022-01-12T16:12:42+11:00',
    totalPrice: '198.00 AUD',
    payment: 'paypal',
    countryCode: 'AU',
  },
  {
    id: 4622327447783,
    customerName: 'Elizabeth Driver',
    productName:
      'Art Masterclass Workshops Canberra - Short Table Lamp, Art Masterclass Workshops Canberra - Short Table Lamp',
    location: 'Ngunnawal/Australia',
    bookingDate: '2021-12-31T13:39:42+11:00',
    totalPrice: '297.00 AUD',
    payment: 'Mastercard',
    countryCode: 'AU',
  },
  {
    id: 4615766376679,
    customerName: 'Daniel Vaughan',
    productName: 'Art Masterclass Workshops Brisbane - Alaadin Lamp',
    location: 'Sunnybank Hills/Australia',
    bookingDate: '2021-12-23T12:30:29+11:00',
    totalPrice: '218.00 AUD',
    payment: 'paypal',
    countryCode: 'AU',
  },
  {
    id: 4578153267431,
    customerName: 'Emma Sams',
    productName:
      'Art Masterclass Workshops Canberra - Moon Lamp, Art Masterclass Workshops Canberra - Table Lamp, Art Masterclass Workshops Canberra - Candle Holder',
    location: 'Belconnen /Australia',
    bookingDate: '2021-11-21T14:08:41+11:00',
    totalPrice: '476.00 AUD',
    payment: 'Mastercard',
    countryCode: 'AU',
  },
  {
    id: 4472298340514,
    customerName: 'Caitlin Riley ',
    productName: 'Art Masterclass Workshops - Candle Holder',
    location: 'Richardson/Australia',
    bookingDate: '2021-10-27T21:04:25+11:00',
    totalPrice: '79.00 AUD',
    payment: 'paypal',
    countryCode: 'AU',
  },
  {
    id: 4437922087074,
    customerName: 'Janet  Zacharko ',
    productName: 'Art Masterclass Workshops Newcastle - Table Lamp',
    location: 'Tenambit/Australia',
    bookingDate: '2021-10-14T13:19:11+11:00',
    totalPrice: '198.00 AUD',
    payment: 'paypal',
    countryCode: 'AU',
  },
  {
    id: 4418981036194,
    customerName: 'Elaine Fang',
    productName: 'Art Masterclass Workshops - Swan Lamp, Art Masterclass Workshops - Table Lamp',
    location: 'Middle park/Australia',
    bookingDate: '2021-10-08T20:12:04+11:00',
    totalPrice: '337.00 AUD',
    payment: 'Mastercard',
    countryCode: 'AU',
  },
  {
    id: 4334871347362,
    customerName: 'Felicia Yam ',
    productName: 'BRISBANE Table Lamp Workshop',
    location: 'Sinnamon Park/Australia',
    bookingDate: '2021-09-22T20:05:36+10:00',
    totalPrice: '792.00 AUD',
    payment: 'Visa',
    countryCode: 'AU',
  },
  {
    id: 4309922283682,
    customerName: 'Francis Wild',
    productName: 'GOLD COAST Table Lamp Workshop',
    location: 'Arundel/Australia',
    bookingDate: '2021-09-18T11:10:00+10:00',
    totalPrice: '297.00 AUD',
    payment: 'Visa',
    countryCode: 'AU',
  },
  {
    id: 4280608653474,
    customerName: 'Emma Raju',
    productName: 'GOLD COAST Table Lamp Workshop, GOLD COAST Table Lamp Workshop',
    location: 'Gold Coast/Australia',
    bookingDate: '2021-09-13T20:26:35+10:00',
    totalPrice: '297.00 AUD',
    payment: 'Mastercard',
    countryCode: 'AU',
  },
  {
    id: 4257023688866,
    customerName: 'Phil Harris',
    productName: 'CANBERRA Table Lamp Workshop',
    location: 'Charlestown/Australia',
    bookingDate: '2021-09-09T14:24:56+10:00',
    totalPrice: '396.00 AUD',
    payment: 'Visa',
    countryCode: 'AU',
  },
  {
    id: 4175277457570,
    customerName: 'Tayha Avery',
    productName: 'BRISBANE Swan Lamp Workshop',
    location: 'Clontarf/Australia',
    bookingDate: '2021-08-08T11:02:17+10:00',
    totalPrice: '238.00 AUD',
    payment: 'Visa',
    countryCode: 'AU',
  },
  {
    id: 4155459633314,
    customerName: 'Angela Radnedge',
    productName: 'Art Masterclass Candle Holder Workshop',
    location: 'Bonner/Australia',
    bookingDate: '2021-08-02T13:27:53+10:00',
    totalPrice: '134.30 AUD',
    payment: 'paypal',
    countryCode: 'AU',
  },
  {
    id: 4143307620514,
    customerName: 'Moira mcnair',
    productName: 'NSW Creative Kids Voucher - Art Masterclass - $100.00',
    location: '',
    bookingDate: '2021-07-29T12:55:47+10:00',
    totalPrice: '100.00 AUD',
    payment: 'manual',
    countryCode: 'AU',
  },
  {
    id: 4095137546402,
    customerName: 'Tamara Orman',
    productName: 'CANBERRA Table Lamp Workshop',
    location: 'Bonython/Australia',
    bookingDate: '2021-07-09T23:36:29+10:00',
    totalPrice: '396.00 AUD',
    payment: 'Visa',
    countryCode: 'AU',
  },
];

export default data;
