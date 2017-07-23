import React from 'react';
import SidebarSearchForm from './SidebarSearchForm';
import HomepageSearchForm from './HomepageSearchForm';

const FlightsSearchForm = (props) => (
    <div>
        {props.position === "sidebar" ?
            <SidebarSearchForm {...props} /> :
            <HomepageSearchForm {...props} />
        }
    </div>
)

export default FlightsSearchForm;