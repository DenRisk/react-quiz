export default function StartScreen({numQuestions, dispatch}) {

    function handleDispatchStartAction() {
        dispatch({type: 'start'});
    }

    return (
        <div className="start">
            <h2>Welcome to the React Quiz!</h2>
            <h3>{numQuestions} Questions to test your React skills</h3>
            <button className='btn btn-ui' onClick={() => handleDispatchStartAction()}>Let's start!</button>
        </div>
    );
}