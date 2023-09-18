describe('iconLoader', () => {
  it('FileInput renders', () => {
    const domWatchMock = jest.fn();
    const libraryAddMock = jest.fn();

    jest.mock('@fortawesome/fontawesome-svg-core', () => {
      return {
        dom: {
          watch: domWatchMock,
        },
        library: {
          add: libraryAddMock,
        },
      };
    });

    const loadIcons = require('../iconLoader').default as () => void;

    loadIcons();

    expect(libraryAddMock).toBeCalledTimes(1);
    expect(domWatchMock).toBeCalledTimes(1);
  });
});
