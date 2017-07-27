import { ChordSheetsPage } from './app.po';

describe('chord-sheets App', () => {
  let page: ChordSheetsPage;

  beforeEach(() => {
    page = new ChordSheetsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
