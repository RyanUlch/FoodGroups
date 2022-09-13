// CSS Import
import classes from './DinnerRecipeItem.module.css';
// Library Imports
import { useState, useContext } from 'react';
// Component Imports
import Card from '../../../Containers/Card/Card';
import Timer from './Timer/Timer';
// Context Import
import { UserContext } from '../../../../Context/user-context';

// Displays the Recipe information for specific recipe, allowing user to interact with ingredients/instructions
const DinnerRecipeDisplay = (props) => {
    const [ctx] = useContext(UserContext);
    const [recipe] = useState(ctx.recipes[ctx.recipes.findIndex((ele) => ele.recipeID === props.id)]);

	// Displays image associated with recipe
	const displayImg = () => {
		let imgPath;
		if (recipe.imgURL) {
			imgPath = recipe.imgURL;
		} else {
			imgPath = require(`../../../../Assets/default.jpeg`);
		}
		return imgPath;
	};

	// Upon clicking a list item, mark the element as complete using styles (can be un-completed by clicking again)
    const completeHandler = (event) => {
		if (event.target.className.includes('isComplete')) {
			let node = event.target;
			while (!node.className.includes('end')) {
				if (node.className.includes('tooFar')) {
					node = node.children[0];
				} else {
					node = node.parentNode;
				}
			}
			if (node.className.includes(`${classes.selected}`)) {
				node.className = `${classes.listItem} isComplete end`;
			} else {
				node.className = `${classes.listItem} ${classes.selected} isComplete end`;
			}
		}
    };

	// Send alert to user when a timer finishes
	const alertHandler = (id) => {
        alert(`Timer Up! '${recipe.instructions[id].instruction}' complete!`);
    };

	// Create elements for all ingredients
    const ingredients = () => {
        let ingredientList = [];
        for (const ingredient of recipe.ingredients) {
            ingredientList.push(
				<Card key={ingredient.key} className={`${classes.card} isComplete tooFar`} onClick={completeHandler}>
					<li className={`${classes.listItem} isComplete end`}>
						<span className={`${classes.ingredientListItems} isComplete`}>
							<p className='isComplete'><span className={classes.itemTitle}>Item:&ensp;&ensp;&ensp;&ensp;</span>{ingredient.ingredient}</p>
							<div className={`${classes.amount} isComplete`}>
								<p className='isComplete'><span className={classes.itemTitle}>Amount:&ensp;</span>{ingredient.amount}&ensp;-&ensp;</p>
								<p className='isComplete'>{ingredient.unit}</p>
							</div>
						</span>
					</li>
				</Card>
            );
        }
        return ingredientList;
    };

	// Create elements for all instructions
    const instructions = () => {
        let instructionList = [];
        for (const instruction of recipe.instructions) {
			const useTimer = instruction.timer[0] > 0 || instruction.timer[1] > 0;
            instructionList.push(
				<Card key={instruction.key} className={`${classes.card} isComplete tooFar`}>
					<span className={`${classes.instructionListItem} ${useTimer ? classes.useTimer : ''} isComplete tooFar`}>
						<li  className={`${classes.listItem} isComplete end`} onClick={completeHandler}>{`${instruction.instruction}`}</li>
						{useTimer ? (
							<Timer
								onSetAlert={alertHandler}
								timerID={instruction.id}
								initial={instruction.timer}
								id={recipe.instructions.findIndex(ele => ele.id === instruction.id)}
							/>
						) : ('')}
					</span>
				</Card>
            );
        }
        return instructionList;
    };

	// If the recipe information is not loaded yet, show loading in Card view (Should not appear in normal use)
	if (!recipe) {
		return (
			<Card className={classes.dinnerCard}>
				Loading...
			</Card>
		)
	} else {
		return (
			<Card className={classes.dinnerCard}>
				<article className={classes.carddisplay}>
					<h2 className={classes.title}>{recipe.recipeName}</h2>
					<p className={classes.description}>{recipe.recipeDescription}</p>
					<img className={classes.dinnerImage} src={displayImg()} alt=''/>
					<hr />
					<div className={classes.scrollarea}>
						<h3 className={classes.subtitle}>Ingredients</h3>
						<ul className={classes.ingredientList}>{ingredients()}</ul>
						<hr />
						<h3 className={classes.subtitle}>Instructions</h3>
						<ol className={classes.instructionList}>{instructions()}</ol>
					</div>
				</article>
			</Card>
		);
	}
};

export default DinnerRecipeDisplay;