import React from 'react';

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <button
            className={className}
            style={{ ...style, display: 'block', background: 'black', borderRadius: '50%' }}
            onClick={onClick}
        >
            &lt;
        </button>
    );
};

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <button
            className={className}
            style={{ ...style, display: 'block', background: 'black', borderRadius: '50%' }}
            onClick={onClick}
        >
            &gt;
        </button>
    );
};

export { PrevArrow, NextArrow };
