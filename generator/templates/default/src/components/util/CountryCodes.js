/**
 * Provides ISO-3166-1 country codes for some countries and ISO 3166-2:AT codes for austrian states.
 */

class CountryCodes {
  constructor() {
    this._iso31661 = [
      { name: 'Österreich', code: 'AT' },
      { name: 'Deutschland', code: 'DE' },
      { name: 'Schweiz', code: 'CH' },
      { name: 'Belgien', code: 'BE' },
      { name: 'Bosnien und Herzegowina', code: 'BA' },
      { name: 'Bulgarien', code: 'BG' },
      { name: 'China', code: 'CN' },
      { name: 'Dänemark', code: 'DK' },
      { name: 'Finnland', code: 'FI' },
      { name: 'Frankreich', code: 'FR' },
      { name: 'Griechenland', code: 'GR' },
      { name: 'Indien', code: 'IN' },
      { name: 'Irland', code: 'IE' },
      { name: 'Italien', code: 'IT' },
      { name: 'Japan', code: 'JP' },
      { name: 'Kanada', code: 'CA' },
      { name: 'Liechtenstein', code: 'LI' },
      { name: 'Luxemburg', code: 'LU' },
      { name: 'Malta', code: 'MT' },
      { name: 'Niederlande', code: 'NL' },
      { name: 'Norwegen', code: 'NO' },
      { name: 'Polen', code: 'PL' },
      { name: 'Portugal', code: 'PT' },
      { name: 'Rumänien', code: 'RO' },
      { name: 'Russische Föderation', code: 'RU' },
      { name: 'Schweden', code: 'SE' },
      { name: 'Serbien', code: 'RS' },
      { name: 'Slowakei', code: 'SK' },
      { name: 'Slowenien', code: 'SI' },
      { name: 'Spanien', code: 'ES' },
      { name: 'Tschechien', code: 'CZ' },
      { name: 'Türkei', code: 'TR' },
      { name: 'Ukraine', code: 'UA' },
      { name: 'Ungarn', code: 'HU' },
      { name: 'Vereinigte Arabische Emirate', code: 'AE' },
      { name: 'Vereinigte Staaten', code: 'US' },
      { name: 'Vereinigtes Königreich', code: 'GB' },
      { name: 'Zypern', code: 'CY' },
    ];

    this._iso31662 = [
      { name: 'Burgenland', code: 'AT-1' },
      { name: 'Kärnten', code: 'AT-2' },
      { name: 'Niederösterreich', code: 'AT-3' },
      { name: 'Oberösterreich', code: 'AT-4' },
      { name: 'Salzburg', code: 'AT-5' },
      { name: 'Steiermark', code: 'AT-6' },
      { name: 'Tirol', code: 'AT-7' },
      { name: 'Vorarlberg', code: 'AT-8' },
      { name: 'Wien', code: 'AT-9' },
    ];
  }

  getCountryCode(countryName = '') {
    const foundCountry = this._iso31661.find((country) => country.name === countryName);

    return foundCountry ? foundCountry.code : '';
  }

  getStateCode(stateName = '') {
    const foundState = this._iso31662.find((state) => state.name === stateName);

    return foundState ? foundState.code : '';
  }
}

export default new CountryCodes();
