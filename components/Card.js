import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import {white, purple, black, darkGray, burgundy, green} from '../utils/colors'

const Card = (props) => {

    const {showQuestion, questions, onQuestionPress, onButtonPress, index} = props,
    question = questions[index].question,
    answer = questions[index].answer
    
    return (
        <View>
            <View style={style.container}>
                {showQuestion &&
                <Text style={style.question}>{question}</Text>
                }
                {!showQuestion &&
                <Text style={style.answer}>{answer}</Text>
                }
                <TouchableOpacity
                    style={style.buttonToggle}
                    onPress={onQuestionPress}>
                    <Text style={style.buttonToggleText}>Show { showQuestion ? 'Answer' : 'Question' }</Text>
                </TouchableOpacity>
            </View>
            <View style={style.container}>
                <Text style={style.question}>Mark your answer</Text>
                <TouchableOpacity
                    style={style.buttonCorrect}
                    onPress={() => onButtonPress(true)}>
                    <Text style={style.buttonText}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.buttonIncorrect}
                    onPress={() => onButtonPress(false)}>
                    <Text style={style.buttonText}>Incorrect</Text>
                </TouchableOpacity>
            </View>
            <Text style={style.index}>{index + 1} of {questions.length} questions!</Text> 
        </View>
    )
}

const style = StyleSheet.create({
    container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
    question: {
        textAlign: 'center',
		fontSize: 20,
		color: black,
		fontWeight: 'bold',
		marginBottom: 10
    },
    answer: {
        textAlign: 'center',
		fontSize: 20,
		color: purple,
		fontWeight: 'bold',
		marginBottom: 10
    },
    buttonToggle: {
        backgroundColor: darkGray,
		margin: 10
    },
    buttonToggleText: {
        textAlign: 'center',
		fontSize: 16,
		padding: 8,
		color: white,
		fontWeight: 'bold'
    },
    buttonCorrect: {
        backgroundColor: green,
		margin: 10
    },
    buttonIncorrect: {
        backgroundColor: burgundy,
		margin: 10
    },
    buttonText: {
        textAlign: 'center',
		fontSize: 16,
		padding: 8,
		color: white,
		fontWeight: 'bold'
    },
    index: {
        color: purple,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10
    }
})

export default Card
