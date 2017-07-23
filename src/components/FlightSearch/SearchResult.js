import React from 'react';
import FlightSearchContainer from '../../containers/FlightSearchContainer';
import ResultList from './ResultList';

const SearchResult = ({ flightDetails }) =>
  <div className="row">
    <div className="col-md-12">
      <div className="list-page mt-5">
        <h1>Search Result</h1>
        <div className="row">
          <div className="col-md-9">
            <ResultList flightDetails={flightDetails} />
          </div>
          <div className="col-md-3 mb-3">
            <FlightSearchContainer position="sidebar" />
          </div>
        </div>
      </div>
    </div>
  </div>

export default SearchResult;