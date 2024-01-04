import Header from "./Header";
import Main from "./Main";
import { useEffect, useReducer } from "react";
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Question from './Question'
import NextButton from './NextButton'
import Progress from './Progress'
import FinishScreen from './FinishScreen'
import Footer from './Footer'
import Timer from './Timer'

const SECS_PER_QUESTION = 30

function reducer(state, action) {
    switch (action.type) {
        case 'dataReceived':
            return {...state, questions: action.payload, status: 'ready'};
        case 'dataFailed':
            return {...state, status: 'error'};
        case 'start':
            return {...state, status: 'active', secondsRemaining: state.questions.length * SECS_PER_QUESTION};
        case 'finish':
            return {
                ...state,
                status: 'finish',
                highscore: state.points > state.highscore ? state.points : state.highscore
            };
        case 'newAnswer':
            const question = state.questions.at(state.index)
            return {
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? state.points + question.points : state.points
            };
        case 'nextQuestion':
            return {...state, index: state.index + 1, answer: null};
        case 'restart':
            return {...state, status: 'ready', index: 0, answer: null, points: 0};
            case 'tick':
                return {...state, secondsRemaining: state.secondsRemaining - 1, status: state.secondsRemaining === 0 ? 'finish' : state.status};
        default:
            throw new Error('Unexpected action');
    }
}

const initialState = {
    questions: [],
    status: '',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: 10
};

export default function App() {
    const [{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining
    }, dispatch] = useReducer(reducer, initialState);

    const numQuestions = questions.length;
    const maxPoints = questions.reduce((acc, question) => acc + question.points, 0);

    useEffect(() => {
        fetch('http://localhost:5500/questions')
            .then(res => res.json())
            .then(data => dispatch({type: 'dataReceived', payload: data}))
            .catch(err => dispatch({type: 'dataFailed'}));
    }, []);


    return (
        <div className="app">
            <Header/>
            <Main>
                {status === 'loading' && <Loader/>}
                {status === 'error' && <Error/>}
                {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
                {status === 'active'
                    && <>
                        <Progress currentQuestionIndex={index} numQuestions={numQuestions} currentPoints={points}
                                  maxPoints={maxPoints}/>
                        <Question question={questions[index]} dispatch={dispatch} answer={answer}/>
                        <Footer>
                            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
                            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions}/>
                        </Footer>
                    </>
                }
                {status === 'finish' &&
                    <FinishScreen points={points} maxPoints={maxPoints} highscore={highscore} dispatch={dispatch}/>}
            </Main>
        </div>
    );
}