// // App.js
// import React from 'react';
// import { Provider } from 'react-redux';
// import store from './src/store/store';
// import QuizForm from './src/components/QuizForm';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <QuizForm />
//     </Provider>
//   );
// };

// export default App;


// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './src/screens/Homescreen';
// import QuizForm from './src/components/QuizForm';
// import { Provider } from 'react-redux';
// // import { createStore } from 'redux';
// import rootReducer from './src/reducers/index';
// import store from './src/store/store';


// const Stack = createStackNavigator();
// // const store = createStore(rootReducer);

// const App = () => {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Home">
//           <Stack.Screen name="Home" component={HomeScreen} />
//           <Stack.Screen name="QuizForm" component={QuizForm} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// };

// export default App;


// App.js

import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import quizReducer from './src/reducers/quizReducer';
import HomeScreen from './src/screens/Homescreen';
import QuizForm from './src/components/QuizForm';
import SplashScreen from 'react-native-splash-screen'
 

const Stack = createStackNavigator();
const store = createStore(quizReducer);

const App = () => {
  useEffect(() => {
   SplashScreen.hide();
  },[])

  

  
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/> 
          <Stack.Screen name="QuizForm" component={QuizForm}  options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

