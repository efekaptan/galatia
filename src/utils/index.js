import React from 'react';

export const airPortSelector = (item) => item.code;

export const autoSuggestRender = (item, isHighlighted) => (
    <div className={isHighlighted ? "highlighted-item" : "item"} key={item.code}>
        {item.city + " - " + item.code}
    </div>
)