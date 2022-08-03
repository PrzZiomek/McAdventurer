import { Tooltip } from '@mui/material';

interface CustomTooltipProps{
  title: string;
  children: JSX.Element;
  ariaLabel: string;
  arrow: boolean;
}


export const CustomTooltip = (props: CustomTooltipProps) => (
   <Tooltip
      {...props}
      title={props.title}
      placement="bottom"
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            fontSize: '1.125rem',
            letterSpacing: "1px",
            padding: "10px",
            borderRadius: "5px"
          },
          "aria-label": props.ariaLabel
        },
      }}
   >
     {props.children}
   </Tooltip>
 );