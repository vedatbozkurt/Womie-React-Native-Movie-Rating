import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import {Provider} from 'mobx-react';

import HomeStack from './routes/HomeStack';


export default function App() {
  return (
    <PaperProvider>
    <Provider>
    <NavigationContainer>
    <HomeStack />
    </NavigationContainer>
    </Provider>
    </PaperProvider>
    );
}


