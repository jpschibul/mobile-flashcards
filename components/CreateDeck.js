import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Keyboard, TouchableOpacity } from 'react-native'
import * as actions from '../actions'
import * as storage from '../utils/storage'
import { connect } from 'react-redux'
import { black, white, purple } from '../utils/colors'

class CreateDeck extends Component {

	state = {
        title: ''
    }

    submitDeck = () => {
        if (this.state.title) {
            const {dispatch} = this.props
            dispatch(actions.addDeck(this.state.title))
            storage.addDeck(this.state.title)
            this.setState({title: ''})
            Keyboard.dismiss()
            this.props.navigation.navigate('Deck Details', {deckId: this.state.title})
        }
        else {
            alert('Enter first a title please!')
        }
    }

	render(){
	
		return(
			<View style={styles.container}>
                <Text style={styles.deckTitle}>Create a new Deck</Text>
                <Text style={styles.formLabel}>Please enter the name of the deck</Text>
                <TextInput
                    style={styles.formInput}
                    onChangeText={(title) => this.setState({title})}
                    value={this.state.title}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.submitDeck}>
                    <Text style={styles.buttonText}>Add deck</Text>
                </TouchableOpacity>
            </View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: white,
		justifyContent: 'center',
        alignItems: 'center'
    },
    deckTitle: {
        textAlign: 'center',
		fontSize: 28,
		color: black,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		marginBottom: 30
    },
    formLabel: {
        textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 20
    },
    formInput: {
        borderWidth: 2,
        padding: 10,
        width: 200,
        borderColor: purple,
    },
    button: {
		backgroundColor: black,
		margin: 10		
    },
    buttonText: {
		textAlign: 'center',
		fontSize: 16,
		padding: 8,
		color: white,
		fontWeight: 'bold'
	}
})

export default connect()(CreateDeck)