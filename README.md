So I want to help in building the next component, which is also a component that will require aggregating existing components, two or three components in particular. One is the input UI, another one is the input group UI, and the third one is the button UI. I'll allow you to decide how which ones are necessary. I will also include the props interface and the refiles for each of these components. So basically, what these new components tend to be is the filters component, right? It's going to receive a configuration stating the filters that are required and the types of those filters. If a filter that requires text input, if a filter that requires number inputs, if a filter that requires date range, a filter that requires a dropdown to select or select search. Basically, the initial, the component that uses this component, this filters component, will pass in those configurations and what we will do is render each and every one of these filters, right, using either the input UI, alongside the input group UI, and probably the buttons UI because there will also be a place to clear all the filters, clear all the values of the filters and apply filters to buttons like that, right? What I'm thinking is, again, you know the class styles because the class style is in different ways, but when designing it, design it in such a way where what's to be sort of when you first see the filters button, which would have like a icon to show like in a drop-down or an accordion like drop-down, because when I see drop-down now, it's not that the drop-down will have an absolute position or absolute. No, it's just be that the height will be reduced. So when you click on drop-down, the height increases, it comes down, then you begin to see all the filters in a grid in a grid, so you can properly put in a grid here and mid responsive, so that on mobile screens it adjusts and all, then you can put in, fill in the filters you want, click on it and apply filters or clear all and do filters. Maybe something else you can also add is upon adding the values for these filters, it updates the route accordingly for those filters, right? So yeah, that's basically what I'm thinking of for the filters components.


Above is an exmaple of how i can style it but its not fixed since we can pass in custom class styles

with the above info can you help generate code for the below files for the component
- a type file 
- a props definiton file 
- a class styles file 
- a controller file 
- a vue file 
- a props builder file

below is the props and view file for  input ui, input group ui and button ui


