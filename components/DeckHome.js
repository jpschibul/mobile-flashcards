import React, { Component } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/storage'
import { receiveDecks } from '../actions'
import Deck from './Deck'
import { white } from '../utils/colors'

class DeckHome extends Component{

	componentDidMount() {
        const {dispatch} = this.props
        getDecks().then((decks) => dispatch(receiveDecks(decks)))
    }

    pressDeck = (title) => {
        this.props.navigation.navigate(
            'Deck Details',
            {deckId: title}
        )
    }

    renderItem = ({item}) => {
        return (
            <Deck item={item} onDeckPressed={this.pressDeck}/>
        )
    }


	render(){
		
		const {decks} = this.props
        const deckList = Object.entries(decks).map(
            deck => {
                return {title: deck[1].title, key: deck[1].title, questions: deck[1].questions}
            }
        )

		return(
			<View style={styles.container}>
                <FlatList data={deckList}
                renderItem={this.renderItem}/>
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
}})

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckHome)