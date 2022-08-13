import React from "react";

interface ListProps<T, U> {
   items: T[];
   renderChildren: (item: T) => JSX.Element;
   listType?: string;
   listWrapperProps?: U | null;
}


export const List = <T, U extends {}>(props: ListProps<T, U>) => {
   
   const listType = props.listType || "ul";

   const listItems: JSX.Element[] = props.items.map((item, i) => { 
      return (
         <li key={i}>
            {props.renderChildren(item)}
         </li>
      )
   });

   return React.createElement(
      listType, 
      props.listWrapperProps, 
      listItems
   )

}


