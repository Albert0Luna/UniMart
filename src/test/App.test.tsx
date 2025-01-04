import store from "@/app/store";
import App from "@/components/App";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe } from "node:test";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router";
import { expect, it } from "vitest";

describe('testing the behavior of the App component', () => {
  const user = userEvent.setup()

  afterEach(() => {
    cleanup()
  })

  const app = render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </ BrowserRouter>
    </Provider>
  )

  it('should paint a loader after the products rendered', () => {
    const loadingElement = app.getByText('Loading...')
    expect(loadingElement.textContent).toEqual('Loading...')
  })

  it('should render the form of the search element', async () => {
    const searchElement = await app.findByTestId("search-form")
    expect(searchElement).toBeInstanceOf(HTMLFormElement)
  })

  it('should render the filter component when the filter button is clicked', async () => {
    const filterBtn = await app.findByTestId('filter-button')
    await user.click(filterBtn)
    const filterForm = await app.findByTestId('filter-component-container')
    expect(filterForm.className).not.toBe('hidden')
  })

  it('should render the order component when the order button is clicked', async () => {
    const orderBtn = await app.findByTestId('order-button')
    await user.click(orderBtn)
    const orderForm = await app.findByTestId('order-component-container')
    expect(orderForm.className).not.toBe('hidden')
  })

  it('should hide the order component when the filter button is clicked', async () => {
    const orderBtn = await app.findByTestId('order-button')
    await user.click(orderBtn)
    const filterBtn = await app.findByTestId('filter-button')
    await user.click(filterBtn)
    const orderForm = await app.findByTestId('order-component-container')
    expect(orderForm.className).includes('hidden')
  })

  it('should hide the filter component when the order button is clicked', async () => {
    const filterBtn = await app.findByTestId('filter-button')
    await user.click(filterBtn)
    const orderBtn = await app.findByTestId('order-button')
    await user.click(orderBtn)
    const filterForm = await app.findByTestId('filter-component-container')
    expect(filterForm.className).toBe('hidden')
  })

  it('should hide the filter and order components when the close button is clicked', async () => {
    const filterBtn = await app.findByTestId('filter-button')
    await user.click(filterBtn)
    const orderBtn = await app.findByTestId('order-button')
    await user.click(orderBtn)
    const closeBtn = await app.findByTestId('close-button')
    await user.click(closeBtn)
    const filterForm = await app.findByTestId('filter-component-container')
    const orderForm = await app.findByTestId('order-component-container')
    expect(filterForm.className).toBe('hidden')
    expect(orderForm.className).toBe('hidden')
  })

  it('should render the products when the page is loaded', async () => {
    await waitFor(() => {

      const product = app.getAllByTestId('product');

      product.forEach((element) => {
        expect(element).toBeInstanceOf(HTMLAnchorElement)
        const divChild = Array.from(element.children).find(child => child instanceof HTMLDivElement);
        expect(divChild).toBeInstanceOf(HTMLDivElement);

        if (divChild) {
          const paragraphChild = Array.from(divChild.children).find(child => child instanceof HTMLParagraphElement);
          const imgChild = Array.from(divChild.children).find(child => child instanceof HTMLImageElement);
          const divInfoChild = Array.from(divChild.children).find(child => child instanceof HTMLDivElement);

          expect(paragraphChild).toBeInstanceOf(HTMLParagraphElement);
          expect(imgChild).toBeInstanceOf(HTMLImageElement);
          expect(divInfoChild).toBeInstanceOf(HTMLDivElement);

          if (divInfoChild) {
            const title = Array.from(divInfoChild.children).find(child => child instanceof HTMLParagraphElement);
            expect(title).toBeInstanceOf(HTMLParagraphElement);
            const priceContainer = Array.from(divInfoChild.children).find(child => child instanceof HTMLDivElement);
            expect(priceContainer).toBeInstanceOf(HTMLDivElement);

            if (priceContainer) {
              const price = Array.from(priceContainer.children).find(child => child instanceof HTMLParagraphElement);
              expect(price).toBeInstanceOf(HTMLParagraphElement);
              const discount = Array.from(priceContainer.children).find(child => child instanceof HTMLParagraphElement);
              expect(discount).toBeInstanceOf(HTMLParagraphElement);
            }
          }
        }
      })
    });
  });

  it('should redirect to the product page when a product is clicked', async () => {
    const product = app.getAllByTestId('product')[0];
    await user.click(product);
    expect(location.pathname).toBe('/1');
  })
})