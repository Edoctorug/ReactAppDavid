import Appnavigator from './app/navigation/Appnavigator';
import StateProvider from './app/context/GeneralContext';

export default function App() {
  return(
    <StateProvider>
      <Appnavigator/>
    </StateProvider>
  )
}

