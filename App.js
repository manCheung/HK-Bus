import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';
import AppWrapper from './src/components/app';

export default function App() {
    return (
        <Provider store={store}>
            <AppWrapper />
        </Provider>
    );
}
