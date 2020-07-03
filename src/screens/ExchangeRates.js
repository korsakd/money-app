import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import CurrencyComponent from '../Components/CurrencyComponent';
import {dateDisplay} from '../utils/dateHelpers';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {
  clearExchangeRates,
  addFilteredCurrency,
} from '../redux/reducers/currencyReducer';
import {addExchangeRates} from '../services/exchangeRatesFunctions';
import CurrencyPicker from '../Components/CurrencyPicker';
import Modal from 'react-native-modal';
import translate from '../translate/Translate';
import FocusAwareStatusBar from '../utils/StatusBarColor';

class ExchangeRates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      date: new Date(),
    };
  }
  componentDidMount() {
    if (!this.props.currentDate) {
      fetch('https://www.nbrb.by/api/exrates/rates?periodicity=0')
        .then(response => response.json())
        .then(item => {
          this.props.addCurrency(item, new Date());
        })
        .catch(error => console.tron(error));
    }
    if (
      this.props.currentDate &&
      dateDisplay(this.state.date) !==
        dateDisplay(new Date(this.props.currentDate))
    ) {
      fetch('https://www.nbrb.by/api/exrates/rates?periodicity=0')
        .then(response => response.json())
        .then(item => {
          this.props.clear();
          this.props.addCurrency(item, new Date());
        });
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <ScrollView>
          <View>
            <Text
              style={{
                alignSelf: 'center',
                marginTop: 10,
                marginBottom: 10,
                fontSize: 20,
              }}>{`${translate('exchangeRatesOfNbRbOn')} ${dateDisplay(
              this.state.date,
            )}`}</Text>
            {this.props.filteredExchageRates.map((element, index) => {
              return (
                <View
                  key={index}
                  style={{flexDirection: 'row', marginBottom: 10}}>
                  <Image
                    style={{
                      width: 40,
                      height: 35,
                      marginLeft: 20,
                    }}
                    source={this.props.icons[element.Cur_Abbreviation]}
                  />
                  <CurrencyComponent
                    curAbbreviation={element.Cur_Abbreviation}
                    curOfficialRate={element.Cur_OfficialRate}
                    value={element.Cur_Scale}
                    index={index}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View>
          <TouchableOpacity
            onPress={() => this.setState({isModal: true})}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderTopWidth: StyleSheet.hairlineWidth,
            }}>
            <Icon name="plus-circle-outline" color={'#505049'} size={25} />
            <Text style={{marginLeft: 5, color: '#505049'}}>
              {translate('addCurrency')}
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationIn={'slideInUp'}
          swipeDirection={'down'}
          swipeThreshold={100}
          onSwipeComplete={() => this.setState({isModal: false})}
          isVisible={this.state.isModal}
          onBackdropPress={() => this.setState({isModal: false})}
          backdropOpacity={0.3}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
            }}>
            <CurrencyPicker
              removeModal={element => this.setState({isModal: element})}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    exchangeRates: state.currencyReducer.exchangeRates,
    currentDate: state.currencyReducer.lastUpdatedDate,
    icons: state.currencyReducer.icons,
    filteredExchageRates: state.currencyReducer.filteredExchageRates,
  };
};

const mapDispatchToProps = dispatch => ({
  addCurrency: (currency, date) => dispatch(addExchangeRates(currency, date)),
  clear: () => dispatch(clearExchangeRates()),
  addNewCurrency: curAbbreviation =>
    dispatch(addFilteredCurrency(curAbbreviation)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExchangeRates);
