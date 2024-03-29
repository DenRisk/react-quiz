export default function NextButton({ dispatch, answer, index, numQuestions}) {

    function handleNextQuestionAction() {
        dispatch({ type: 'nextQuestion' });
    }

    if (answer === null) {
        return null;
    }

    if (index === numQuestions - 1) {
        return (
            <button className='btn btn-ui' onClick={() => dispatch({ type: 'finish' })}>
                Finish
            </button>
        );
    }

    return (
        <button className='btn btn-ui' onClick={() => handleNextQuestionAction()}>
            Next
        </button>
    );
}