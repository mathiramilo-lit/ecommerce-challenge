import { useState } from "react";

import { Drawer, Layout, Navbar, Products } from "./components";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Drawer open={drawerOpen} setOpen={setDrawerOpen} />
      <Layout>
        <Navbar setDrawerOpen={() => setDrawerOpen((prev) => !prev)} />
        <Products />
      </Layout>
    </>
  );
}

export default App;
