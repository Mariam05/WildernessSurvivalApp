import { render, fireEvent } from '@testing-library/react-native';
import NumberPad2 from '../assets/components/NumberPad_v2';
import * as React from 'react';

test('Display text gets updated', () => {

    const { getAllByText, getByText } = render(
        <NumberPad2 navigation={jest.fn()} onFinish={jest.fn()} title={"Pulse"} />
    );

    fireEvent.press(getByText('1'));
    fireEvent.press(getByText('2'));
    const displayVal = getAllByText('12');

    expect(displayVal).toHaveLength(1);
});
