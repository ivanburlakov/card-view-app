import React from "react";
import {
  Text,
  View,
  Button,
  PanResponder,
  Animated,
  Dimensions
} from "react-native";

import { connect } from "react-redux";

import { Ionicons } from "@expo/vector-icons";

import styled from "styled-components";

function mapStateToProps(state) {
  return {
    action: state.action
  };
}

import Card from "../components/Card";

const screenHeight = Dimensions.get("window").height;

function getNextIndex(index) {
  let nextIndex = index + 1;
  if (nextIndex > cards.length - 1) {
    return 0;
  }
  return nextIndex;
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (gestureState.dx === 0 && gestureState.dy === 0) {
          // Tap
          return false;
        } else {
          // Pan
          if (this.props.action == "openCard") {
            return false;
          } else {
            // Card is not open
            return true;
          }
        }
      },

      onPanResponderGrant: () => {
        Animated.spring(this.state.scale, { toValue: 1 }).start();
        Animated.spring(this.state.translateY, { toValue: 0 }).start();
        Animated.spring(this.state.thirdScale, { toValue: 0.9 }).start();
        Animated.spring(this.state.thirdTranslateY, { toValue: 34 }).start();
      },

      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),

      onPanResponderRelease: () => {
        const positionY = this.state.pan.y.__getValue();

        if (positionY > screenHeight * 0.2) {
          Animated.timing(this.state.pan, {
            toValue: { x: 0, y: screenHeight },
            duration: 300
          }).start(() => {
            this.state.pan.setValue({ x: 0, y: 0 });
            this.state.scale.setValue(0.9);
            this.state.translateY.setValue(34);
            this.state.thirdScale.setValue(0.6);
            this.state.thirdTranslateY.setValue(-20);
            this.setState({ index: getNextIndex(this.state.index) });
          });
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 }
          }).start();
          Animated.spring(this.state.scale, { toValue: 0.9 }).start();
          Animated.spring(this.state.translateY, { toValue: 34 }).start();
          Animated.spring(this.state.thirdScale, { toValue: 0.6 }).start();
          Animated.spring(this.state.thirdTranslateY, { toValue: -20 }).start();
        }
      }
    });
  }

  addCard() {
    cards.push({
      title: "Yo",
      image: require("../assets/painting1.jpg"),
      text:
        "There are multiple options for configuring Prettier with this extension. You can use VS Code settings, prettier configuration files, or an .editorconfig file. The VS Code settings are meant to be used as a fallback and are generally intended only for use on non-project files. It is recommended that you always include a prettier configuration file in your project specifying all settings for your project. This will ensure that no matter how you run prettier - from this extension, from the CLI, or from another IDE with Prettier, the same settings will get applied. Using Prettier Configuration files to set formatting options is the recommended approach. Options are searched recursively down from the file being formatted so if you want to apply prettier settings to your entire project simply set a configuration in the root. Settings can also be configured through VS Code - however, these settings will only apply while running the extension, not when running prettier through the command line."
    });
  }

  emptyCard() {
    cards.pop();
  }

  state = {
    index: 0,
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(0.9),
    translateY: new Animated.Value(34),
    thirdScale: new Animated.Value(0.6),
    thirdTranslateY: new Animated.Value(-20)
  };

  render() {
    return (
      <>
        <Container>
          <Animated.View
            style={{
              transform: [
                { translateX: this.state.pan.x },
                { translateY: this.state.pan.y }
              ]
            }}
            {...this._panResponder.panHandlers}
          >
            <Card
              canOpen={true}
              title={cards[this.state.index].title}
              image={cards[this.state.index].image}
              text={cards[this.state.index].text}
            />
          </Animated.View>
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: -1,
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              transform: [
                { scale: this.state.scale },
                { translateY: this.state.translateY }
              ]
            }}
          >
            <Card
              title={cards[getNextIndex(this.state.index)].title}
              image={cards[getNextIndex(this.state.index)].image}
              text={cards[getNextIndex(this.state.index)].text}
            />
          </Animated.View>
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: -2,
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              transform: [
                { scale: this.state.thirdScale },
                { translateY: this.state.thirdTranslateY }
              ]
            }}
          >
            <Card
              title={cards[getNextIndex(this.state.index + 1)].title}
              image={cards[getNextIndex(this.state.index + 1)].image}
              text={cards[getNextIndex(this.state.index + 1)].text}
            />
          </Animated.View>
        </Container>
        <Button onPress={this.addCard} title="Add"></Button>
        <Button onPress={this.emptyCard} title="Empty"></Button>
      </>
    );
  }
}

export default connect(mapStateToProps)(Home);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

let cards = [
  {
    title: "Какая-то карточка",
    image: require("../assets/painting1.jpg"),
    text:
      "There are multiple options for configuring Prettier with this extension. You can use VS Code settings, prettier configuration files, or an .editorconfig file. The VS Code settings are meant to be used as a fallback and are generally intended only for use on non-project files. It is recommended that you always include a prettier configuration file in your project specifying all settings for your project. This will ensure that no matter how you run prettier - from this extension, from the CLI, or from another IDE with Prettier, the same settings will get applied. Using Prettier Configuration files to set formatting options is the recommended approach. Options are searched recursively down from the file being formatted so if you want to apply prettier settings to your entire project simply set a configuration in the root. Settings can also be configured through VS Code - however, these settings will only apply while running the extension, not when running prettier through the command line."
  },
  {
    title: "Я вторая карточка",
    image: require("../assets/painting2.jpg"),
    text: "Ну шож, всё как раньше! Ану вниз!"
  },
  {
    title: "Я третья карточка, и шо?",
    image: require("../assets/painting4.jpg"),
    text:
      "Устала сидеть в задних рядах, наконец-то я тутачки. Ну теперь давай смахивай!"
  }
];

// {
//   title: null,
//   image: null,
//   text: null
// },
