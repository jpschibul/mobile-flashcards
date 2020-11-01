import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { white, darkGray, black } from '../utils/colors'

class Deck extends Component {

    state = {
        rotateX: new Animated.Value(0),
        opacity: new Animated.Value(1)
    }

    deckTouched(title) {
        Animated.parallel([
            Animated.timing(this.state.rotateX, {
                toValue: 360,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start(() => {
            this.setState({rotateX: new Animated.Value(0), opacity: new Animated.Value(1)})
            this.props.onDeckPressed(title)
        })
    }

	render(){
        
        const {item} = this.props
       

		return(
		<TouchableOpacity
                style={[style.container]}
                onPress={() => this.deckTouched(item.title)}>

                <Animated.View style={{
                    opacity: this.state.opacity,
                    transform: [
                        {
                            rotateX: this.state.rotateX.interpolate({
                                inputRange: [0, 360],
                                outputRange: ['0deg', '360deg']
                            })
                        },
                        {perspective: 1000}
                    ]
                }}>
                    <Text style={style.title}>{item.title}</Text>
                    <Text style={style.subTitle}>{item.questions.length} cards</Text>
                </Animated.View>
            </TouchableOpacity>
		)
	}
}


const style = StyleSheet.create({
    container: {
        flex:1,
        width : 250,
        height: 100,
        backgroundColor: darkGray,
        paddingBottom: 18,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 18,
        margin: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: white,
        paddingBottom: 3,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    subTitle: {
        fontSize: 18,
        color: black,
        paddingBottom: 3,
        textAlign: 'center'
    }
})




export default Deck