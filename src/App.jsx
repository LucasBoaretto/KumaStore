import { Route, Routes } from "react-router";
import DefaultRoutes from "./Routes/DefaultRoutes";
import DefaultHeader from "./pages/DefaultHeader/DefaultHeader";
import DefaultFooter from "./pages/DefaultFooter/DefaultFooter";
import { Suspense } from "react";
import { CSpinner } from "@coreui/react";

function App() {
  return (
    <div className="overflow-x-hidden min-vh-100 d-flex flex-column justify-content-between">
      <DefaultHeader />
      <main className="d-flex flex-column flex-grow-1" style={{ backgroundColor: '#f8f9fa' }}>
        <Suspense fallback={<div className="d-flex justify-content-center mt-5"><CSpinner /></div>}>
          <Routes>
            {DefaultRoutes.map((rota, index) => (
              <Route key={index} path={rota.path} element={rota.element} />
            ))}
          </Routes>
        </Suspense>
      </main>
      <DefaultFooter />
    </div>
  )
}

export default App
