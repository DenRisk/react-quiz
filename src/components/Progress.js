export default function Progress({currentQuestionIndex, numQuestions, currentPoints, maxPoints}) {
    return (
        <header className="progress">
            <progress value={currentQuestionIndex} max={numQuestions}></progress>

            <p>Question <strong>{currentQuestionIndex + 1}</strong> / {numQuestions}</p>
            <p>Question <strong>{currentPoints}</strong> / {maxPoints}</p>

        </header>
    )
}