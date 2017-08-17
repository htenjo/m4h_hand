import { M4hHandPage } from './app.po';

describe('m4h-hand App', () => {
  let page: M4hHandPage;

  beforeEach(() => {
    page = new M4hHandPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
