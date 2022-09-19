import React from 'react';
import Weather from './Components/Weather.js';

/* We will render the Weather component in order to display its content within this App.js file. */
function App() {
  return (
    <div>
      <Weather />
    </div>
  );
}

/* The App class here has been exported to display the Weather component. This is done when the App.js 
file is imported and used in Index.js.*/
export default App;
