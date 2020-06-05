/**
 *
 * Tests for HomeContainer
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { HomeContainerTest as HomeContainer } from '../index';

describe('<HomeContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(
      <HomeContainer dispatchItune={submitSpy} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearItune on empty change', async () => {
    const getItuneSpy = jest.fn();
    const clearItuneSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <HomeContainer
        dispatchClearItune={clearItuneSpy}
        dispatchItune={getItuneSpy}
      />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getItuneSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearItuneSpy).toBeCalled();
  });

  it('should call dispatchItune on change', async () => {
    const { getByTestId } = renderProvider(
      <HomeContainer dispatchItune={submitSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some itune' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
