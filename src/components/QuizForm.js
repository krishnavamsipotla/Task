
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { submitAnswer, resetQuiz } from '../actions/quizActions';
import ScoreModal from './scoremodal';

const QuizForm = () => {
  const fullName = useSelector((state) => state.fullName);

  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);
  

  
  const [score, setScore] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAnswerSubmit = (questionId, selectedOption, correctOption, questionType) => {
    dispatch(submitAnswer(questionId, selectedOption));

    
    if (questionType === 'descriptive') {
      return;
    }

    
    if (selectedOption === correctOption && !questions[questionId - 1].selectedOption) {
      setScore(score + 1);
    }
  };


const handleDescriptiveSubmit = (questionId, enteredText, correctAnswer) => {
  
  const isCorrect = enteredText.toLowerCase() === correctAnswer.toLowerCase();

  if (isCorrect) {
    setScore(score + 1);
  
  }

  dispatch(submitAnswer(questionId, enteredText));
};

  const handleCloseModal = () => {
    setScore(0);
    dispatch(resetQuiz());
    setModalVisible(false);
  };

  const handleQuizSubmit = () => {
    setModalVisible(true);
  };

  return (
    <ImageBackground
      source={require('../images/images.jpg')} 
      style={styles.background}
    >
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Welcome, {fullName}! Your Quiz</Text>
          </View>
          {questions.map((question, index) => (
            <View key={question.id} style={styles.questionContainer}>
              <Text style={styles.questionNumber}>Question {index + 1}:</Text>
              <Text style={styles.questionText}>{question.text}</Text>
              {question.type === 'multipleChoice' && (
                <>
                  {question.options.map((option, optionIndex) => (
                    <TouchableOpacity
                      key={optionIndex}
                      style={[
                        styles.optionButton,
                        {
                          backgroundColor:
                            question.selectedOption === option ? '#4AD7E6' : '#ecf0f1',
                        },
                      ]}
                      onPress={() =>
                        handleAnswerSubmit(question.id, option, question.correctOption, question.type)
                      }
                    >
                      <Text style={styles.optionText}>
                        {String.fromCharCode(65 + optionIndex)}. {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </>
              )}
              {question.type === 'trueFalse' && (
                <>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      {
                        backgroundColor:
                          question.selectedOption === true ? '#4AD7E6' : '#ecf0f1',
                      },
                    ]}
                    onPress={() =>
                      handleAnswerSubmit(question.id, true, question.correctOption, question.type)
                    }
                  >
                    <Text style={styles.optionText}>True</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      {
                        backgroundColor:
                          question.selectedOption === false ? '#4AD7E6' : '#ecf0f1',
                      },
                    ]}
                    onPress={() =>
                      handleAnswerSubmit(question.id, false, question.correctOption, question.type)
                    }
                  >
                    <Text style={styles.optionText}>False</Text>
                  </TouchableOpacity>
                </>
              )}
              {question.type === 'descriptive' && (
                <>
                  
                  <TextInput
                    style={styles.textInput}
                    placeholder="ENTER YOUR ANSWER"
                    keyboardAppearance="light" 
                    value={questions[question.id - 1].selectedOption || ''}
                    onChangeText={(text) =>
                      dispatch(submitAnswer(question.id, text)) 
                    }
                    onBlur={() =>
                      handleDescriptiveSubmit(
                        question.id,
                        questions[question.id - 1].selectedOption,
                        question.correctAnswer
                      )
                    }
                  />
                </>
              )}
            </View>
          ))}
          <View style={styles.submitButtonContainer}>
            <Button
              title="Submit Quiz"
              // color="#4AD7E6"
              color={'darkturquoise'}
              onPress={handleQuizSubmit}
              style={styles.submitButton}
            />
          </View>
          <ScoreModal isVisible={modalVisible} onClose={handleCloseModal} score={score} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
     Opacity:0.5
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 30,
    // backgroundColor: 'antiquewhite',
  },
  headingContainer: {
    marginBottom: 20,
  },
  headingText: {
    fontSize: 34,
    fontWeight: 'bold',
     color: 'darkorange',
    // color: 'red',
    marginTop: 10,
    marginBottom: -10,
    // alignSelf: 'center',
    
  },
  questionContainer: {
    marginBottom: 10,
  },
  questionNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
    // color: 'red',
    marginBottom: 5,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 5,
    color: 'black',
    fontWeight: '600',
  },
  optionButton: {
    backgroundColor: 'red',
    padding: 10,
    marginVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  optionText: {
    fontSize: 20,
    fontWeight: '500',
    color:'black',
  },
  descriptiveText: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
  textInput: {
    height: 50,
    // borderColor: 'gray',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    marginTop:10,
    paddingLeft: 10,
    borderRadius:15,
    backgroundColor:'white',
    fontSize:18,
    fontWeight:'900',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  submitButtonContainer: {
    marginBottom: 50, 
    marginTop: 20,
    borderRadius: 1,
    
  },
  submitButton: {
    flex:1,
    fontSize: 30,
    

  },
});

export default QuizForm;







