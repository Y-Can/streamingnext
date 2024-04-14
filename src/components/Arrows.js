import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <button
            className={className}
            style={{ 
                ...style, 
                display: 'block', 
                background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
                borderRadius: '50%', // Circular shape
                width: '50px', // Width of the arrow
                height: '50px', // Height of the arrow
                justifyContent: 'center', // Center the icon horizontally
                alignItems: 'center', // Center the icon vertically
                color: 'white', // Icon color
                fontSize: '24px', // Icon size
                zIndex: 1 // Ensure it's above other content
            }}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faChevronLeft} /> {/* Using FontAwesome icon */}
        </button>
    );
};

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <button
            className={className}
            style={{ 
                ...style, 
                display: 'block', 
                background: 'rgba(0, 0, 0, 0.5)', // Similar styles as the previous arrow
                borderRadius: '50%', 
                width: '50px',
                height: '50px',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: '24px',
                zIndex: 1
            }}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faChevronRight} /> {/* Using FontAwesome icon */}
        </button>
    );
};

export { PrevArrow, NextArrow };
