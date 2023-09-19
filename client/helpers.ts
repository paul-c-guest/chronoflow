export function getCountryCode(countryName) {
  const countryNameToCode = {
    China: 'CN',
    Germany: 'DE',
    Netherlands: 'NL',
    England: 'GB',
    USA: 'US',
    France: 'FR',
    Italy: 'IT',
    Scotland: 'GB',
    Russia: 'RU',
    Poland: 'PL',
  }

  return countryNameToCode[countryName] || null
}
