/* eslint-disable indent */
/* eslint-disable react/self-closing-comp */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { quiz } from '../reducers/quiz';

export const CurrentQuestion = () => {
	const dispatch = useDispatch();
	const [ answer, setAnswer ] = useState('');

	const handleOnSubmit = (e) => {
		// Prevent page reload
		e.preventDefault();
	};

	const handleNextQuestion = (e) => {
		e.preventDefault();
		dispatch(
			quiz.actions.submitAnswer({
				questionId: question.id,
				answerIndex: answer
			})
		);

		dispatch(quiz.actions.goToNextQuestion());
	};

	const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuesionIndex]);
	const userDone = useSelector((state) => state.quiz.quizOver);
	if (!question) {
		return <h1>Oh no! I could not find the current question!</h1>;
	}
	const try1 = 'Gambia Flag';
	const try2 = 'gm';

	return (
		<form onSubmit={handleOnSubmit}>
			<h1>Question: {question.questionText}</h1>
			<span>{question.questionText}</span>
			<i class={`em em-flag-${try2}`} aria-role="presentation" aria-label={try1} />
			<p>{answer}</p>
			{question.options.map((option, index) => {
				return (
					<button onClick={(e) => setAnswer(e.target.value)} type="submit" value={index}>
						{option}
					</button>
				);
			})}

			{userDone ? (
				<Link to="/resultPage">
					<Button info="ResultPage" />
				</Link>
			) : (
				<Link to={`/questions/${question.id}`}>
					<button onClick={handleNextQuestion}>next question</button>
				</Link>
			)}
		</form>
	);
};

{
	/* <span style="font-family: &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, NotoColorEmoji, &quot;Segoe UI Symbol&quot;, &quot;Android Emoji&quot;, EmojiSymbols;">💌</span> */
}
