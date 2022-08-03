import { SvgIconTypeMap } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { IconButton } from '@mui/material';
import React, { MouseEventHandler, ReactElement } from 'react';
import { CustomTooltip } from './CustomTooltip';

interface IconButtonWithTooltipProps{
   title: string;
   ariaLabel: string;
   onClick: MouseEventHandler<HTMLButtonElement> | undefined;
   icon: ReactElement<SvgIconTypeMap<{}, "svg">>;
 }
 

export const IconButtonWithTooltip = (props: IconButtonWithTooltipProps) => (
   <CustomTooltip
      ariaLabel={props.ariaLabel}
      arrow 
      title={props.title}
   >
      <IconButton onClick={props.onClick} >
         {props.icon}
      </IconButton>
   </CustomTooltip> 
)