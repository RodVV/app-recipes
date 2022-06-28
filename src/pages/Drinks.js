import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ButtonFilter from './components/ButtonFilters';
import '../App.css';
import DrinksRender from './components/DrinksRender';

function Drinks() {
  const dispatch = useDispatch();
  const foodSelector = useSelector(({ foodSlice }) => foodSlice);
  const searchSelector = useSelector(({ search }) => search);
  const { drinks } = searchSelector.data;
  const { initialDrinks } = foodSelector;
  const buttonSelector = useSelector(({ buttonFilter }) => buttonFilter);
  const { cards, allCategory } = buttonSelector;

  useEffect(() => {
    const listFiltersDrink = async () => {
      const request = await fetch(ApiDrink);
      const response = await request.json();
      const filterDrink = response.drinks.filter(
        (_drinkCategory, index) => index < TWELVE,
      );
      dispatch(setInitialDrinks(filterDrink));
    };
    listFiltersDrink();
  }, [dispatch]);

  return (
    <div>
      <Header />
      <ButtonFilter context="listDrink" />
      <DrinksRender />
      <Footer />
    </div>
  );
}

export default Drinks;
