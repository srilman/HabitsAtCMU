import 'react-hot-loader/patch';
import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './components/app';
import configureStore from './store';
import './scss/main.scss';

const store = configureStore();

render(
    <AppContainer>
        <App />
    </AppContainer>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept(() => {
        render(
            <AppContainer>
                <App />
            </AppContainer>,
            document.getElementById('app')
        );
    });
}
