import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Progress} from 'semantic-ui-react'

function App() {
  return (
    <div>
    <p> 안 녕 하 세 요 ! </p>
    <Button Primary> hi </Button>
    <Progress percent = {33} indicating/>
    </div>
  );
}

export default App;
