import { Route, Routes } from "react-router";
import DefaultRoutes from "./Routes/DefaultRoutes";
import DefaultHeader from "./pages/DefaultHeader/DefaultHeader";
import DefaultFooter from "./pages/DefaultFooter/DefaultFooter";

function App() {
  return (
    <div className="overflow-hidden">
      <DefaultHeader />
      <Routes>
        {DefaultRoutes.map((rota, index) => (
          <Route path={rota.path} element={rota.element} />
        ))}
      </Routes>
      <DefaultFooter />
    </div>
  )
}

export default App
