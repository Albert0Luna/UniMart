import store from "@/app/store";
import Header from "@/components/Header";
import { cleanup, getByRole, getByText, render } from "@testing-library/react";
import { afterEach } from "node:test";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { describe, expect, it, test } from "vitest";
import { userEvent } from '@testing-library/user-event'

describe("Header component", () => {
  const user = userEvent.setup()

  afterEach(() => {
    cleanup()
  })

  const header = render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );

  it('should render the brand', () => {
    const brandElement = header.getByRole('heading');
    expect(brandElement.textContent).toBe('UniMart');
  })

  it('should change the page path to /cart', async () => {
    const cartIcon = header.getByTestId('cartLink');
    await user.click(cartIcon)
    expect(location.pathname).toBe(`/cart`)
  })
})