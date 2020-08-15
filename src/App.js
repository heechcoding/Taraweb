import React from 'react';
import {Image} from 'semantic-ui-react'

import Comments from './comment.js'

import ny from "./NY.jpg"

function App() {
  return (
    <div>

<Image src = {ny} centered />
<Comments />
</div>
  );
}

export default App;
