import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { black, white, darkGray, purple } from '../utils/colors'

class IndividualCard extends Component {


	render(){

	const {deckId} = this.props.route.params
	const {decks} = this.props
	const deck = decks[deckId]

	
		return(
			<View style={styles.container}>
			  <View style={styles.deck}>
				<Text style={styles.title}>{deck.title}</Text>
				<Text style={styles.card}>Cards: {deck.questions.length}</Text>
				<TouchableOpacity
						style={styles.button}
                        onPress={() => this.props.navigation.navigate(
                            'Create Card',
                            {deckId: deck.title}
                        )}>
                        <Text style={styles.buttonText}>Create Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
					    style={styles.button}
                        onPress={() => this.props.navigation.navigate(
                            'Quiz',
                            {deckId: deck.title}
                        )}>
                        <Text style={styles.buttonText}>Play Quiz</Text>
                    </TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: white		
	},
	deck: {
		backgroundColor: darkGray,
		padding: 40,
		shadowColor: purple,
		shadowOffset: { width: 4, height: 4 },
		shadowOpacity: 0.65,
		shadowRadius: 4,
	},
	title: {
		textAlign: 'center',
		fontSize: 20,
		color: black,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		marginBottom: 10

	},
	card: {
		textAlign: 'center',
		fontSize: 18,
		color: purple,
		fontWeight: 'bold',
		marginBottom: 15
	},
	button: {
		backgroundColor: purple,
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

export default connect(mapStateToProps) (IndividualCard)