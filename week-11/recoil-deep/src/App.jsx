import { RecoilRoot } from "recoil";
import RecoilButtons from "./components/RecoilButtons";

function App() {
  return (
    <>
      <RecoilRoot>
        <RecoilButtons />
      </RecoilRoot>
    </>
  );
}

export default App;
