import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ButtonFilter from './components/ButtonFilters';
import '../App.css';
import MealsRender from './components/MealsRender';

function Foods() {
  const dispatch = useDispatch();
  const foodSelector = useSelector(({ foodSlice }) => (foodSlice));
  const searchSelector = useSelector(({ search }) => (search));
  const { meals } = searchSelector.data;
  const { initialMeals } = foodSelector;
  const buttonSelector = useSelector(({ buttonFilter }) => buttonFilter);
  const { cards, allCategory } = buttonSelector;

  useEffect(() => {
    const recipesFoods = async () => {
      const request = await fetch(ApiFoods);
      const response = await request.json();
      const allProducts = response.meals.filter((_food, index) => index < TWELVE);
      dispatch(setInitialMeals(allProducts));
    };
    recipesFoods();
  }, [dispatch]);

  return (
    <div>
      <Header />
      <ButtonFilter context="listFood" />
      <MealsRender />
      <Footer />
    </div>
  );
}

export default Foods;
