import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/redux/store.ts";
import Consent from "../app/redux/features/code/components/Consent.tsx";

describe("Renders home page", () => {
  it("renders a thumbs up icon", () => {
    render(
      <Provider store={store}>
        <Consent />
      </Provider>
    );
    // check if all components are rendered
    expect(screen.getByTestId("thumbs-up")).toBeInTheDocument();
  });
});
