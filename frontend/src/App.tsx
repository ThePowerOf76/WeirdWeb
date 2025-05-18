import {sample_data} from './classes/Websites.tsx'
function App() {
  return <div id="center">
    <>
      <pre>
        {
          JSON.stringify(sample_data, null, ' ')
        }
      </pre>
    </>
  </div>
}

export default App;