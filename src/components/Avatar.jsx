// // src/components/Avatar/Avatar.jsx

// import React from 'react';

// // Helper function to generate a more distinct and "random-looking" color based on a string
// // This version aims for a wider spread of colors.
// const stringToColor = (str) => {
//     let hash = 0;
//     // Calculate a hash from the string
//     for (let i = 0; i < str.length; i++) {
//         hash = str.charCodeAt(i) + ((hash << 5) - hash);
//     }

//     // Use modulo operations and bit shifts to create more varied RGB components
//     // We'll target a range that avoids very dark or very light colors for better contrast with white text.
//     const hue = Math.abs(hash % 360); // Hue from 0 to 359
//     const saturation = 70 + (Math.abs(hash % 30)); // Saturation from 70% to 99%
//     const lightness = 40 + (Math.abs(hash % 20)); // Lightness from 40% to 59%

//     // Convert HSL to a hex color string
//     // This conversion logic is more robust for generating diverse colors.
//     // This is a simplified HSL to RGB conversion, more complex ones exist for perfect accuracy.
//     const hslToHex = (h, s, l) => {
//         s /= 100;
//         l /= 100;
//         let c = (1 - Math.abs(2 * l - 1)) * s,
//             x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
//             m = l - c / 2,
//             r = 0,
//             g = 0,
//             b = 0;

//         if (0 <= h && h < 60) {
//             r = c;
//             g = x;
//         } else if (60 <= h && h < 120) {
//             r = x;
//             g = c;
//         } else if (120 <= h && h < 180) {
//             g = c;
//             b = x;
//         } else if (180 <= h && h < 240) {
//             g = x;
//             b = c;
//         } else if (240 <= h && h < 300) {
//             r = x;
//             b = c;
//         } else if (300 <= h && h < 360) {
//             r = c;
//             b = x;
//         }
//         // Convert to 0-255 range and then to hex
//         r = Math.round((r + m) * 255).toString(16);
//         g = Math.round((g + m) * 255).toString(16);
//         b = Math.round((b + m) * 255).toString(16);

//         // Pad single-digit hex values with a leading zero
//         if (r.length === 1) r = "0" + r;
//         if (g.length === 1) g = "0" + g;
//         if (b.length === 1) b = "0" + b;

//         return "#" + r + g + b;
//     };

//     return hslToHex(hue, saturation, lightness);
// };


// // Helper function to extract initials from first and last names
// const getInitials = (firstName, lastName) => {
//     const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
//     const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
//     return `${firstInitial}${lastInitial}`;
// };

// const Avatar = ({ imageUrl, firstName, lastName, size = 40, textSize = 16, className = '' }) => {
//     const initials = getInitials(firstName, lastName);
//     const backgroundColor = stringToColor(`${firstName || ''}${lastName || ''}`); // Use combined name for consistent color

//     const avatarStyle = {
//         width: size,
//         height: size,
//         borderRadius: '50%',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontWeight: 'bold',
//         fontSize: textSize,
//         color: 'white', // Text color for initials
//         backgroundColor: backgroundColor,
//         flexShrink: 0, // Prevents the avatar from shrinking in flex containers
//         overflow: 'hidden' // Ensures the image fits within the rounded shape
//     };

//     return (
//         <>
//             {/* If imageUrl exists and starts with http (to ensure it's a valid URL) */}
//             {imageUrl && imageUrl.startsWith('http') ? (
//                 // Render the image
//                 <img
//                     src={imageUrl}
//                     alt={`${firstName || ''} ${lastName || ''} profile`}
//                     className={`object-cover ${className}`} // `object-cover` helps with image fitting
//                     style={avatarStyle}
//                     // Fallback in case the image fails to load: hide the img and show the initials div
//                     onError={(e) => {
//                         e.target.style.display = 'none'; // Hide the broken image
//                         if (e.target.nextElementSibling) { // Check if the next sibling (our div) exists
//                             e.target.nextElementSibling.style.display = 'flex'; // Show the initials div
//                         }
//                     }}
//                 />
//             ) : (
//                 // Otherwise, render the initials with the colored background
//                 <div className={`flex items-center justify-center ${className}`} style={avatarStyle}>
//                     {/* Display initials, or a fallback '?' if no name is available */}
//                     {initials || '?'}
//                 </div>
//             )}
//         </>
//     );
// };

