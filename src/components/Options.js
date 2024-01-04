export default function Options({question, dispatch, answer}) {
    const hasAnswered = answer !== null
    function handleDispatchAnswer(selectedAnswerIndex) {
        dispatch({type: 'newAnswer', payload: selectedAnswerIndex})
    }

    return (
        <div>
            <div className='options'>
                {question.options.map((option, index) => (
                    <button
                        onClick={() => handleDispatchAnswer(index)}
                        className={`btn btn-option ${index === answer ? 'answer' : ''} ${hasAnswered ? index === question.correctOption ? 'correct' : 'wrong' : ''}`}
                        disabled={hasAnswered}
                        key={option}>{option}
                    </button>
                ))}
            </div>
        </div>
    )
}