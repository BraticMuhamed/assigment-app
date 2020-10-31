import { connect } from 'react-redux';

import Home from './Home';
import { RootState } from '../../redux/rootReducer';
import { changeTab, changeSearchTerm } from '../../redux/homeSlice';
import { fetchItems, searchItems } from '../../redux/itemsSlice';
import { Items } from '../../api/tmdbApi';

interface stateToProps {
  tab: string;
  searchTerm: string;
  items: Items;
  isLoading: boolean;
}

const mapStateToProps = (state: RootState): stateToProps => ({
  tab: state.home.tab,
  searchTerm: state.home.searchTerm,
  items: state.items.results,
  isLoading: state.items.isLoading,
});
const mapDispatchToProps = {
  changeTab,
  changeSearchTerm,
  fetchItems,
  searchItems,
};

export const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Home);
