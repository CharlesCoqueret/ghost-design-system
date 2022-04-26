import { getMonthInLocale, importFnsLocaleFile } from '../dateUtils';

describe('dateUtils', () => {
  it('importFnsLocaleFile and getMonthInLocale', async () => {
    console.warn = jest.fn();

    await importFnsLocaleFile('fr');

    expect(getMonthInLocale(11, 'fr')).toEqual('décembre');
    expect(getMonthInLocale(10, 'en')).toEqual('November');
    expect(getMonthInLocale(9, 'nl')).toEqual('October');

    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toBeCalledWith('A locale object was not found for the provided string ["nl"].');

    await importFnsLocaleFile('fr');

    expect(getMonthInLocale(8, 'fr')).toEqual('septembre');
  });
});
