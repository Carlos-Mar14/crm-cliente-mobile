import renderer from "react-test-renderer";
import App from "./App.tsx";

describe("App", () => {
  it(" Hijo", () => {
    const tree = renderer.create(<App />);
    expect(tree.toJSON().children.length).toBe(1);
  });
});
