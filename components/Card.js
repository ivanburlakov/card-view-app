import React from "react";
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import Animated, { Easing } from "react-native-reanimated";

import { connect } from "react-redux";

import styled from "styled-components";

function mapStateToProps(state) {
  return {
    action: state.action
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openCard: () =>
      dispatch({
        type: "OPEN_CARD"
      }),
    closeCard: () =>
      dispatch({
        type: "CLOSE_CARD"
      })
  };
}

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

class Card extends React.Component {
  state = {
    imageHeight: new Animated.Value(90),
    cardWidth: new Animated.Value(315),
    cardHeight: new Animated.Value(260),
    borderRadius: new Animated.Value(14),
    textInputSwitch: false,
    dots: null,
    scrollEnabled: false
  };

  onTextChange(event) {
    const { contentSize, text } = event.nativeEvent;
    this.setState({
      text: text,
      height: contentSize.height > 100 ? 100 : contentSize.height
    });
  }

  closeCard = () => {
    Animated.timing(this.state.imageHeight, {
      duration: 900,
      toValue: 90,
      easing: Easing.out(Easing.exp)
    }).start();
    Animated.timing(this.state.cardWidth, {
      duration: 900,
      toValue: 315,
      easing: Easing.out(Easing.exp)
    }).start();
    Animated.timing(this.state.cardHeight, {
      duration: 900,
      toValue: 260,
      easing: Easing.out(Easing.exp)
    }).start();
    Animated.timing(this.state.borderRadius, {
      duration: 900,
      toValue: 14,
      easing: Easing.out(Easing.exp)
    }).start();
    this.props.closeCard();
    this.state.textInputSwitch = false;
    this.state.titleMaxLength = 20;
    this.state.textMaxLength = 255;
    this.state.scrollEnabled = false;
  };

  openCard = () => {
    if (!this.props.canOpen) return;
    Animated.timing(this.state.imageHeight, {
      duration: 900,
      toValue: 160,
      easing: Easing.out(Easing.exp)
    }).start();
    Animated.timing(this.state.cardWidth, {
      duration: 900,
      toValue: screenWidth,
      easing: Easing.out(Easing.exp)
    }).start();
    Animated.timing(this.state.cardHeight, {
      duration: 900,
      toValue: screenHeight,
      easing: Easing.out(Easing.exp)
    }).start();
    Animated.timing(this.state.borderRadius, {
      duration: 900,
      toValue: 0,
      easing: Easing.out(Easing.linear)
    }).start();
    this.props.openCard();
    this.state.textInputSwitch = true;
    this.state.titleMaxLength = 255;
    this.state.textMaxLength = 3000;
    this.state.scrollEnabled = true;
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.openCard}>
        <AnimatedContainer
          style={{
            width: this.state.cardWidth,
            height: this.state.cardHeight,
            borderRadius: this.state.borderRadius
          }}
        >
          <AnimatedCover
            style={{
              borderTopLeftRadius: this.state.borderRadius,
              borderTopRightRadius: this.state.borderRadius
            }}
          >
            <AnimatedImage
              source={this.props.image}
              style={{ height: this.state.imageHeight }}
            />
            <TextContainer>
              <Title
                multiline={true}
                editable={this.state.textInputSwitch}
              >
                {this.props.title}
              </Title>
              <Text
                multiline={true}
                editable={this.state.textInputSwitch}
              >
                {this.props.text}
              </Text>
            </TextContainer>
          </AnimatedCover>
        </AnimatedContainer>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);

const Container = styled.View`
  width: 315px;
  height: 260px;
  border-radius: 14px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  elevation: 23;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const TextContainer = styled.View`
  flex: 1;
  top: -60px;
`;

const Cover = styled.View`
  height: 290px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const AnimatedCover = Animated.createAnimatedComponent(Cover);

const Image = styled.Image`
  width: 100%;
  height: 90px;
`;

const AnimatedImage = Animated.createAnimatedComponent(Image);

// const CloseView = styled.View`
//   width: 60px;
//   height: 60px;
//   background-color: white;
//   border-radius: 30px;
//   justify-content: center;
//   align-items: center;
//   box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
//   elevation: 23;
// `;

// const AnimatedCloseView = Animated.createAnimatedComponent(CloseView);

const Title = styled.TextInput`
  left: 18px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  width: 280px;
`;

const Text = styled.TextInput`
  top: 20px;
  font-size: 17px;
  margin: 18px;
  line-height: 24px;
  color: #3c4560;
`;

const Dots = styled.Text`
  position: relative;
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFF"
//   },
//   shadow: { ...elevationShadowStyle(13) },
//   gradient: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 80 / 2
//   }
// });

{/* <Animated.View
  style={{
    left: "50%",
    marginLeft: -40,
    bottom: 30,
    position: "absolute",
    alignItems: "center",
    opacity: this.state.opacity
  }}
>
  <TouchableOpacity onPress={this.closeCard} style={{ width: 80, height: 80 }}>
    <LinearGradient
      colors={["#FF911F", "#FE5A40"]}
      style={styles.gradient}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.7, y: 1 }}
    >
      <Ionicons name="ios-close" size={48} color="#000" />
    </LinearGradient>
  </TouchableOpacity>
</Animated.View>; */}
