import { AaaTestPage } from './app.po';

describe('aaa-test App', () => {
  let page: AaaTestPage;

  beforeEach(() => {
    page = new AaaTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
