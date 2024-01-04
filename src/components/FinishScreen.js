export default function FinishScreen({points, maxPoints, highscore, dispatch}) {
    const percentage = (points / maxPoints) * 100;

    let emoji;
    if (percentage === 100) {
        emoji = '🥇';
    } else if (percentage >= 75) {
        emoji = '🥈';
    } else if (percentage >= 50) {
        emoji = '🥉';
    } else {
        emoji = '💩';
    }

    function handleRestart() {
        dispatch({type: 'restart'});
    }

    return(
        <>
            <p className='result'>
                <span>{emoji}</span> Your score <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)
            </p>
            <p className='highscore'>(Highscore: {highscore} Points)</p>
            <button className='btn btn-ui' onClick={() => handleRestart()}>Restart Quiz</button>
        </>
    )
}