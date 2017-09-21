import React from 'react';
import Autocomplete from 'react-autocomplete';
import './AutoSuggest.css';

const AutoSuggest = ({ inputValue, items, getItem, onChange, onSelect, renderItem, placeHolder }) =>
    <Autocomplete
        menuStyle={styles.menu}
        value={inputValue}
        wrapperStyle={{ display: "block" }}
        inputProps={{ className: 'typeahead form-control', placeholder: placeHolder }}
        items={items}
        getItemValue={getItem}
        onChange={onChange}
        onSelect={onSelect}
        renderItem={renderItem}
    />


const styles = {
    menu: {
        border: 'solid 1px #ccc',
        background: '#fff',
        position: 'absolute',
        left: 'auto',
        top: 'auto',
        zIndex: '3'
    }
}

export default AutoSuggest;