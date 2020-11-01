import React, { Component } from 'react'
import {StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import Card  from './Card'
import { black, white } from '../utils/colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { CommonActions } from '@react-navigation/native'

class Quiz extends Component {
    state = {
        questions: [],
        questionIndex: 0,
        showQuestion: true
    }

    componentDidMount() {
		const {decks} = this.props
		const {deckId} = this.props.route.params

        const deck = Object.entries(decks).find(
            deck => {
                return deck[1].title === deckId
            }
        )

        const questions = deck[1].questions.map((question) => {
            return {
                question: question.question,
                answer: question.answer,
                correct: false
            }
        })

        this.setState({questions})

        
    }

    restartQuiz = () => {
        const questions = this.state.questions.map((question) => {
            return { question: question.question, answer: question.answer, correct: false }
        })
        this.setState({questions, questionIndex: 0, showQuestion: true})
    }

    toggleButtons = (status) => {
        const questions = this.state.questions
        questions[this.state.questionIndex].correct = status
        this.setState({questions, questionIndex: this.state.questionIndex + 1, showQuestion: true})
    }

    toggleQuestion = () => {
        this.setState({showQuestion: !this.state.showQuestion})
    }

    render() {
        return (
            <View style={style.container}>
                {this.state.questions.length > 0 &&
                this.state.questionIndex < this.state.questions.length &&
                <Card index={this.state.questionIndex}
                      showQuestion={this.state.showQuestion}
                      questions={this.state.questions}
                      onQuestionPress={this.toggleQuestion}
                      onButtonPress={this.toggleButtons}
                />
                }
                {this.state.questions.length > 0 &&
                this.state.questionIndex >= this.state.questions.length &&
                <View style={style.container}>
                    <View style={style.container}>
                        {this.state.questions.filter(question => question.correct).length === this.state.questions.length &&
                        <MaterialCommunityIcons name="check-decagram" size={55} color='purple' />
                        }
                        {this.state.questions.filter(question => question.correct).length !== this.state.questions.length &&
                        <MaterialCommunityIcons name="alert-box" size={55} color='black' />
                        }
                        <Text style={style.text}>You've
                            got {this.state.questions.filter(question => question.correct).length} out
                            of {this.state.questions.length} questions correct
                            ({Math.round(this.state.questions.filter(question => question.correct).length / this.state.questions.length * 100)}%).
                        </Text>
                    </View>
                    <View style={style.container}>
                        <TouchableOpacity
                            style={style.quizButton}
                            onPress={() => this.props.navigation.dispatch(CommonActions.goBack())}>
                            <Text style={style.buttonText}>Back to Deck</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.quizButton}
                            onPress={this.restartQuiz}>
                            <Text style={style.buttonText}>Restart Quiz</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                }
                {this.state.questions.length === 0 &&
                <Text style={style.text}>No questions available</Text>
                }
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20
    },
    quizButton: {
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

export default connect(mapStateToProps)(Quiz)