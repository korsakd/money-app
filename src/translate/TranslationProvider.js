import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  findBestAvailableLanguage,
  addEventListener,
  removeEventListener,
} from 'react-native-localize';
import i18n from 'i18n-js';
import {I18nManager} from 'react-native';
import translate from './Translate';

const translationGetters = {
  en: () => require('./en.json'),
  ru: () => require('./ru.json'),
};

const setI18nConfig = () => {
  const fallback = {languageTag: 'en', isRTL: false}; // fallback if no available language fits

  const {languageTag, isRTL} =
    findBestAvailableLanguage(Object.keys(translationGetters)) || fallback;

  if (translate.cache.clear !== undefined) {
    translate.cache.clear(); // clear translation cache
  }

  I18nManager.forceRTL(isRTL); // update layout direction

  // set i18n-js config
  i18n.translations = {[languageTag]: translationGetters[languageTag]()};
  i18n.locale = languageTag;
};

export default class TranslationProvider extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  constructor(props) {
    super(props);
    setI18nConfig(); // set initial config
  }

  componentDidMount() {
    addEventListener('change', this.handleLocalizationChange);
  }

  componentWillUnmount() {
    removeEventListener('change', this.handleLocalizationChange);
  }

  handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };

  render() {
    const {children} = this.props;

    return <React.Fragment>{children}</React.Fragment>;
  }
}