// export default Avatar;


import React from 'react';

// Helper function to generate a more distinct and "random-looking" color based on a string
// This version aims for a wider spread of colors.
const stringToColor = (str) => {
    let hash = 0;
    // Calculate a hash from the string
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Use modulo operations and bit shifts to create more varied RGB components
    // We'll target a range that avoids very dark or very light colors for better contrast with white text.
    const hue = Math.abs(hash % 360); // Hue from 0 to 359
    const saturation = 70 + (Math.abs(hash % 30)); // Saturation from 70% to 99%
    const lightness = 40 + (Math.abs(hash % 20)); // Lightness from 40% to 59%

    // Convert HSL to a hex color string
    // This conversion logic is more robust for generating diverse colors.
    // This is a simplified HSL to RGB conversion, more complex ones exist for perfect accuracy.
    const hslToHex = (h, s, l) => {
        s /= 100;
        l /= 100;
        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
            m = l - c / 2,
            r = 0,
            g = 0,
            b = 0;

        if (0 <= h && h < 60) {
            r = c;
            g = x;
        } else if (60 <= h && h < 120) {
            r = x;
            g = c;
        } else if (120 <= h && h < 180) {
            g = c;
            b = x;
        } else if (180 <= h && h < 240) {
            g = x;
            b = c;
        } else if (240 <= h && h < 300) {
            r = x;
            b = c;
        } else if (300 <= h && h < 360) {
            r = c;
            b = x;
        }
        // Convert to 0-255 range and then to hex
        r = Math.round((r + m) * 255).toString(16);
        g = Math.round((g + m) * 255).toString(16);
        b = Math.round((b + m) * 255).toString(16);

        // Pad single-digit hex values with a leading zero
        if (r.length === 1) r = "0" + r;
        if (g.length === 1) g = "0" + g;
        if (b.length === 1) b = "0" + b;

        return "#" + r + g + b;
    };

    return hslToHex(hue, saturation, lightness);
};

// Helper function to extract initials from first and last names
const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    return `${firstInitial}${lastInitial}`;
};

const Avatar = ({ imageUrl, firstName, lastName, size = 40, textSize = 16, className = '', onClick }) => {
    const initials = getInitials(firstName, lastName);
    // Use combined name for consistent color; fallback to a default string if no name is provided
    const colorSeed = `${firstName || ''}${lastName || ''}` || 'default'; 
    const backgroundColor = stringToColor(colorSeed);

    const avatarStyle = {
        width: size,
        height: size,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: textSize,
        color: 'white', // Text color for initials
        backgroundColor: backgroundColor,
        flexShrink: 0, // Prevents the avatar from shrinking in flex containers
        overflow: 'hidden', // Ensures the image fits within the rounded shape
        cursor: onClick ? 'pointer' : 'default', // Add pointer cursor if onClick is provided
    };

    return (
        <>
            {/* If imageUrl exists and starts with http (to ensure it's a valid URL) */}
            {imageUrl && imageUrl.startsWith('http') ? (
                // Render the image
                <img
                    src={imageUrl}
                    alt={`${firstName || ''} ${lastName || ''} profile`}
                    className={`object-cover ${className}`} // `object-cover` helps with image fitting
                    style={avatarStyle}
                    onClick={onClick}
                    // Fallback in case the image fails to load: hide the img and show the initials div
                    onError={(e) => {
                        e.target.style.display = 'none'; // Hide the broken image
                        // Create and append the initials div manually if img fails
                        const parent = e.target.parentNode;
                        if (parent) {
                            const initialsDiv = document.createElement('div');
                            initialsDiv.className = `flex items-center justify-center ${className}`;
                            Object.assign(initialsDiv.style, avatarStyle);
                            initialsDiv.textContent = initials || '?';
                            initialsDiv.onclick = onClick; // Maintain click behavior
                            parent.appendChild(initialsDiv);
                        }
                    }}
                />
            ) : (
                // Otherwise, render the initials with the colored background
                <div className={`flex items-center justify-center ${className}`} style={avatarStyle} onClick={onClick}>
                    {/* Display initials, or a fallback '?' if no name is available */}
                    {initials || '?'}
                </div>
            )}
        </>
    );
};

export default Avatar;