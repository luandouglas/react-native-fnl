import React, {Component} from 'react';
import {View, BackHandler, Alert} from 'react-native';
import RNWebView from 'react-native-webview';
export default class App extends Component {
  webView = {
    canGoBack: false,
    ref: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      currentURL: '',
    };
  }
  onAndroidBackPress = () => {
    const {currentURL} = this.state;
    if (currentURL == 'http://www.fiquenolar.ifce.edu.br/#/') {
      Alert.alert('Espere!', 'Deseja realmente fechar o aplicativo?', [
        {
          text: 'Não',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Sim', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    } else {
      if (this.webView.canGoBack && this.webView.ref) {
        this.webView.ref.goBack();
        return true;
      }
      return false;
    }
  };

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.onAndroidBackPress,
      );
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <RNWebView
          domStorageEnabled={true}
          onNavigationStateChange={(navState) => {
            this.setState({currentURL: navState.url});
            this.webView.canGoBack = navState.canGoBack;
          }}
          cacheEnabled
          javaScriptEnabled
          ref={(webView) => {
            this.webView.ref = webView;
          }}
          source={{uri: 'http://www.fiquenolar.ifce.edu.br/#/'}}
        />
      </View>
    );
  }
}
