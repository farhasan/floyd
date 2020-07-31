import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  Alert,
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet, 
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View 
} from 'react-native';

import Loader from "./components/Loader";
import Logo from "./components/Logo";

const axios = require('axios');

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export default class App extends React.Component {  
  scrollX = new Animated.Value(0);
  scrollY = new Animated.Value(0);

  state = {
    figures: [],
    figuresLoaded: false,
    loading: true,
  }

  componentDidMount() {
    axios.get("https://us-central1-floyd-7dd74.cloudfunctions.net/app/figures").then((response) => {
      this.setState({ 
        figures : response.data,
        figuresLoaded: true
      });
    });
  }
  
  render() {
    let loader;
    if (this.state.loading && !this.state.figuresLoaded) {
      loader = <Loader fade={false} />;
    }
    else {
      loader = <Loader Loader fade={true} />;
    }

    return (
      <Animated.View style={styles.container}>
        {loader}
        {/* backgrounds*/}
        {this.state.figures.map((figure, index) => {
          return (
            <Animated.View
              key={index}
              shouldRasterizeIOS
              renderToHardwareTextureAndroid
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: figure.color1,
                zIndex: -index,
                elevation: -index,
                opacity: this.scrollX.interpolate({
                  inputRange: [
                    deviceWidth * (index - 1),
                    deviceWidth * index,
                    deviceWidth * (index + 1)
                  ],
                  outputRange: [0, 1, 0],
                  extrapolate: "clamp"
                })
              }}
            >
              <Logo size={20} text={"floyd"}/>
            </Animated.View>
          );
        })}

        {/* figure list */}
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
            { useNativeDriver: true }
          )}
        >
          {this.state.figures.map((figure, index) => {
            return (
              <View key={index} style={styles.cardContainer}>
                {/* figure image cards */}
                <Animated.View
                  pointerEvents="none"
                  shouldRasterizeIOS
                  renderToHardwareTextureAndroid
                  style={[
                    styles.figureImageContainer,
                    {
                      transform: [
                        {
                          translateX: this.scrollX.interpolate({
                            inputRange: [
                              deviceWidth * (index - 5),
                              deviceWidth * index,
                              deviceWidth * (index + 5)
                            ],
                            outputRange: [deviceWidth, 0, -deviceWidth],
                            extrapolate: "clamp"
                          })
                        }
                      ]
                    }
                  ]}
                > 
                  <Image style={styles.figureImage} source={{uri : figure.image}} />
                </Animated.View>

                {/* description cards */}
                <Animated.View
                  shouldRasterizeIOS
                  renderToHardwareTextureAndroid
                  style={{
                    transform: [
                      {
                        translateX: this.scrollX.interpolate({
                          inputRange: [
                            deviceWidth * (index - 1.5),
                            deviceWidth * index,
                            deviceWidth * (index + 1.5)
                          ],
                          outputRange: [
                            deviceWidth * 0.7,
                            0,
                            -deviceWidth * 0.7
                          ],
                          extrapolate: "clamp"
                        })
                      }
                    ]
                  }}
                >
                  <View style={ styles.card }>
                    <Animated.View
                      shouldRasterizeIOS
                      renderToHardwareTextureAndroid
                      style={{
                        transform: [
                          {
                            translateX: this.scrollX.interpolate({
                              inputRange: [
                                deviceWidth * (index - 1),
                                deviceWidth * index,
                                deviceWidth * (index + 1)
                              ],
                              outputRange: [
                                deviceWidth * 0.7,
                                0,
                                -deviceWidth * 0.7
                              ],
                              extrapolate: "clamp"
                            })
                          }
                        ]
                      }}
                    >
                      <Text style={styles.figureName}>
                        {figure.name.toUpperCase()}
                      </Text>
                    </Animated.View>

                    <Animated.ScrollView
                      vertical
                      showsVerticalScrollIndicator
                      pagingEnabled={false}
                      scrollEventThrottle={1}
                      onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
                        { useNativeDriver: true }
                      )}
                    >
                      <Text style={styles.figureLifeText}>
                        {figure.life}
                      </Text>
                      <Text style={styles.figureDescriptionText}>
                        {figure.description}
                      </Text>
                      <Text style={styles.figureDescriptionText}>
                        {"\n"}
                        If you would like to learn more about {figure.name}, read about these notable events:
                        {"\n"}
                        {"\n"}
                        1. {figure.learn_more1}
                        {"\n"}
                        2. {figure.learn_more2}
                        {"\n"}
                        3. {figure.learn_more3}
                      </Text>
                    </Animated.ScrollView>
                  </View>
                </Animated.View>
              </View>
            );
          })}
        </Animated.ScrollView>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: deviceWidth / 1.25,
    height: deviceHeight / 3.1,
    paddingBottom: 20,
    top: 225,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 15
    },
    shadowRadius: 25
  },
  cardContainer: {
    width: deviceWidth,
    height: deviceHeight,
    alignItems: "center",
    justifyContent: "center"
  },
  figureName: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 1,
    color: "white",
    bottom: 35,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    textShadowColor: '#5E5E5E',
  },
  figureDescriptionText: {
    fontSize: 15,
    letterSpacing: 0.15,
    lineHeight: 22,
    color: "#4F4F4F",
    paddingLeft: 20,
    paddingRight: 20
  },
  figureLifeText: {
    fontSize: 12,
    fontWeight: "300",
    letterSpacing: 0.15,
    color: "#4F4F4F",
    paddingLeft: 130,
    paddingBottom: 10
  },
  figureImageContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 15
    },
    shadowRadius: 25,
    elevation: 0
  },
  figureImage: {
    alignSelf: 'center',
    width: deviceWidth / 1.15,
    height: deviceHeight / 1.25,
    bottom: 10,
    borderRadius: 15,
    resizeMode: "cover"
  }
});
