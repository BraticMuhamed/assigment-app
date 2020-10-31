import React, { ChangeEvent, PureComponent } from 'react';
import { ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { connector } from './index';
import {
  Button,
  InputField,
  Tabs,
  Card,
  Loader,
  NoResults,
  Pagination,
} from '../lib';
import {
  noResultsText,
  isSearchable,
  searchTimeout,
  tabs,
} from '../../helpers/constants';

import './Home.css';

interface State {
  searchTermState: string;
  page: number;
}

type Props = ConnectedProps<typeof connector> & RouteComponentProps;

class Home extends PureComponent<Props, State> {
  searchDebounce: NodeJS.Timeout | undefined;
  readonly state = { searchTermState: '', page: 1 };

  constructor(props: Props) {
    super(props);

    this.state.searchTermState = props.searchTerm;
  }

  componentDidMount(): void {
    const { page } = this.state;
    const { searchTerm, fetchItems, tab, searchItems } = this.props;

    if (isSearchable(searchTerm)) {
      searchItems(tab, searchTerm, page);
    } else {
      fetchItems(tab);
    }
  }

  componentDidUpdate(previousProps: Props): void {
    const { tab, searchTerm } = this.props;

    if (previousProps.tab !== tab) {
      this.handleSearchOrFetch();
    }

    if (previousProps.searchTerm !== searchTerm) {
      this.handleSearchOrFetch();
    }
  }

  handleSearchOrFetch = (): void => {
    const { page } = this.state;
    const { searchTerm, fetchItems, searchItems, tab } = this.props;

    if (isSearchable(searchTerm)) {
      searchItems(tab, searchTerm, page);
    } else {
      fetchItems(tab);
    }
  };

  handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { changeSearchTerm } = this.props;

    this.setState({ searchTermState: event.target.value });

    if (this.searchDebounce) {
      clearTimeout(this.searchDebounce);
    }

    this.searchDebounce = setTimeout(() => {
      changeSearchTerm(event.target.value);
    }, searchTimeout);
  };

  handleCardClick = (id: number): void => {
    const { history, tab } = this.props;

    history.push(`/${tab}/${id}`);
  };

  handlePageChange = (id: number): void => {
    const { searchItems, tab, searchTerm } = this.props;

    this.setState({ page: id });

    if (isSearchable(searchTerm)) {
      searchItems(tab, searchTerm, id)
    }
  }

  render(): JSX.Element {
    const { changeTab, items, tab, isLoading, searchTerm } = this.props;
    const { searchTermState, page } = this.state;

    return (
      <div className="container">
        <Tabs>
          <Button
            label={tabs.tv.label}
            onClick={() => changeTab(tabs.tv.key)}
            selected={tab === tabs.tv.key}
          />
          <Button
            label={tabs.movie.label}
            onClick={() => changeTab(tabs.movie.key)}
            selected={tab === tabs.movie.key}
          />
        </Tabs>
        <InputField
          value={searchTermState}
          onChange={this.handleSearchTermChange}
        />
        {isLoading && <Loader />}
        {!isLoading && !items.results.length && (
          <NoResults text={noResultsText} />
        )}
        {!isLoading && (
          <div className="cards-container">
            {items.results.map(item => {
              let key = item.name;

              if (item.name == null) {
                key = item.title;
              }

              return (
                <Card
                  key={key}
                  tab={tab}
                  item={item}
                  onClick={this.handleCardClick}
                />
              );
            })}
          </div>
        )}
        {/* {searchTerm.length && (
          <Pagination
            currentPage={page}
            onPageChange={this.handlePageChange}
          />
        )} */}
      </div>
    );
  }
}

export default withRouter(Home);
