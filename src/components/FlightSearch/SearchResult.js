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
              <div className="result-tabs">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#departure" role="tab" aria-controls="home" aria-expanded="true">
                      <i className="fa fa-mail-forward"></i>
                      <span>Departure</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#return" role="tab" aria-controls="profile" aria-expanded="false">
                      <i className="fa fa-mail-reply"></i>
                      <span>Return</span>
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div role="tabpanel" className="tab-pane fade active show" id="departure" aria-labelledby="home-tab" aria-expanded="true">
                    <ResultList details={details} />
                  </div>
                  <div className="tab-pane fade" id="return" role="tabpanel" aria-labelledby="profile-tab" aria-expanded="false">
                    <ResultList details={details} />
                  </div>
                </div>
              </div>
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