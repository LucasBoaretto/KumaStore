import { Route, Routes } from "react-router";
import DefaultRoutes from "./Routes/DefaultRoutes";
import DefaultHeader from "./pages/DefaultHeader/DefaultHeader";
import DefaultFooter from "./pages/DefaultFooter/DefaultFooter";

function App() {
  return (
    <div className="overflow-x-hidden min-vh-100 d-flex flex-column justify-content-between">
      <DefaultHeader />
      <main className="d-flex flex-column flex-grow-1">
        <Routes>
          {DefaultRoutes.map((rota, index) => (
            <Route path={rota.path} element={rota.element} />
          ))}
        </Routes>
      </main>
      <DefaultFooter />
    </div>
  )
}

export default App
