the next component i want to work on is a sections component with 3 slots i plan to use it for items like topbar and sidebar can you help generate the 
- a type file 
- a props definiton file 
- a class styles file 
- a controller file 
- a vue file 
- a props builder file

the section component would look something like this 
<nav role="navigation" :class="props.wrapper_class_style">
        <!-- nav section 1 -->
        <div :class="props.section_1_wrapper_class_style">
            <slot name="section_1" />
        </div>

        <!-- nav section 2 -->
        <div :class="props.section_2_wrapper_class_style">
            <slot name="section_2" />
        </div>

        <!-- nav section 3 -->
        <div :class="props.section_3_wrapper_class_style">
            <slot name="section_3" />
        </div>
    </nav>

    instead of using a static nav element if i can switch it between div, section, nav, and any other you think of

