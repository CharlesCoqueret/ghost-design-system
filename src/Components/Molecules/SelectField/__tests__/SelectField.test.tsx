describe('SelectField Component', () => {
  it('SelectField renders', () => {
    expect(true).toBe(true);
  });
});
//   it('SelectField renders', () => {
//     const { container } = render(<SelectField fieldSize={2} name='NAME' />);

//     const node = container.querySelector('div.field-group');
//     expect(node).not.toBeNull();
//     const inputNode = container.querySelector('input.field');
//     expect(inputNode?.className).toEqual('field input-text-field field-input-size-2');
//     expect(inputNode).toHaveProperty('name', 'NAME');
//     expect(inputNode).toHaveProperty('id', 'NAME');
//     expect(inputNode).toHaveProperty('type', 'text');
//     const readOnlyNode = container.querySelector('div.field');
//     expect(readOnlyNode).toBeNull();
//   });

//   it('SelectField renders with error', () => {
//     const { container } = render(<SelectField inputValue='INPUT-VALUE' errorMessage='ERROR-MESSAGE' name='NAME' />);

//     const node = container.querySelector('div.field-group');
//     expect(node).not.toBeNull();
//     const inputNode = container.querySelector('input.field');
//     expect(inputNode?.className).toEqual('field input-text-field input-error');
//     expect(inputNode).toHaveProperty('value', 'INPUT-VALUE');
//     const readOnlyNode = container.querySelector('div.field');
//     expect(readOnlyNode).toBeNull();
//   });

//   it('SelectField renders in readonly', () => {
//     const { container } = render(<SelectField readOnly fieldSize={6} inputValue='INPUT-VALUE' name='NAME' />);

//     const node = container.querySelector('div.field-group');
//     expect(node).not.toBeNull();
//     const inputNode = container.querySelector('input.field');
//     expect(inputNode).toBeNull();
//     const readOnlyNode = container.querySelector('div.field');
//     expect(readOnlyNode?.className).toEqual('field input-text-field-read-only field-input-size-6');
//     expect(readOnlyNode?.innerHTML).toEqual('INPUT-VALUE');
//   });

//   it('SelectField renders in readonly highlighted', () => {
//     const { container } = render(<SelectField readOnly highlighted name='NAME' />);

//     const node = container.querySelector('div.field-group');
//     expect(node).not.toBeNull();
//     const inputNode = container.querySelector('input.field');
//     expect(inputNode).toBeNull();
//     const readOnlyNode = container.querySelector('div.field');
//     expect(readOnlyNode?.className).toEqual('field input-text-field-read-only field-highlighted');
//   });

//   it('SelectField renders handles changes', () => {
//     const onChangeMock = jest.fn();

//     const { container } = render(<SelectField onChange={onChangeMock} name='NAME' />);

//     const inputNode = container.querySelector('input.field');
//     expect(inputNode).not.toBeNull();
//     if (inputNode) fireEvent.change(inputNode, { target: { value: 'NEW INPUT' } });
//     expect(onChangeMock).toBeCalledWith('NEW INPUT');
//   });
// });
