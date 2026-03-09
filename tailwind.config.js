
module.exports = {
    theme: { extend: {} },
    
    plugins: [ require('flowbite/plugin') ],
    
    content: [
       "./public/index.html", 
       "./src/**/*.{vue,js,ts,jsx,tsx}", 
       "./node_modules/flowbite/**/*.js",  
       "/Users/ojooh/Documents/Projects/fi-ui-toolkit/**/*.{vue,js,ts,jsx,tsx}",
       "../../fi-ui-toolkit/**/*.{vue,js,ts,jsx,tsx}",
    ]
};
