import React from 'react';
import FlightSearchContainer from '../../containers/FlightSearchContainer';
import ResultList from './ResultList';

const SearchResult = ({ details, isLoading }) =>
  <div className="row">
    <div className="col-md-12">
      <div className="list-page mt-5">
        <h1>Search Result</h1>
        <div className="row">
          <div className="col-md-9">
            {isLoading ?
              <div className="text-center mt-5">
                <img src="/img/loading.gif" alt="Loading" />
              </div>
              :
              <ResultList details={details} />
            }
          </div>
          <div className="col-md-3 mb-3">
            <FlightSearchContainer position="sidebar" />
          </div>
        </div>
      </div>
    </div>
  </div>

export default SearchResult;