import { SvgIconTypeMap } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import { MouseEventHandler, ReactElement } from 'react';
import { CustomTooltip } from './CustomTooltip';

interface IconButtonWithTooltipProps{
   title: string;
   onClick: MouseEventHandler<HTMLButtonElement> | undefined;
   icon: ReactElement<SvgIconTypeMap<{}, "svg">>;
   ariaControls?: string;
   id?: string;
   ariaExpanded?: boolean;
 }
 

export const IconButtonWithTooltip = (props: IconButtonWithTooltipProps) => (
   <CustomTooltip
      arrow 
      title={props.title}
   >
      <IconButton
          onClick={props.onClick} 
          id={props.id}
          aria-controls={props.ariaControls} 
          aria-expanded={props.ariaExpanded}
      >
         {props.icon}
      </IconButton>
   </CustomTooltip> 
)