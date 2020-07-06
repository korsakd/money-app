import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import InputForConversion from '../Components/InputForConversion';
import InputForBLRConversion from '../Components/InputForBLRConversion';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FocusAwareStatusBar from '../utils/StatusBarColor';

class CurrencyConversion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReverse: false,
      valueBLR:
        this.props.filteredExchageRates.length !== 0
          ? `${(
              this.props.filteredExchageRates[0].Cur_OfficialRate /
              this.props.filteredExchageRates[0].Cur_Scale
            ).toFixed(4)}`
          : null,
      defaultValueBLR:
        this.props.filteredExchageRates.length !== 0
          ? `${(
              this.props.filteredExchageRates[0].Cur_OfficialRate /
              this.props.filteredExchageRates[0].Cur_Scale
            ).toFixed(4)}`
          : null,
      defaultForeignValue:
        this.props.filteredExchageRates.length !== 0
          ? `${(
              this.props.filteredExchageRates[0].Cur_Scale /
              this.props.filteredExchageRates[0].Cur_OfficialRate
            ).toFixed(4)}`
          : null,
      foreignValue: '1',
      iconSourceBLR: require('../img/Belarus.png'),
      curAbbreviationBLR: 'BLR',
      iconSource:
        this.props.filteredExchageRates.length !== 0
          ? this.props.icons[this.props.defaultCurrency[0]]
          : null,
      curAbbreviation:
        this.props.filteredExchageRates.length !== 0
          ? this.props.defaultCurrency[0]
          : null,
    };
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.defaultCurrency !== prevProps.defaultCurrency ||
      this.props.filteredExchageRates !== prevProps.filteredExchageRates
    ) {
      this.setState({
        iconSource:
          this.props.filteredExchageRates.length === 0
            ? null
            : this.props.icons[this.props.defaultCurrency[0]],
      });
      this.setState({
        curAbbreviation:
          this.props.filteredExchageRates.length === 0
            ? null
            : this.props.defaultCurrency[0],
      });
      this.setState({
        valueBLR:
          this.props.filteredExchageRates.length === 0
            ? null
            : !this.state.isReverse
            ? `${(
                this.props.filteredExchageRates[0].Cur_OfficialRate /
                this.props.filteredExchageRates[0].Cur_Scale
              ).toFixed(4)}`
            : '1',
      });
      this.setState({
        foreignValue:
          this.props.filteredExchageRates.length === 0
            ? null
            : !this.state.isReverse
            ? '1'
            : `${(
                this.props.filteredExchageRates[0].Cur_Scale /
                this.props.filteredExchageRates[0].Cur_OfficialRate
              ).toFixed(4)}`,
      });
      this.setState({
        defaultValueBLR:
          this.props.filteredExchageRates.length !== 0
            ? `${(
                this.props.filteredExchageRates[0].Cur_OfficialRate /
                this.props.filteredExchageRates[0].Cur_Scale
              ).toFixed(4)}`
            : null,
      });
      this.setState({
        defaultForeignValue:
          this.props.filteredExchageRates.length !== 0
            ? `${(
                this.props.filteredExchageRates[0].Cur_Scale /
                this.props.filteredExchageRates[0].Cur_OfficialRate
              ).toFixed(4)}`
            : null,
      });
    }
  }
  reverseFunction = () => {
    if (!this.state.isReverse) {
      this.setState({isReverse: true});
      this.setState({valueBLR: '1'});
      this.setState({foreignValue: this.state.defaultForeignValue});
    } else {
      this.setState({isReverse: false});
      this.setState({valueBLR: this.state.defaultValueBLR});
      this.setState({foreignValue: '1'});
    }
  };
  render() {
    return (
      <View
        style={{
          flexDirection: !this.state.isReverse ? 'column' : 'column-reverse',
        }}>
        <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <InputForConversion
          isReverse={this.state.isReverse}
          defaultValueBLR={this.state.defaultValueBLR}
          value={this.state.foreignValue}
          iconSource={this.state.iconSource}
          curAbbreviation={this.state.curAbbreviation}
          setIconSource={element => this.setState({iconSource: element})}
          setCurAbbreviation={element =>
            this.setState({curAbbreviation: element})
          }
          setValueBLR={element => this.setState({valueBLR: element})}
          setForeignValue={element => this.setState({foreignValue: element})}
          setDefaultValueBLR={element =>
            this.setState({defaultValueBLR: element})
          }
          setDefaultForeignValue={element =>
            this.setState({defaultForeignValue: element})
          }
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 30,
          }}>
          <Text style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>
            {!this.state.isReverse
              ? `1 ${this.state.curAbbreviation} = ${
                  this.state.defaultValueBLR
                } ${this.state.curAbbreviationBLR}`
              : `1 ${this.state.curAbbreviationBLR} = ${
                  this.state.defaultForeignValue
                } ${this.state.curAbbreviation}`}
          </Text>
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 40,
            }}
            onPress={() => this.reverseFunction()}>
            <Icon name="rotate-3d" size={30} />
          </TouchableOpacity>
        </View>
        <InputForBLRConversion
          defaultForeignValue={this.state.defaultForeignValue}
          isReverse={this.state.isReverse}
          value={this.state.valueBLR}
          iconSource={this.state.iconSourceBLR}
          curAbbreviation={this.state.curAbbreviationBLR}
          setValueBLR={element => this.setState({valueBLR: element})}
          setForeignValue={element => this.setState({foreignValue: element})}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  icons: state.currencyReducer.icons,
  defaultCurrency: state.currencyReducer.defaultCurrency,
  filteredExchageRates: state.currencyReducer.filteredExchageRates,
});

export default connect(
  mapStateToProps,
  null,
)(CurrencyConversion);
