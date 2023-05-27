# zrouter

Routing library for zheleznaya.

# how to use

```tsx
import { h, createStore } from "zheleznaya";
import { Router, Link } from "@kojiro.ueda/zrouter";

const App = () => {
  return (
    <div>
      <Link href="/about">about</Link>
      <Link href="/id1">id1 page</Link>
      <Link href="/id1">id2 page</Link>
      <Router routes={{
        "/": () => <div>top page</div>,
        "/about": () => <div>about</div>,
        "/:id": ({id}) => <div>{id}</div>,
      }}/>
    </div>
  );
}
```
