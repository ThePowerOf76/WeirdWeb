import {sample_data} from './classes/Websites.tsx'
import DisplayWebsiteList from './views/Website.tsx';
function App() {
  return <>
  <div id="center">
      <DisplayWebsiteList websites={sample_data} />
  </div>
  </>
}

export default App;