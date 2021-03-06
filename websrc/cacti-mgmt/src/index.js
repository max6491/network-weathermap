import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import {addLocaleData, IntlProvider} from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import pt from 'react-intl/locale-data/pt';
import ru from 'react-intl/locale-data/ru';

import translations from './translations';

import reducers from './reducers';

import {HashRouter as Router, Route} from 'react-router-dom'
import FileSelector from "./components/FileSelector";
import MapProperties from "./components/MapProperties";
import AddGroup from "./components/AddGroup";
import CreateMap from "./components/CreateMap";
import GroupProperties from "./components/GroupProperties";

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

let wm_root = document.getElementById('weathermap-mgmt-root');

addLocaleData([...en, ...fr, ...es, ...pt, ...ru]);

const AppRoutes = () => (
    <Router>
        <div>
            <Route path="/"
                   render={(routeProps) => (
                       <App {...routeProps} {...(wm_root.dataset)} />
                   )}
            />
            <Route exact path="/add-map-picker" component={FileSelector}/>
            <Route exact path="/map/:id/properties" component={MapProperties}/>
            <Route exact path="/group/:id/properties" component={GroupProperties}/>
            <Route exact path="/add-group-form" component={AddGroup}/>
            <Route exact path="/create-map" component={CreateMap}/>
        </div>
    </Router>
);

const locale = translations.hasOwnProperty(wm_root.dataset['locale']) ? wm_root.dataset['locale'] : 'en';

ReactDOM.render(<Provider store={store}>
    <IntlProvider messages={translations[locale]} locale={locale}>
        <AppRoutes/>
    </IntlProvider>
</Provider>, wm_root);


