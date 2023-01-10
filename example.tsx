import { h, render, createStore } from "zheleznaya";
import { init, Link, Router, useLocation } from "./index";

const store = createStore<{ text: string }>({ text: "hello" });
init(store);

const Top = () => {
  return (
    <h1>Top</h1>
  );
}

const Page = () => {
  return (
    <div>
      foo bar page dayo <Link href="/hoge/fuga">hoge fuga</Link>
    </div>
  );
}

const Id = () => {
  const location = useLocation();
  return (
    <h1>{location.params.id}</h1>
  );
}

const App = () => {
  const location = useLocation();
  return (
    <div>
      <Link href="/">Head</Link>
      <div>{store.text}</div>
      <div>URL IS "{location.path}" URL IS</div>
      <Router
        routes={[
          ["/", () => <Top/>],
          ["/foo/bar", () => <Page/>],
          ["/foo/:id/value", () => <Id />]
        ]}
        error={() => <Link href="/foo/bar">404 Not Found</Link>}
      />
    </div>
  );
}

render(<App />)
