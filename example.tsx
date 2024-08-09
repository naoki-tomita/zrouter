declare const React;
import { h, render, createStore } from "zheleznaya";
import { createRouter } from "./Router";

const store = createStore<{
  path: string;
  organization: string;
}>({
  path: location.pathname,
  organization: "naoki-tomita"
});

const { Router, Link, href, replace, onRouteChange } = createRouter(store);

onRouteChange((url) => {
  console.log(url);
});

const Top = () => {
  return (
    <div id="hoge">
      <h1>Top</h1>
      <Link href="/foo/bar">/foo/bar</Link>
    </div>
  );
}

const Page = () => {
  return (
    <div>
      <div>foo bar page dayo <Link href="/hoge/fuga">hoge fuga</Link></div>
      <button onclick={() => href("/hoge/fuga")}>href hoge fuga</button>
      <button onclick={() => replace("/hoge/fuga")}>replace hoge fuga</button>
    </div>
  );
}

const Id = ({ id }) => {
  return (
    <h1>{id}</h1>
  );
}

const App = () => {
  return (
    <div>
      <Link href="/">Head</Link>
      <div>URL IS "{store.path}"</div>
      <Router
        routes={{
          "/": () => <Top/>,
          "/foo/bar": () => <Page/>,
          "/foo/:id/value": ({ id }) => <Id id={id} />,
        }}
      />
    </div>
  );
}

render(<App />)
