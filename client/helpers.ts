export function getCountry(countryName) {
  const country = [
    {
      country: 'China',
      code: 'CN',
      coords: [104.195397, 35.86166],
    },
    {
      country: 'Germany',
      code: 'DE',
      coords: [10.451526, 51.165691],
    },
    {
      country: 'Netherlands',
      code: 'NL',
      coords: [5.291266, 52.132633],
    },
    {
      country: 'England',
      code: 'GB',
      coords: [-1.17432, 52.355518],
    },
    {
      country: 'USA',
      code: 'US',
      coords: [-95.712891, 37.09024],
    },
    {
      country: 'France',
      code: 'FR',
      coords: [2.213749, 46.227638],
    },
    {
      country: 'Italy',
      code: 'IT',
      coords: [12.56738, 41.87194],
    },
    {
      country: 'Scotland',
      code: 'GB',
      coords: [-4.202646, 56.490671],
    },
    {
      country: 'Russia',
      code: 'RU',
      coords: [105.318756, 61.52401],
    },
    {
      country: 'Poland',
      code: 'PL',
      coords: [19.145136, 51.919438],
    },
    {
      country: 'New Zealand',
      code: 'NZ',
      coords: [174.886, -40.9006],
    },
  ]
  return country.filter((item) => item.country === countryName)[0]
}
