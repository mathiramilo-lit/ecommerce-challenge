import { Layout } from './components/layout';
import { Navbar } from './components/navbar';
import { Products } from './components/products';

function App() {
  return (
    <>
      <Layout>
        <Navbar />
        <Products />
      </Layout>
    </>
  );
}

export default App;
