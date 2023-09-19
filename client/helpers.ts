export function getCountryCode(countryName) {
  const countryNameToCode = {
    China: 'CN',
    Germany: 'DE',
    Netherlands: 'NL',
    England: 'EN',
    USA: 'US',
    France: 'FR',
    Italy: 'IT',
    Scotland: 'SC',
    Russia: 'RU',
    Poland: 'PL',
  }

  return countryNameToCode[countryName] || null
}
