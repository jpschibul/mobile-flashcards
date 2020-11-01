import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import * as actions from '../actions'
import * as storage from '../utils/storage'
import { connect } from 'react-redux'
import { CommonActions } from '@react-navigation/native'
import {black, white, purple } from '../utils/colors'

class CreateCard extends Component {

	state = {
        question: '',
        answer: ''
	}	
	
	submitCard = () => {
        if (this.state.question && this.state.answer) {
			const {dispatch} = this.props
			const {deckId} = this.props.route.params
            dispatch(actions.addCardToDeck(deckId, this.state.question, this.state.answer))
            storage.addCardToDeck(deckId, this.state.question, this.state.answer)
            this.setState({question: '', answer: ''})
            Keyboard.dismiss()
            this.props.navigation.dispatch(CommonActions.goBack())
        }
        else {
            alert('Please enter question and answer')
        }
    }

	render(){
		const {deckId} = this.props.route.params
		return(
			<View style={styles.container}>
                <Text style={styles.cardTitle}>Create a new card for { deckId }</Text>
                <Text style={styles.formLabel}>Question</Text>
                <TextInput
                    style={styles.formInput}
                    onChangeText={(question) => this.setState({question})}
                    value={this.state.question}
                />
                <Text style={styles.formLabel}>Answer</Text>
                <TextInput
                    style={styles.formInput}
                    onChangeText={(answer) => this.setState({answer})}
                    value={this.state.answer}
                />
                <TouchableOpacity
                    style={styles.button}
                     onPress={this.submitCard}>
                    <Text style={styles.buttonText}>Add card</Text>
                </TouchableOpacity>
            </View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
    },
    cardTitle: {
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


function mapStateToProps(decks) {
	return {
		decks
	}
}


export default connect(mapStateToProps)(CreateCard)